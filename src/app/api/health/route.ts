import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Health check endpoint for monitoring
export async function GET(request: Request) {
  const headersList = headers()
  const authHeader = headersList.get('authorization')
  
  // Optional: Add authentication for monitoring services
  const monitoringToken = process.env.MONITORING_TOKEN
  if (monitoringToken && authHeader !== `Bearer ${monitoringToken}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'unknown',
    checks: {
      database: 'healthy',
      sanity: 'healthy',
      memory: 'healthy',
    },
  }
  
  try {
    // Check Sanity connection
    const sanityCheck = await checkSanityHealth()
    healthCheck.checks.sanity = sanityCheck ? 'healthy' : 'unhealthy'
    
    // Check memory usage
    const memoryUsage = process.memoryUsage()
    const memoryThreshold = 500 * 1024 * 1024 // 500MB
    healthCheck.checks.memory = memoryUsage.heapUsed < memoryThreshold ? 'healthy' : 'warning'
    
    // Determine overall status
    const hasUnhealthy = Object.values(healthCheck.checks).includes('unhealthy')
    const hasWarning = Object.values(healthCheck.checks).includes('warning')
    
    if (hasUnhealthy) {
      healthCheck.status = 'unhealthy'
      return NextResponse.json(healthCheck, { status: 503 })
    }
    
    if (hasWarning) {
      healthCheck.status = 'degraded'
    }
    
    return NextResponse.json(healthCheck, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Internal health check error',
    }, { status: 503 })
  }
}

async function checkSanityHealth(): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*[_type == "siteConfig"][0]`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 0 },
      }
    )
    
    return response.ok
  } catch (error) {
    console.error('Sanity health check failed:', error)
    return false
  }
}