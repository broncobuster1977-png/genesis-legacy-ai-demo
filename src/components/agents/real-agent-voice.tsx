/* REAL OPENCLAW AGENT VOICE COMMUNICATION */
/* Atlas Technical Director - March 2, 2026 */

'use client'

import { useState, useRef, useEffect } from 'react'

interface RealAgentVoiceProps {
  agentName: string
  onMessage?: (message: { fromAgent: string; content: string; timestamp: Date }) => void
  onStatusChange?: (status: 'connecting' | 'connected' | 'disconnected' | 'speaking') => void
}

export function RealAgentVoice({ 
  agentName, 
  onMessage,
  onStatusChange 
}: RealAgentVoiceProps) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastResponse, setLastResponse] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [bridgeStatus, setBridgeStatus] = useState<'healthy' | 'unhealthy' | 'unknown'>('unknown')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    checkBridgeHealth()
    setupSpeechRecognition()
    
    return () => {
      stopListening()
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const checkBridgeHealth = async () => {
    try {
      const response = await fetch('/api/openclaw-bridge', { method: 'GET' })
      const data = await response.json()
      setBridgeStatus(data.status === 'healthy' ? 'healthy' : 'unhealthy')
    } catch (error) {
      setBridgeStatus('unhealthy')
      console.error('Bridge health check failed:', error)
    }
  }

  const setupSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
      onStatusChange?.('connecting')
      console.log('🎤 Voice recognition started')
    }

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript
      const confidence = event.results[0][0].confidence

      console.log(`🎯 Voice input: "${transcript}" (${(confidence * 100).toFixed(1)}% confidence)`)
      
      if (transcript.trim()) {
        await sendToRealAgent(transcript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('❌ Speech recognition error:', event.error)
      setError(`Voice recognition error: ${event.error}`)
      setIsListening(false)
      onStatusChange?.('disconnected')
    }

    recognition.onend = () => {
      setIsListening(false)
      onStatusChange?.('connected')
    }

    recognitionRef.current = recognition
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not available')
      return
    }

    if (isListening || isProcessing) {
      return
    }

    try {
      recognitionRef.current.start()
    } catch (error) {
      console.error('❌ Failed to start recognition:', error)
      setError('Failed to start voice recognition')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const sendToRealAgent = async (message: string) => {
    setIsProcessing(true)
    setError(null)
    onStatusChange?.('speaking')

    try {
      // Clean agent name for API call
      const cleanAgentName = agentName.replace('Real ', '').toLowerCase()
      
      console.log(`🚀 Sending to ${cleanAgentName}: "${message}"`)

      const response = await fetch('/api/openclaw-bridge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          agentName: cleanAgentName,
          conversationId: `voice-${Date.now()}`
        })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Agent communication failed')
      }

      console.log(`🎯 Agent response: "${data.response}" (${data.duration}ms)`)
      
      setLastResponse(data.response)
      
      // Notify parent component
      onMessage?.({
        fromAgent: agentName,
        content: data.response,
        timestamp: new Date()
      })

      // Play TTS audio if available
      if (data.audioBuffer || data.audioUrl) {
        await playTTSAudio(data.audioBuffer || data.audioUrl)
      }

    } catch (error) {
      console.error('❌ Real agent communication failed:', error)
      setError(error instanceof Error ? error.message : 'Communication failed')
    } finally {
      setIsProcessing(false)
      onStatusChange?.('connected')
    }
  }

  const playTTSAudio = async (audioSource: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!audioRef.current) {
        audioRef.current = new Audio()
      }

      const audio = audioRef.current

      audio.onended = () => resolve()
      audio.onerror = () => reject(new Error('Audio playback failed'))

      try {
        audio.src = audioSource
        audio.play()
        console.log('🔊 Playing TTS audio')
      } catch (error) {
        reject(error)
      }
    })
  }

  const sendTestMessage = async () => {
    await sendToRealAgent('Hello, this is a test message from the voice interface.')
  }

  const sendStatusRequest = async () => {
    await sendToRealAgent('What is your current status?')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {agentName} - Real Agent Communication
        </h3>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            bridgeStatus === 'healthy' ? 'bg-green-100 text-green-800' :
            bridgeStatus === 'unhealthy' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {bridgeStatus === 'healthy' ? '🟢 Bridge Online' :
             bridgeStatus === 'unhealthy' ? '🔴 Bridge Offline' :
             '⚪ Checking...'}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">❌ {error}</p>
        </div>
      )}

      {/* Voice Controls */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={startListening}
            disabled={isListening || isProcessing}
            className={`px-6 py-3 rounded-lg font-medium ${
              isListening 
                ? 'bg-red-600 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isListening ? '🎤 Listening...' : isProcessing ? '⏳ Processing...' : '🎤 Start Voice Input'}
          </button>
          
          <button
            onClick={sendTestMessage}
            disabled={isProcessing}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            📤 Send Test
          </button>
          
          <button
            onClick={sendStatusRequest}
            disabled={isProcessing}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            📊 Request Status
          </button>
        </div>

        {lastResponse && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Latest Response:</h4>
            <p className="text-blue-700">{lastResponse}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Instructions:</strong></p>
          <p>• Click "Start Voice Input" and speak your message</p>
          <p>• Voice will be transcribed and sent to the real {agentName.replace('Real ', '')} agent</p>
          <p>• Agent response will be converted to speech and played back</p>
          <p>• Use test buttons to verify the connection is working</p>
        </div>
      </div>

      {/* Hidden audio element for TTS playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}