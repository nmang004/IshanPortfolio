import { Metadata } from 'next'
import { ResearchProject } from '@/types/sanity'
import { urlFor } from '@/lib/sanity/image'

export function generateProjectMetadata(project: ResearchProject): Metadata {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug.current}`
  const ogImage = project.researchPoster ? urlFor(project.researchPoster).width(1200).height(630).url() : undefined

  return {
    title: project.title,
    description: project.abstract,
    keywords: project.tags,
    authors: project.researchers?.map(r => ({ name: r.name })),
    creator: 'Ishan Perera',
    publisher: 'Ishan Perera',
    openGraph: {
      type: 'article',
      url,
      title: project.title,
      description: project.abstract,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : undefined,
      publishedTime: project.publishedDate,
      authors: project.researchers?.map(r => r.name),
      tags: project.tags,
      siteName: 'Ishan Perera Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.abstract,
      images: ogImage ? [ogImage] : undefined,
      creator: '@ishanperera',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStructuredData(project: ResearchProject) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.slug.current}`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': url,
    name: project.title,
    description: project.abstract,
    url,
    author: project.researchers?.map(r => ({
      '@type': 'Person',
      name: r.name,
      affiliation: r.affiliation || 'Edward Via College of Osteopathic Medicine',
    })),
    datePublished: project.publishedDate,
    dateModified: project.publishedDate,
    keywords: project.tags?.join(', '),
    genre: project.category,
    image: project.researchPoster ? urlFor(project.researchPoster).url() : undefined,
    mainEntity: {
      '@type': 'ScholarlyArticle',
      name: project.title,
      abstract: project.abstract,
      author: project.researchers?.map(r => ({
        '@type': 'Person',
        name: r.name,
      })),
      datePublished: project.publishedDate,
      publisher: {
        '@type': 'Organization',
        name: project.journal || 'Edward Via College of Osteopathic Medicine',
      },
      identifier: project.doi ? {
        '@type': 'PropertyValue',
        propertyID: 'DOI',
        value: project.doi,
      } : undefined,
    },
  }
}