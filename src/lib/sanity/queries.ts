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
  try {
    return await client.fetch(researchProjectBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// Helper function to get all projects  
export async function getProjects() {
  try {
    return await client.fetch(researchProjectsQuery)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
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
  try {
    return await client.fetch(profileQuery)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

// Helper function to get testimonials
export async function getTestimonials() {
  try {
    return await client.fetch(testimonialsQuery)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}