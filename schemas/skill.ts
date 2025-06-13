import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'skillName',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming Languages', value: 'programming' },
          { title: 'Frameworks & Libraries', value: 'frameworks' },
          { title: 'Tools & Software', value: 'tools' },
          { title: 'Medical Skills', value: 'medical' },
          { title: 'Research Methods', value: 'research' },
          { title: 'Languages', value: 'languages' },
          { title: 'Soft Skills', value: 'soft-skills' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiencyLevel',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
      },
    }),
    defineField({
      name: 'skillType',
      title: 'Skill Type',
      type: 'string',
      options: {
        list: [
          { title: 'Technical', value: 'technical' },
          { title: 'Certification', value: 'certification' },
          { title: 'Language', value: 'language' },
          { title: 'Soft Skill', value: 'soft' },
        ],
      },
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'certificationDate',
      title: 'Certification Date',
      type: 'date',
      description: 'Date when certification was obtained (if applicable)',
    }),
    defineField({
      name: 'expirationDate',
      title: 'Expiration Date',
      type: 'date',
      description: 'Expiration date for certification (if applicable)',
    }),
    defineField({
      name: 'issuingOrganization',
      title: 'Issuing Organization',
      type: 'string',
      description: 'Organization that issued the certification',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the skill or how it was acquired',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this skill should appear within its category',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Skill',
      type: 'boolean',
      description: 'Display this skill prominently',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Display this skill on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Category, Display Order',
      name: 'categoryDisplayOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'displayOrder', direction: 'asc' },
      ],
    },
    {
      title: 'Proficiency Level',
      name: 'proficiencyLevel',
      by: [{ field: 'proficiencyLevel', direction: 'desc' }],
    },
    {
      title: 'Skill Name A-Z',
      name: 'skillNameAsc',
      by: [{ field: 'skillName', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'skillName',
      subtitle: 'category',
      description: 'proficiencyLevel',
    },
    prepare({ title, subtitle, description }) {
      return {
        title,
        subtitle: `${subtitle} • ${description}`,
      }
    },
  },
})