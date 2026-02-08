'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/40 to-secondary/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/30 to-primary/20 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(168, 85, 247, 0.05) 25%, rgba(168, 85, 247, 0.05) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.05) 75%, rgba(168, 85, 247, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(168, 85, 247, 0.05) 25%, rgba(168, 85, 247, 0.05) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.05) 75%, rgba(168, 85, 247, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div className="mb-8 inline-block" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm text-foreground font-semibold">Powered by Advanced AI</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">AI Tools</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
            Describe your project requirements. Our AI instantly recommends the best frameworks, libraries, and tools tailored perfectly to your needs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/build"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-bold text-base shadow-lg shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-300"
              >
                Start Building
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/build"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary/50 text-foreground rounded-xl font-bold text-base hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                <Zap className="w-5 h-5" />
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6" variants={containerVariants}>
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Get recommendations in seconds' },
              { icon: '🎯', title: 'Highly Accurate', desc: 'AI-powered intelligent matching' },
              { icon: '📚', title: 'Curated Tools', desc: 'Only the best options included' },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -10, borderColor: 'rgba(168, 85, 247, 0.5)' }}>
                <div className="p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-colors duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div className="absolute top-1/4 left-10 hidden lg:block" variants={floatingVariants} animate="animate">
          <div className="p-3 rounded-lg bg-card/40 border border-primary/20 backdrop-blur-sm text-sm text-primary font-semibold">React</div>
        </motion.div>

        <motion.div className="absolute bottom-1/3 right-10 hidden lg:block" variants={floatingVariants} animate="animate" style={{ animationDelay: 1 }}>
          <div className="p-3 rounded-lg bg-card/40 border border-secondary/20 backdrop-blur-sm text-sm text-secondary font-semibold">Next.js</div>
        </motion.div>

        <motion.div className="absolute top-1/2 right-1/4 hidden lg:block" variants={floatingVariants} animate="animate" style={{ animationDelay: 0.5 }}>
          <div className="p-3 rounded-lg bg-card/40 border border-accent/20 backdrop-blur-sm text-sm text-accent font-semibold">TypeScript</div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}
