import { JSDOM } from 'jsdom'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'

interface ContentAnalysis {
  htmlFiles: Array<{
    path: string
    size: number
    title: string
    type: 'project' | 'about' | 'testimonial' | 'blog' | 'other'
    images: number
    links: number
    contentBlocks: number
  }>
  assets: Array<{
    path: string
    size: number
    type: string
    used: boolean
  }>
  structure: {
    totalFiles: number
    totalAssets: number
    totalSize: number
    projectFiles: number
    duplicateContent: Array<{
      files: string[]
      similarity: number
    }>
  }
  technologies: Set<string>
  urls: {
    internal: string[]
    external: string[]
    broken: string[]
  }
  seoData: Array<{
    file: string
    title: string
    description: string
    keywords: string[]
    h1Count: number
    h2Count: number
    imagesMissingAlt: number
  }>
}

export class ContentAnalyzer {
  private spinner = ora()
  private sourceDir: string
  
  constructor(sourceDir: string = './old-site') {
    this.sourceDir = sourceDir
  }
  
  async analyze(): Promise<ContentAnalysis> {
    console.log(chalk.blue.bold('🔍 Analyzing existing content...'))
    
    const analysis: ContentAnalysis = {
      htmlFiles: [],
      assets: [],
      structure: {
        totalFiles: 0,
        totalAssets: 0,
        totalSize: 0,
        projectFiles: 0,
        duplicateContent: [],
      },
      technologies: new Set(),
      urls: {
        internal: [],
        external: [],
        broken: [],
      },
      seoData: [],
    }
    
    try {
      // Analyze HTML files
      await this.analyzeHTMLFiles(analysis)
      
      // Analyze assets
      await this.analyzeAssets(analysis)
      
      // Detect duplicate content
      await this.detectDuplicateContent(analysis)
      
      // Extract technologies
      await this.extractTechnologies(analysis)
      
      // Validate links
      await this.validateLinks(analysis)
      
      // Generate SEO analysis
      await this.generateSEOAnalysis(analysis)
      
      return analysis
    } catch (error) {
      console.error(chalk.red('❌ Analysis failed:'), error)
      throw error
    }
  }
  
  private async analyzeHTMLFiles(analysis: ContentAnalysis) {
    this.spinner.start('Analyzing HTML files...')
    
    const htmlFiles = await this.findHTMLFiles(this.sourceDir)
    analysis.structure.totalFiles = htmlFiles.length
    
    for (const filePath of htmlFiles) {
      try {
        const stats = await fs.stat(filePath)
        const content = await fs.readFile(filePath, 'utf-8')
        const dom = new JSDOM(content)
        const document = dom.window.document
        
        const fileInfo = {
          path: filePath,
          size: stats.size,
          title: this.extractTitle(document),
          type: this.detectFileType(filePath, document),
          images: document.querySelectorAll('img').length,
          links: document.querySelectorAll('a[href]').length,
          contentBlocks: this.countContentBlocks(document),
        }
        
        analysis.htmlFiles.push(fileInfo)
        analysis.structure.totalSize += stats.size
        
        if (fileInfo.type === 'project') {
          analysis.structure.projectFiles++
        }
        
        this.spinner.text = `Analyzing HTML files... ${analysis.htmlFiles.length}/${htmlFiles.length}`
      } catch (error) {
        console.warn(chalk.yellow(`⚠️ Could not analyze ${filePath}: ${error.message}`))
      }
    }
    
    this.spinner.succeed(`Analyzed ${analysis.htmlFiles.length} HTML files`)
  }
  
  private async analyzeAssets(analysis: ContentAnalysis) {
    this.spinner.start('Analyzing assets...')
    
    const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.pdf', '.doc', '.docx']
    const assetFiles = await this.findFiles(this.sourceDir, assetExtensions)
    
    // Get all image references from HTML
    const referencedAssets = new Set<string>()
    for (const htmlFile of analysis.htmlFiles) {
      const content = await fs.readFile(htmlFile.path, 'utf-8')
      const dom = new JSDOM(content)
      const images = dom.window.document.querySelectorAll('img[src]')
      
      images.forEach(img => {
        const src = img.getAttribute('src')
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
          const resolvedPath = path.resolve(path.dirname(htmlFile.path), src)
          referencedAssets.add(resolvedPath)
        }
      })
    }
    
    for (const filePath of assetFiles) {
      try {
        const stats = await fs.stat(filePath)
        const assetInfo = {
          path: filePath,
          size: stats.size,
          type: path.extname(filePath).toLowerCase(),
          used: referencedAssets.has(filePath),
        }
        
        analysis.assets.push(assetInfo)
        analysis.structure.totalAssets++
        analysis.structure.totalSize += stats.size
      } catch (error) {
        console.warn(chalk.yellow(`⚠️ Could not analyze asset ${filePath}: ${error.message}`))
      }
    }
    
    const unusedAssets = analysis.assets.filter(asset => !asset.used)
    
    this.spinner.succeed(`Analyzed ${analysis.assets.length} assets (${unusedAssets.length} unused)`)
  }
  
  private async detectDuplicateContent(analysis: ContentAnalysis) {
    this.spinner.start('Detecting duplicate content...')
    
    const contentHashes = new Map<string, string[]>()
    
    for (const htmlFile of analysis.htmlFiles) {
      try {
        const content = await fs.readFile(htmlFile.path, 'utf-8')
        const dom = new JSDOM(content)
        const textContent = dom.window.document.body?.textContent?.trim() || ''
        
        // Simple content hash (first 500 chars)
        const contentHash = textContent.substring(0, 500)
        
        if (!contentHashes.has(contentHash)) {
          contentHashes.set(contentHash, [])
        }
        contentHashes.get(contentHash)!.push(htmlFile.path)
      } catch (error) {
        // Skip this file
      }
    }
    
    // Find duplicates
    for (const [hash, files] of contentHashes) {
      if (files.length > 1 && hash.length > 100) {
        analysis.structure.duplicateContent.push({
          files,
          similarity: 1.0, // Simplified - could use more sophisticated comparison
        })
      }
    }
    
    this.spinner.succeed(`Found ${analysis.structure.duplicateContent.length} potential duplicates`)
  }
  
  private async extractTechnologies(analysis: ContentAnalysis) {
    this.spinner.start('Extracting technologies...')
    
    const techKeywords = [
      // Languages
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust',
      // Frameworks
      'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'gatsby', 'express', 'fastapi',
      // Tools
      'docker', 'kubernetes', 'git', 'jenkins', 'aws', 'azure', 'gcp', 'postgresql', 'mongodb',
      // Medical/Research
      'spss', 'r', 'stata', 'matlab', 'latex', 'pubmed', 'clinical trial', 'research',
    ]
    
    for (const htmlFile of analysis.htmlFiles) {
      try {
        const content = await fs.readFile(htmlFile.path, 'utf-8')
        const dom = new JSDOM(content)
        const textContent = dom.window.document.body?.textContent?.toLowerCase() || ''
        
        // Look for technology keywords
        techKeywords.forEach(tech => {
          if (textContent.includes(tech.toLowerCase())) {
            analysis.technologies.add(tech)
          }
        })
        
        // Look for technology tags/classes
        const techElements = dom.window.document.querySelectorAll('.tech, .technology, .skill, .tag')
        techElements.forEach(element => {
          const techName = element.textContent?.trim()
          if (techName) {
            analysis.technologies.add(techName)
          }
        })
      } catch (error) {
        // Skip this file
      }
    }
    
    this.spinner.succeed(`Extracted ${analysis.technologies.size} technologies`)
  }
  
  private async validateLinks(analysis: ContentAnalysis) {
    this.spinner.start('Validating links...')
    
    const allLinks = new Set<string>()
    
    for (const htmlFile of analysis.htmlFiles) {
      try {
        const content = await fs.readFile(htmlFile.path, 'utf-8')
        const dom = new JSDOM(content)
        const links = dom.window.document.querySelectorAll('a[href]')
        
        links.forEach(link => {
          const href = link.getAttribute('href')
          if (href) {
            allLinks.add(href)
          }
        })
      } catch (error) {
        // Skip this file
      }
    }
    
    for (const link of allLinks) {
      if (link.startsWith('http://') || link.startsWith('https://')) {
        analysis.urls.external.push(link)
      } else if (link.startsWith('#') || link.startsWith('/') || link.includes('.html')) {
        analysis.urls.internal.push(link)
        
        // Check if internal file exists
        if (link.includes('.html')) {
          const filePath = path.resolve(this.sourceDir, link.replace(/^\//, ''))
          if (!await fs.pathExists(filePath)) {
            analysis.urls.broken.push(link)
          }
        }
      }
    }
    
    this.spinner.succeed(`Validated ${allLinks.size} links (${analysis.urls.broken.length} broken)`)
  }
  
  private async generateSEOAnalysis(analysis: ContentAnalysis) {
    this.spinner.start('Analyzing SEO data...')
    
    for (const htmlFile of analysis.htmlFiles) {
      try {
        const content = await fs.readFile(htmlFile.path, 'utf-8')
        const dom = new JSDOM(content)
        const document = dom.window.document
        
        const title = document.querySelector('title')?.textContent || ''
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
        const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')?.split(',').map(k => k.trim()) || []
        
        const h1Count = document.querySelectorAll('h1').length
        const h2Count = document.querySelectorAll('h2').length
        
        const images = document.querySelectorAll('img')
        const imagesMissingAlt = Array.from(images).filter(img => !img.getAttribute('alt')).length
        
        analysis.seoData.push({
          file: htmlFile.path,
          title,
          description,
          keywords,
          h1Count,
          h2Count,
          imagesMissingAlt,
        })
      } catch (error) {
        // Skip this file
      }
    }
    
    this.spinner.succeed(`Analyzed SEO data for ${analysis.seoData.length} files`)
  }
  
  // Helper methods
  private extractTitle(document: Document): string {
    return document.querySelector('h1, title, .title')?.textContent?.trim() || 'Untitled'
  }
  
  private detectFileType(filePath: string, document: Document): 'project' | 'about' | 'testimonial' | 'blog' | 'other' {
    const filename = path.basename(filePath).toLowerCase()
    
    if (filename.includes('project') || filename.includes('research') || 
        document.querySelector('.project, .research')) {
      return 'project'
    }
    
    if (filename.includes('about') || filename.includes('bio') || filename === 'index.html') {
      return 'about'
    }
    
    if (filename.includes('testimonial') || filename.includes('reference') ||
        document.querySelector('.testimonial, .reference')) {
      return 'testimonial'
    }
    
    if (filename.includes('blog') || filename.includes('post') ||
        document.querySelector('.blog, .post, article')) {
      return 'blog'
    }
    
    return 'other'
  }
  
  private countContentBlocks(document: Document): number {
    const contentSelectors = [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'ul', 'ol', 'blockquote', 'pre', 'img'
    ]
    
    let count = 0
    contentSelectors.forEach(selector => {
      count += document.querySelectorAll(selector).length
    })
    
    return count
  }
  
  private async findHTMLFiles(dir: string): Promise<string[]> {
    return this.findFiles(dir, ['.html'])
  }
  
  private async findFiles(dir: string, extensions: string[]): Promise<string[]> {
    const files: string[] = []
    
    if (!await fs.pathExists(dir)) {
      return files
    }
    
    const items = await fs.readdir(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      
      if (item.isDirectory() && !item.name.startsWith('.')) {
        files.push(...await this.findFiles(fullPath, extensions))
      } else if (extensions.some(ext => item.name.toLowerCase().endsWith(ext))) {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  async generateReport(analysis: ContentAnalysis, outputPath: string) {
    const report = {
      summary: {
        totalFiles: analysis.structure.totalFiles,
        totalAssets: analysis.structure.totalAssets,
        totalSizeGB: (analysis.structure.totalSize / (1024 * 1024 * 1024)).toFixed(2),
        projectFiles: analysis.structure.projectFiles,
        duplicateContentGroups: analysis.structure.duplicateContent.length,
        technologiesFound: analysis.technologies.size,
        brokenLinks: analysis.urls.broken.length,
        imagesWithoutAlt: analysis.seoData.reduce((sum, seo) => sum + seo.imagesMissingAlt, 0),
      },
      files: analysis.htmlFiles,
      assets: analysis.assets,
      duplicateContent: analysis.structure.duplicateContent,
      technologies: Array.from(analysis.technologies),
      urls: analysis.urls,
      seoIssues: analysis.seoData.filter(seo => 
        !seo.title || !seo.description || seo.h1Count !== 1 || seo.imagesMissingAlt > 0
      ),
      recommendations: this.generateRecommendations(analysis),
      timestamp: new Date().toISOString(),
    }
    
    await fs.writeJson(outputPath, report, { spaces: 2 })
    
    // Console summary
    console.log(chalk.cyan('\n📈 Content Analysis Summary:'))
    console.log(`   HTML Files: ${analysis.structure.totalFiles}`)
    console.log(`   Project Files: ${analysis.structure.projectFiles}`)
    console.log(`   Assets: ${analysis.structure.totalAssets}`)
    console.log(`   Total Size: ${report.summary.totalSizeGB} GB`)
    console.log(`   Technologies: ${analysis.technologies.size}`)
    console.log(`   Broken Links: ${chalk.red(analysis.urls.broken.length)}`)
    console.log(`   SEO Issues: ${chalk.yellow(report.seoIssues.length)}`)
    
    if (analysis.structure.duplicateContent.length > 0) {
      console.log(chalk.yellow(`\n⚠️ Found ${analysis.structure.duplicateContent.length} duplicate content groups`))
    }
    
    console.log(chalk.cyan(`\n📄 Full analysis report saved to: ${outputPath}`))
    
    return report
  }
  
  private generateRecommendations(analysis: ContentAnalysis): string[] {
    const recommendations = []
    
    // SEO recommendations
    const missingTitles = analysis.seoData.filter(seo => !seo.title).length
    if (missingTitles > 0) {
      recommendations.push(`Add title tags to ${missingTitles} pages`)
    }
    
    const missingDescriptions = analysis.seoData.filter(seo => !seo.description).length
    if (missingDescriptions > 0) {
      recommendations.push(`Add meta descriptions to ${missingDescriptions} pages`)
    }
    
    // Image optimization
    const unusedAssets = analysis.assets.filter(asset => !asset.used).length
    if (unusedAssets > 0) {
      recommendations.push(`Remove ${unusedAssets} unused asset files`)
    }
    
    const totalImagesMissingAlt = analysis.seoData.reduce((sum, seo) => sum + seo.imagesMissingAlt, 0)
    if (totalImagesMissingAlt > 0) {
      recommendations.push(`Add alt text to ${totalImagesMissingAlt} images`)
    }
    
    // Content recommendations
    if (analysis.structure.duplicateContent.length > 0) {
      recommendations.push(`Review and consolidate ${analysis.structure.duplicateContent.length} duplicate content groups`)
    }
    
    if (analysis.urls.broken.length > 0) {
      recommendations.push(`Fix ${analysis.urls.broken.length} broken internal links`)
    }
    
    // Structure recommendations
    if (analysis.structure.projectFiles < 3) {
      recommendations.push('Consider adding more project case studies')
    }
    
    return recommendations
  }
}

// CLI usage
if (require.main === module) {
  const sourceDir = process.argv[2] || './old-site'
  const outputPath = process.argv[3] || './content-analysis.json'
  
  const analyzer = new ContentAnalyzer(sourceDir)
  
  analyzer.analyze()
    .then(analysis => analyzer.generateReport(analysis, outputPath))
    .then(() => {
      console.log(chalk.green('\n✅ Content analysis completed successfully!'))
    })
    .catch(error => {
      console.error(chalk.red('❌ Analysis failed:'), error)
      process.exit(1)
    })
}