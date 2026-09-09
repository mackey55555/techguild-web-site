import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { HackathonHero } from '@/components/hackathon/hackathon-hero'
import { HackathonTheme } from '@/components/hackathon/hackathon-theme'
import { HackathonTargets } from '@/components/hackathon/hackathon-targets'
import { HackathonTimetable } from '@/components/hackathon/hackathon-timetable'
import { HackathonVenue } from '@/components/hackathon/hackathon-venue'
import { HackathonPrize } from '@/components/hackathon/hackathon-prize'
import { HackathonSponsors } from '@/components/hackathon/hackathon-sponsors'
import { HackathonFaq } from '@/components/hackathon/hackathon-faq'
import { HackathonCta } from '@/components/hackathon/hackathon-cta'
import { getHackathon, getHackathons } from '@/lib/cms'

export const revalidate = 300

export async function generateStaticParams() {
  const hackathons = await getHackathons()
  return hackathons.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const hackathon = await getHackathon(slug)
  if (!hackathon) return {}

  const title = `${hackathon.title}${hackathon.subtitle ? ` ${hackathon.subtitle}` : ''}`
  const description =
    hackathon.catchCopy ||
    `${hackathon.dateLabel}／${hackathon.venueName}で開催するハッカソンです。`

  return {
    title: `${title} | Tech Guild`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'ja_JP',
      images: hackathon.heroImage ? [hackathon.heroImage] : undefined,
    },
  }
}

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const hackathon = await getHackathon(slug)
  if (!hackathon) notFound()

  return (
    <ScrollRevealProvider>
      <HackathonHero hackathon={hackathon} />
      <HackathonTheme hackathon={hackathon} />
      <HackathonTargets hackathon={hackathon} />
      <HackathonTimetable hackathon={hackathon} />
      <HackathonVenue hackathon={hackathon} />
      <HackathonPrize hackathon={hackathon} />
      <HackathonSponsors hackathon={hackathon} />
      <HackathonFaq hackathon={hackathon} />
      <HackathonCta hackathon={hackathon} />
    </ScrollRevealProvider>
  )
}
