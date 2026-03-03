/* LEGACY AI SOUL FILE API ROUTE */
/* Atlas Technical Director - February 28, 2026 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSoulFile } from '@/lib/anthropic'
import { encryptSoulFile, decryptSoulFile } from '@/lib/encryption'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { conversationHistory, regenerate = false } = body

    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { error: 'Conversation history is required' },
        { status: 400 }
      )
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user already has a Soul File and regenerate flag
    if (user.soulFile && !regenerate) {
      return NextResponse.json(
        { error: 'Soul File already exists. Use regenerate=true to update.' },
        { status: 409 }
      )
    }

    try {
      // Generate Soul File using Claude
      const soulFileData = await generateSoulFile(conversationHistory)

      // Encrypt Soul File
      const encryptedSoulFile = encryptSoulFile(soulFileData, user.id, user.email)

      // Save to database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          soulFile: encryptedSoulFile,
          soulFileUpdated: new Date()
        }
      })

      return NextResponse.json(
        { 
          message: 'Soul File generated successfully',
          soulFile: soulFileData, // Return decrypted for immediate use
          timestamp: new Date().toISOString()
        },
        { status: 201 }
      )

    } catch (error) {
      console.error('Soul File generation error:', error)
      return NextResponse.json(
        { error: 'Failed to generate Soul File. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Soul File API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        soulFile: true,
        soulFileUpdated: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!user.soulFile) {
      return NextResponse.json(
        { error: 'Soul File not found' },
        { status: 404 }
      )
    }

    try {
      // Decrypt Soul File
      const soulFileData = decryptSoulFile(user.soulFile, user.id, user.email)

      return NextResponse.json(
        {
          soulFile: soulFileData,
          lastUpdated: user.soulFileUpdated
        }
      )

    } catch (error) {
      console.error('Soul File decryption error:', error)
      return NextResponse.json(
        { error: 'Failed to retrieve Soul File' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Soul File GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { soulFile } = body

    if (!soulFile || typeof soulFile !== 'object') {
      return NextResponse.json(
        { error: 'Valid Soul File data is required' },
        { status: 400 }
      )
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    try {
      // Encrypt updated Soul File
      const encryptedSoulFile = encryptSoulFile(soulFile, user.id, user.email)

      // Update database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          soulFile: encryptedSoulFile,
          soulFileUpdated: new Date()
        }
      })

      return NextResponse.json(
        { 
          message: 'Soul File updated successfully',
          timestamp: new Date().toISOString()
        }
      )

    } catch (error) {
      console.error('Soul File encryption error:', error)
      return NextResponse.json(
        { error: 'Failed to update Soul File' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Soul File PUT API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Delete Soul File
    await prisma.user.update({
      where: { id: user.id },
      data: {
        soulFile: null,
        soulFileUpdated: new Date()
      }
    })

    return NextResponse.json(
      { message: 'Soul File deleted successfully' }
    )

  } catch (error) {
    console.error('Soul File DELETE API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}