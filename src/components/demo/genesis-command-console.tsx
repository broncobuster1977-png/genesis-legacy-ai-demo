'use client'

import { useState, useEffect, useRef } from 'react'
import { Room, RoomEvent, RemoteParticipant, LocalParticipant } from 'livekit-client'

interface Agent {
  id: string
  name: string
  role: string
  color: string
  status: 'active' | 'working' | 'offline'
}

interface Participant {
  id: string
  name: string
  email: string
  role: string
  isConnected: boolean
  audioEnabled: boolean
  videoEnabled: boolean
  isSpeaking: boolean
}

interface GenesisCommandConsoleProps {
  accessCode: string
}

const GENESIS_AGENTS: Agent[] = [
  { id: 'vic', name: 'VIC', role: 'Financial Systems', color: 'linear-gradient(135deg, #F59E0B, #D97706)', status: 'active' },
  { id: 'scout', name: 'SCOUT', role: 'Intelligence Hub', color: 'linear-gradient(135deg, #10B981, #059669)', status: 'active' },
  { id: 'demi', name: 'DEMI', role: 'Design Matrix', color: 'linear-gradient(135deg, #4A90E2, #2563EB)', status: 'active' },
  { id: 'penny', name: 'PENNY', role: 'Operations Core', color: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', status: 'working' },
  { id: 'atlas', name: 'ATLAS', role: 'Tech Infrastructure', color: 'linear-gradient(135deg, #2E75B6, #1D4ED8)', status: 'active' },
  { id: 'vchase', name: 'V.CHASE', role: 'Legal Framework', color: 'linear-gradient(135deg, #6B7280, #4B5563)', status: 'offline' },
  { id: 'eddie', name: 'EDDIE', role: 'Growth Engine', color: 'linear-gradient(135deg, #EF4444, #DC2626)', status: 'active' },
  { id: 'jarvis', name: 'JARVIS', role: 'Command Protocol', color: 'linear-gradient(135deg, #1B3A5C, #1E40AF)', status: 'active' },
  { id: 'phoenix', name: 'PHOENIX', role: 'Recovery Systems', color: 'linear-gradient(135deg, #DC2626, #B91C1C)', status: 'offline' }
]

const AUTHORIZED_PARTICIPANTS: Participant[] = [
  { 
    id: 'tyler', 
    name: 'Tyler Mason', 
    email: 'tyler@buildingwithar.com', 
    role: 'Founder', 
    isConnected: false, 
    audioEnabled: false, 
    videoEnabled: false, 
    isSpeaking: false 
  },
  { 
    id: 'amy', 
    name: 'Amy Mason', 
    email: 'AmyMason1997@gmail.com', 
    role: 'Operations', 
    isConnected: false, 
    audioEnabled: false, 
    videoEnabled: false, 
    isSpeaking: false 
  }
]

export function GenesisCommandConsole({ accessCode }: GenesisCommandConsoleProps) {
  const [room, setRoom] = useState<Room | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>(AUTHORIZED_PARTICIPANTS)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isPresentationMode, setIsPresentationMode] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, size: number, type: string}>>([])

  const roomRef = useRef<Room | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-connect to room on component mount
    connectToRoom()
    
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect()
      }
    }
  }, [])

  const connectToRoom = async () => {
    try {
      setIsConnecting(true)

      // Get LiveKit token
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roomName: `genesis-${accessCode}`,
          participantName: 'Command-Console',
          metadata: { role: 'host', type: 'command_console' }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get LiveKit token')
      }

      const { token, serverUrl } = await response.json()

      // Create and connect room
      const newRoom = new Room()
      roomRef.current = newRoom
      setRoom(newRoom)

      // Setup event listeners
      setupRoomEvents(newRoom)

      // Connect to room
      await newRoom.connect(serverUrl, token)
      setIsConnected(true)
      
      // Add welcome message
      addChatMessage('GENESIS', 'Command Console initialized. All systems operational.')

    } catch (err) {
      console.error('LiveKit connection error:', err)
      addChatMessage('ERROR', 'Failed to establish connection to Genesis network.')
    } finally {
      setIsConnecting(false)
    }
  }

  const setupRoomEvents = (room: Room) => {
    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      addChatMessage('SYSTEM', `${participant.identity} connected to Genesis network`)
      updateParticipantStatus(participant.identity, true)
    })

    room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      addChatMessage('SYSTEM', `${participant.identity} disconnected from Genesis network`)
      updateParticipantStatus(participant.identity, false)
    })

    room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant) => {
      try {
        const message = JSON.parse(new TextDecoder().decode(payload))
        if (message.type === 'chat') {
          addChatMessage(participant?.identity || 'Unknown', message.content)
        }
      } catch (e) {
        console.error('Error parsing data message:', e)
      }
    })
  }

  const updateParticipantStatus = (participantId: string, isConnected: boolean) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, isConnected } : p
    ))
  }

  const addChatMessage = (sender: string, message: string) => {
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender,
      message,
      timestamp: new Date()
    }])
  }

  const sendChatMessage = () => {
    if (!currentMessage.trim() || !room) return

    const message = {
      type: 'chat',
      content: currentMessage,
      sender: 'Command Console'
    }

    room.localParticipant.publishData(new TextEncoder().encode(JSON.stringify(message)))
    addChatMessage('CONSOLE', currentMessage)
    setCurrentMessage('')
  }

  const toggleScreenShare = async () => {
    if (!room) return

    try {
      if (!isScreenSharing) {
        await room.localParticipant.setScreenShareEnabled(true)
        setIsScreenSharing(true)
        addChatMessage('SYSTEM', 'Screen sharing initiated')
      } else {
        await room.localParticipant.setScreenShareEnabled(false)
        setIsScreenSharing(false)
        addChatMessage('SYSTEM', 'Screen sharing terminated')
      }
    } catch (err) {
      console.error('Screen share error:', err)
      addChatMessage('ERROR', 'Screen sharing failed')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const newFiles = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    addChatMessage('SYSTEM', `${files.length} file(s) uploaded to Genesis network`)
  }

  const initializePresentationProtocol = () => {
    setIsPresentationMode(true)
    addChatMessage('GENESIS', 'Presentation Protocol activated. All systems focused.')
  }

  return (
    <div className="h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C]/10 via-transparent to-[#2E75B6]/10"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 grid grid-cols-[220px_1fr_220px] grid-rows-[80px_1fr] h-full gap-4 p-4">
        
        {/* Header - Full Width */}
        <div className="col-span-3 bg-gradient-to-r from-[#1e293b]/90 to-[#334155]/80 border-2 border-[#3b82f6]/30 rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z"/>
                <circle cx="35" cy="35" r="3"/>
                <circle cx="50" cy="30" r="3"/>
                <circle cx="65" cy="35" r="3"/>
                <circle cx="40" cy="50" r="3"/>
                <circle cx="60" cy="50" r="3"/>
                <circle cx="50" cy="65" r="3"/>
                <path d="M35 35L50 30M50 30L65 35M35 35L40 50M65 35L60 50M40 50L50 65M60 50L50 65M40 50L60 50" strokeWidth="2" opacity="0.8"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>GENESIS LEGACY AI</h1>
              <p className="text-[#64b5f6] text-sm uppercase tracking-wide">Command Console</p>
            </div>
          </div>
          <div className="bg-[#0f172a]/60 px-4 py-2 rounded-lg border border-[#10b981]/40">
            <span className="text-[#10b981] font-mono text-sm font-bold">{accessCode}</span>
          </div>
        </div>

        {/* Left Sidebar - AI Agents */}
        <div className="bg-gradient-to-b from-[#1e293b]/90 to-[#334155]/80 border-2 border-[#3b82f6]/30 rounded-2xl p-4 backdrop-blur-xl overflow-y-auto">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
            AI COUNCIL
          </h3>
          <div className="space-y-3">
            {GENESIS_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className={`
                  bg-gradient-to-r from-[#334155]/60 to-[#475569]/50 border-2 rounded-xl p-3 cursor-pointer transition-all
                  ${agent.status === 'active' ? 'border-[#10b981]/50 shadow-lg shadow-[#10b981]/20' : ''}
                  ${agent.status === 'working' ? 'border-[#f59e0b]/50 shadow-lg shadow-[#f59e0b]/20' : ''}
                  ${agent.status === 'offline' ? 'border-[#64748b]/30' : ''}
                  ${selectedAgent === agent.id ? 'ring-2 ring-[#3b82f6]' : ''}
                `}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: agent.color }}
                  >
                    {agent.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold" style={{ fontFamily: 'Orbitron, monospace' }}>{agent.name}</div>
                    <div className="text-xs text-[#64b5f6] truncate">{agent.role}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    agent.status === 'active' ? 'bg-[#10b981] animate-pulse' :
                    agent.status === 'working' ? 'bg-[#f59e0b] animate-pulse' :
                    'bg-[#64748b]'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Command Area */}
        <div className="bg-gradient-to-br from-[#1e293b]/95 to-[#334155]/85 border-3 border-[#3b82f6]/40 rounded-3xl p-6 backdrop-blur-xl flex flex-col">
          
          {/* Genesis Core */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-2xl flex items-center justify-center mb-3 shadow-2xl animate-pulse">
              <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z"/>
                <circle cx="35" cy="35" r="3"/>
                <circle cx="50" cy="30" r="3"/>
                <circle cx="65" cy="35" r="3"/>
                <circle cx="40" cy="50" r="3"/>
                <circle cx="60" cy="50" r="3"/>
                <circle cx="50" cy="65" r="3"/>
                <path d="M35 35L50 30M50 30L65 35M35 35L40 50M65 35L60 50M40 50L50 65M60 50L50 65M40 50L60 50" strokeWidth="2" opacity="0.8"/>
              </svg>
            </div>
            <h2 className="text-lg font-bold text-[#3b82f6] uppercase tracking-wider" style={{ fontFamily: 'Orbitron, monospace' }}>
              Genesis Command
            </h2>
          </div>

          {/* Command Modules Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6 flex-1">
            <div 
              className="bg-[#334155]/60 border border-[#3b82f6]/30 rounded-xl p-3 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center"
              onClick={() => toggleScreenShare()}
            >
              <div className="text-2xl mb-2">📡</div>
              <div className="text-xs font-bold uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Data Stream</div>
              <div className="text-xs text-gray-400">Screen Share</div>
            </div>
            
            <div 
              className="bg-[#334155]/60 border border-[#3b82f6]/30 rounded-xl p-3 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-2xl mb-2">📁</div>
              <div className="text-xs font-bold uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>File Matrix</div>
              <div className="text-xs text-gray-400">Upload Files</div>
            </div>
            
            <div className="bg-[#334155]/60 border border-[#3b82f6]/30 rounded-xl p-3 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-xs font-bold uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Quantum Chat</div>
              <div className="text-xs text-gray-400">{chatMessages.length} msgs</div>
            </div>
            
            <div className="bg-[#334155]/60 border border-[#3b82f6]/30 rounded-xl p-3 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center">
              <div className="text-2xl mb-2">🧠</div>
              <div className="text-xs font-bold uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>AI Processing</div>
              <div className="text-xs text-gray-400">Functions</div>
            </div>
            
            <div className="bg-[#334155]/60 border border-[#3b82f6]/30 rounded-xl p-3 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-xs font-bold uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Mission Board</div>
              <div className="text-xs text-gray-400">Whiteboard</div>
            </div>
            
            <div className="bg-[#334155]/60 border border-[#3b82f6]/30 rounded-xl p-3 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-xs font-bold uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Analytics</div>
              <div className="text-xs text-gray-400">Metrics</div>
            </div>
          </div>

          {/* Presentation Button */}
          <button
            onClick={initializePresentationProtocol}
            className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${
              isPresentationMode 
                ? 'bg-[#dc2626] text-white border-2 border-[#dc2626]' 
                : 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white border-2 border-[#10b981]/60 hover:shadow-lg hover:shadow-[#10b981]/40'
            }`}
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {isPresentationMode ? '🔴 PRESENTATION ACTIVE' : '🚀 Initialize Protocol'}
          </button>
        </div>

        {/* Right Sidebar - Guests */}
        <div className="bg-gradient-to-b from-[#334155]/90 to-[#475569]/80 border-2 border-[#3b82f6]/30 rounded-2xl p-4 backdrop-blur-xl">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
            Guest Access
          </h3>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`
                  bg-gradient-to-r from-[#475569]/60 to-[#64748b]/50 border-2 rounded-xl p-3 transition-all
                  ${participant.isConnected ? 'border-[#3b82f6]/50 shadow-lg shadow-[#3b82f6]/20' : 'border-[#64748b]/30'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    participant.isConnected ? 'bg-gradient-to-br from-[#3b82f6] to-[#2563eb]' : 'bg-gradient-to-br from-[#64748b] to-[#475569]'
                  }`}>
                    {participant.name.split(' ').map(n => n.charAt(0)).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-bold ${participant.isConnected ? 'text-white' : 'text-gray-400'}`}>
                      {participant.name}
                    </div>
                    <div className="text-xs text-[#64b5f6] truncate">{participant.role}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    participant.isConnected ? 'bg-[#3b82f6] animate-pulse' : 'bg-[#64748b]'
                  }`}></div>
                </div>
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`empty-${index}`} className="bg-[#475569]/30 border-2 border-dashed border-[#64748b]/30 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#64748b]/30 flex items-center justify-center">
                    <span className="text-[#64748b] text-sm">--</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#64748b]">Terminal Open</div>
                    <div className="text-xs text-[#64748b]/60">Awaiting Connection</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        className="hidden"
      />

      {/* Connection Status Overlay */}
      {isConnecting && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-[#1e293b] border-2 border-[#3b82f6]/50 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 border-4 border-[#3b82f6]/30 border-t-[#3b82f6] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl font-semibold">Initializing Genesis Network</p>
            <p className="text-[#64b5f6]">Establishing secure connection...</p>
          </div>
        </div>
      )}
    </div>
  )
}