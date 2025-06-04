'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { 
  Search, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Moon, 
  Sun, 
  Monitor,
  Copy,
  Download,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react'
import { useHotkeys } from '@/lib/hooks/use-hotkeys'
import { analytics } from '@/lib/analytics'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  shortcut?: string
  category: string
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  
  // Register global hotkey
  useHotkeys('cmd+k,ctrl+k', (e) => {
    e.preventDefault()
    setOpen(true)
    analytics.trackCommandPaletteOpen()
  })
  
  const runCommand = React.useCallback((command: () => void, actionName: string) => {
    setOpen(false)
    setSearchQuery('')
    command()
    analytics.trackCommandPaletteAction(actionName)
  }, [])
  
  const copyEmail = () => {
    const email = 'iperera@vcom.vt.edu'
    navigator.clipboard.writeText(email)
    toast.success('Email copied to clipboard!')
  }
  
  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/assets/Current - Ishan - CV.pdf'
    link.download = 'Ishan_Perera_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    analytics.trackResumeDownload()
  }
  
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home',
      description: 'Navigate to the homepage',
      icon: Home,
      action: () => router.push('/'),
      category: 'Navigation',
      shortcut: '⌘H'
    },
    {
      id: 'nav-about',
      title: 'Go to About',
      description: 'Learn more about Ishan',
      icon: User,
      action: () => router.push('/about'),
      category: 'Navigation'
    },
    {
      id: 'nav-projects',
      title: 'View Projects',
      description: 'Browse research projects',
      icon: Briefcase,
      action: () => router.push('/projects'),
      category: 'Navigation'
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      description: 'Get in touch',
      icon: Mail,
      action: () => router.push('/contact'),
      category: 'Navigation'
    },
    
    // Actions
    {
      id: 'action-copy-email',
      title: 'Copy Email Address',
      description: 'Copy iperera@vcom.vt.edu to clipboard',
      icon: Copy,
      action: copyEmail,
      category: 'Actions'
    },
    {
      id: 'action-download-resume',
      title: 'Download Resume',
      description: 'Download CV as PDF',
      icon: Download,
      action: downloadResume,
      category: 'Actions'
    },
    {
      id: 'action-schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Book a consultation',
      icon: Calendar,
      action: () => router.push('/contact#schedule'),
      category: 'Actions'
    },
    
    // Theme
    {
      id: 'theme-light',
      title: 'Light Mode',
      description: 'Switch to light theme',
      icon: Sun,
      action: () => setTheme('light'),
      category: 'Theme'
    },
    {
      id: 'theme-dark',
      title: 'Dark Mode',
      description: 'Switch to dark theme',
      icon: Moon,
      action: () => setTheme('dark'),
      category: 'Theme'
    },
    {
      id: 'theme-system',
      title: 'System Theme',
      description: 'Use system preference',
      icon: Monitor,
      action: () => setTheme('system'),
      category: 'Theme'
    },
    
    // Social
    {
      id: 'social-github',
      title: 'GitHub Profile',
      description: 'View code repositories',
      icon: Github,
      action: () => window.open('https://github.com/ishperera', '_blank'),
      category: 'Social'
    },
    {
      id: 'social-linkedin',
      title: 'LinkedIn Profile',
      description: 'Professional network',
      icon: Linkedin,
      action: () => window.open('https://linkedin.com/in/ishan-perera-do', '_blank'),
      category: 'Social'
    },
    {
      id: 'social-twitter',
      title: 'Twitter Profile',
      description: 'Latest updates',
      icon: Twitter,
      action: () => window.open('https://twitter.com/ishperera', '_blank'),
      category: 'Social'
    },
    
    // Quick Links
    {
      id: 'quick-vcom',
      title: 'VCOM Profile',
      description: 'Medical school information',
      icon: ExternalLink,
      action: () => window.open('https://www.vcom.vt.edu', '_blank'),
      category: 'Quick Links'
    },
    {
      id: 'quick-research',
      title: 'Research Publications',
      description: 'Academic publications',
      icon: FileText,
      action: () => router.push('/projects?filter=publications'),
      category: 'Quick Links'
    }
  ]
  
  const filteredCommands = React.useMemo(() => {
    if (!searchQuery) return commands
    
    return commands.filter(command => 
      command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      command.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      command.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])
  
  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    filteredCommands.forEach(command => {
      if (!groups[command.category]) {
        groups[command.category] = []
      }
      groups[command.category].push(command)
    })
    return groups
  }, [filteredCommands])
  
  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center rounded-lg bg-primary p-3 text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl md:hidden"
        aria-label="Open command palette"
      >
        <Search className="h-5 w-5" />
      </button>
      
      {/* Desktop Search Bar */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex h-9 w-full max-w-sm items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          <span>Search...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a command or search..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No results found.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Try searching for navigation, actions, or theme options.
              </p>
            </div>
          </CommandEmpty>
          
          {Object.entries(groupedCommands).map(([category, items]) => (
            <React.Fragment key={category}>
              <CommandGroup heading={category}>
                {items.map((command) => {
                  const Icon = command.icon
                  return (
                    <CommandItem
                      key={command.id}
                      onSelect={() => runCommand(command.action, command.id)}
                      className="flex items-center gap-3 p-3"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{command.title}</div>
                        {command.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {command.description}
                          </div>
                        )}
                      </div>
                      {command.shortcut && (
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          {command.shortcut}
                        </kbd>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}