import { formatDate, formatReadingTime, slugify, truncateText } from '@/lib/utils/formatting'

describe('Formatting Utilities', () => {
  describe('formatDate', () => {
    it('formats date correctly with default options', () => {
      const date = new Date('2024-01-15T12:00:00Z')
      const formatted = formatDate(date)
      expect(formatted).toBe('January 15, 2024')
    })

    it('formats date with custom options', () => {
      const date = new Date('2024-01-15T12:00:00Z')
      const formatted = formatDate(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      expect(formatted).toBe('Jan 15, 2024')
    })

    it('handles string input', () => {
      const formatted = formatDate('2024-01-15')
      expect(formatted).toBe('January 15, 2024')
    })

    it('handles invalid dates gracefully', () => {
      const formatted = formatDate('invalid-date')
      expect(formatted).toBe('Invalid Date')
    })
  })

  describe('formatReadingTime', () => {
    it('calculates reading time for short text', () => {
      const text = 'This is a short piece of text with about twenty words to test the reading time calculation function.'
      const readingTime = formatReadingTime(text)
      expect(readingTime).toBe('1 min read')
    })

    it('calculates reading time for longer text', () => {
      const text = Array(300).fill('word').join(' ')
      const readingTime = formatReadingTime(text)
      expect(readingTime).toBe('2 min read')
    })

    it('returns minimum 1 minute for very short text', () => {
      const text = 'Short'
      const readingTime = formatReadingTime(text)
      expect(readingTime).toBe('1 min read')
    })

    it('handles empty text', () => {
      const readingTime = formatReadingTime('')
      expect(readingTime).toBe('1 min read')
    })

    it('handles custom words per minute', () => {
      const text = Array(300).fill('word').join(' ')
      const readingTime = formatReadingTime(text, 100) // 100 WPM instead of default 200
      expect(readingTime).toBe('3 min read')
    })
  })

  describe('slugify', () => {
    it('converts text to slug format', () => {
      const slug = slugify('Hello World')
      expect(slug).toBe('hello-world')
    })

    it('handles special characters', () => {
      const slug = slugify('Hello, World! How are you?')
      expect(slug).toBe('hello-world-how-are-you')
    })

    it('handles multiple spaces', () => {
      const slug = slugify('Hello    World')
      expect(slug).toBe('hello-world')
    })

    it('handles leading and trailing spaces', () => {
      const slug = slugify('  Hello World  ')
      expect(slug).toBe('hello-world')
    })

    it('handles numbers', () => {
      const slug = slugify('Project 123 - Version 2.0')
      expect(slug).toBe('project-123-version-20')
    })

    it('handles unicode characters', () => {
      const slug = slugify('Café & Restaurant')
      expect(slug).toBe('cafe-restaurant')
    })

    it('handles empty string', () => {
      const slug = slugify('')
      expect(slug).toBe('')
    })
  })

  describe('truncateText', () => {
    it('truncates text longer than max length', () => {
      const text = 'This is a very long piece of text that should be truncated'
      const truncated = truncateText(text, 20)
      expect(truncated).toBe('This is a very long...')
    })

    it('does not truncate text shorter than max length', () => {
      const text = 'Short text'
      const truncated = truncateText(text, 20)
      expect(truncated).toBe('Short text')
    })

    it('truncates at word boundaries', () => {
      const text = 'This is a test sentence'
      const truncated = truncateText(text, 10)
      expect(truncated).toBe('This is a...')
    })

    it('handles custom suffix', () => {
      const text = 'This is a very long piece of text'
      const truncated = truncateText(text, 15, ' [more]')
      expect(truncated).toBe('This is a very [more]')
    })

    it('handles text exactly at max length', () => {
      const text = 'Exactly twenty chars'
      const truncated = truncateText(text, 20)
      expect(truncated).toBe('Exactly twenty chars')
    })

    it('handles empty text', () => {
      const truncated = truncateText('', 10)
      expect(truncated).toBe('')
    })

    it('handles single word longer than max length', () => {
      const text = 'supercalifragilisticexpialidocious'
      const truncated = truncateText(text, 10)
      expect(truncated).toBe('supercal...')
    })
  })
})