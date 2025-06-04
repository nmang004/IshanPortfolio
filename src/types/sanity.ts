// Sanity document types generated from schemas
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Profile {
  _id: string
  fullName: string
  currentTitle: string
  heroRoles: string[]
  profileImage: SanityImage
  heroBackground: SanityImage
  biography: unknown[] // Block content
  currentCV: SanityFile
  contactInfo: ContactInfo
  socialLinks: SocialLink[]
  businessLinks: BusinessLink[]
  featuredProjects: ResearchProject[]
  seoMeta: SeoMeta
}

export interface ResearchProject {
  _id: string
  title: string
  slug: { current: string }
  category: string
  breadcrumbCategory: string
  researchers: Researcher[]
  awards: string[]
  abstract: string
  references: Reference[]
  methodology: unknown[] // Block content
  publishedDate: string
  journal?: string
  doi?: string
  status: string
  irbNumber?: string
  researchPoster: SanityImage
  supplementaryFiles: SanityFile[]
  tags: string[]
  keyFindings: string[]
  displayOrder: number
  isFeatured: boolean
  seoMeta: SeoMeta
}

export interface Testimonial {
  _id: string
  authorName: string
  authorTitle: string
  authorImage: SanityImage
  organization: string
  testimonialText: string
  relationship: string
  contactAvailable: boolean
  displayOrder: number
  isActive: boolean
  isFeatured: boolean
}

export interface Skill {
  _id: string
  skillName: string
  category: string
  proficiencyLevel: number
  skillType: string
  yearsExperience?: number
  certificationDate?: string
  expirationDate?: string
  issuingOrganization?: string
  description?: string
  displayOrder: number
  isActive: boolean
  isFeatured: boolean
}

export interface Experience {
  _id: string
  title: string
  organization: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  experienceType: string
  description: unknown[] // Block content
  achievements: string[]
  gpa?: string
  classRank?: string
  honors: string[]
  skills: string[]
  displayOrder: number
  isActive: boolean
  isFeatured: boolean
}

export interface Statistic {
  _id: string
  title: string
  value: number
  suffix?: string
  description: string
  icon?: string
  color: string
  animationDuration: number
  displayOrder: number
  isActive: boolean
  isFeatured: boolean
}

export interface SiteConfig {
  _id: string
  heroAnimationSpeed: number
  heroBackSpeed: number
  heroBackDelay: number
  counterAnimationDuration: number
  testimonialAutoplay: boolean
  testimonialDelay: number
  smoothScrolling: boolean
  scrollOffset: number
  aosDuration: number
  aosEasing: string
  mobileBreakpoint: number
}

// Object types
export interface ContactInfo {
  email: string
  phone?: string
  location?: string
  mapEmbed?: string
  availableForContact: boolean
}

export interface SocialLink {
  platform: string
  url: string
  username?: string
  isActive: boolean
  displayOrder: number
}

export interface BusinessLink {
  name: string
  url: string
  description?: string
  category: string
  isActive: boolean
  displayOrder: number
  isFeatured: boolean
}

export interface Researcher {
  name: string
  role: string
  order: number
  affiliation?: string
  email?: string
  isCorrespondingAuthor: boolean
  contribution?: string
}

export interface Reference {
  number: number
  citation: string
  authors: string
  title: string
  journal: string
  year: number
  doi?: string
  pmid?: string
  url?: string
  accessDate?: string
  notes?: string
}

export interface SeoMeta {
  metaTitle?: string
  metaDescription?: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: SanityImage
  twitterCard?: string
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
}