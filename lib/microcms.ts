import { createClient } from 'microcms-js-sdk'

let _client: ReturnType<typeof createClient> | null = null

function getClient(): ReturnType<typeof createClient> | null {
  if (_client) return _client
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY
  if (!serviceDomain || !apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[microcms] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定のため、コンテンツなしで起動します。',
      )
    }
    return null
  }
  _client = createClient({ serviceDomain, apiKey })
  return _client
}

// ---- 型定義 ----

export type RoundtableSession = {
  id: string
  date: string
  topic: string
  sessionOrder: number
}

export type StudentVoice = {
  id: string
  name: string
  university: string
  quote: string
  displayOrder: number
}

export type NextEvent = {
  id: string
  headline: string
  subtext: string
  ctaLabel: string
  ctaHref: string
  isActive: boolean
}

export type SiteStats = {
  participantCount: string
  sessionCount: string
  continuationLabel: string
  tagline: string
  organizerName: string
  organizerRole: string
  organizerBio: string
  organizerPhoto?: { url: string; width: number; height: number }
}

export type RoadmapMilestone = {
  id: string
  year: string
  events: string // 改行区切りのテキスト
  status: 'done' | 'upcoming' | 'future'
  sortOrder: number
}

export type Organizer = {
  name: string
  role: string
  bio: string // リッチテキスト (HTML)
  photo?: { url: string; width: number; height: number }
}

// ---- フェッチ関数 ----

export async function getRoundtableSessions() {
  const client = getClient()
  if (!client) return { contents: [] as RoundtableSession[], totalCount: 0, offset: 0, limit: 100 }
  try {
    return await client.getList<RoundtableSession>({
      endpoint: 'roundtable-sessions',
      queries: { orders: 'sessionOrder', limit: 100 },
    })
  } catch {
    return { contents: [] as RoundtableSession[], totalCount: 0, offset: 0, limit: 100 }
  }
}

export async function getStudentVoices() {
  const client = getClient()
  if (!client) return { contents: [] as StudentVoice[], totalCount: 0, offset: 0, limit: 20 }
  try {
    return await client.getList<StudentVoice>({
      endpoint: 'student-voices',
      queries: { orders: 'displayOrder', limit: 20 },
    })
  } catch {
    return { contents: [] as StudentVoice[], totalCount: 0, offset: 0, limit: 20 }
  }
}

export async function getActiveNextEvent() {
  const client = getClient()
  if (!client) return { contents: [] as NextEvent[], totalCount: 0, offset: 0, limit: 1 }
  try {
    return await client.getList<NextEvent>({
      endpoint: 'next-event',
      queries: { filters: 'isActive[equals]true', limit: 1 },
    })
  } catch {
    return { contents: [] as NextEvent[], totalCount: 0, offset: 0, limit: 1 }
  }
}

const fallbackSiteStats: SiteStats = {
  participantCount: '17名',
  sessionCount: '12回',
  continuationLabel: '1年',
  tagline: '小さく、でも止まらずに。',
  organizerName: 'Naoyuki（gilda）',
  organizerRole: '運営 / gilda',
  organizerBio:
    '<p>正直に言うと、最初は「うまくいくかどうか」なんてわかりませんでした。ただ、地域の学生が本物のIT開発を経験できる場所がなかった。それが悔しくて、とにかく始めてみた。</p><p>今は17名の学生と何社かの企業が関わってくれています。毎月の座談会でみんなの話を聞いていると、「あ、続けてよかった」と思う瞬間が確かにある。</p><p>まだまだ小さいコミュニティです。でも、小さいからこそ、一人ひとりと深く関われる。それがTech Guildの一番の強みだと思っています。</p>',
}

export async function getSiteStats(): Promise<SiteStats> {
  const client = getClient()
  if (!client) return fallbackSiteStats
  try {
    return await client.getObject<SiteStats>({ endpoint: 'site-stats' })
  } catch {
    return fallbackSiteStats
  }
}

export function extractOrganizer(stats: SiteStats): Organizer {
  return {
    name: stats.organizerName,
    role: stats.organizerRole,
    bio: stats.organizerBio,
    photo: stats.organizerPhoto,
  }
}

export async function getRoadmap() {
  const client = getClient()
  if (!client) return { contents: [] as RoadmapMilestone[], totalCount: 0, offset: 0, limit: 20 }
  try {
    return await client.getList<RoadmapMilestone>({
      endpoint: 'roadmap',
      queries: { orders: 'sortOrder', limit: 20 },
    })
  } catch {
    return { contents: [] as RoadmapMilestone[], totalCount: 0, offset: 0, limit: 20 }
  }
}
