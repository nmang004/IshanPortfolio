import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'Company, institution, or organization',
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship',
      type: 'string',
      options: {
        list: [
          { title: 'Supervisor', value: 'supervisor' },
          { title: 'Colleague', value: 'colleague' },
          { title: 'Mentor', value: 'mentor' },
          { title: 'Client', value: 'client' },
          { title: 'Professor', value: 'professor' },
          { title: 'Peer', value: 'peer' },
          { title: 'Research Collaborator', value: 'research-collaborator' },
          { title: 'Professional Reference', value: 'professional' },
        ],
      },
      description: 'Relationship to the testimonial author',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which testimonials should appear',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Display this testimonial prominently',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Display this testimonial on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Author Name A-Z',
      name: 'authorNameAsc',
      by: [{ field: 'authorName', direction: 'asc' }],
    },
    {
      title: 'Relationship',
      name: 'relationship',
      by: [{ field: 'relationship', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorTitle',
      media: 'authorImage',
      organization: 'organization',
      relationship: 'relationship',
    },
    prepare({ title, subtitle, media, organization, relationship }) {
      return {
        title,
        subtitle: `${subtitle}${organization ? ` at ${organization}` : ''} • ${relationship}`,
        media,
      }
    },
  },
})