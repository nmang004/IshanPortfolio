'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { urlFor } from '@/lib/sanity/image'
import { SanityImage } from '@/types/sanity'

interface ProjectGalleryProps {
  images: SanityImage[]
  hero?: boolean
  className?: string
}

export function ProjectGallery({ images, hero = false, className }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
    setIsZoomed(false)
    document.body.style.overflow = 'unset'
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
    } else {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }
    setIsZoomed(false)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          navigateImage('prev')
          break
        case 'ArrowRight':
          navigateImage('next')
          break
        case ' ':
          e.preventDefault()
          setIsZoomed(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, closeLightbox, navigateImage])

  if (!images || images.length === 0) return null

  if (hero) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden', className)}>
        <Image
          src={urlFor(images[0]).width(1920).height(1080).url()}
          alt="Project hero image"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    )
  }

  return (
    <>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-video overflow-hidden rounded-lg bg-muted cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={urlFor(image).width(600).height(400).url()}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-16 z-10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isZoomed ? 1.5 : 1, 
                opacity: 1 
              }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh] cursor-zoom-in"
              onClick={(e) => {
                e.stopPropagation()
                setIsZoomed(prev => !prev)
              }}
            >
              <Image
                src={urlFor(images[currentIndex]).width(1200).height(800).url()}
                alt={`Gallery image ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-full"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      'relative w-16 h-10 rounded border-2 overflow-hidden transition-all',
                      index === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                  >
                    <Image
                      src={urlFor(image).width(120).height(80).url()}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}