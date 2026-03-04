'use client'

import { useState, useEffect, useRef } from 'react'
import { Room, RoomEvent, RemoteParticipant, Track } from 'livekit-client'

interface SelectedAgent {
  id: string
  name: string
  role: string
  color: string
  avatar: string
}

interface LiveKitDemoRoomProps {
  roomName: string
  selectedAgents: SelectedAgent[]
}

interface ParticipantView {
  id: string
  name: string
  role?: string
  color?: string
  isAgent: boolean
  audioEnabled: boolean
  videoEnabled: boolean
  isSpeaking: boolean
  videoElement?: HTMLVideoElement
}

export function LiveKitDemoRoom({ roomName, selectedAgents }: LiveKitDemoRoomProps) {
  const [room, setRoom] = useState<Room | null>(null)
  const [participants, setParticipants] = useState<ParticipantView[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null)
  const [screenSharing, setScreenSharing] = useState(false)
  const [roomStats, setRoomStats] = useState({
    participants: 0,
    agents: 0,
    duration: '00:00'
  })

  const roomRef = useRef<Room | null>(null)
  const startTimeRef = useRef<Date | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize LiveKit connection
  useEffect(() => {
    connectToRoom()
    
    return () => {
      cleanup()
    }
  }, [roomName])

  // Update room stats
  useEffect(() => {
    if (isConnected && !intervalRef.current) {
      intervalRef.current = setInterval(updateRoomStats, 1000)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isConnected])

  const connectToRoom = async () => {
    try {
      setIsConnecting(true)
      setError(null)

      // Get LiveKit token
      const response = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roomName,
          participantName: 'Demo-Host',
          metadata: { role: 'host', type: 'human' }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get LiveKit token')
      }

      const { token, wsURL } = await response.json()

      // Create and connect room
      const newRoom = new Room()
      roomRef.current = newRoom
      setRoom(newRoom)

      // Setup event listeners
      setupRoomEvents(newRoom)

      // Connect to room
      await newRoom.connect(wsURL, token)
      setIsConnected(true)
      startTimeRef.current = new Date()

      // Simulate agent connections
      setTimeout(() => simulateAgentConnections(), 2000)

    } catch (err) {
      console.error('LiveKit connection error:', err)
      setError(err instanceof Error ? err.message : 'Connection failed')
    } finally {
      setIsConnecting(false)
    }
  }

  const setupRoomEvents = (room: Room) => {
    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      console.log('Participant connected:', participant.identity)
      updateParticipants()
    })

    room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      console.log('Participant disconnected:', participant.identity)
      updateParticipants()
    })

    room.on(RoomEvent.TrackSubscribed, (track: Track, publication: any, participant: RemoteParticipant) => {
      if (track.kind === Track.Kind.Video) {
        const videoElement = track.attach() as HTMLVideoElement
        updateParticipantVideo(participant.identity, videoElement)
      }
    })

    room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
      const speakerId = speakers.length > 0 ? speakers[0].identity : null
      setCurrentSpeaker(speakerId)
    })
  }

  const updateParticipants = () => {
    if (!roomRef.current) return

    const roomParticipants = Array.from(roomRef.current.remoteParticipants.values())
    const localParticipant = roomRef.current.localParticipant

    const allParticipants: ParticipantView[] = [
      // Local participant (demo host)
      {
        id: localParticipant.identity,
        name: 'Demo Host',
        role: 'Presenter',
        color: '#1B3A5C',
        isAgent: false,
        audioEnabled: localParticipant.isMicrophoneEnabled,
        videoEnabled: localParticipant.isCameraEnabled,
        isSpeaking: false
      },
      // Remote participants (agents)
      ...roomParticipants.map(participant => {
        const agent = selectedAgents.find(a => a.id === participant.identity)
        return {
          id: participant.identity,
          name: agent?.name || participant.identity,
          role: agent?.role,
          color: agent?.color || '#6B7280',
          isAgent: true,
          audioEnabled: participant.isMicrophoneEnabled,
          videoEnabled: participant.isCameraEnabled,
          isSpeaking: currentSpeaker === participant.identity
        }
      })
    ]

    setParticipants(allParticipants)
    
    // Update stats
    setRoomStats(prev => ({
      ...prev,
      participants: allParticipants.length,
      agents: allParticipants.filter(p => p.isAgent).length
    }))
  }

  const updateParticipantVideo = (participantId: string, videoElement: HTMLVideoElement) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? { ...p, videoElement }
        : p
    ))
  }

  const simulateAgentConnections = () => {
    // Simulate agents joining the room
    selectedAgents.forEach((agent, index) => {
      setTimeout(() => {
        console.log(`Agent ${agent.name} joining room...`)
        // In a real implementation, this would trigger agent connection
      }, index * 1000)
    })
  }

  const updateRoomStats = () => {
    if (!startTimeRef.current) return

    const elapsed = Date.now() - startTimeRef.current.getTime()
    const minutes = Math.floor(elapsed / 60000)
    const seconds = Math.floor((elapsed % 60000) / 1000)
    const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    setRoomStats(prev => ({ ...prev, duration }))
  }

  const toggleScreenShare = async () => {
    if (!room) return

    try {
      if (!screenSharing) {
        await room.localParticipant.setScreenShareEnabled(true)
        setScreenSharing(true)
      } else {
        await room.localParticipant.setScreenShareEnabled(false)
        setScreenSharing(false)
      }
    } catch (err) {
      console.error('Screen share error:', err)
    }
  }

  const cleanup = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    if (roomRef.current) {
      roomRef.current.disconnect()
      roomRef.current = null
    }
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 text-center">
        <div className="text-red-400 text-xl font-semibold mb-2">Connection Error</div>
        <p className="text-white/80 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-white text-xl font-semibold mb-2">Connecting to Demo Room</h3>
          <p className="text-blue-100">Setting up LiveKit connection and initializing agents...</p>
        </div>
      </div>
    )
  }

  // All agents from your sketch (expanded to match all agents)
  const allAgents = [
    { id: 'vic', name: 'VIC', role: 'Financial Director', color: '#F59E0B' },
    { id: 'scout', name: 'SCOUT', role: 'Research & Intelligence', color: '#10B981' },
    { id: 'demi-voss', name: 'DEMI', role: 'Creative Director', color: '#4A90E2' },
    { id: 'penny-marsh', name: 'PENNY', role: 'Operations Director', color: '#8B5CF6' },
    { id: 'atlas', name: 'ATLAS', role: 'Technical Director', color: '#2E75B6' },
    { id: 'sean-archer', name: 'V.CHASE', role: 'Legal Counsel', color: '#6B7280' },
    { id: 'eddie-park', name: 'EDDIE', role: 'Marketing Director', color: '#EF4444' },
    { id: 'jarvis', name: 'JARVIS', role: 'CEO / Strategic Director', color: '#1B3A5C' },
    { id: 'phoenix', name: 'PHOENIX', role: 'Recovery Specialist', color: '#DC2626' }
  ]

  const agentParticipants = participants.filter(p => p.isAgent)
  const guestParticipants = participants.filter(p => !p.isAgent)

  return (
    <div className="space-y-6">
      {/* Room Stats Bar */}
      <div className="p-4 bg-gray-50 rounded-2xl border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-900 font-medium">Live Demo</span>
            </div>
            <div className="text-gray-600">
              Duration: <span className="font-mono font-semibold text-gray-900">{roomStats.duration}</span>
            </div>
            <div className="text-gray-600">
              Total Participants: <span className="font-semibold text-gray-900">{roomStats.participants}</span>
            </div>
            <div className="text-gray-600">
              Active Agents: <span className="font-semibold text-gray-900">{roomStats.agents}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleScreenShare}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                screenSharing 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {screenSharing ? 'Stop Sharing' : 'Share Screen'}
            </button>
          </div>
        </div>
      </div>

      {/* YOUR SKETCH LAYOUT - Top: Agent Lineup */}
      <div className="p-6 bg-white rounded-2xl border shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Agent Lineup</h3>
          <p className="text-gray-600 text-sm">Genesis Legacy AI Agent Council</p>
        </div>
        
        <div className="grid grid-cols-4 lg:grid-cols-7 xl:grid-cols-9 gap-4">
          {allAgents.map((agent) => {
            const isSelected = selectedAgents.some(sa => sa.id === agent.id)
            const isConnected = agentParticipants.some(ap => ap.id === agent.id)
            const isSpeaking = currentSpeaker === agent.id
            
            return (
              <div
                key={agent.id}
                className={`
                  relative p-4 rounded-2xl border-2 transition-all duration-300
                  ${isConnected 
                    ? 'bg-green-50 border-green-300 shadow-sm' 
                    : isSelected 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-gray-50 border-gray-200'
                  }
                  ${isSpeaking ? 'ring-2 ring-green-400 shadow-lg' : ''}
                `}
              >
                {/* Status Indicator */}
                <div className="absolute top-2 right-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isConnected ? 'bg-green-500' : 
                    isSelected ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                </div>

                {/* Agent Avatar */}
                <div className="text-center">
                  <div 
                    className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold shadow-sm"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.name.charAt(0)}
                  </div>
                  <div className="text-xs font-semibold text-gray-900 truncate">{agent.name}</div>
                  <div className="text-xs text-gray-500 truncate mt-1">{agent.role}</div>
                </div>

                {/* Speaking Animation */}
                {isSpeaking && (
                  <div className="absolute inset-0 rounded-2xl bg-green-400/10 animate-pulse"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Center: Large Presentation Area */}
      <div className="p-8 bg-white rounded-2xl border shadow-sm min-h-96">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Presentation Board</h3>
            <p className="text-gray-600">Main demo presentation area</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
              Present
            </div>
            <div className="px-3 py-1 bg-gray-50 text-gray-500 text-sm font-medium rounded-full border border-gray-200">
              Not Present: {allAgents.length - selectedAgents.length}
            </div>
          </div>
        </div>

        {/* Main Presentation Content */}
        <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
          {screenSharing ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v4h10V6H5z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Screen Share Active</h4>
              <p className="text-gray-600">Presentation content is being shared with all participants</p>
            </div>
          ) : (
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-[#1B3A5C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  <circle cx="35" cy="35" r="3"></circle>
                  <circle cx="50" cy="30" r="3"></circle>
                  <circle cx="65" cy="35" r="3"></circle>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Genesis Legacy AI Demo</h4>
              <p className="text-gray-600">Click "Share Screen" to begin your investor presentation</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Guest Participants Grid */}
      <div className="p-6 bg-white rounded-2xl border shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Guest Participants</h3>
          <p className="text-gray-600 text-sm">Investors and stakeholders</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {guestParticipants.map((guest) => (
            <div
              key={guest.id}
              className={`
                relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${guest.isSpeaking ? 'border-green-400 shadow-lg shadow-green-400/25' : 'border-gray-200'}
              `}
            >
              {/* Video Feed */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                {guest.videoElement ? (
                  <video
                    ref={(el) => {
                      if (el && guest.videoElement) {
                        el.srcObject = guest.videoElement.srcObject
                      }
                    }}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-700 text-lg font-bold shadow-sm"
                  >
                    {guest.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Guest Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-2">
                <p className="text-gray-900 font-medium text-xs truncate">{guest.name}</p>
                <p className="text-gray-500 text-xs truncate">{guest.role || 'Guest'}</p>
              </div>

              {/* Speaking Indicator */}
              {guest.isSpeaking && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}

          {/* Empty Guest Slots */}
          {Array.from({ length: Math.max(0, 6 - guestParticipants.length) }).map((_, index) => (
            <div
              key={`guest-empty-${index}`}
              className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs">Guest Slot</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}