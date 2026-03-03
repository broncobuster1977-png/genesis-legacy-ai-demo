/* LIVEKIT CONFIGURATION AND UTILITIES */
/* Atlas Technical Director - March 1, 2026 */

import { Room, RoomEvent, LocalParticipant, RemoteParticipant, Track, AudioTrack } from 'livekit-client'

// LiveKit Configuration
const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://localhost:7880'
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || ''
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || ''

export interface LiveKitConfig {
  url: string
  token: string
  roomName: string
  participantName: string
}

export interface AgentVoiceMessage {
  id: string
  fromAgent: string
  toAgent?: string  // If null, broadcast to all
  content: string
  timestamp: Date
  audioBuffer?: ArrayBuffer
  transcription?: string
  confidence?: number
}

export class AgentVoiceManager {
  private room: Room | null = null
  private audioContext: AudioContext | null = null
  private isConnected = false
  private messageHandlers: ((message: AgentVoiceMessage) => void)[] = []

  constructor() {
    this.setupAudioContext()
  }

  private setupAudioContext() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  async connect(config: LiveKitConfig): Promise<void> {
    try {
      this.room = new Room()
      
      // Set up event handlers
      this.setupEventHandlers()
      
      // Connect to room
      await this.room.connect(config.url, config.token)
      this.isConnected = true
      
      console.log('Connected to LiveKit room:', config.roomName)
      
    } catch (error) {
      console.error('Failed to connect to LiveKit:', error)
      throw error
    }
  }

  private setupEventHandlers() {
    if (!this.room) return

    this.room.on(RoomEvent.Connected, () => {
      console.log('LiveKit room connected')
    })

    this.room.on(RoomEvent.Disconnected, () => {
      console.log('LiveKit room disconnected')
      this.isConnected = false
    })

    this.room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      console.log('Agent joined:', participant.identity)
      this.handleParticipantJoined(participant)
    })

    this.room.on(RoomEvent.TrackSubscribed, (track: Track, publication, participant: RemoteParticipant) => {
      if (track.kind === Track.Kind.Audio) {
        this.handleIncomingAudio(track as AudioTrack, participant)
      }
    })

    this.room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant) => {
      this.handleDataMessage(payload, participant)
    })
  }

  private handleParticipantJoined(participant: RemoteParticipant) {
    // Send welcome message to new agent
    const welcomeMessage: AgentVoiceMessage = {
      id: Date.now().toString(),
      fromAgent: this.room?.localParticipant?.identity || 'unknown',
      toAgent: participant.identity,
      content: 'Agent joined voice session',
      timestamp: new Date()
    }
    
    this.broadcastMessage(welcomeMessage)
  }

  private async handleIncomingAudio(audioTrack: AudioTrack, participant: RemoteParticipant) {
    try {
      // Get audio stream from track
      const mediaStream = new MediaStream([audioTrack.mediaStreamTrack])
      
      // Process audio for agent communication
      const audioMessage: AgentVoiceMessage = {
        id: Date.now().toString(),
        fromAgent: participant.identity,
        content: 'Voice message from agent',
        timestamp: new Date()
      }
      
      // Trigger speech-to-text processing
      this.processIncomingVoice(mediaStream, audioMessage)
      
    } catch (error) {
      console.error('Error handling incoming audio:', error)
    }
  }

  private async processIncomingVoice(stream: MediaStream, message: AgentVoiceMessage) {
    try {
      // Use browser speech recognition for agent voice
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'
        
        recognition.onresult = (event: any) => {
          let transcript = ''
          let confidence = 0
          
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
            confidence = Math.max(confidence, event.results[i][0].confidence)
          }
          
          if (event.results[event.results.length - 1].isFinal) {
            const processedMessage: AgentVoiceMessage = {
              ...message,
              content: transcript,
              transcription: transcript,
              confidence: confidence
            }
            
            this.notifyMessageHandlers(processedMessage)
          }
        }
        
        recognition.start()
        
        // Stop recognition after a timeout
        setTimeout(() => {
          recognition.stop()
        }, 30000)
      }
      
    } catch (error) {
      console.error('Error processing voice:', error)
    }
  }

  private handleDataMessage(payload: Uint8Array, participant?: RemoteParticipant) {
    try {
      const decoder = new TextDecoder()
      const messageData = JSON.parse(decoder.decode(payload))
      
      const message: AgentVoiceMessage = {
        id: messageData.id || Date.now().toString(),
        fromAgent: participant?.identity || 'unknown',
        toAgent: messageData.toAgent,
        content: messageData.content,
        timestamp: new Date(messageData.timestamp),
        transcription: messageData.transcription,
        confidence: messageData.confidence
      }
      
      this.notifyMessageHandlers(message)
      
    } catch (error) {
      console.error('Error parsing data message:', error)
    }
  }

  async sendMessage(message: AgentVoiceMessage): Promise<void> {
    if (!this.room || !this.isConnected) {
      throw new Error('Not connected to LiveKit room')
    }

    try {
      // Send as data message
      const encoder = new TextEncoder()
      const payload = encoder.encode(JSON.stringify({
        id: message.id,
        toAgent: message.toAgent,
        content: message.content,
        timestamp: message.timestamp.toISOString(),
        transcription: message.transcription,
        confidence: message.confidence
      }))
      
      await this.room.localParticipant.publishData(payload, { reliable: true })
      
      console.log('Message sent to agents:', message)
      
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  async sendVoiceMessage(audioBuffer: ArrayBuffer, transcription?: string): Promise<void> {
    if (!this.room || !this.isConnected) {
      throw new Error('Not connected to LiveKit room')
    }

    try {
      // Create audio track from buffer
      const audioContext = this.audioContext || new AudioContext()
      const audioData = await audioContext.decodeAudioData(audioBuffer.slice(0))
      
      // Convert to MediaStream for transmission
      const oscillator = audioContext.createOscillator()
      const destination = audioContext.createMediaStreamDestination()
      oscillator.connect(destination)
      
      // Publish audio track
      await this.room.localParticipant.publishTrack(destination.stream.getAudioTracks()[0], {
        name: 'agent-voice',
        source: Track.Source.Microphone
      })
      
      // Send transcription as data message
      if (transcription) {
        const message: AgentVoiceMessage = {
          id: Date.now().toString(),
          fromAgent: this.room.localParticipant.identity,
          content: transcription,
          timestamp: new Date(),
          transcription: transcription
        }
        
        await this.sendMessage(message)
      }
      
    } catch (error) {
      console.error('Error sending voice message:', error)
      throw error
    }
  }

  private async broadcastMessage(message: AgentVoiceMessage) {
    // Send to all connected agents
    await this.sendMessage(message)
  }

  onMessage(handler: (message: AgentVoiceMessage) => void) {
    this.messageHandlers.push(handler)
  }

  private notifyMessageHandlers(message: AgentVoiceMessage) {
    this.messageHandlers.forEach(handler => {
      try {
        handler(message)
      } catch (error) {
        console.error('Error in message handler:', error)
      }
    })
  }

  async disconnect(): Promise<void> {
    if (this.room) {
      await this.room.disconnect()
      this.room = null
    }
    
    if (this.audioContext) {
      await this.audioContext.close()
      this.audioContext = null
    }
    
    this.isConnected = false
    this.messageHandlers = []
  }

  getConnectedAgents(): string[] {
    if (!this.room) return []
    
    return Array.from(this.room.remoteParticipants.values())
      .map(p => p.identity)
      .filter(identity => identity && identity !== 'unknown')
  }

  isAgentConnected(agentName: string): boolean {
    return this.getConnectedAgents().includes(agentName)
  }

  async enableAudio(): Promise<void> {
    if (!this.room) return
    
    try {
      await this.room.localParticipant.enableCameraAndMicrophone()
    } catch (error) {
      console.error('Error enabling audio:', error)
    }
  }

  async disableAudio(): Promise<void> {
    if (!this.room) return
    
    try {
      await this.room.localParticipant.setCameraEnabled(false)
      await this.room.localParticipant.setMicrophoneEnabled(false)
    } catch (error) {
      console.error('Error disabling audio:', error)
    }
  }
}

// Token generation utility (server-side)
export async function generateLiveKitToken(
  roomName: string,
  participantName: string,
  isAgent = false
): Promise<string> {
  try {
    // This would typically be called from an API route
    const response = await fetch('/api/livekit/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName,
        participantName,
        isAgent
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate token')
    }

    const data = await response.json()
    return data.token

  } catch (error) {
    console.error('Error generating LiveKit token:', error)
    throw error
  }
}

// Initialize agent voice manager singleton
export const agentVoiceManager = new AgentVoiceManager()