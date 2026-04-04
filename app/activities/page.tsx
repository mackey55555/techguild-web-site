import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { ActivitiesHero } from '@/components/activities/activities-hero'
import { ActivitiesHackathon } from '@/components/activities/activities-hackathon'
import { ActivitiesRoundtable } from '@/components/activities/activities-roundtable'
import { ActivitiesRecord } from '@/components/activities/activities-record'
import { ActivitiesNextEvent } from '@/components/activities/activities-next-event'
import { getRoundtableSessions, getActiveNextEvent } from '@/lib/microcms'

export const revalidate = 300

export default async function ActivitiesPage() {
  const [sessionsRes, nextEventRes] = await Promise.all([
    getRoundtableSessions(),
    getActiveNextEvent(),
  ])

  return (
    <ScrollRevealProvider>
      <ActivitiesHero />
      <ActivitiesHackathon />
      <ActivitiesRoundtable />
      <ActivitiesRecord sessions={sessionsRes.contents} />
      <ActivitiesNextEvent event={nextEventRes.contents[0] ?? null} />
    </ScrollRevealProvider>
  )
}
