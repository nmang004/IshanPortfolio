import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/lib/utils/cn'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AnalyticsProvider } from '@/components/providers/analytics-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ishan Perera - Medical Student & Researcher',
    template: '%s | Ishan Perera',
  },
  description: 'Medical student at Edward Via College of Osteopathic Medicine with expertise in research, business, and technology.',
  keywords: ['medical student', 'research', 'osteopathic medicine', 'VCOM', 'business', 'technology'],
  authors: [{ name: 'Ishan Perera' }],
  creator: 'Ishan Perera',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Ishan Perera - Medical Student & Researcher',
    description: 'Medical student at Edward Via College of Osteopathic Medicine with expertise in research, business, and technology.',
    siteName: 'Ishan Perera',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishan Perera - Medical Student & Researcher',
    description: 'Medical student at Edward Via College of Osteopathic Medicine with expertise in research, business, and technology.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable,
        jetbrainsMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
