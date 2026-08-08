import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SettingsProvider } from '@/hooks/use-settings'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ezan Vakitleri & Kıble Pusulası',
  description: 'Canlı kıble pusulası, sesli ezan vakitleri ve dualar uygulaması',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        <SettingsProvider>
          {children}
        </SettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}