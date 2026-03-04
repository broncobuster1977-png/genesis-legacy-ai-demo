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
      <main className="pt-16 min-h-screen bg-white">
        {/* Professional Header - OpenAI Style */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 100 100" fill="currentColor">
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
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Genesis Legacy AI</h1>
                  <p className="text-lg text-gray-600 font-medium">Investor Demo Platform</p>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full border">
                  <div className={`w-3 h-3 rounded-full mr-2 ${demoMode === 'room' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <span className="text-gray-700 font-medium text-sm">
                    {demoMode === 'room' ? 'Demo Active' : 'Demo Setup'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Content - Professional Layout */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {isLoading && (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#2E75B6] rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Initializing Demo Room</h2>
                <p className="text-gray-600">Connecting agents and setting up LiveKit platform</p>
              </div>
            </div>
          )}

          {!isLoading && demoMode === 'selection' && (
            <AgentSelectionGrid onStartDemo={handleStartDemo} />
          )}

          {!isLoading && demoMode === 'room' && (
            <div className="space-y-8">
              {/* Room Controls */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToSelection}
                    className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Setup</span>
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Room: {roomName}</h2>
                    <p className="text-gray-600">{selectedAgents.length} agents connected</p>
                  </div>
                </div>
                <DemoControls selectedAgents={selectedAgents} />
              </div>
              
              {/* LiveKit Demo Room */}
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