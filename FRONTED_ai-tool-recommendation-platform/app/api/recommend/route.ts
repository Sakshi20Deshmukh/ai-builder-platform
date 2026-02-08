import { NextRequest, NextResponse } from 'next/server'

type Tool = {
  id: string
  name: string
  category: string
  description: string
  link: string
  prompt: string
}

const TOOL_MAP: Record<string, Tool[]> = {
  architecture: [
    {
      id: "eraser_ai",
      name: "Eraser AI",
      category: "architecture",
      description: "Create system architecture and flow diagrams",
      link: "https://eraser.io",
      prompt: "Create a high-level system architecture diagram for the following project:"
    }
  ],
  ui: [
    {
      id: "v0_dev",
      name: "v0.dev",
      category: "ui",
      description: "Generate modern UI components using AI",
      link: "https://v0.dev",
      prompt: "Generate a responsive UI for the following project using modern design principles:"
    }
  ],
  backend: [
    {
      id: "supabase",
      name: "Supabase",
      category: "backend",
      description: "Backend with authentication, database, and APIs",
      link: "https://supabase.com",
      prompt: "Design a backend schema with authentication and APIs for the following project:"
    }
  ],
  database: [
    {
      id: "supabase_db",
      name: "Supabase Database",
      category: "database",
      description: "PostgreSQL-based scalable database",
      link: "https://supabase.com",
      prompt: "Design an efficient database schema for the following project:"
    }
  ],
  deployment: [
    {
      id: "vercel",
      name: "Vercel",
      category: "deployment",
      description: "Deploy frontend and backend seamlessly",
      link: "https://vercel.com",
      prompt: "Deploy a full-stack application with best practices for the following project:"
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    const { requirements } = await request.json()

    if (!Array.isArray(requirements)) {
      return NextResponse.json(
        { error: 'Requirements must be an array' },
        { status: 400 }
      )
    }

    const recommendations: Tool[] = []

    for (const requirement of requirements) {
    const key = requirement.toLowerCase().trim()
    const tools = TOOL_MAP[key]
    if (tools) {
      recommendations.push(...tools)
    }
  }


    const uniqueRecommendations = Array.from(
      new Map(recommendations.map(tool => [tool.id, tool])).values()
    )

    return NextResponse.json({
      success: true,
      count: uniqueRecommendations.length,
      tools: uniqueRecommendations
    })
  } catch (error) {
    console.error('Recommend API error:', error)
    return NextResponse.json(
      { error: 'Failed to recommend tools' },
      { status: 500 }
    )
  }
}
