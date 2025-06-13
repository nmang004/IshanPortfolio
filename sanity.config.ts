import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'ishan-portfolio',
  title: 'Ishan Portfolio CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'aonp1fh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/studio',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Profile')
              .id('profile')
              .child(S.document().schemaType('profile').documentId('profile')),
            S.divider(),
            S.listItem()
              .title('Research Projects')
              .schemaType('researchProject')
              .child(S.documentTypeList('researchProject').title('Research Projects')),
            S.listItem()
              .title('Skills')
              .schemaType('skill')
              .child(S.documentTypeList('skill').title('Skills')),
            S.listItem()
              .title('Experiences')
              .schemaType('experience')
              .child(S.documentTypeList('experience').title('Experiences')),
            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.divider(),
            S.listItem()
              .title('Site Configuration')
              .id('siteConfig')
              .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
          ])
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Optional: Configure document actions
  document: {
    actions: (prev, context) => {
      // Remove duplicate action for singleton documents
      if (context.schemaType === 'profile' || context.schemaType === 'siteConfig') {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      return prev
    },
  },
})