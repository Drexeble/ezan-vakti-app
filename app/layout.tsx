import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ezan Vakitleri & Kıble Pusulası',
  description: 'Canlı kıble pusulası, sesli ezan vakitleri ve dualar uygulaması',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}