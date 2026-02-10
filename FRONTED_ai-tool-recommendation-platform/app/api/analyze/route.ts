import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt' },
        { status: 400 }
      )
    }

    // Simulate API analysis - in production, this would call your AI backend
    // For demo purposes, we'll extract some keywords and return mock requirements
    const keywords = prompt.toLowerCase().split(/\s+/)
    const requirements: string[] = []

    // Parse keywords to determine requirements
    if (keywords.some(k => ['frontend', 'ui', 'react', 'vue', 'angular', 'next'].includes(k))) {
      requirements.push('Frontend Framework')
    }
    if (keywords.some(k => ['backend', 'server', 'api', 'node', 'express', 'django'].includes(k))) {
      requirements.push('Backend Framework')
    }
    if (keywords.some(k => ['database', 'db', 'postgres', 'mongodb', 'sql'].includes(k))) {
      requirements.push('Database')
    }
    if (keywords.some(k => ['auth', 'authentication', 'login', 'signup'].includes(k))) {
      requirements.push('Authentication')
    }
    if (keywords.some(k => ['websocket', 'realtime', 'socket', 'live'].includes(k))) {
      requirements.push('Real-time Communication')
    }
    if (keywords.some(k => ['styling', 'css', 'tailwind', 'bootstrap'].includes(k))) {
      requirements.push('CSS Framework')
    }
    if (keywords.some(k => ['testing', 'test', 'jest', 'vitest'].includes(k))) {
      requirements.push('Testing Framework')
    }
    if (keywords.some(k => ['deploy', 'hosting', 'vercel', 'netlify'].includes(k))) {
      requirements.push('Hosting')
    }

    // Default requirements if none found
    if (requirements.length === 0) {
      requirements.push('Frontend Framework', 'Backend Framework', 'Database', 'Styling')
    }

    return NextResponse.json({
      domain: 'web-development',
      requirements,
      analysis: prompt,
    })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze project' },
      { status: 500 }
    )
  }
}

// Handle GET requests explicitly
export async function GET() {
  return NextResponse.json(
    { error: 'GET method not allowed. Use POST instead.' },
    { status: 405 }
  )
}
