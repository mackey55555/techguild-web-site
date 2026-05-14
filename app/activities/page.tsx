import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { ActivitiesHero } from '@/components/activities/activities-hero'
import { ActivitiesHackathon } from '@/components/activities/activities-hackathon'
import { ActivitiesRoundtable } from '@/components/activities/activities-roundtable'
import { ActivitiesRecord } from '@/components/activities/activities-record'
import { ActivitiesNextEvent } from '@/components/activities/activities-next-event'
import { getRoundtableSessions, getActiveNextEvent } from '@/lib/microcms'
import { getConnpassUpcomingEvents } from '@/lib/connpass'

export const revalidate = 300

export default async function ActivitiesPage() {
  const [sessionsRes, nextEventRes, connpassEvents] = await Promise.all([
    getRoundtableSessions(),
    getActiveNextEvent(),
    getConnpassUpcomingEvents(),
  ])

  return (
    <ScrollRevealProvider>
      <ActivitiesHero />
      <ActivitiesHackathon />
      <ActivitiesRoundtable />
      <ActivitiesRecord sessions={sessionsRes.contents} />
      <ActivitiesNextEvent
        event={nextEventRes.contents[0] ?? null}
        connpassEvents={connpassEvents}
      />
    </ScrollRevealProvider>
  )
}
