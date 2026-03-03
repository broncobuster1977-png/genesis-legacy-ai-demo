'use client'

import { useState, useEffect } from 'react'

interface SelectedAgent {
  id: string
  name: string
  role: string
  color: string
  avatar: string
}

interface DemoControlsProps {
  selectedAgents: SelectedAgent[]
}

interface DemoScenario {
  id: string
  name: string
  description: string
  duration: string
  agents: string[]
  actions: string[]
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'investor-pitch',
    name: 'Investor Pitch',
    description: 'Full investor presentation with financial projections and growth strategy',
    duration: '15 min',
    agents: ['jarvis', 'vic', 'atlas'],
    actions: ['Open pitch deck', 'Show financials', 'Demo platform', 'Q&A session']
  },
  {
    id: 'technical-overview',
    name: 'Technical Overview',
    description: 'Deep dive into platform architecture and AI capabilities',
    duration: '20 min', 
    agents: ['atlas', 'jarvis', 'phoenix'],
    actions: ['System architecture', 'Live code review', 'Performance metrics', 'Security demo']
  },
  {
    id: 'design-showcase',
    name: 'Design Showcase',
    description: 'User experience and interface design demonstration',
    duration: '12 min',
    agents: ['demi-voss', 'jarvis', 'scout'],
    actions: ['Design system demo', 'User research', 'Interface walkthrough', 'Feedback loop']
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    description: 'Regulatory framework and legal strategy presentation',
    duration: '10 min',
    agents: ['sean-archer', 'jarvis'],
    actions: ['Regulatory overview', 'Privacy policies', 'Terms of service', 'Risk mitigation']
  }
]

export function DemoControls({ selectedAgents }: DemoControlsProps) {
  const [currentScenario, setCurrentScenario] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [chatMessages, setChatMessages] = useState<Array<{ agent: string; message: string; timestamp: Date }>>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } else {
      setRecordingDuration(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  const startScenario = (scenarioId: string) => {
    setCurrentScenario(scenarioId)
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId)
    if (scenario) {
      // Simulate agent activation
      setChatMessages(prev => [...prev, {
        agent: 'JARVIS',
        message: `Starting ${scenario.name} scenario. Coordinating with team...`,
        timestamp: new Date()
      }])
    }
  }

  const stopScenario = () => {
    setCurrentScenario(null)
    setChatMessages(prev => [...prev, {
      agent: 'JARVIS',
      message: 'Scenario complete. Ready for next demonstration.',
      timestamp: new Date()
    }])
  }

  const toggleRecording = () => {
    setIsRecording(prev => !prev)
    if (!isRecording) {
      setChatMessages(prev => [...prev, {
        agent: 'System',
        message: 'Recording started. All interactions are being captured.',
        timestamp: new Date()
      }])
    } else {
      setChatMessages(prev => [...prev, {
        agent: 'System',
        message: `Recording stopped. Duration: ${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, '0')}`,
        timestamp: new Date()
      }])
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    setChatMessages(prev => [...prev, {
      agent: 'Host',
      message: newMessage,
      timestamp: new Date()
    }])
    setNewMessage('')
    
    // Simulate agent response
    setTimeout(() => {
      const availableAgents = selectedAgents.filter(agent => agent.id !== 'phoenix')
      const randomAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)]
      
      setChatMessages(prev => [...prev, {
        agent: randomAgent.name,
        message: `Understood. I'll address that in my presentation segment.`,
        timestamp: new Date()
      }])
    }, 1500)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Demo Scenarios */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Demo Scenarios</h3>
          <div className="space-y-3">
            {DEMO_SCENARIOS.map((scenario) => {
              const canRun = scenario.agents.every(agentId => 
                selectedAgents.some(selected => selected.id === agentId)
              )
              const isActive = currentScenario === scenario.id

              return (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-green-500/20 border-green-400' 
                      : canRun
                        ? 'bg-white/10 border-white/20 hover:bg-white/20'
                        : 'bg-gray-500/10 border-gray-500/20 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (canRun && !isActive) {
                      startScenario(scenario.id)
                    } else if (isActive) {
                      stopScenario()
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{scenario.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/60 text-xs">{scenario.duration}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-white/70 text-xs mb-2">{scenario.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {scenario.agents.map(agentId => {
                      const agent = selectedAgents.find(a => a.id === agentId)
                      return (
                        <span
                          key={agentId}
                          className={`px-2 py-1 text-xs rounded-full ${
                            agent 
                              ? 'bg-blue-500/20 text-blue-200' 
                              : 'bg-red-500/20 text-red-200'
                          }`}
                        >
                          {agent?.name || agentId.toUpperCase()}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recording & Controls */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Recording Controls</h3>
          <div className="space-y-4">
            {/* Recording Status */}
            <div className={`p-4 rounded-lg border ${
              isRecording 
                ? 'bg-red-500/20 border-red-400' 
                : 'bg-white/10 border-white/20'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">
                  {isRecording ? 'Recording' : 'Standby'}
                </span>
                {isRecording && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-mono text-sm">
                      {formatTime(recordingDuration)}
                    </span>
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleRecording}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="text-white/80 text-sm font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                  Mute All
                </button>
                <button className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                  Video Off
                </button>
                <button className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                  Share Screen
                </button>
                <button className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                  Full Screen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Chat */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Agent Communication</h3>
          <div className="bg-white/5 rounded-lg p-3 h-64 overflow-y-auto mb-3">
            <div className="space-y-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-blue-200 font-medium">{msg.agent}:</span>
                    <span className="text-white/40 text-xs">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white/80 ml-2">{msg.message}</p>
                </div>
              ))}
              {chatMessages.length === 0 && (
                <p className="text-white/40 text-center text-sm">
                  No messages yet. Start a scenario to see agent coordination.
                </p>
              )}
            </div>
          </div>
          
          {/* Message Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Send message to agents..."
              className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/50"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}