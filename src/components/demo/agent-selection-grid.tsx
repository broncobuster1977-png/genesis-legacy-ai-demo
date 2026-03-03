'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Agent {
  id: string
  name: string
  role: string
  description: string
  color: string
  avatar: string
  status: 'available' | 'busy' | 'offline'
  specialties: string[]
}

interface SelectedAgent {
  id: string
  name: string
  role: string
  color: string
  avatar: string
}

interface AgentSelectionGridProps {
  onStartDemo: (agents: SelectedAgent[], roomName: string) => void
}

const AVAILABLE_AGENTS: Agent[] = [
  {
    id: 'jarvis',
    name: 'JARVIS',
    role: 'CEO / Strategic Director',
    description: 'Main presenter and strategic visionary. Coordinates all agents and presents high-level business strategy.',
    color: '#1B3A5C',
    avatar: '/images/agents/jarvis-avatar.png',
    status: 'available',
    specialties: ['Strategic Planning', 'Investor Relations', 'Team Coordination', 'Business Vision']
  },
  {
    id: 'atlas',
    name: 'ATLAS',
    role: 'Technical Director', 
    description: 'Technical implementation and architecture support. Handles all engineering demonstrations.',
    color: '#2E75B6',
    avatar: '/images/agents/atlas-avatar.png',
    status: 'available',
    specialties: ['System Architecture', 'Technical Implementation', 'Infrastructure', 'Development']
  },
  {
    id: 'demi-voss',
    name: 'DEMI VOSS',
    role: 'Creative Director',
    description: 'Design systems and visual strategy. Demonstrates user experience and interface design.',
    color: '#4A90E2',
    avatar: '/images/agents/demi-avatar.png',
    status: 'available',
    specialties: ['UI/UX Design', 'Brand Strategy', 'Design Systems', 'Visual Direction']
  },
  {
    id: 'sean-archer',
    name: 'SEAN ARCHER', 
    role: 'Legal Counsel',
    description: 'Legal strategy and compliance. Addresses regulatory concerns and legal framework.',
    color: '#6B7280',
    avatar: '/images/agents/sean-avatar.png',
    status: 'available',
    specialties: ['Legal Strategy', 'Compliance', 'Risk Management', 'Contracts']
  },
  {
    id: 'scout',
    name: 'SCOUT',
    role: 'Research & Intelligence',
    description: 'Market research and competitive analysis. Provides data-driven insights.',
    color: '#10B981',
    avatar: '/images/agents/scout-avatar.png',
    status: 'available',
    specialties: ['Market Research', 'Competitive Analysis', 'Data Intelligence', 'Insights']
  },
  {
    id: 'vic',
    name: 'VIC CHASE',
    role: 'Financial Director',
    description: 'Financial modeling and investment strategy. Handles financial projections and ROI.',
    color: '#F59E0B',
    avatar: '/images/agents/vic-avatar.png',
    status: 'available',
    specialties: ['Financial Modeling', 'Investment Strategy', 'ROI Analysis', 'Budgeting']
  },
  {
    id: 'penny-marsh',
    name: 'PENNY MARSH',
    role: 'Operations Director',
    description: 'Operational efficiency and process optimization. Manages day-to-day operations.',
    color: '#8B5CF6',
    avatar: '/images/agents/penny-avatar.png',
    status: 'available',
    specialties: ['Operations Management', 'Process Optimization', 'Efficiency', 'Quality Control']
  },
  {
    id: 'eddie-park',
    name: 'EDDIE PARK',
    role: 'Marketing Director',
    description: 'Marketing strategy and customer acquisition. Handles brand positioning and growth.',
    color: '#EF4444',
    avatar: '/images/agents/eddie-avatar.png',
    status: 'available',
    specialties: ['Marketing Strategy', 'Brand Positioning', 'Customer Acquisition', 'Growth']
  },
  {
    id: 'phoenix',
    name: 'PHOENIX',
    role: 'Recovery Specialist',
    description: 'System monitoring and recovery operations. Ensures platform stability and uptime.',
    color: '#DC2626',
    avatar: '/images/agents/phoenix-avatar.png',
    status: 'available',
    specialties: ['System Recovery', 'Monitoring', 'Incident Response', 'Platform Stability']
  }
]

export function AgentSelectionGrid({ onStartDemo }: AgentSelectionGridProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['jarvis', 'atlas']) // Default selection
  const [roomName, setRoomName] = useState('Investor-Demo-Room')
  const [presentationMode, setPresentationMode] = useState<'standard' | 'investor' | 'technical'>('investor')

  const toggleAgent = (agentId: string) => {
    if (agentId === 'jarvis') return // JARVIS is always required
    
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    )
  }

  const handleStartDemo = () => {
    const selectedAgentData = AVAILABLE_AGENTS
      .filter(agent => selectedAgents.includes(agent.id))
      .map(agent => ({
        id: agent.id,
        name: agent.name,
        role: agent.role,
        color: agent.color,
        avatar: agent.avatar
      }))
    
    onStartDemo(selectedAgentData, roomName)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500' 
      case 'offline': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Demo Configuration */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/50"
              placeholder="Enter room name"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Presentation Mode</label>
            <select
              value={presentationMode}
              onChange={(e) => setPresentationMode(e.target.value as any)}
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/50"
            >
              <option value="investor">Investor Pitch</option>
              <option value="technical">Technical Demo</option>
              <option value="standard">Standard Presentation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Selected Agents</label>
            <div className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white">
              {selectedAgents.length} / {AVAILABLE_AGENTS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Select Demo Agents</h2>
            <p className="text-blue-100">Choose agents to participate in your investor demonstration</p>
          </div>
          
          <div className="text-right">
            <div className="text-white text-sm">
              <span className="font-semibold">JARVIS</span> is the main presenter (required)
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_AGENTS.map((agent) => {
            const isSelected = selectedAgents.includes(agent.id)
            const isRequired = agent.id === 'jarvis'
            
            return (
              <div
                key={agent.id}
                onClick={() => !isRequired && toggleAgent(agent.id)}
                className={`
                  relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${isSelected 
                    ? 'bg-white/20 border-white/60 shadow-xl' 
                    : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40'
                  }
                  ${isRequired ? 'ring-2 ring-yellow-400 cursor-default' : ''}
                `}
              >
                {/* Selection Indicator */}
                <div className="absolute top-4 right-4">
                  {isSelected ? (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-white/40 rounded-full"></div>
                  )}
                </div>

                {/* Required Badge */}
                {isRequired && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                    REQUIRED
                  </div>
                )}

                {/* Agent Avatar */}
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                    style={{ backgroundColor: agent.color }}
                  >
                    {/* Fallback to first letter if no avatar image */}
                    <span className="text-white text-xl font-bold">
                      {agent.name.charAt(0)}
                    </span>
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-bold text-lg">{agent.name}</h3>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                    </div>
                    <p className="text-blue-100 text-sm font-medium">{agent.role}</p>
                  </div>
                </div>

                {/* Agent Description */}
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  {agent.description}
                </p>

                {/* Specialties */}
                <div className="space-y-2">
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wide">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-white/20 text-white/80 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Start Demo Button */}
      <div className="flex items-center justify-center pt-8">
        <button
          onClick={handleStartDemo}
          disabled={selectedAgents.length === 0 || !roomName.trim()}
          className="px-12 py-4 bg-gradient-to-r from-white to-blue-100 text-[#1B3A5C] font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Start Investor Demo
          <span className="ml-2">→</span>
        </button>
      </div>

      {/* Demo Info */}
      <div className="text-center text-white/60 text-sm">
        <p>Selected agents will join the LiveKit room for real-time voice and video interaction</p>
      </div>
    </div>
  )
}