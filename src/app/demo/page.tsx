'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AgentSelectionGrid } from '@/components/demo/agent-selection-grid'
import { LiveKitDemoRoom } from '@/components/demo/livekit-demo-room'
import { DemoControls } from '@/components/demo/demo-controls'

interface SelectedAgent {
  id: string
  name: string
  role: string
  color: string
  avatar: string
}

export default function DemoPage() {
  const [demoMode, setDemoMode] = useState<'selection' | 'room'>('selection')
  const [selectedAgents, setSelectedAgents] = useState<SelectedAgent[]>([])
  const [roomName, setRoomName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStartDemo = async (agents: SelectedAgent[], roomName: string) => {
    setIsLoading(true)
    setSelectedAgents(agents)
    setRoomName(roomName)
    
    // Simulate room setup
    setTimeout(() => {
      setDemoMode('room')
      setIsLoading(false)
    }, 2000)
  }

  const handleBackToSelection = () => {
    setDemoMode('selection')
    setSelectedAgents([])
    setRoomName('')
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6]">
        {/* Demo Header */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-blue-100 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-[#1B3A5C]" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z" fill="none" stroke="currentColor" strokeWidth="3"></path>
                      <circle cx="35" cy="35" r="3"></circle>
                      <circle cx="50" cy="30" r="3"></circle>
                      <circle cx="65" cy="35" r="3"></circle>
                      <circle cx="40" cy="50" r="3"></circle>
                      <circle cx="60" cy="50" r="3"></circle>
                      <circle cx="50" cy="65" r="3"></circle>
                      <path d="M35 35L50 30M50 30L65 35M35 35L40 50M65 35L60 50M40 50L50 65M60 50L50 65M40 50L60 50" stroke="currentColor" strokeWidth="2" opacity="0.8"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Genesis Legacy AI</h1>
                    <p className="text-blue-100 text-lg">Investor Demo Platform</p>
                  </div>
                </div>
              </div>
              
              {/* Demo Status */}
              <div className="text-right">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <div className={`w-2 h-2 rounded-full mr-3 ${demoMode === 'room' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-white font-medium">
                    {demoMode === 'room' ? 'Live Demo Active' : 'Demo Setup'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {isLoading && (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-xl">Initializing Demo Room...</p>
                <p className="text-blue-100">Connecting agents and setting up LiveKit</p>
              </div>
            </div>
          )}

          {!isLoading && demoMode === 'selection' && (
            <AgentSelectionGrid onStartDemo={handleStartDemo} />
          )}

          {!isLoading && demoMode === 'room' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToSelection}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  >
                    ← Back to Setup
                  </button>
                  <div className="text-white">
                    <h2 className="text-xl font-semibold">Room: {roomName}</h2>
                    <p className="text-blue-100">{selectedAgents.length} agents connected</p>
                  </div>
                </div>
                <DemoControls selectedAgents={selectedAgents} />
              </div>
              
              <LiveKitDemoRoom 
                roomName={roomName}
                selectedAgents={selectedAgents}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}