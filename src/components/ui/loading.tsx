import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function Loading({ className, size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && (
        <span className="text-muted-foreground animate-pulse">{text}</span>
      )}
    </div>
  )
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-md bg-muted', className)} />
  )
}

export function ProjectGridSkeleton() {
  return (
    <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="rounded-lg border bg-background p-6">
            <LoadingSkeleton className="h-4 w-20 mb-3" />
            <LoadingSkeleton className="h-6 w-full mb-2" />
            <LoadingSkeleton className="h-4 w-full mb-1" />
            <LoadingSkeleton className="h-4 w-3/4 mb-4" />
            <div className="flex gap-2">
              <LoadingSkeleton className="h-5 w-16" />
              <LoadingSkeleton className="h-5 w-12" />
            </div>
            <LoadingSkeleton className="h-3 w-24 mt-3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function TestimonialSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="rounded-lg border bg-background p-6">
            <LoadingSkeleton className="h-4 w-full mb-2" />
            <LoadingSkeleton className="h-4 w-5/6 mb-2" />
            <LoadingSkeleton className="h-4 w-4/6 mb-4" />
            <div className="border-t pt-4">
              <LoadingSkeleton className="h-4 w-32 mb-1" />
              <LoadingSkeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}