/* AGENT-TO-AGENT VOICE COMMUNICATION MANAGER */
/* Atlas Technical Director - March 1, 2026 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { agentVoiceManager, AgentVoiceMessage, generateLiveKitToken } from '@/lib/livekit'

interface AgentVoiceManagerProps {
  agentName: string
  roomName?: string
  onMessage?: (message: AgentVoiceMessage) => void
  onAgentJoined?: (agentName: string) => void
  onAgentLeft?: (agentName: string) => void
}

export function AgentVoiceManager({
  agentName,
  roomName = 'agent-communication',
  onMessage,
  onAgentJoined,
  onAgentLeft
}: AgentVoiceManagerProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectedAgents, setConnectedAgents] = useState<string[]>([])
  const [messages, setMessages] = useState<AgentVoiceMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  
  const previousAgents = useRef<Set<string>>(new Set())

  const connectToVoiceSystem = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Generate token for agent
      const token = await generateLiveKitToken(roomName, agentName, true)
      
      // Connect to LiveKit
      await agentVoiceManager.connect({
        url: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880',
        token,
        roomName,
        participantName: agentName
      })

      setIsConnected(true)
      console.log(`Agent ${agentName} connected to voice system`)

    } catch (error) {
      console.error('Failed to connect to voice system:', error)
      setError(`Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }, [agentName, roomName])

  const disconnectFromVoiceSystem = useCallback(async () => {
    try {
      await agentVoiceManager.disconnect()
      setIsConnected(false)
      setConnectedAgents([])
      setAudioEnabled(false)
      console.log(`Agent ${agentName} disconnected from voice system`)
    } catch (error) {
      console.error('Error disconnecting:', error)
    }
  }, [agentName])

  const handleIncomingMessage = useCallback((message: AgentVoiceMessage) => {
    setMessages(prev => [...prev, message])
    
    if (onMessage) {
      onMessage(message)
    }

    console.log(`Message from ${message.fromAgent}:`, message.content)
  }, [onMessage])

  const sendMessageToAgent = useCallback(async (
    targetAgent: string | null,
    content: string,
    audioBuffer?: ArrayBuffer
  ) => {
    if (!isConnected) {
      throw new Error('Not connected to voice system')
    }

    try {
      const message: AgentVoiceMessage = {
        id: Date.now().toString(),
        fromAgent: agentName,
        toAgent: targetAgent || undefined,
        content,
        timestamp: new Date()
      }

      if (audioBuffer) {
        await agentVoiceManager.sendVoiceMessage(audioBuffer, content)
      } else {
        await agentVoiceManager.sendMessage(message)
      }

      // Add to local messages
      setMessages(prev => [...prev, message])

    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }, [agentName, isConnected])

  const broadcastMessage = useCallback(async (content: string, audioBuffer?: ArrayBuffer) => {
    return sendMessageToAgent(null, content, audioBuffer)
  }, [sendMessageToAgent])

  const enableAudio = useCallback(async () => {
    try {
      await agentVoiceManager.enableAudio()
      setAudioEnabled(true)
    } catch (error) {
      console.error('Error enabling audio:', error)
      setError('Failed to enable audio')
    }
  }, [])

  const disableAudio = useCallback(async () => {
    try {
      await agentVoiceManager.disableAudio()
      setAudioEnabled(false)
    } catch (error) {
      console.error('Error disabling audio:', error)
    }
  }, [])

  // Update connected agents list periodically
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      const agents = agentVoiceManager.getConnectedAgents()
      const currentAgents = new Set(agents)
      
      // Check for newly joined agents
      currentAgents.forEach(agent => {
        if (!previousAgents.current.has(agent) && onAgentJoined) {
          onAgentJoined(agent)
        }
      })
      
      // Check for agents that left
      previousAgents.current.forEach(agent => {
        if (!currentAgents.has(agent) && onAgentLeft) {
          onAgentLeft(agent)
        }
      })
      
      setConnectedAgents(agents)
      previousAgents.current = currentAgents
    }, 2000)

    return () => clearInterval(interval)
  }, [isConnected, onAgentJoined, onAgentLeft])

  // Set up message handler
  useEffect(() => {
    agentVoiceManager.onMessage(handleIncomingMessage)
  }, [handleIncomingMessage])

  // Auto-connect on mount
  useEffect(() => {
    connectToVoiceSystem()
    
    return () => {
      disconnectFromVoiceSystem()
    }
  }, [connectToVoiceSystem, disconnectFromVoiceSystem])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 
            isLoading ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <div>
            <h3 className="font-semibold text-sm">Agent Voice System</h3>
            <p className="text-xs text-gray-600">
              {isLoading ? 'Connecting...' : 
               isConnected ? `Connected as ${agentName}` : 'Disconnected'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={audioEnabled ? disableAudio : enableAudio}
            disabled={!isConnected}
            className={`p-2 rounded-lg text-xs ${
              audioEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            } disabled:opacity-50`}
          >
            {audioEnabled ? 'Audio On' : 'Audio Off'}
          </button>
          
          <button
            onClick={isConnected ? disconnectFromVoiceSystem : connectToVoiceSystem}
            disabled={isLoading}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${
              isConnected 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            } disabled:opacity-50`}
          >
            {isLoading ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Connected Agents ({connectedAgents.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {connectedAgents.length > 0 ? (
              connectedAgents.map(agent => (
                <span
                  key={agent}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  {agent}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">No other agents connected</span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Recent Messages ({messages.length})
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1 bg-gray-50 rounded-lg p-2">
            {messages.slice(-5).map(message => (
              <div key={message.id} className="text-xs">
                <span className="font-medium text-gray-700">
                  {message.fromAgent}
                </span>
                {message.toAgent && (
                  <span className="text-gray-500"> → {message.toAgent}</span>
                )}
                <span className="text-gray-600">: {message.content}</span>
                <span className="text-gray-400 ml-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-xs text-gray-500">No messages yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {isConnected && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => broadcastMessage(`Status update from ${agentName}`)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs hover:bg-blue-200"
            >
              Send Status
            </button>
            <button
              onClick={() => broadcastMessage(`${agentName} requesting assistance`)}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs hover:bg-yellow-200"
            >
              Request Help
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Hook for using agent voice communication
export function useAgentVoice(agentName: string, roomName?: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectedAgents, setConnectedAgents] = useState<string[]>([])
  const [messages, setMessages] = useState<AgentVoiceMessage[]>([])

  const sendMessage = useCallback(async (targetAgent: string | null, content: string) => {
    if (!isConnected) return false

    try {
      const message: AgentVoiceMessage = {
        id: Date.now().toString(),
        fromAgent: agentName,
        toAgent: targetAgent || undefined,
        content,
        timestamp: new Date()
      }

      await agentVoiceManager.sendMessage(message)
      setMessages(prev => [...prev, message])
      return true

    } catch (error) {
      console.error('Error sending message:', error)
      return false
    }
  }, [agentName, isConnected])

  const broadcastMessage = useCallback((content: string) => {
    return sendMessage(null, content)
  }, [sendMessage])

  const sendMessageToAgent = useCallback((targetAgent: string, content: string) => {
    return sendMessage(targetAgent, content)
  }, [sendMessage])

  return {
    isConnected,
    connectedAgents,
    messages,
    sendMessage: sendMessageToAgent,
    broadcastMessage
  }
}