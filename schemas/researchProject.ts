import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'researchProject',
  title: 'Research Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Original Research', value: 'original-research' },
          { title: 'Review Article', value: 'review-article' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Meta-Analysis', value: 'meta-analysis' },
          { title: 'Clinical Trial', value: 'clinical-trial' },
          { title: 'Systematic Review', value: 'systematic-review' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'breadcrumbCategory',
      title: 'Breadcrumb Category',
      type: 'string',
      description: 'Category for breadcrumb navigation',
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'keyFindings',
      title: 'Key Findings',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'researchers',
      title: 'Researchers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
            },
            {
              name: 'affiliation',
              title: 'Affiliation',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'journal',
      title: 'Journal',
      type: 'string',
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Under Review', value: 'under-review' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Submitted', value: 'submitted' },
        ],
      },
    }),
    defineField({
      name: 'irbNumber',
      title: 'IRB Number',
      type: 'string',
      description: 'Institutional Review Board number',
    }),
    defineField({
      name: 'researchPoster',
      title: 'Research Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'supplementaryFiles',
      title: 'Supplementary Files',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Reference Number',
              type: 'number',
            },
            {
              name: 'citation',
              title: 'Citation',
              type: 'text',
            },
            {
              name: 'doi',
              title: 'DOI',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this project should appear',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Display this project prominently',
    }),
    defineField({
      name: 'seoMeta',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Published Date, Latest',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'researchPoster',
    },
  },
})