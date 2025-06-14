'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { GlobalSearch } from '@/components/features/global-search'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Debug the state changes in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Mobile menu state changed:', mobileMenuOpen)
      console.log('Current pathname:', pathname)
    }
  }, [mobileMenuOpen, pathname])

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 left-4 bg-red-500 text-white p-2 text-xs z-[9999] md:hidden">
          Mobile Menu: {mobileMenuOpen ? 'OPEN' : 'CLOSED'}
        </div>
      )}
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            onClick={() => {
              console.log('Logo clicked, navigating to home')
              // Ensure mobile menu closes when navigating home
              setMobileMenuOpen(false)
            }}
          >
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Ishan Perera
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => {
            let isActive = false
            if (mounted) {
              if (item.href === '/') {
                // Home page: only active when exactly on home
                isActive = pathname === '/'
              } else {
                // Other pages: active when path matches or starts with the href
                isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              }
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => {
                  console.log(`Desktop nav clicked: ${item.name} -> ${item.href}`)
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <GlobalSearch />
          </div>
          <ThemeToggle />
          
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200 relative z-50"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const newState = !mobileMenuOpen
              setMobileMenuOpen(newState)
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon with animation */}
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 my-1 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <>
          {/* Mobile menu overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-[55]"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
            }}
          />
          {/* Mobile menu content */}
          <div 
            id="mobile-menu"
            className="border-t border-gray-200 dark:border-gray-800 md:hidden bg-white dark:bg-gray-900 relative z-[58] shadow-lg"
          >
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => {
                  let isActive = false
                  if (mounted) {
                    if (item.href === '/') {
                      // Home page: only active when exactly on home
                      isActive = pathname === '/'
                    } else {
                      // Other pages: active when path matches or starts with the href
                      isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    }
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium transition-colors duration-200 py-3 px-2 rounded-md ${
                        isActive 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => {
                        console.log(`Mobile nav clicked: ${item.name} -> ${item.href}`)
                        setMobileMenuOpen(false)
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <GlobalSearch />
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}