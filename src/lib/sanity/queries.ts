import { groq } from 'next-sanity'
import { client } from './client'

export const profileQuery = groq`
  *[_type == "profile"][0] {
    _id,
    fullName,
    currentTitle,
    heroRoles,
    profileImage,
    heroBackground,
    biography,
    currentCV,
    contactInfo,
    socialLinks,
    businessLinks,
    featuredProjects[]-> {
      _id,
      title,
      slug,
      category,
      abstract,
      researchPoster
    },
    seoMeta
  }
`

export const researchProjectsQuery = groq`
  *[_type == "researchProject"] | order(displayOrder asc) {
    _id,
    title,
    slug,
    category,
    breadcrumbCategory,
    researchers,
    awards,
    abstract,
    publishedDate,
    researchPoster,
    tags,
    keyFindings,
    displayOrder,
    isFeatured,
    seoMeta
  }
`

export const researchProjectBySlugQuery = groq`
  *[_type == "researchProject" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    breadcrumbCategory,
    researchers,
    awards,
    abstract,
    references,
    methodology,
    publishedDate,
    journal,
    doi,
    status,
    irbNumber,
    researchPoster,
    supplementaryFiles,
    tags,
    keyFindings,
    displayOrder,
    isFeatured,
    seoMeta
  }
`

// Helper function to get single project
export async function getProject(slug: string) {
  // Skip Sanity call if not properly configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'fallback-disabled') {
    return {
      _id: 'fallback',
      title: 'Sample Research Project',
      slug: { current: slug },
      category: 'Original Research',
      abstract: 'This is a sample project displayed when the content management system is not configured.',
      publishedDate: '2024-01-01',
      researchers: [{ name: 'Ishan Perera', role: 'Lead Researcher', affiliation: 'Medical School' }],
      references: [],
      awards: ['Outstanding Research Award 2024'],
      keyFindings: ['Significant findings in medical research', 'Innovative methodology developed'],
      tags: ['Medical Research', 'Innovation'],
      methodology: [],
      journal: 'Journal of Medical Research',
      doi: '10.1000/sample.doi',
      status: 'published',
      irbNumber: 'IRB-2024-001'
    }
  }

  try {
    const result = await client.fetch(researchProjectBySlugQuery, { slug })
    return result
  } catch (error) {
    console.error('Error fetching project:', error)
    // Return a fallback project structure to prevent build errors
    return {
      _id: 'fallback',
      title: 'Project Not Found',
      slug: { current: slug },
      category: 'General',
      abstract: 'This project could not be loaded from the content management system.',
      publishedDate: null,
      researchers: [],
      references: [],
      awards: [],
      keyFindings: [],
      tags: []
    }
  }
}

// Helper function to get all projects  
export async function getProjects() {
  // Skip Sanity call if not properly configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'fallback-disabled') {
    return [
      {
        _id: 'fallback-1',
        title: 'Sample Research Project',
        slug: { current: 'sample-project' },
        category: 'Original Research',
        abstract: 'This is a sample project displayed when the content management system is not configured.',
        publishedDate: '2024-01-01',
        researchers: [{ name: 'Ishan Perera', role: 'Lead Researcher' }],
        awards: ['Outstanding Research Award 2024'],
        tags: ['Medical Research', 'Innovation'],
        keyFindings: ['Significant findings in medical research'],
        displayOrder: 1,
        isFeatured: true
      }
    ]
  }

  try {
    const result = await client.fetch(researchProjectsQuery)
    return result || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return fallback projects to prevent build errors
    return [
      {
        _id: 'fallback-1',
        title: 'Sample Research Project',
        slug: { current: 'sample-project' },
        category: 'Original Research',
        abstract: 'This is a sample project displayed when the content management system is unavailable.',
        publishedDate: '2024-01-01',
        researchers: [],
        awards: [],
        tags: ['Sample'],
        keyFindings: [],
        displayOrder: 1,
        isFeatured: true
      }
    ]
  }
}

export const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive == true] | order(displayOrder asc) {
    _id,
    authorName,
    authorTitle,
    authorImage,
    organization,
    testimonialText,
    relationship,
    displayOrder,
    isFeatured
  }
`

export const skillsQuery = groq`
  *[_type == "skill" && isActive == true] | order(category asc, displayOrder asc) {
    _id,
    skillName,
    category,
    proficiencyLevel,
    skillType,
    yearsExperience,
    certificationDate,
    expirationDate,
    issuingOrganization,
    description,
    displayOrder,
    isFeatured
  }
`

export const experiencesQuery = groq`
  *[_type == "experience" && isActive == true] | order(experienceType asc, startDate desc) {
    _id,
    title,
    organization,
    location,
    startDate,
    endDate,
    current,
    experienceType,
    description,
    achievements,
    gpa,
    classRank,
    honors,
    skills,
    displayOrder,
    isFeatured
  }
`

export const statisticsQuery = groq`
  *[_type == "statistic" && isActive == true] | order(displayOrder asc) {
    _id,
    title,
    value,
    suffix,
    description,
    icon,
    color,
    animationDuration,
    displayOrder,
    isFeatured
  }
`

export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    _id,
    heroAnimationSpeed,
    heroBackSpeed,
    heroBackDelay,
    counterAnimationDuration,
    testimonialAutoplay,
    testimonialDelay,
    smoothScrolling,
    scrollOffset,
    aosDuration,
    aosEasing,
    mobileBreakpoint
  }
`

// Helper function to get profile data
export async function getProfile() {
  // Skip Sanity call if not properly configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'fallback-disabled') {
    return {
      _id: 'fallback-profile',
      fullName: 'Ishan Perera',
      currentTitle: 'Medical Student • Researcher • Business Owner • Developer',
      heroRoles: ['Medical Student', 'Researcher', 'Business Owner', 'Developer'],
      biography: 'Medical student with interests in research, business, and technology. This is sample content displayed when the content management system is not configured.',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/ishanperera' },
        { platform: 'github', url: 'https://github.com/ishanperera' }
      ],
      businessLinks: [],
      featuredProjects: []
    }
  }

  try {
    const result = await client.fetch(profileQuery)
    return result
  } catch (error) {
    console.error('Error fetching profile:', error)
    // Return fallback profile to prevent build errors
    return {
      _id: 'fallback-profile',
      fullName: 'Ishan Perera',
      currentTitle: 'Medical Student • Researcher • Business Owner • Developer',
      heroRoles: ['Medical Student', 'Researcher', 'Business Owner', 'Developer'],
      biography: 'Medical student with interests in research, business, and technology.',
      socialLinks: [],
      businessLinks: [],
      featuredProjects: []
    }
  }
}

// Helper function to get testimonials
export async function getTestimonials() {
  // Skip Sanity call if not properly configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'fallback-disabled') {
    return [
      {
        _id: 'fallback-testimonial-1',
        authorName: 'Dr. Sarah Johnson',
        authorTitle: 'Research Supervisor',
        organization: 'Medical Research Institute',
        testimonialText: 'Ishan is an exceptional researcher with a keen eye for detail and innovative approaches to complex medical problems.',
        relationship: 'supervisor',
        displayOrder: 1,
        isFeatured: true
      },
      {
        _id: 'fallback-testimonial-2',
        authorName: 'Prof. Michael Chen',
        authorTitle: 'Department Head',
        organization: 'University Medical Center',
        testimonialText: 'Outstanding academic performance and dedication to advancing medical knowledge through rigorous research.',
        relationship: 'professor',
        displayOrder: 2,
        isFeatured: true
      }
    ]
  }

  try {
    const result = await client.fetch(testimonialsQuery)
    return result || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    // Return fallback testimonials to prevent build errors
    return [
      {
        _id: 'fallback-testimonial',
        authorName: 'Sample Reference',
        authorTitle: 'Professional Reference',
        organization: 'Sample Organization',
        testimonialText: 'This is a sample testimonial displayed when the content management system is unavailable.',
        relationship: 'Professional',
        displayOrder: 1,
        isFeatured: true
      }
    ]
  }
}