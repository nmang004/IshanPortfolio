import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Position Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if current position',
    }),
    defineField({
      name: 'current',
      title: 'Current Position',
      type: 'boolean',
      description: 'Check if this is a current position',
      initialValue: false,
    }),
    defineField({
      name: 'experienceType',
      title: 'Experience Type',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'education' },
          { title: 'Work Experience', value: 'work' },
          { title: 'Research', value: 'research' },
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Internship', value: 'internship' },
          { title: 'Leadership', value: 'leadership' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the role and responsibilities',
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key achievements or accomplishments',
    }),
    defineField({
      name: 'gpa',
      title: 'GPA',
      type: 'string',
      description: 'For educational experiences',
      hidden: ({ parent }) => parent?.experienceType !== 'education',
    }),
    defineField({
      name: 'classRank',
      title: 'Class Rank',
      type: 'string',
      description: 'For educational experiences',
      hidden: ({ parent }) => parent?.experienceType !== 'education',
    }),
    defineField({
      name: 'honors',
      title: 'Honors & Awards',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Academic honors, awards, or distinctions',
      hidden: ({ parent }) => parent?.experienceType !== 'education',
    }),
    defineField({
      name: 'skills',
      title: 'Skills Developed',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Skills gained or developed in this role',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order within experience type (lower numbers appear first)',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Experience',
      type: 'boolean',
      description: 'Display this experience prominently',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Display this experience on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Experience Type, Start Date (Latest)',
      name: 'typeStartDateDesc',
      by: [
        { field: 'experienceType', direction: 'asc' },
        { field: 'startDate', direction: 'desc' },
      ],
    },
    {
      title: 'Start Date (Latest)',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      startDate: 'startDate',
      endDate: 'endDate',
      current: 'current',
      experienceType: 'experienceType',
    },
    prepare({ title, subtitle, startDate, endDate, current, experienceType }) {
      const startYear = startDate ? new Date(startDate).getFullYear() : ''
      const endYear = current ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '')
      const dateRange = startYear && endYear ? `${startYear} - ${endYear}` : ''
      
      return {
        title,
        subtitle: `${subtitle} • ${experienceType}`,
        description: dateRange,
      }
    },
  },
})