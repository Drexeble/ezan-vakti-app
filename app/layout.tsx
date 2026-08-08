import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SettingsProvider } from '@/hooks/use-settings'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Namaz Vakitleri',
  description: 'Gelişmiş Namaz Vakitleri ve Kıble Uygulaması',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}