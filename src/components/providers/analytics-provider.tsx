'use client'

import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { initPerformanceMonitoring } from '@/lib/performance/web-vitals'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize performance monitoring
    if (typeof window !== 'undefined') {
      initPerformanceMonitoring()
      
      // Register service worker for PWA
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration)
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      }
    }
  }, [])

  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}