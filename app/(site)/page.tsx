import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { HomeHero } from '@/components/home/home-hero'
import { HomeNextEvent } from '@/components/home/home-next-event'
import { HomeMVV } from '@/components/home/home-mvv'
import { HomeActivities } from '@/components/home/home-activities'
import { HomeTrackRecord } from '@/components/home/home-track-record'
import { HomeCommunityFeel } from '@/components/home/home-community-feel'
import { HomeDualCta } from '@/components/home/home-dual-cta'
import { getSiteStats } from '@/lib/cms'
import { getConnpassUpcomingEvents } from '@/lib/connpass'

export const revalidate = 3600

export default async function HomePage() {
  const [stats, connpassEvents] = await Promise.all([
    getSiteStats(),
    getConnpassUpcomingEvents(),
  ])

  return (
    <ScrollRevealProvider>
      <HomeHero />
      <HomeNextEvent events={connpassEvents} />
      <HomeMVV />
      <HomeActivities sessionCount={stats.sessionCount} />
      <HomeTrackRecord stats={stats} />
      <HomeCommunityFeel />
      <HomeDualCta />
    </ScrollRevealProvider>
  )
}
