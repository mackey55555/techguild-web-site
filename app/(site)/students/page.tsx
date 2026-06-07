import type { Metadata } from 'next'
import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { StudentsHero } from '@/components/students/students-hero'
import { StudentsWhyJoin } from '@/components/students/students-why-join'
import { StudentsWhoFits } from '@/components/students/students-who-fits'
import { StudentsVoices } from '@/components/students/students-voices'
import { StudentsCta } from '@/components/students/students-cta'
import { getStudentVoices } from '@/lib/cms'
import { getConnpassUpcomingEvents } from '@/lib/connpass'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '学生の方へ | Tech Guild',
  description: '本物のプロダクト開発を経験しよう。Tech Guildは地域企業の課題を解決しながら、実践的なスキルを身につける場所です。',
}

export default async function StudentsPage() {
  const [voices, connpassEvents] = await Promise.all([
    getStudentVoices(),
    getConnpassUpcomingEvents(),
  ])

  return (
    <ScrollRevealProvider>
      <StudentsHero />
      <StudentsWhyJoin />
      <StudentsWhoFits />
      <StudentsVoices voices={voices} />
      <StudentsCta connpassEvents={connpassEvents} />
    </ScrollRevealProvider>
  )
}
