'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Sparkles, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import ToolCard from '@/components/ToolCard'

interface Tool {
  id: string
  name: string
  category: string
  useCase: string
  link: string
  description?: string
  icon?: string
}

export default function ResultsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('recommendedTools')
    if (stored) {
      try {
        const parsedTools = JSON.parse(stored)
        setTools(Array.isArray(parsedTools) ? parsedTools : [])
      } catch (err) {
        console.error('Failed to parse tools:', err)
        setTools([])
      }
    }
    setLoading(false)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated gradient background */}
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

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6" variants={itemVariants}>
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm text-foreground font-semibold">AI-Powered Recommendations</span>
            </motion.div>

            <motion.h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-tight" variants={itemVariants}>
              Your Perfect Toolkit
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              Handpicked tools and frameworks tailored specifically for your project needs.
            </motion.p>
          </motion.div>

          {loading && (
            <motion.div className="flex justify-center items-center py-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center">
                <motion.div
                  className="inline-flex p-4 rounded-full border border-primary/30 bg-primary/10 mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-8 h-8 border-3 border-border border-t-primary rounded-full animate-spin" />
                </motion.div>
                <p className="text-sm text-muted-foreground">Analyzing your needs...</p>
              </div>
            </motion.div>
          )}

          {!loading && tools.length > 0 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {tools.map((tool, idx) => (
                  <ToolCard key={tool.id || idx} tool={tool} index={idx} />
                ))}
              </div>

              <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/build"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-bold text-base shadow-lg shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 transition-all"
                  >
                    New Search
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    localStorage.removeItem('recommendedTools')
                    window.location.reload()
                  }}
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary/50 text-foreground rounded-xl font-bold text-base hover:bg-primary/10 hover:border-primary transition-all"
                >
                  Clear Results
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {!loading && tools.length === 0 && (
            <motion.div className="text-center py-32" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <motion.div className="inline-flex p-4 rounded-full border border-primary/30 bg-primary/10 mb-6" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Recommendations Yet</h2>
              <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
                Describe your project and get instant, personalized tool recommendations.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/build"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-bold text-base shadow-lg shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60"
                >
                  Start Searching
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}
