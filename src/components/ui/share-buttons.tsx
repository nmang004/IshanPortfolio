'use client'

import { useState } from 'react'
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/cn'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function ShareButtons({ url, title, description, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    text: description,
    url,
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.log('Error copying link:', error)
    }
  }

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn('gap-2', className)}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share via...
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem 
          onClick={handleCopyLink}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a 
            href={shareUrls.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </a>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a 
            href={shareUrls.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a 
            href={shareUrls.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Facebook className="w-4 h-4" />
            Facebook
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}