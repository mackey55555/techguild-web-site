import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '800', '900'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Tech Guild — 学生と企業が、地域のITを一緒に育てる。',
  description:
    'Tech Guildは、学生と企業が対等なパートナーとして共に学び、共につくるコミュニティです。ハッカソンや月次座談会・ディナーイベントを通じて、地域のIT人材育成を一緒に推進しています。',
  generator: 'v0.app',
  keywords: ['Tech Guild', 'コミュニティ', 'ハッカソン', '学生', '企業', 'IT', '共創', '地域'],
  openGraph: {
    title: 'Tech Guild',
    description: '学生と企業が、地域のITを一緒に育てる。',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
