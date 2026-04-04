import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { HomeHero } from '@/components/home/home-hero'
import { HomeMVV } from '@/components/home/home-mvv'
import { HomeActivities } from '@/components/home/home-activities'
import { HomeTrackRecord } from '@/components/home/home-track-record'
import { HomeCommunityFeel } from '@/components/home/home-community-feel'
import { HomeDualCta } from '@/components/home/home-dual-cta'
import { getSiteStats } from '@/lib/microcms'

export const revalidate = 3600

export default async function HomePage() {
  const stats = await getSiteStats()

  return (
    <ScrollRevealProvider>
      <HomeHero />
      <HomeMVV />
      <HomeActivities />
      <HomeTrackRecord stats={stats} />
      <HomeCommunityFeel />
      <HomeDualCta />
    </ScrollRevealProvider>
  )
}
