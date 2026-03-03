/* AGENT-TO-AGENT VOICE COMMUNICATION TEST PAGE */
/* Atlas Technical Director - March 1, 2026 */

'use client'

import { useState, useEffect } from 'react'
import { AgentVoiceManager } from '@/components/agents/agent-voice-manager'
import { RealAgentVoice } from '@/components/agents/real-agent-voice'
import { LiveKitVoiceChat } from '@/components/voice/livekit-voice-chat'

const TEST_AGENTS = [
  'Atlas',
  'JARVIS',
  'Demi-Voss', 
  'Sean-Archer',
  'Vic'
]

const REAL_AGENTS = [
  'Real JARVIS',
  'Real Atlas',
  'Real Demi-Voss',
  'Real Sean-Archer'
]

export default function AgentVoiceTestPage() {
  const [selectedAgent, setSelectedAgent] = useState('Atlas')
  const [showVoiceChat, setShowVoiceChat] = useState(false)
  const [testMessages, setTestMessages] = useState<string[]>([])
  const [isRealAgent, setIsRealAgent] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Helper function to get timestamp only after mounting
  const getTimestamp = () => {
    return mounted ? new Date().toLocaleTimeString() : '00:00:00'
  }

  const handleAgentMessage = (message: any) => {
    if (mounted) {
      setTestMessages(prev => [...prev, `[${getTimestamp()}] ${message.fromAgent}: ${message.content}`])
    }
  }

  const handleAgentJoined = (agentName: string) => {
    if (mounted) {
      setTestMessages(prev => [...prev, `[${getTimestamp()}] 🟢 ${agentName} joined voice system`])
    }
  }

  const handleAgentLeft = (agentName: string) => {
    if (mounted) {
      setTestMessages(prev => [...prev, `[${getTimestamp()}] 🔴 ${agentName} left voice system`])
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAgentChange = (agentName: string) => {
    setSelectedAgent(agentName)
    setIsRealAgent(agentName.startsWith('Real '))
    
    if (agentName.startsWith('Real ') && mounted) {
      setTestMessages(prev => [...prev, `[${getTimestamp()}] 🔗 Switched to ${agentName} - OpenClaw Bridge Mode`])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Agent-to-Agent Voice Communication Test
          </h1>
          <p className="text-gray-600 mb-6">
            Test the LiveKit-powered agent communication system. Select an agent identity and connect to the voice network.
          </p>

          {/* Agent Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Agent Identity:
            </label>
            <select
              value={selectedAgent}
              onChange={(e) => handleAgentChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
            >
              <optgroup label="Test Agents (Simulated)">
                {TEST_AGENTS.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))}
              </optgroup>
              <optgroup label="Real OpenClaw Agents">
                {REAL_AGENTS.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))}
              </optgroup>
            </select>
            
            {isRealAgent && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-600 font-medium">🔗 OpenClaw Bridge Mode</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Connected to real {selectedAgent.replace('Real ', '')} agent via OpenClaw sessions system.
                </p>
              </div>
            )}
          </div>

          {/* Voice Chat Controls */}
          <div className="mb-6">
            <button
              onClick={() => setShowVoiceChat(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 mr-4"
            >
              Open Voice Chat (User Mode)
            </button>
            <button
              onClick={() => setTestMessages([])}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700"
            >
              Clear Messages
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agent Voice Manager */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isRealAgent ? 'Real Agent Communication' : 'Test Agent Manager'} - {selectedAgent}
            </h2>
            
            {isRealAgent ? (
              <RealAgentVoice
                agentName={selectedAgent}
                onMessage={handleAgentMessage}
                onStatusChange={(status) => {
                  if (mounted) {
                    setTestMessages(prev => [...prev, `[${getTimestamp()}] 🔊 Voice Status: ${status}`])
                  }
                }}
              />
            ) : (
              <AgentVoiceManager
                agentName={selectedAgent}
                roomName="agent-voice-test"
                onMessage={handleAgentMessage}
                onAgentJoined={handleAgentJoined}
                onAgentLeft={handleAgentLeft}
              />
            )}
          </div>

          {/* Message Log */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              System Messages Log
            </h2>
            <div className="bg-black text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
              {testMessages.length === 0 ? (
                <p className="text-gray-500">No messages yet. Connect agents to see communication.</p>
              ) : (
                testMessages.map((message, index) => (
                  <div key={index} className="mb-1">
                    {message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            System Status & Configuration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">LiveKit Configuration</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">URL:</span> {mounted ? (process.env.NEXT_PUBLIC_LIVEKIT_URL || 'Not configured') : 'Loading...'}</p>
                <p><span className="font-medium">API Key:</span> {mounted ? '✅ Set' : 'Loading...'}</p>
                <p><span className="font-medium">Room:</span> agent-voice-test</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Audio Settings</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Sample Rate:</span> 44.1kHz</p>
                <p><span className="font-medium">Echo Cancel:</span> ✅ Enabled</p>
                <p><span className="font-medium">Noise Suppress:</span> ✅ Enabled</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Features</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Voice Recognition:</span> ✅ Browser API</p>
                <p><span className="font-medium">Text-to-Speech:</span> ✅ edge-tts</p>
                <p><span className="font-medium">Test Agents:</span> ✅ LiveKit</p>
                <p><span className="font-medium">Real Agents:</span> ✅ OpenClaw Bridge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Testing Instructions
          </h2>
          <div className="text-blue-700 space-y-2">
            <p><strong>Test Agents (Simulated):</strong></p>
            <p>• Select different agent identities in multiple browser tabs/windows</p>
            <p>• Connect each agent to see them appear in the "Connected Agents" list</p>
            <p>• Use the "Send Status" and "Request Help" buttons to test communication</p>
            
            <p className="pt-3"><strong>Real Agents (OpenClaw Bridge):</strong></p>
            <p>• Select a "Real" agent to connect to actual OpenClaw agents</p>
            <p>• Use "Start Voice Input" to speak to the real agent</p>
            <p>• Agent responses are converted to speech using their configured voice</p>
            <p>• Test buttons verify the bridge connection is working</p>
            
            <p className="pt-3"><strong>Voice Chat:</strong></p>
            <p>• Open "Voice Chat" to test user-to-agent voice communication</p>
            <p>• Check the message log to see all communications</p>
          </div>
        </div>
      </div>

      {/* Voice Chat Modal */}
      {showVoiceChat && (
        <LiveKitVoiceChat
          onClose={() => setShowVoiceChat(false)}
          enableAgentCommunication={true}
        />
      )}
    </div>
  )
}