import type { Metadata } from 'next'
import { satoshi, jetbrains } from './fonts'
import { site } from '@/lib/site'
import Footer from './components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://kyleskudlarek.com'),
  title: {
    // Home tab shows just the name; interior pages keep "Page — Name".
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description:
    'Kyle Skudlarek is a full-stack software developer in Austin working on generative AI, enterprise systems, and web design.',
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: 'Projects, writing, and everything else worth showing the world.',
    url: 'https://kyleskudlarek.com',
    siteName: site.name,
    images: ['/hero.webp'],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen">
        {children}
        <Footer />
      </body>
    </html>
  )
}
