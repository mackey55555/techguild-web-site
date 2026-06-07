import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { HomeHero } from '@/components/home/home-hero'
import { HomeNextEvent } from '@/components/home/home-next-event'
import { HomeMVV } from '@/components/home/home-mvv'
import { HomeActivities } from '@/components/home/home-activities'
import { HomeTrackRecord } from '@/components/home/home-track-record'
import { HomeCommunityFeel } from '@/components/home/home-community-feel'
import { HomeDualCta } from '@/components/home/home-dual-cta'
import { getSiteStats, getActivitySummary } from '@/lib/cms'
import { getConnpassUpcomingEvents } from '@/lib/connpass'

export const revalidate = 3600

export default async function HomePage() {
  const [stats, summary, connpassEvents] = await Promise.all([
    getSiteStats(),
    getActivitySummary(),
    getConnpassUpcomingEvents(),
  ])

  return (
    <ScrollRevealProvider>
      <HomeHero />
      <HomeNextEvent events={connpassEvents} />
      <HomeMVV />
      <HomeActivities eventCount={summary.eventCount} />
      <HomeTrackRecord
        participantCount={stats.participantCount}
        eventCount={summary.eventCount}
        periodLabel={summary.periodLabel}
        tagline={stats.tagline}
      />
      <HomeCommunityFeel />
      <HomeDualCta />
    </ScrollRevealProvider>
  )
}
