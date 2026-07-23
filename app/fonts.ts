import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// Satoshi — self-hosted so the hero type carries no external request.
export const satoshi = localFont({
  variable: '--font-satoshi',
  display: 'swap',
  src: [
    { path: './fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
})

export const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})
