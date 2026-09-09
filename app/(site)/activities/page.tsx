import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { ActivitiesHero } from '@/components/activities/activities-hero'
import { ActivitiesHackathon } from '@/components/activities/activities-hackathon'
import { ActivitiesRoundtable } from '@/components/activities/activities-roundtable'
import { ActivitiesOther } from '@/components/activities/activities-other'
import { ActivitiesRecord } from '@/components/activities/activities-record'
import { ActivitiesNextEvent } from '@/components/activities/activities-next-event'
import { getEvents, getFeaturedHackathon } from '@/lib/cms'
import { getConnpassUpcomingEvents } from '@/lib/connpass'

export const revalidate = 300

export default async function ActivitiesPage() {
  const [events, connpassEvents, featuredHackathon] = await Promise.all([
    getEvents(),
    getConnpassUpcomingEvents(),
    getFeaturedHackathon(),
  ])

  return (
    <ScrollRevealProvider>
      <ActivitiesHero />
      <ActivitiesHackathon featured={featuredHackathon} />
      <ActivitiesRoundtable />
      <ActivitiesOther />
      <ActivitiesRecord events={events} />
      <ActivitiesNextEvent connpassEvents={connpassEvents} />
    </ScrollRevealProvider>
  )
}
