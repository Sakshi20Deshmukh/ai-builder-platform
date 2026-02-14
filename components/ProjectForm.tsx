'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'

const TECH_STACK_OPTIONS = [
  'React',
  'Vue',
  'Angular',
  'Next.js',
  'Svelte',
  'TypeScript',
  'Node.js',
  'Python',
  'FastAPI',
  'Django',
  'GraphQL',
  'REST API',
  'Tailwind CSS',
  'Material UI',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
]

const PROJECT_LEVELS = ['Beginner', 'Intermediate', 'Advanced']

interface Tool {
  id?: string
  name: string
  category: string
  description?: string
  useCase?: string
  link: string
}

export default function ProjectForm() {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [projectLevel, setProjectLevel] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    if (!description.trim()) {
      throw new Error('Please describe your project')
    }

    if (!projectLevel) {
      throw new Error('Please select a project level')
    }

    const prompt = `
Project Description: ${description}
Tech Stack: ${selectedTech.join(', ') || 'No preference'}
Project Level: ${projectLevel}
    `.trim()

    // 1️⃣ ANALYZE
    const analyzeRes = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    const analyzeData = await analyzeRes.json()

      // ❌ ERROR CASE
    if (!analyzeRes.ok) {
      setError(analyzeData.error || "Invalid project idea")
      setLoading(false)  
      return
    }

    
    const requirements: string[] = analyzeData.requirements || []

    console.log('REQUIREMENTS FROM ANALYZE API:', requirements)

    // 2️⃣ MAP ANALYZE → TOOL CATEGORIES
    const requirementMap: Record<string, string> = {
      'Frontend Framework': 'ui',
      'Styling': 'ui',
      'Backend Framework': 'backend',
      'Database': 'database',
      'Deployment': 'deployment',
      'Architecture': 'architecture',
    }

    const normalizedRequirements = requirements
      .map((r) => requirementMap[r])
      .filter(Boolean)

    console.log('NORMALIZED REQUIREMENTS:', normalizedRequirements)

    if (normalizedRequirements.length === 0) {
      throw new Error('No valid tool categories found')
    }

    // 3️⃣ RECOMMEND
    const recommendRes = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requirements: normalizedRequirements,
      }),
    })

    if (!recommendRes.ok) throw new Error('Failed to get recommendations')

    const recommendData = await recommendRes.json()
    const tools: Tool[] = recommendData.tools || []

    console.log('RECOMMENDED TOOLS:', tools)

    if (tools.length === 0) {
      throw new Error('Recommendation engine returned no tools')
    }

    // 4️⃣ SAVE + REDIRECT
    localStorage.setItem('recommendedTools', JSON.stringify(tools))
    setLoading(false)
    router.push('/results')

  } catch (err) {
    console.error(err)
    setError(err instanceof Error ? err.message : 'An error occurred')
    setLoading(false)
  }
}


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/15 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <motion.div className="relative z-10 max-w-3xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">Describe Your Project</h1>
          <p className="text-lg text-muted-foreground">Tell us about your project and we'll recommend the perfect tools</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="space-y-8" variants={containerVariants}>
          {/* Project Description */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-foreground mb-3">Project Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project idea, features, and technical requirements..."
              className="w-full h-32 px-4 py-3 bg-card border border-primary/20 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </motion.div>

          {/* Tech Stack Selection */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-foreground mb-4">Tech Stack Preferences (Optional)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TECH_STACK_OPTIONS.map((tech) => (
                <motion.button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2 ${
                    selectedTech.includes(tech)
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'border-primary/20 bg-card/30 text-foreground hover:border-primary/40 hover:bg-card/50'
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Project Level */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-foreground mb-4">Project Level</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROJECT_LEVELS.map((level) => (
                <motion.button
                  key={level}
                  type="button"
                  onClick={() => setProjectLevel(level)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-lg font-bold text-base transition-all border-2 ${
                    projectLevel === level
                      ? 'bg-secondary border-secondary text-secondary-foreground shadow-lg shadow-secondary/30'
                      : 'border-secondary/20 bg-card/30 text-foreground hover:border-secondary/40 hover:bg-card/50'
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-bold text-base shadow-lg shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Your Project...
                </span>
              ) : (
                'Generate AI Recommendations'
              )}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  )
}
