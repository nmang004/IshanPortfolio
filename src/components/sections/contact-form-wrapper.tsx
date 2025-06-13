import dynamic from 'next/dynamic'

// Dynamic import with no SSR to ensure proper client component handling
const ContactForm = dynamic(
  () => import('./contact-form').then(mod => ({ default: mod.ContactForm })),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-[600px] bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>
    )
  }
)

export function ContactFormWrapper() {
  return <ContactForm />
}