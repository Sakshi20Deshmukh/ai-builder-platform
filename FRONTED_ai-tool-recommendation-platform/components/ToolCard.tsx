'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, Copy, Check } from 'lucide-react'

interface ToolCardProps {
  tool: {
    id?: string
    name: string
    category: string
    useCase: string
    link: string
    description?: string
    icon?: string
  }
  index?: number
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPrompt = () => {
    const prompt = `I'm building ${tool.name} - ${tool.useCase}`
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -10 }}
      className="group relative h-full"
    >
      <div className="h-full p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 hover:from-card/70 hover:to-card/50 hover:border-primary/40 transition-all duration-300 flex flex-col shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/15 backdrop-blur-sm">
        {/* Top section with category and favorite button */}
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-primary/10">
          <span className="inline-block px-3 py-1 text-xs font-bold text-primary bg-gradient-to-r from-primary/20 to-primary/10 rounded-full group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
            {tool.category}
          </span>
          <motion.button
            onClick={() => setIsFavorited(!isFavorited)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isFavorited ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
            aria-label="Add to favorites"
          >
            <motion.div initial={false} animate={{ scale: isFavorited ? 1.2 : 1 }}>
              <Star className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </motion.div>
          </motion.button>
        </div>

        {/* Title */}
        <motion.h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {tool.name}
        </motion.h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 flex-grow line-clamp-3 leading-relaxed">{tool.description || tool.useCase}</p>

        {/* Action buttons */}
        <div className="flex gap-2 pt-4 border-t border-primary/10">
          <motion.a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all"
          >
            Visit
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          <motion.button
            onClick={handleCopyPrompt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2.5 bg-primary/10 text-primary rounded-lg font-semibold text-sm hover:bg-primary/20 transition-colors border border-primary/20 hover:border-primary/40"
          >
            <motion.div animate={copied ? { scale: 1.2 } : { scale: 1 }}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
