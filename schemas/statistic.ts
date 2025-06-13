import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statistic',
  title: 'Statistic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g., "+", "%", "years", etc.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "award", "users", "calendar")',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' },
          { title: 'Info', value: 'info' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'animationDuration',
      title: 'Animation Duration (seconds)',
      type: 'number',
      description: 'Duration for the counting animation',
      initialValue: 2,
      validation: (Rule) => Rule.min(0.5).max(10),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which statistics should appear',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Statistic',
      type: 'boolean',
      description: 'Display this statistic prominently',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Display this statistic on the website',
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
      title: 'Value (Highest)',
      name: 'valueDesc',
      by: [{ field: 'value', direction: 'desc' }],
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
      value: 'value',
      suffix: 'suffix',
      description: 'description',
    },
    prepare({ title, value, suffix, description }) {
      return {
        title,
        subtitle: `${value}${suffix || ''} • ${description || ''}`,
      }
    },
  },
})