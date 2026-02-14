import { NextRequest, NextResponse } from 'next/server'
import { analyzePromptWithHybridAgent } from "@/lib/hybridAgent"

function isValidPrompt(prompt: string): boolean {

  if (!prompt) return false

  const clean = prompt.trim().toLowerCase()

  if (clean.length < 15) return false

  const words = clean.split(/\s+/)

  if (words.length < 4) return false

  // MUST contain at least one project-related keyword
  const projectKeywords = [
    'app',
    'website',
    'platform',
    'system',
    'dashboard',
    'tool',
    'ai',
    'web',
    'mobile',
    'software'
  ]

  const containsProjectWord = projectKeywords.some(word =>
    clean.includes(word)
  )

  return containsProjectWord
}

export async function POST(request: NextRequest) {

  try {

    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {

      return NextResponse.json(
        { error: 'Invalid prompt' },
        { status: 400 }
      )

    }


    // ✅ VALIDATION
    if (!isValidPrompt(prompt)) {

      return NextResponse.json(
        { error: 'Please enter a valid software project idea.' },
        { status: 400 }
      )

    }

    // ✅ HYBRID AGENT ANALYSIS
    // ✅ RUN HYBRID AGENT

    const agentResult = await analyzePromptWithHybridAgent(prompt)

    if (!agentResult.valid) {

      return NextResponse.json(
        { error: agentResult.message || "Invalid project" },
        { status: 400 }
      )

    }

    // ✅ RETURN STRUCTURED DATA (THIS IS THE FIX)

    return NextResponse.json({

      valid: true,

      domain: agentResult.domain,

      requirements: agentResult.requirements,

      techStack: agentResult.techStack,

      aiResponse: agentResult.aiResponse

    })

  }

  catch (error) {

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
