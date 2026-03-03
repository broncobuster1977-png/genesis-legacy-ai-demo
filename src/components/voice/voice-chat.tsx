/* LEGACY AI VOICE CHAT COMPONENT */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

interface VoiceMessage {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  audioUrl?: string
  transcriptConfidence?: number
}

interface VoiceChatProps {
  onClose: () => void
  conversationId?: string
}

export function VoiceChat({ onClose, conversationId }: VoiceChatProps) {
  const { data: session } = useSession()
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
  const [audioLevel, setAudioLevel] = useState(0)
  
  // LiveKit refs (will be implemented with actual LiveKit SDK)
  const roomRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Initialize voice connection when component mounts
    initializeVoiceConnection()
    
    return () => {
      // Cleanup on unmount
      disconnectVoice()
    }
  }, [])

  const initializeVoiceConnection = async () => {
    try {
      setConnectionStatus('connecting')
      setError(null)

      // TODO: Replace with actual LiveKit connection
      // For now, simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Request microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      
      setConnectionStatus('connected')
      setIsConnected(true)
      
      // Add welcome message
      const welcomeMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: `Voice chat connected! Hi ${session?.user?.name || 'there'}, I'm ready to chat. Tap and hold the microphone to speak.`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])

      // TODO: Connect to existing LiveKit voice infrastructure
      // connectToLiveKitRoom()
      
    } catch (error) {
      console.error('Voice connection failed:', error)
      setError('Failed to connect to voice chat. Please check your microphone permissions.')
      setConnectionStatus('disconnected')
    }
  }

  const connectToLiveKitRoom = async () => {
    try {
      // Connect to existing LiveKit voice infrastructure
      const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://104-236-19-116.nip.io'
      const roomName = 'legacy-ai-voice-chat'
      
      // TODO: Implement proper LiveKit Room connection
      // For now, establish WebSocket connection to existing voice infrastructure
      const ws = new WebSocket(`${livekitUrl}/ws`)
      
      ws.onopen = () => {
        console.log('Connected to LiveKit voice infrastructure')
        setConnectionStatus('connected')
        setIsConnected(true)
      }
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'transcript') {
            handleVoiceTranscript(data.text, data.confidence)
          } else if (data.type === 'ai_response') {
            handleAIResponse(data.content)
          }
        } catch (error) {
          console.error('Error parsing voice message:', error)
        }
      }
      
      ws.onerror = (error) => {
        console.error('LiveKit connection error:', error)
        setError('Voice connection error')
      }
      
      roomRef.current = ws
      
    } catch (error) {
      console.error('Failed to connect to LiveKit:', error)
      setError('Failed to connect to voice system')
    }
  }

  const disconnectVoice = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    
    if (roomRef.current) {
      roomRef.current.disconnect()
      roomRef.current = null
    }
    
    setIsConnected(false)
    setConnectionStatus('disconnected')
  }

  const startRecording = async () => {
    if (!isConnected) return
    
    try {
      setIsRecording(true)
      setError(null)
      
      // TODO: Start LiveKit audio transmission
      // For now, simulate recording
      
      // Add visual feedback for recording
      simulateAudioLevel()
      
    } catch (error) {
      console.error('Recording start failed:', error)
      setError('Failed to start recording')
      setIsRecording(false)
    }
  }

  const stopRecording = async () => {
    if (!isRecording) return
    
    try {
      setIsRecording(false)
      setAudioLevel(0)
      
      // TODO: Stop LiveKit audio transmission and get transcript
      // For now, simulate processing
      
      const userMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: 'This is a simulated voice message. In the real application, this would be the transcript of your spoken words.',
        timestamp: new Date(),
        transcriptConfidence: 0.95
      }
      
      setMessages(prev => [...prev, userMessage])
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: VoiceMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "I understand what you're saying! This is a simulated voice response that demonstrates the voice chat interface. In the real application, I would respond with full context from your Soul File and our conversation history.",
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, aiMessage])
        
        // Simulate text-to-speech
        speakMessage(aiMessage.content)
      }, 1500)
      
    } catch (error) {
      console.error('Recording stop failed:', error)
      setError('Failed to process recording')
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

  const handleVoiceTranscript = async (transcript: string, confidence: number) => {
    // Add user's voice message to chat
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: transcript,
      timestamp: new Date(),
      transcriptConfidence: confidence
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Route the voice transcript through the local model routing system
    try {
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
      
      // Handle streaming response from routing system
      const reader = response.body?.getReader()
      if (reader) {
        let fullResponse = ''
        let routingInfo = null
        
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
                  // Update message in real-time
                  setMessages(prev => prev.map(msg => 
                    msg.id === aiMessage.id 
                      ? { ...msg, content: fullResponse }
                      : msg
                  ))
                }
                
                if (data.routing_metadata) {
                  routingInfo = data.routing_metadata
                }
                
                if (data.done) {
                  // Speak the AI response
                  speakMessage(fullResponse)
                  
                  // Log routing performance
                  if (routingInfo) {
                    console.log('Voice routing info:', routingInfo)
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

  const handleAIResponse = (content: string) => {
    const aiMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: 'assistant',
      content: content,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, aiMessage])
    speakMessage(content)
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const toggleMute = () => {
    // TODO: Implement mute toggle with LiveKit
    console.log('Toggle mute')
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
                'bg-gray-100 text-gray-900'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
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
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            </button>

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
          </div>
        </div>
      </div>
    </div>
  )
}