'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / documentHeight) * 100
      
      setProgress(Math.min(Math.max(scrollProgress, 0), 100))
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress() // Set initial progress

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-1 bg-primary origin-left"
      style={{ width: `${progress}%` }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{ duration: 0.1 }}
    />
  )
}