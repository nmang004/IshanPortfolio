import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'heroAnimationSpeed',
      title: 'Hero Animation Speed',
      type: 'number',
      description: 'Speed of hero section animations (in seconds)',
      initialValue: 1,
      validation: (Rule) => Rule.min(0.1).max(10),
    }),
    defineField({
      name: 'heroBackSpeed',
      title: 'Hero Background Speed',
      type: 'number',
      description: 'Speed of hero background animations',
      initialValue: 1,
      validation: (Rule) => Rule.min(0.1).max(5),
    }),
    defineField({
      name: 'heroBackDelay',
      title: 'Hero Background Delay',
      type: 'number',
      description: 'Delay before hero background animation starts (in seconds)',
      initialValue: 0.5,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'counterAnimationDuration',
      title: 'Counter Animation Duration',
      type: 'number',
      description: 'Duration for statistic counter animations (in seconds)',
      initialValue: 2,
      validation: (Rule) => Rule.min(0.5).max(10),
    }),
    defineField({
      name: 'testimonialAutoplay',
      title: 'Testimonial Autoplay',
      type: 'boolean',
      description: 'Enable automatic testimonial rotation',
      initialValue: true,
    }),
    defineField({
      name: 'testimonialDelay',
      title: 'Testimonial Delay',
      type: 'number',
      description: 'Delay between testimonial rotations (in seconds)',
      initialValue: 5,
      validation: (Rule) => Rule.min(2).max(30),
      hidden: ({ parent }) => !parent?.testimonialAutoplay,
    }),
    defineField({
      name: 'smoothScrolling',
      title: 'Smooth Scrolling',
      type: 'boolean',
      description: 'Enable smooth scrolling for navigation links',
      initialValue: true,
    }),
    defineField({
      name: 'scrollOffset',
      title: 'Scroll Offset',
      type: 'number',
      description: 'Offset for scroll-to-section navigation (in pixels)',
      initialValue: 80,
      validation: (Rule) => Rule.min(0).max(200),
    }),
    defineField({
      name: 'aosDuration',
      title: 'AOS Animation Duration',
      type: 'number',
      description: 'Duration for Animate On Scroll effects (in milliseconds)',
      initialValue: 600,
      validation: (Rule) => Rule.min(200).max(3000),
    }),
    defineField({
      name: 'aosEasing',
      title: 'AOS Easing',
      type: 'string',
      description: 'Easing function for AOS animations',
      options: {
        list: [
          { title: 'Ease', value: 'ease' },
          { title: 'Ease In', value: 'ease-in' },
          { title: 'Ease Out', value: 'ease-out' },
          { title: 'Ease In Out', value: 'ease-in-out' },
          { title: 'Linear', value: 'linear' },
        ],
      },
      initialValue: 'ease-out',
    }),
    defineField({
      name: 'mobileBreakpoint',
      title: 'Mobile Breakpoint',
      type: 'number',
      description: 'Breakpoint for mobile responsive design (in pixels)',
      initialValue: 768,
      validation: (Rule) => Rule.min(320).max(1024),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Configuration',
        subtitle: 'Global site settings and animations',
      }
    },
  },
})