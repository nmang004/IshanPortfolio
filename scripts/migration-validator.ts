import { z } from 'zod'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'

// Comprehensive validation schemas
const PortableTextBlockSchema = z.object({
  _type: z.literal('block'),
  _key: z.string(),
  style: z.string(),
  children: z.array(z.object({
    _type: z.literal('span'),
    _key: z.string(),
    text: z.string(),
    marks: z.array(z.string()),
  })),
  markDefs: z.array(z.any()),
  listItem: z.string().optional(),
})

const ImageSchema = z.object({
  _type: z.literal('image'),
  _key: z.string().optional(),
  asset: z.object({
    _type: z.literal('reference'),
    _ref: z.string(),
  }),
  alt: z.string().optional(),
  caption: z.string().optional(),
})

const CodeBlockSchema = z.object({
  _type: z.literal('code'),
  _key: z.string(),
  language: z.string(),
  code: z.string(),
  filename: z.string().optional(),
})

const PortableTextSchema = z.array(
  z.union([
    PortableTextBlockSchema,
    ImageSchema,
    CodeBlockSchema,
  ])
)

const ProjectValidationSchema = z.object({
  _type: z.literal('project'),
  _id: z.string(),
  title: z.string().min(1, 'Title is required'),
  slug: z.object({
    current: z.string().min(1, 'Slug is required'),
  }),
  description: z.string(),
  content: PortableTextSchema.optional(),
  featuredImage: ImageSchema.optional(),
  gallery: z.array(ImageSchema).optional(),
  role: z.string(),
  projectType: z.string(),
  technologies: z.array(z.any()).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean(),
  publishedAt: z.string(),
})

const AuthorValidationSchema = z.object({
  _type: z.literal('author'),
  _id: z.string(),
  name: z.string().min(1, 'Name is required'),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  image: ImageSchema.optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url(),
  })).optional(),
})

const TestimonialValidationSchema = z.object({
  _type: z.literal('testimonial'),
  _id: z.string(),
  name: z.string().min(1, 'Name is required'),
  role: z.string(),
  company: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  image: ImageSchema.optional(),
  rating: z.number().min(1).max(5),
  featured: z.boolean(),
})

interface ValidationResult {
  valid: boolean
  errors: Array<{
    path: string
    message: string
    code: string
  }>
  warnings: Array<{
    path: string
    message: string
  }>
}

interface ValidationSummary {
  totalDocuments: number
  validDocuments: number
  invalidDocuments: number
  documentsWithWarnings: number
  errors: ValidationResult['errors']
  warnings: ValidationResult['warnings']
  dataLossRisk: 'none' | 'low' | 'medium' | 'high'
  migrationQuality: 'excellent' | 'good' | 'fair' | 'poor'
}

export class MigrationValidator {
  private schemas = {
    project: ProjectValidationSchema,
    author: AuthorValidationSchema,
    testimonial: TestimonialValidationSchema,
  }
  
  validateDocument(document: any): ValidationResult {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
    }
    
    // Basic structure validation
    if (!document._type) {
      result.valid = false
      result.errors.push({
        path: '_type',
        message: 'Document type is required',
        code: 'MISSING_TYPE',
      })
      return result
    }
    
    if (!document._id) {
      result.valid = false
      result.errors.push({
        path: '_id',
        message: 'Document ID is required',
        code: 'MISSING_ID',
      })
    }
    
    // Type-specific validation
    const schema = this.schemas[document._type as keyof typeof this.schemas]
    if (!schema) {
      result.warnings.push({
        path: '_type',
        message: `Unknown document type: ${document._type}`,
      })
      return result
    }
    
    try {
      schema.parse(document)
    } catch (error) {
      if (error instanceof z.ZodError) {
        result.valid = false
        result.errors.push(...error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code,
        })))
      }
    }
    
    // Content-specific validations
    this.validateProjectSpecific(document, result)
    this.validateAssetReferences(document, result)
    this.validateSlugUniqueness(document, result)
    
    return result
  }
  
  private validateProjectSpecific(document: any, result: ValidationResult) {
    if (document._type !== 'project') return
    
    // Check for empty content
    if (!document.content || document.content.length === 0) {
      result.warnings.push({
        path: 'content',
        message: 'Project has no content blocks',
      })
    }
    
    // Check for featured image
    if (!document.featuredImage) {
      result.warnings.push({
        path: 'featuredImage',
        message: 'Project has no featured image',
      })
    }
    
    // Validate URLs if present
    if (document.liveUrl && !this.isValidUrl(document.liveUrl)) {
      result.errors.push({
        path: 'liveUrl',
        message: 'Invalid live URL format',
        code: 'INVALID_URL',
      })
    }
    
    if (document.githubUrl && !this.isValidUrl(document.githubUrl)) {
      result.errors.push({
        path: 'githubUrl',
        message: 'Invalid GitHub URL format',
        code: 'INVALID_URL',
      })
    }
    
    // Check slug format
    if (document.slug?.current && !this.isValidSlug(document.slug.current)) {
      result.errors.push({
        path: 'slug.current',
        message: 'Slug contains invalid characters',
        code: 'INVALID_SLUG',
      })
    }
  }
  
  private validateAssetReferences(document: any, result: ValidationResult) {
    const checkAssetRef = (obj: any, path: string) => {
      if (obj && typeof obj === 'object') {
        if (obj._type === 'image' && obj.asset?._ref) {
          if (!obj.asset._ref.startsWith('image-')) {
            result.warnings.push({
              path,
              message: 'Asset reference may be invalid',
            })
          }
        }
        
        // Recursively check nested objects
        Object.keys(obj).forEach(key => {
          checkAssetRef(obj[key], `${path}.${key}`)
        })
      } else if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          checkAssetRef(item, `${path}[${index}]`)
        })
      }
    }
    
    checkAssetRef(document, '')
  }
  
  private validateSlugUniqueness(document: any, result: ValidationResult) {
    // This would typically check against existing documents in Sanity
    // For now, we'll just validate the slug format
    if (document.slug?.current) {
      const slug = document.slug.current
      if (slug.length > 100) {
        result.warnings.push({
          path: 'slug.current',
          message: 'Slug is very long, consider shortening',
        })
      }
    }
  }
  
  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  private isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  }
  
  private assessDataLossRisk(summary: ValidationSummary): 'none' | 'low' | 'medium' | 'high' {
    const errorRate = summary.totalDocuments > 0 ? summary.invalidDocuments / summary.totalDocuments : 0
    const criticalErrors = summary.errors.filter(error => 
      error.code === 'MISSING_TYPE' || 
      error.code === 'MISSING_ID' ||
      error.message.includes('required')
    ).length
    
    if (criticalErrors > 0 || errorRate > 0.2) return 'high'
    if (errorRate > 0.1 || summary.warnings.length > summary.totalDocuments * 0.5) return 'medium'
    if (errorRate > 0.05 || summary.warnings.length > 0) return 'low'
    return 'none'
  }
  
  private assessMigrationQuality(summary: ValidationSummary): 'excellent' | 'good' | 'fair' | 'poor' {
    const successRate = summary.totalDocuments > 0 ? summary.validDocuments / summary.totalDocuments : 0
    const warningRate = summary.totalDocuments > 0 ? summary.documentsWithWarnings / summary.totalDocuments : 0
    
    if (successRate >= 0.95 && warningRate < 0.1) return 'excellent'
    if (successRate >= 0.9 && warningRate < 0.2) return 'good'
    if (successRate >= 0.8 && warningRate < 0.4) return 'fair'
    return 'poor'
  }
  
  private getColoredRisk(risk: string): string {
    switch (risk) {
      case 'none': return chalk.green(risk)
      case 'low': return chalk.yellow(risk)
      case 'medium': return chalk.hex('#FFA500')(risk) // Orange
      case 'high': return chalk.red(risk)
      default: return risk
    }
  }
  
  private getColoredQuality(quality: string): string {
    switch (quality) {
      case 'excellent': return chalk.green(quality)
      case 'good': return chalk.cyan(quality)
      case 'fair': return chalk.yellow(quality)
      case 'poor': return chalk.red(quality)
      default: return quality
    }
  }
  
  validateMigrationIntegrity(migrationReportPath: string): Promise<{
    assetsIntegrity: boolean
    documentsIntegrity: boolean
    urlMappingsIntegrity: boolean
    overallIntegrity: boolean
    issues: string[]
  }> {
    return new Promise(async (resolve) => {
      const issues: string[] = []
      let assetsIntegrity = true
      let documentsIntegrity = true
      let urlMappingsIntegrity = true
      
      try {
        const report = await fs.readJson(migrationReportPath)
        
        // Check assets integrity
        if (!report.assets || !Array.isArray(report.assets)) {
          issues.push('Assets data missing or invalid format')
          assetsIntegrity = false
        } else {
          const invalidAssets = report.assets.filter((asset: any) => 
            !asset.path || !asset.sanityId
          )
          if (invalidAssets.length > 0) {
            issues.push(`${invalidAssets.length} assets have invalid references`)
            assetsIntegrity = false
          }
        }
        
        // Check documents integrity
        if (!report.documents || !Array.isArray(report.documents)) {
          issues.push('Documents data missing or invalid format')
          documentsIntegrity = false
        } else {
          const invalidDocs = report.documents.filter((doc: any) => 
            !doc._id || !doc._type || !doc.title
          )
          if (invalidDocs.length > 0) {
            issues.push(`${invalidDocs.length} documents have missing required fields`)
            documentsIntegrity = false
          }
        }
        
        // Check URL mappings integrity
        if (!report.urlMappings || !Array.isArray(report.urlMappings)) {
          issues.push('URL mappings missing or invalid format')
          urlMappingsIntegrity = false
        } else {
          const invalidMappings = report.urlMappings.filter((mapping: any) => 
            !mapping.oldUrl || !mapping.newUrl || !mapping._id
          )
          if (invalidMappings.length > 0) {
            issues.push(`${invalidMappings.length} URL mappings are incomplete`)
            urlMappingsIntegrity = false
          }
        }
        
      } catch (error) {
        issues.push(`Failed to read migration report: ${error.message}`)
        assetsIntegrity = false
        documentsIntegrity = false
        urlMappingsIntegrity = false
      }
      
      resolve({
        assetsIntegrity,
        documentsIntegrity,
        urlMappingsIntegrity,
        overallIntegrity: assetsIntegrity && documentsIntegrity && urlMappingsIntegrity,
        issues,
      })
    })
  }
  
  async validateMigrationData(documentsPath: string): Promise<ValidationSummary> {
    const summary: ValidationSummary = {
      totalDocuments: 0,
      validDocuments: 0,
      invalidDocuments: 0,
      documentsWithWarnings: 0,
      errors: [],
      warnings: [],
      dataLossRisk: 'none',
      migrationQuality: 'excellent',
    }
    
    console.log(chalk.blue('🔍 Validating migration data...'))
    
    let documents: any[] = []
    
    if (await fs.pathExists(documentsPath)) {
      if (documentsPath.endsWith('.json')) {
        // Single JSON file
        documents = await fs.readJson(documentsPath)
      } else {
        // Directory with multiple JSON files
        const files = await fs.readdir(documentsPath)
        for (const file of files) {
          if (file.endsWith('.json')) {
            const filePath = path.join(documentsPath, file)
            const fileData = await fs.readJson(filePath)
            if (Array.isArray(fileData)) {
              documents.push(...fileData)
            } else {
              documents.push(fileData)
            }
          }
        }
      }
    } else {
      throw new Error(`Migration data not found at: ${documentsPath}`)
    }
    
    summary.totalDocuments = documents.length
    
    for (const [index, document] of documents.entries()) {
      const validation = this.validateDocument(document)
      
      if (validation.valid) {
        summary.validDocuments++
      } else {
        summary.invalidDocuments++
        summary.errors.push(...validation.errors.map(error => ({
          ...error,
          path: `document[${index}].${error.path}`,
        })))
      }
      
      if (validation.warnings.length > 0) {
        summary.documentsWithWarnings++
        summary.warnings.push(...validation.warnings.map(warning => ({
          ...warning,
          path: `document[${index}].${warning.path}`,
        })))
      }
    }
    
    // Assess data loss risk and migration quality
    summary.dataLossRisk = this.assessDataLossRisk(summary)
    summary.migrationQuality = this.assessMigrationQuality(summary)
    
    return summary
  }
  
  async generateValidationReport(summary: ValidationSummary, outputPath: string) {
    const report = {
      summary: {
        totalDocuments: summary.totalDocuments,
        validDocuments: summary.validDocuments,
        invalidDocuments: summary.invalidDocuments,
        documentsWithWarnings: summary.documentsWithWarnings,
        validationPassed: summary.invalidDocuments === 0,
      },
      errors: summary.errors,
      warnings: summary.warnings,
      timestamp: new Date().toISOString(),
    }
    
    await fs.writeJson(outputPath, report, { spaces: 2 })
    
    // Console output
    console.log(chalk.cyan('
📄 Validation Summary:'))
    console.log(`   Total Documents: ${summary.totalDocuments}`)
    console.log(`   Valid: ${chalk.green(summary.validDocuments)}`)
    console.log(`   Invalid: ${chalk.red(summary.invalidDocuments)}`)
    console.log(`   With Warnings: ${chalk.yellow(summary.documentsWithWarnings)}`)
    console.log(`   Data Loss Risk: ${this.getColoredRisk(summary.dataLossRisk)}`)
    console.log(`   Migration Quality: ${this.getColoredQuality(summary.migrationQuality)}`)
    
    if (summary.errors.length > 0) {
      console.log(chalk.red('\n❌ Validation Errors:'))
      summary.errors.slice(0, 10).forEach(error => {
        console.log(chalk.red(`   • ${error.path}: ${error.message}`))
      })
      if (summary.errors.length > 10) {
        console.log(chalk.red(`   ... and ${summary.errors.length - 10} more errors`))
      }
    }
    
    if (summary.warnings.length > 0) {
      console.log(chalk.yellow('\n⚠️ Validation Warnings:'))
      summary.warnings.slice(0, 5).forEach(warning => {
        console.log(chalk.yellow(`   • ${warning.path}: ${warning.message}`))
      })
      if (summary.warnings.length > 5) {
        console.log(chalk.yellow(`   ... and ${summary.warnings.length - 5} more warnings`))
      }
    }
    
    console.log(chalk.cyan(`\n📄 Full validation report saved to: ${outputPath}`))
    
    return summary.invalidDocuments === 0
  }
}

// CLI usage
if (require.main === module) {
  const validator = new MigrationValidator()
  const dataPath = process.argv[2] || './migration-report.json'
  const outputPath = process.argv[3] || './validation-report.json'
  
  validator.validateMigrationData(dataPath)
    .then(summary => validator.generateValidationReport(summary, outputPath))
    .then(passed => {
      process.exit(passed ? 0 : 1)
    })
    .catch(error => {
      console.error(chalk.red('❌ Validation failed:'), error)
      process.exit(1)
    })
}