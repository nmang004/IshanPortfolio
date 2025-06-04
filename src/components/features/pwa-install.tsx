'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, X, Smartphone, Monitor } from 'lucide-react'
import { analytics } from '@/lib/analytics'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = React.useState(false)
  const [isInstalled, setIsInstalled] = React.useState(false)
  const [showPrompt, setShowPrompt] = React.useState(false)
  const [isIOS, setIsIOS] = React.useState(false)
  
  React.useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }
    
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSDevice)
    
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
      
      // Show install prompt after a delay
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }
    
    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setIsInstallable(false)
      analytics.event('pwa_installed')
    }
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])
  
  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    
    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      
      analytics.event('pwa_install_prompt_response', {
        outcome: choiceResult.outcome,
        platform: choiceResult.platform
      })
      
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false)
      }
      
      setDeferredPrompt(null)
    } catch (error) {
      console.error('Install prompt error:', error)
    }
  }
  
  const handleDismiss = () => {
    setShowPrompt(false)
    analytics.event('pwa_install_prompt_dismissed')
    
    // Don't show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }
  
  // Check if user previously dismissed
  React.useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const oneWeek = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      
      if (Date.now() - dismissedTime < oneWeek) {
        setShowPrompt(false)
        return
      }
    }
  }, [])
  
  // Don't show if already installed or not installable
  if (isInstalled || (!isInstallable && !isIOS)) {
    return null
  }
  
  // Don't show if user dismissed
  if (!showPrompt) {
    return null
  }
  
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-sm">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {isIOS ? (
                <Smartphone className="h-5 w-5 text-primary" />
              ) : (
                <Monitor className="h-5 w-5 text-primary" />
              )}
              <CardTitle className="text-lg">Install App</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {isIOS 
              ? "Add to your home screen for a better experience"
              : "Install this app for faster access and offline support"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {isIOS ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Tap the share button in Safari, then "Add to Home Screen"
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>1. Tap</span>
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </div>
                <span>2. Add to Home Screen</span>
              </div>
            </div>
          ) : (
            <Button 
              onClick={handleInstallClick}
              className="w-full"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Install Now
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}