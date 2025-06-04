export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatProjectDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)
  
  if (diffMonths < 1) {
    return `${diffDays} days`
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`
  } else {
    const years = Math.floor(diffMonths / 12)
    const remainingMonths = diffMonths % 12
    
    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''}`
    } else {
      return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
    }
  }
}

export function formatProjectType(type: string): string {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function calculateReadingTime(content: unknown[]): number {
  if (!content) return 0
  
  const text = content
    .map(block => {
      if (typeof block === 'object' && block !== null && 'children' in block) {
        const blockObj = block as { _type?: string; children?: { text?: string }[] }
        if (blockObj._type === 'block' && blockObj.children) {
          return blockObj.children
            .map((child) => child.text || '')
            .join('')
        }
      }
      return ''
    })
    .join(' ')
  
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  
  return Math.ceil(wordCount / wordsPerMinute)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}