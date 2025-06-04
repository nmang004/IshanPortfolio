'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // Generate table of contents from headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading) => {
      if (heading.id) {
        items.push({
          id: heading.id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        })
      }
    })

    setTocItems(items)

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
      }
    )

    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading)
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 120 // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  if (tocItems.length === 0) return null

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3">Table of Contents</h3>
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              'block w-full text-left text-sm transition-colors hover:text-primary py-1 px-2 rounded',
              item.level === 2 && 'ml-0',
              item.level === 3 && 'ml-4',
              item.level >= 4 && 'ml-8',
              activeId === item.id
                ? 'text-primary bg-primary/10 font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.1 }}
          >
            {item.text}
          </motion.button>
        ))}
      </nav>
    </div>
  )
}