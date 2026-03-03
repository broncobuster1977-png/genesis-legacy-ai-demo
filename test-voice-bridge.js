#!/usr/bin/env node

// Simple test of the voice bridge functionality
// Atlas Technical Director - March 2, 2026

const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)

async function testVoiceBridge() {
  console.log('🧪 Testing Voice Bridge Components...\n')

  try {
    // 1. Test OpenClaw availability
    console.log('1. Testing OpenClaw...')
    const { stdout: openclawPath } = await execAsync('which openclaw', { timeout: 3000 })
    console.log('✅ OpenClaw found at:', openclawPath.trim())

    // 2. Test edge-tts availability
    console.log('2. Testing edge-tts...')
    const { stdout: edgeTTSPath } = await execAsync('which edge-tts', { timeout: 3000 })
    console.log('✅ edge-tts found at:', edgeTTSPath.trim())

    // 3. Test OpenClaw sessions
    console.log('3. Testing OpenClaw sessions...')
    const { stdout: sessions } = await execAsync('openclaw sessions list | head -3', { timeout: 5000 })
    console.log('✅ OpenClaw sessions accessible:')
    console.log(sessions.trim())

    // 4. Test TTS generation
    console.log('4. Testing TTS generation...')
    const testText = 'This is a test of the voice bridge system.'
    const audioPath = '/tmp/voice-bridge-test.mp3'
    
    await execAsync(`edge-tts --voice "en-GB-ThomasNeural" --text "${testText}" --write-media "${audioPath}"`, {
      timeout: 10000
    })
    
    console.log('✅ TTS audio generated successfully')

    // 5. Test sessions_send (if agents are available)
    console.log('5. Testing agent communication...')
    
    try {
      const testMessage = 'Hello, this is a voice bridge test. Please respond briefly.'
      const { stdout: agentResponse, stderr: agentError } = await execAsync(`openclaw sessions send --label "jarvis" "${testMessage}"`, {
        timeout: 15000
      })
      
      if (agentResponse && !agentResponse.includes('Error')) {
        console.log('✅ Agent communication successful:')
        console.log('Response:', agentResponse.trim())
      } else {
        console.log('⚠️  Agent communication failed or no agent available:')
        console.log('Error:', agentError || agentResponse)
      }
      
    } catch (agentError) {
      console.log('⚠️  Agent communication test failed:', agentError.message)
      console.log('   This is expected if no JARVIS session is active')
    }

    console.log('\n🎉 Voice Bridge Core Components Test Complete!')
    console.log('\nNext Steps:')
    console.log('- Start Legacy AI web app: npm run dev')
    console.log('- Navigate to: http://localhost:3000/agent-voice-test')
    console.log('- Select "Real JARVIS" and test voice input')

  } catch (error) {
    console.error('❌ Voice Bridge Test Failed:', error.message)
  }
}

testVoiceBridge()