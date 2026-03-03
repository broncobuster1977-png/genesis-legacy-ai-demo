/* LIVEKIT-ENABLED VOICE CHAT COMPONENT */
/* Atlas Technical Director - March 1, 2026 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { agentVoiceManager, AgentVoiceMessage, generateLiveKitToken } from '@/lib/livekit'

interface VoiceMessage {
  id: string
  type: 'user' | 'assistant' | 'system' | 'agent'
  content: string
  timestamp: Date
  audioUrl?: string
  transcriptConfidence?: number
  fromAgent?: string
}

interface LiveKitVoiceChatProps {
  onClose: () => void
  conversationId?: string
  enableAgentCommunication?: boolean
}

export function LiveKitVoiceChat({ 
  onClose, 
  conversationId,
  enableAgentCommunication = false
}: LiveKitVoiceChatProps) {
  const { data: session } = useSession()
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
  const [audioLevel, setAudioLevel] = useState(0)
  const [connectedAgents, setConnectedAgents] = useState<string[]>([])
  
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const recordingRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    initializeVoiceConnection()
    
    return () => {
      disconnectVoice()
    }
  }, [])

  // Set up agent communication if enabled
  useEffect(() => {
    if (enableAgentCommunication) {
      agentVoiceManager.onMessage(handleAgentMessage)
      
      // Connect as user to agent communication system
      connectToAgentSystem()
    }
  }, [enableAgentCommunication])

  const initializeVoiceConnection = async () => {
    try {
      setConnectionStatus('connecting')
      setError(null)

      // Request microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      })
      mediaStreamRef.current = stream
      
      setConnectionStatus('connected')
      setIsConnected(true)
      
      // Add welcome message
      const welcomeMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: `Voice chat connected! ${enableAgentCommunication ? 'Agent communication enabled.' : ''} Tap and hold the microphone to speak.`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      
    } catch (error) {
      console.error('Voice connection failed:', error)
      setError('Failed to connect to voice chat. Please check your microphone permissions.')
      setConnectionStatus('disconnected')
    }
  }

  const connectToAgentSystem = async () => {
    try {
      const userName = session?.user?.name || 'User'
      const roomName = `legacy-ai-user-${session?.user?.email?.replace('@', '-').replace('.', '-') || 'anonymous'}`
      
      // Generate token for user
      const token = await generateLiveKitToken(roomName, userName, false)
      
      // Connect to agent communication system
      await agentVoiceManager.connect({
        url: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880',
        token,
        roomName,
        participantName: userName
      })

      console.log('Connected to agent communication system')
      
      // Update connected agents list periodically
      const interval = setInterval(() => {
        const agents = agentVoiceManager.getConnectedAgents()
        setConnectedAgents(agents)
      }, 2000)
      
      return () => clearInterval(interval)
      
    } catch (error) {
      console.error('Failed to connect to agent system:', error)
    }
  }

  const handleAgentMessage = (message: AgentVoiceMessage) => {
    const voiceMessage: VoiceMessage = {
      id: message.id,
      type: 'agent',
      content: message.content,
      timestamp: message.timestamp,
      transcriptConfidence: message.confidence,
      fromAgent: message.fromAgent
    }
    
    setMessages(prev => [...prev, voiceMessage])
    
    // Speak agent messages
    if (message.fromAgent !== session?.user?.name) {
      speakMessage(`Message from ${message.fromAgent}: ${message.content}`)
    }
  }

  const disconnectVoice = async () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    
    if (recordingRef.current) {
      recordingRef.current.stop()
      recordingRef.current = null
    }
    
    if (enableAgentCommunication) {
      await agentVoiceManager.disconnect()
    }
    
    setIsConnected(false)
    setConnectionStatus('disconnected')
  }

  const startRecording = async () => {
    if (!isConnected || !mediaStreamRef.current) return
    
    try {
      setIsRecording(true)
      setError(null)
      
      // Initialize MediaRecorder
      recordingRef.current = new MediaRecorder(mediaStreamRef.current, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      audioChunksRef.current = []
      
      recordingRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      recordingRef.current.onstop = () => {
        processRecording()
      }
      
      recordingRef.current.start(100) // Collect data every 100ms
      
      // Visual feedback for recording
      simulateAudioLevel()
      
    } catch (error) {
      console.error('Recording start failed:', error)
      setError('Failed to start recording')
      setIsRecording(false)
    }
  }

  const stopRecording = async () => {
    if (!isRecording || !recordingRef.current) return
    
    setIsRecording(false)
    setAudioLevel(0)
    recordingRef.current.stop()
  }

  const processRecording = async () => {
    try {
      // Create audio blob
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      const audioUrl = URL.createObjectURL(audioBlob)
      
      // Convert to text using speech recognition
      const transcript = await speechToText(audioBlob)
      
      if (!transcript.trim()) {
        setError('No speech detected. Please try again.')
        return
      }
      
      const userMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: transcript,
        timestamp: new Date(),
        audioUrl: audioUrl,
        transcriptConfidence: 0.9 // Placeholder confidence
      }
      
      setMessages(prev => [...prev, userMessage])
      
      // Send to AI system for processing
      await processVoiceMessage(transcript, audioBlob)
      
    } catch (error) {
      console.error('Recording processing failed:', error)
      setError('Failed to process recording')
    }
  }

  const speechToText = async (audioBlob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported'))
        return
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }
      
      recognition.onerror = (event: any) => {
        reject(new Error(`Speech recognition error: ${event.error}`))
      }
      
      recognition.onend = () => {
        // Recognition ended without result
        resolve('')
      }
      
      // Start recognition with audio stream
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
      
      audio.onplay = () => {
        recognition.start()
      }
      
      audio.onended = () => {
        recognition.stop()
      }
      
      audio.play()
    })
  }

  const processVoiceMessage = async (transcript: string, audioBlob: Blob) => {
    try {
      // Send to chat API for AI processing
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: transcript,
          conversationId: conversationId,
          voiceMode: true
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }
      
      // Handle streaming response
      const reader = response.body?.getReader()
      if (reader) {
        let fullResponse = ''
        
        const aiMessage: VoiceMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: '',
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, aiMessage])
        
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                
                if (data.content) {
                  fullResponse += data.content
                  setMessages(prev => prev.map(msg => 
                    msg.id === aiMessage.id 
                      ? { ...msg, content: fullResponse }
                      : msg
                  ))
                }
                
                if (data.done) {
                  // Speak the AI response
                  speakMessage(fullResponse)
                  
                  // Send to agents if enabled
                  if (enableAgentCommunication) {
                    await sendToAgents(fullResponse, audioBlob)
                  }
                }
                
              } catch (error) {
                console.error('Error parsing streaming response:', error)
              }
            }
          }
        }
      }
      
    } catch (error) {
      console.error('Failed to process voice message:', error)
      setError('Failed to process voice message')
    }
  }

  const sendToAgents = async (content: string, audioBlob?: Blob) => {
    try {
      let audioBuffer: ArrayBuffer | undefined
      
      if (audioBlob) {
        audioBuffer = await audioBlob.arrayBuffer()
      }
      
      const message: AgentVoiceMessage = {
        id: Date.now().toString(),
        fromAgent: session?.user?.name || 'User',
        content: `User voice message: ${content}`,
        timestamp: new Date()
      }
      
      await agentVoiceManager.sendMessage(message)
      
      if (audioBuffer) {
        await agentVoiceManager.sendVoiceMessage(audioBuffer, content)
      }
      
    } catch (error) {
      console.error('Error sending to agents:', error)
    }
  }

  const simulateAudioLevel = () => {
    const interval = setInterval(() => {
      if (!isRecording) {
        clearInterval(interval)
        return
      }
      setAudioLevel(Math.random() * 100)
    }, 100)
  }

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      
      utterance.onend = () => {
        setIsSpeaking(false)
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
      }
      
      // Configure voice settings
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8
      
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <div>
              <h2 className="text-lg font-semibold">Voice Chat</h2>
              <p className="text-sm text-gray-600 capitalize">{connectionStatus}</p>
              {enableAgentCommunication && connectedAgents.length > 0 && (
                <p className="text-xs text-blue-600">
                  {connectedAgents.length} agent(s) connected
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${
              message.type === 'user' ? 'justify-end' : 
              message.type === 'system' ? 'justify-center' : 'justify-start'
            }`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user' ? 'bg-legacy-navy text-white' :
                message.type === 'system' ? 'bg-yellow-100 text-yellow-800 text-sm' :
                message.type === 'agent' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-900'
              }`}>
                {message.fromAgent && (
                  <p className="text-xs font-medium mb-1 opacity-75">
                    {message.fromAgent}
                  </p>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${
                    message.type === 'user' ? 'text-blue-200' : 
                    message.type === 'agent' ? 'text-purple-600' :
                    'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                  {message.transcriptConfidence && (
                    <p className="text-xs text-blue-200">
                      {Math.round(message.transcriptConfidence * 100)}% confidence
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center gap-6">
            {/* Main Record Button */}
            <div className="relative">
              <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                disabled={!isConnected}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 scale-110' 
                    : 'bg-legacy-navy hover:bg-blue-800'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              
              {/* Audio Level Indicator */}
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              )}
              
              {/* Audio Level Bars */}
              {isRecording && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-red-400 rounded-full transition-all duration-100 ${
                        audioLevel > (i * 20) ? 'h-6' : 'h-2'
                      }`}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Stop Speaking Button */}
            <button
              onClick={stopSpeaking}
              disabled={!isSpeaking}
              className={`p-3 rounded-full transition-colors duration-200 ${
                isSpeaking 
                  ? 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800' 
                  : 'bg-gray-200 text-gray-400'
              } disabled:cursor-not-allowed`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isRecording ? 
                'Listening... Release to send' :
                isSpeaking ? 
                'Speaking...' :
                'Hold to speak'
              }
            </p>
            {enableAgentCommunication && connectedAgents.length > 0 && (
              <p className="text-xs text-blue-600 mt-1">
                Messages will be shared with connected agents
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}