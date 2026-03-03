/* LEGACY AI VOICE TOKEN API ROUTE */
/* Atlas Technical Director - February 28, 2026 */
/* Generates LiveKit tokens for voice chat integration */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateLiveKitToken } from '@/lib/livekit'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const room = searchParams.get('room') || 'legacy-ai-voice'
    const identity = searchParams.get('identity') || session.user.name || session.user.email

    try {
      // Generate LiveKit access token
      const token = await generateLiveKitToken(room, identity, false)

      return NextResponse.json({
        token,
        url: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880',
        room,
        identity,
        user: {
          name: session.user.name,
          email: session.user.email
        }
      })

    } catch (error) {
      console.error('Token generation error:', error)
      return NextResponse.json(
        { error: 'Failed to generate voice session token' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Voice token API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}