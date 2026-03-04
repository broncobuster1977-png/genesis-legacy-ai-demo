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
      {/* Professional Configuration Header */}
      <div className="p-8 bg-gray-50 rounded-2xl border">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2E75B6] focus:border-transparent"
              placeholder="Enter room name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Presentation Mode</label>
            <select
              value={presentationMode}
              onChange={(e) => setPresentationMode(e.target.value as any)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E75B6] focus:border-transparent"
            >
              <option value="investor">Investor Pitch</option>
              <option value="technical">Technical Demo</option>
              <option value="standard">Standard Presentation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Selected Agents</label>
            <div className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium">
              {selectedAgents.length} / {AVAILABLE_AGENTS.length} agents selected
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Layout - Agents Left, Controls Right */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Agent Selection */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Demo Agents</h2>
                <p className="text-gray-600 text-lg">Choose agents to participate in your investor demonstration</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {AVAILABLE_AGENTS.map((agent) => {
                const isSelected = selectedAgents.includes(agent.id)
                const isRequired = agent.id === 'jarvis'
                
                return (
                  <div
                    key={agent.id}
                    onClick={() => !isRequired && toggleAgent(agent.id)}
                    className={`
                      relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg
                      ${isSelected 
                        ? 'bg-blue-50 border-[#2E75B6] shadow-md' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }
                      ${isRequired ? 'ring-2 ring-yellow-400 cursor-default' : ''}
                    `}
                  >
                    {/* Selection Indicator */}
                    <div className="absolute top-4 right-4">
                      {isSelected ? (
                        <div className="w-7 h-7 bg-[#2E75B6] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-7 h-7 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>

                    {/* Required Badge */}
                    {isRequired && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                        REQUIRED
                      </div>
                    )}

                    {/* Agent Avatar and Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                        style={{ backgroundColor: agent.color }}
                      >
                        <span className="text-white text-xl font-bold">
                          {agent.name.charAt(0)}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-gray-900 font-bold text-lg truncate">{agent.name}</h3>
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusColor(agent.status)}`}></div>
                        </div>
                        <p className="text-gray-600 text-sm font-medium">{agent.role}</p>
                      </div>
                    </div>

                    {/* Agent Description */}
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
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
        </div>

        {/* Right Sidebar - Demo Controls and Info */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Demo Summary */}
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Agents:</span>
                  <span className="font-semibold text-gray-900">{selectedAgents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium text-gray-900 text-sm truncate ml-2">{roomName || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium text-gray-900 capitalize">{presentationMode}</span>
                </div>
              </div>
            </div>

            {/* JARVIS Notice */}
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-yellow-600 mt-0.5">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800 mb-1">Main Presenter</h4>
                  <p className="text-sm text-yellow-700">JARVIS is the main presenter and is required for all demonstrations.</p>
                </div>
              </div>
            </div>

            {/* Start Demo Button */}
            <button
              onClick={handleStartDemo}
              disabled={selectedAgents.length === 0 || !roomName.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#1B3A5C] to-[#2E75B6] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:from-[#1B3A5C]/90 hover:to-[#2E75B6]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Start Demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Demo Info */}
            <div className="p-6 bg-gray-50 rounded-2xl border">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">About This Demo</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Selected agents will join the LiveKit room for real-time voice and video interaction with investors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}