'use client'

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { analytics } from '@/lib/analytics'

export function reportWebVitals() {
  if (typeof window === 'undefined') return
  
  try {
    // Cumulative Layout Shift
    onCLS((metric) => {
      analytics.event('web_vitals', {
        metric_name: 'CLS',
        metric_value: metric.value,
        metric_id: metric.id,
        metric_rating: getMetricRating('CLS', metric.value)
      })
    })
    
    // Interaction to Next Paint
    onINP((metric) => {
      analytics.event('web_vitals', {
        metric_name: 'INP',
        metric_value: metric.value,
        metric_id: metric.id,
        metric_rating: getMetricRating('INP', metric.value)
      })
    })
    
    // First Contentful Paint
    onFCP((metric) => {
      analytics.event('web_vitals', {
        metric_name: 'FCP',
        metric_value: metric.value,
        metric_id: metric.id,
        metric_rating: getMetricRating('FCP', metric.value)
      })
    })
    
    // Largest Contentful Paint
    onLCP((metric) => {
      analytics.event('web_vitals', {
        metric_name: 'LCP',
        metric_value: metric.value,
        metric_id: metric.id,
        metric_rating: getMetricRating('LCP', metric.value)
      })
    })
    
    // Time to First Byte
    onTTFB((metric) => {
      analytics.event('web_vitals', {
        metric_name: 'TTFB',
        metric_value: metric.value,
        metric_id: metric.id,
        metric_rating: getMetricRating('TTFB', metric.value)
      })
    })
  } catch (error) {
    console.error('Web Vitals reporting error:', error)
  }
}

function getMetricRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 }
  }
  
  const threshold = thresholds[metricName as keyof typeof thresholds]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

export function reportCustomMetrics() {
  if (typeof window === 'undefined') return
  
  // Page Load Time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    analytics.event('performance_metric', {
      metric_name: 'page_load_time',
      metric_value: loadTime
    })
  })
  
  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    const domLoadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
    analytics.event('performance_metric', {
      metric_name: 'dom_content_loaded',
      metric_value: domLoadTime
    })
  })
  
  // Resource loading times
  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource')
    
    resources.forEach((resource: any) => {
      if (resource.duration > 1000) { // Only report slow resources
        analytics.event('slow_resource', {
          resource_name: resource.name,
          resource_type: resource.initiatorType,
          duration: resource.duration,
          size: resource.transferSize || 0
        })
      }
    })
  })
}

export function reportNavigationTiming() {
  if (typeof window === 'undefined' || !('performance' in window)) return
  
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      analytics.event('navigation_timing', {
        dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp_connect: navigation.connectEnd - navigation.connectStart,
        ssl_handshake: navigation.secureConnectionStart > 0 
          ? navigation.connectEnd - navigation.secureConnectionStart 
          : 0,
        server_response: navigation.responseStart - navigation.requestStart,
        dom_parse: navigation.domContentLoadedEventEnd - navigation.responseEnd,
        resource_load: navigation.loadEventStart - navigation.domContentLoadedEventEnd
      })
    }
  })
}

export function monitorLongTasks() {
  if (typeof window === 'undefined') return
  
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        analytics.event('long_task', {
          duration: entry.duration,
          start_time: entry.startTime
        })
      })
    })
    
    observer.observe({ entryTypes: ['longtask'] })
  } catch (error) {
    // PerformanceObserver not supported
  }
}

export function monitorMemoryUsage() {
  if (typeof window === 'undefined') return
  
  // Monitor memory usage periodically
  setInterval(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      
      analytics.event('memory_usage', {
        used_heap: memory.usedJSHeapSize,
        total_heap: memory.totalJSHeapSize,
        heap_limit: memory.jsHeapSizeLimit,
        usage_percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      })
    }
  }, 30000) // Every 30 seconds
}

export function trackUserInteractions() {
  if (typeof window === 'undefined') return
  
  // Track clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const tagName = target.tagName.toLowerCase()
    
    if (['button', 'a', 'input'].includes(tagName)) {
      analytics.event('user_interaction', {
        interaction_type: 'click',
        element_type: tagName,
        element_text: target.textContent?.slice(0, 50) || '',
        element_id: target.id || undefined,
        element_class: target.className || undefined
      })
    }
  })
  
  // Track form submissions
  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement
    
    analytics.event('user_interaction', {
      interaction_type: 'form_submit',
      form_id: form.id || undefined,
      form_action: form.action || undefined
    })
  })
  
  // Track scroll depth
  let maxScroll = 0
  let scrollTimer: NodeJS.Timeout
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer)
    
    scrollTimer = setTimeout(() => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        if (maxScroll % 25 === 0) { // Report at 25%, 50%, 75%, 100%
          analytics.event('scroll_depth', {
            scroll_percentage: maxScroll
          })
        }
      }
    }, 250)
  })
}

export function initPerformanceMonitoring() {
  reportWebVitals()
  reportCustomMetrics()
  reportNavigationTiming()
  monitorLongTasks()
  monitorMemoryUsage()
  trackUserInteractions()
}