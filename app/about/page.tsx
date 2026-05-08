import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { AboutHero } from '@/components/about/about-hero'
import { AboutExistence } from '@/components/about/about-existence'
import { AboutMission } from '@/components/about/about-mission'
import { AboutVision } from '@/components/about/about-vision'
import { AboutValues } from '@/components/about/about-values'
import { AboutTimeline } from '@/components/about/about-timeline'
import { AboutOrganizer } from '@/components/about/about-organizer'
import { getRoadmap, getSiteStats, extractOrganizer } from '@/lib/microcms'

export const revalidate = 86400

export default async function AboutPage() {
  const [roadmapRes, stats] = await Promise.all([
    getRoadmap(),
    getSiteStats(),
  ])
  const organizer = extractOrganizer(stats)

  return (
    <ScrollRevealProvider>
      <AboutHero />
      <AboutExistence />
      <AboutMission />
      <AboutVision />
      <AboutValues />
      <AboutTimeline milestones={roadmapRes.contents} />
      <AboutOrganizer organizer={organizer} />
    </ScrollRevealProvider>
  )
}
