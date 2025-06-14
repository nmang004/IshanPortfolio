'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  FileText, 
  User, 
  Calendar,
  Hash,
  TrendingUp,
  Clock,
  X
} from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { formatDate } from '@/lib/utils/formatting'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'project' | 'page' | 'content'
  url: string
  category?: string
  date?: string
  tags?: string[]
  excerpt?: string
}

interface SearchHistory {
  query: string
  timestamp: Date
  resultsCount: number
}

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchHistory, setSearchHistory] = React.useState<SearchHistory[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)
  
  // Mock search data - replace with actual search implementation
  const mockResults: SearchResult[] = [
    {
      id: 'airway-project',
      title: 'Airway Management Research',
      description: 'Comprehensive study on emergency airway management techniques and outcomes',
      type: 'project',
      url: '/projects/airway-project',
      category: 'Emergency Medicine',
      date: '2024-03-15',
      tags: ['Emergency Medicine', 'Airway', 'Research'],
      excerpt: 'This study examines the effectiveness of various airway management techniques in emergency situations...'
    },
    {
      id: 'chiari-project',
      title: 'Chiari Malformation Study',
      description: 'Investigation into Chiari malformation presentations and treatment outcomes',
      type: 'project',
      url: '/projects/chiari-project1',
      category: 'Neurology',
      date: '2024-02-10',
      tags: ['Neurology', 'Chiari', 'Malformation'],
      excerpt: 'Analysis of Chiari malformation cases and their clinical presentations...'
    },
    {
      id: 'about-page',
      title: 'About Ishan Perera',
      description: 'Learn about Ishan\'s background, education, and research interests',
      type: 'page',
      url: '/about',
      excerpt: 'Medical student at Edward Via College of Osteopathic Medicine with research interests in emergency medicine...'
    },
    {
      id: 'contact-page',
      title: 'Contact Information',
      description: 'Get in touch with Ishan for collaboration and consultation opportunities',
      type: 'page',
      url: '/contact',
      excerpt: 'Available for research collaboration, consultation, and speaking engagements...'
    }
  ]
  
  const popularSearches = [
    'emergency medicine',
    'research projects',
    'medical student',
    'publications',
    'chiari malformation',
    'airway management'
  ]
  
  // Load search history from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('search-history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }))
        setSearchHistory(parsed.slice(0, 5)) // Keep only recent 5
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [])
  
  // Perform search
  React.useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    
    setLoading(true)
    
    // Simulate API call delay
    const searchTimeout = setTimeout(() => {
      const filtered = mockResults.filter(result => {
        const searchText = `${result.title} ${result.description} ${result.excerpt || ''} ${result.tags?.join(' ') || ''}`.toLowerCase()
        const queryLower = debouncedQuery.toLowerCase()
        
        if (selectedCategory && result.category !== selectedCategory) {
          return false
        }
        
        return searchText.includes(queryLower)
      })
      
      setResults(filtered)
      setLoading(false)
      
      // Track search
      analytics.trackSearchQuery(debouncedQuery, filtered.length)
      
      // Update search history
      if (filtered.length > 0) {
        const newHistory: SearchHistory = {
          query: debouncedQuery,
          timestamp: new Date(),
          resultsCount: filtered.length
        }
        
        setSearchHistory(prev => {
          const updated = [newHistory, ...prev.filter(h => h.query !== debouncedQuery)].slice(0, 5)
          localStorage.setItem('search-history', JSON.stringify(updated))
          return updated
        })
      }
    }, 300)
    
    return () => clearTimeout(searchTimeout)
  }, [debouncedQuery, selectedCategory])
  
  const handleResultClick = (result: SearchResult) => {
    try {
      setOpen(false)
      setQuery('')
      setSelectedCategory(null)
      router.push(result.url)
      analytics.event('search_result_click', {
        result_id: result.id,
        result_type: result.type,
        query: query
      })
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to window.location if router.push fails
      window.location.href = result.url
    }
  }
  
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery)
  }
  
  const handlePopularClick = (popularQuery: string) => {
    setQuery(popularQuery)
  }
  
  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('search-history')
  }

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  const categories = Array.from(new Set(mockResults.map(r => r.category).filter(Boolean))) as string[]
  
  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'project':
        return FileText
      case 'page':
        return User
      default:
        return FileText
    }
  }
  
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark className="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
  }
  
  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search everything...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>/
        </kbd>
      </button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
          <DialogHeader className="border-b p-4">
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects, pages, content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            )}
            
            {/* No Query State */}
            {!query.trim() && !loading && (
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-2">
                      {searchHistory.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleHistoryClick(item.query)}
                          className="flex items-center justify-between w-full p-2 rounded hover:bg-accent text-left"
                        >
                          <span className="text-sm">{item.query}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.resultsCount} results
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularClick(search)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm hover:bg-accent"
                      >
                        <Hash className="h-3 w-3" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Search Results */}
            {query.trim() && !loading && (
              <div className="p-4">
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No results found for "{query}"
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Try adjusting your search terms or removing filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground mb-4">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    {results.map((result) => {
                      const Icon = getResultIcon(result.type)
                      return (
                        <Card
                          key={result.id}
                          className="cursor-pointer hover:bg-accent transition-colors"
                          onClick={() => handleResultClick(result)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <h4 
                                  className="font-medium text-sm mb-1"
                                  dangerouslySetInnerHTML={{ 
                                    __html: highlightText(result.title, query) 
                                  }}
                                />
                                <p 
                                  className="text-xs text-muted-foreground mb-2"
                                  dangerouslySetInnerHTML={{ 
                                    __html: highlightText(result.description, query) 
                                  }}
                                />
                                {result.excerpt && (
                                  <p 
                                    className="text-xs text-muted-foreground/80 line-clamp-2"
                                    dangerouslySetInnerHTML={{ 
                                      __html: highlightText(result.excerpt, query) 
                                    }}
                                  />
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  {result.category && (
                                    <Badge variant="secondary" className="text-xs">
                                      {result.category}
                                    </Badge>
                                  )}
                                  {result.date && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {formatDate(result.date)}
                                    </span>
                                  )}
                                  {result.tags && result.tags.length > 0 && (
                                    <div className="flex gap-1">
                                      {result.tags.slice(0, 2).map((tag, index) => (
                                        <span
                                          key={index}
                                          className="text-xs text-muted-foreground/60"
                                        >
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}