# Content Migration System

## Overview

This comprehensive content migration system safely transfers all content from the existing HTML portfolio site to Sanity CMS with **zero data loss guarantee**. The system includes robust validation, error handling, rollback capabilities, and detailed reporting.

## Features

✅ **Zero Data Loss Guarantee** - Comprehensive backup and validation  
✅ **Resumable Migration** - Continues from failure points automatically  
✅ **Asset Migration with Retries** - Handles network issues gracefully  
✅ **HTML to Portable Text Conversion** - Preserves content structure  
✅ **URL Mapping Generation** - Automatic redirect configuration  
✅ **Comprehensive Validation** - Pre and post-migration checks  
✅ **Rollback Capability** - Complete reversal of changes  
✅ **Detailed Reporting** - Migration analytics and summaries  

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the project root:

```bash
# Required
SANITY_PROJECT_ID=your_project_id
SANITY_TOKEN=your_write_token

# Optional
SANITY_DATASET=production
SOURCE_DIR=../
DRY_RUN=false
```

### 2. Run Migration

```bash
# Dry run (recommended first)
npm run migrate:dry-run

# Full migration
npm run migrate

# Validate results
npm run migrate:validate
```

## Migration Scripts

### Core Commands

```bash
# Complete migration workflow
npm run migration:prepare  # Analyze + dry run + validate

# Individual commands
npm run migrate           # Full migration
npm run migrate:dry-run   # Test run without changes
npm run migrate:validate  # Validate migration data
npm run migrate:rollback  # Undo migration

# Analysis
npm run analyze          # Analyze new site structure
npm run analyze:old-site # Analyze source site
```

### Advanced Usage

```bash
# Custom source directory
SOURCE_DIR=./path/to/old/site npm run migrate

# Dry run mode
DRY_RUN=true npm run migrate

# Direct script execution
npx tsx scripts/migrate-content.ts migrate
npx tsx scripts/migrate-content.ts validate
npx tsx scripts/migrate-content.ts rollback
```

## Migration Process

### Phase 1: Preparation
1. **Environment Validation** - Check credentials and connectivity
2. **Directory Setup** - Create backup and report directories
3. **State Loading** - Resume from previous attempts if applicable

### Phase 2: Backup & Assets
1. **Comprehensive Backup** - All existing Sanity data and schemas
2. **Asset Discovery** - Find all images, PDFs, and files
3. **Asset Upload** - Transfer with retry logic and integrity checks

### Phase 3: Content Migration
1. **Profile Migration** - Extract from index.html (name, bio, contact, social links)
2. **Project Migration** - All research projects with metadata
3. **Testimonial Migration** - References and recommendations
4. **Skills & Statistics** - Certifications and achievements

### Phase 4: Verification
1. **Document Verification** - Ensure all documents exist in Sanity
2. **Asset Verification** - Confirm all assets uploaded correctly
3. **Relationship Verification** - Check document references
4. **URL Mapping Generation** - Create redirect configurations

## Content Mapping

### Source → Sanity Schema Mapping

| Source Content | Sanity Document Type | Key Fields |
|----------------|---------------------|------------|
| `index.html` | `profile` | name, bio, email, phone, socialLinks |
| `*_project.html` | `researchProject` | title, description, researchers, category |
| Testimonials | `testimonial` | name, title, quote, image |
| Skills | `skill` | name, level, category |
| Statistics | `statistic` | label, value, description |
| Images | `sanity.imageAsset` | Original with metadata |
| PDFs | `sanity.fileAsset` | Research posters and CV |

### URL Mappings

```
/index.html              → /
/airway_project.html     → /projects/airway-laryngoscopy-study
/chiari_project1.html    → /projects/chiari-geometric-analysis
/portfolio_scripts.html  → /projects/nrs-scale-demo
/assets/Current-CV.pdf   → /cv
```

## Validation System

### Pre-Migration Validation
- Environment variables check
- Sanity connectivity test
- Source directory existence
- Asset file accessibility

### Document Validation
- Required field presence
- Data type validation
- URL format checking
- Asset reference integrity
- Slug format validation

### Post-Migration Validation
- Document existence in Sanity
- Asset upload verification
- Relationship integrity
- URL mapping completeness

### Quality Assessment

| Metric | Excellent | Good | Fair | Poor |
|--------|-----------|------|------|------|
| Success Rate | ≥95% | ≥90% | ≥80% | <80% |
| Warning Rate | <10% | <20% | <40% | ≥40% |
| Data Loss Risk | None | Low | Medium | High |

## Error Handling & Recovery

### Automatic Recovery
- **Resumable Operations** - Continue from last successful state
- **Retry Logic** - 3 attempts for asset uploads with exponential backoff
- **State Persistence** - Migration progress saved continuously

### Manual Recovery
```bash
# Check migration state
cat migration-log.json

# Resume failed migration
npm run migrate

# Full rollback if needed
npm run migrate:rollback
```

### Common Issues

**Asset Upload Failures**
```bash
# Check network connectivity
# Verify Sanity token permissions
# Run: npm run migrate  # Will retry failed assets
```

**Content Parsing Errors**
```bash
# Check source HTML structure
# Review migration-report.json for specific errors
# Edit source files if necessary
```

**Validation Failures**
```bash
# Run: npm run migrate:validate
# Review validation-report.json
# Fix data issues and re-run migration
```

## Generated Files

### Reports
- `migration-report.json` - Comprehensive migration summary
- `validation-report.json` - Document validation results
- `migration-failure-report.json` - Error details (if applicable)

### Configurations
- `redirects.json` - Next.js redirect configuration
- `nginx-redirects.conf` - Nginx redirect rules
- `migration-log.json` - Internal state tracking

### Backups
- `migration-backups/backup-{timestamp}.json` - Complete Sanity backup
- Rollback data included in migration state

## Advanced Configuration

### Custom Content Extraction

Modify extraction methods in `migrate-content.ts`:

```typescript
private extractCustomField(document: Document): string {
  // Add custom field extraction logic
  return document.querySelector('.custom-selector')?.textContent || ''
}
```

### Custom Validation Rules

Extend validation schemas in `migration-validator.ts`:

```typescript
const CustomProjectSchema = ProjectValidationSchema.extend({
  customField: z.string().min(1, 'Custom field required'),
})
```

### Asset Processing

Customize asset handling:

```typescript
private async processAsset(filePath: string): Promise<string> {
  // Add custom asset processing (compression, format conversion, etc.)
  return processedAssetId
}
```

## Monitoring & Analytics

### Real-time Progress
```bash
# Terminal output shows:
✅ Asset migration: 45/67 uploaded, 22 skipped, 0 failed
✅ Content migration: 12/15 files processed
✅ Verification: All documents validated
```

### Success Metrics
- **Documents Migrated**: Count of successfully created documents
- **Assets Uploaded**: Count of successfully uploaded files
- **Zero Data Loss**: No content lost during migration
- **URL Coverage**: 100% of old URLs mapped to new structure

### Quality Indicators
- **Migration Quality**: Excellent/Good/Fair/Poor
- **Data Loss Risk**: None/Low/Medium/High
- **Validation Status**: Passed/Failed with details

## Troubleshooting

### Migration Fails to Start
1. Check environment variables are set correctly
2. Verify Sanity token has write permissions
3. Ensure source directory exists and is readable

### Partial Migration Completion
1. Check `migration-log.json` for progress
2. Review failed items in migration report
3. Re-run migration to continue from last state

### Asset Upload Issues
1. Verify file permissions on source assets
2. Check network connectivity to Sanity
3. Review file size limits (Sanity has 200MB limit)

### Validation Errors
1. Run validation separately: `npm run migrate:validate`
2. Review specific error messages in validation report
3. Fix source data and re-run migration

## Security Considerations

- **Token Security**: Store Sanity tokens securely, never commit to version control
- **Backup Security**: Migration backups contain all data, store securely
- **Asset Security**: Ensure migrated assets don't contain sensitive information
- **Access Control**: Verify Sanity project permissions are correctly configured

## Support

For issues or questions:

1. Check the generated error reports for detailed diagnostics
2. Review this documentation for common solutions
3. Verify environment setup matches requirements
4. Check Sanity project configuration and permissions

## Migration Checklist

- [ ] Environment variables configured
- [ ] Sanity project and dataset created
- [ ] Write token with proper permissions
- [ ] Source site files accessible
- [ ] Backup strategy in place
- [ ] Test migration run completed
- [ ] Validation passed
- [ ] URL redirects configured
- [ ] Content verification completed
- [ ] Migration documented and reported