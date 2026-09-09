import 'server-only'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'

// Keystatic のコンテンツ（リポジトリ内のファイル）を読み出す層。
// ビルド時 / ISR 時にファイルシステムから解決される。
const reader = createReader(process.cwd(), keystaticConfig)

const ORGANIZER_PHOTO_PUBLIC_PATH = '/images/organizer/'
const SPONSOR_LOGO_PUBLIC_PATH = '/images/sponsors/'

type HackathonEntry = Awaited<
  ReturnType<typeof reader.collections.hackathons.read>
> extends infer T
  ? T extends null
    ? never
    : NonNullable<T>
  : never

// ---- 型定義 ----

export type EventType =
  | 'roundtable'
  | 'hackathon'
  | 'camp'
  | 'talk'
  | 'seminar'
  | 'social'
  | 'other'

export type EventItem = {
  slug: string
  title: string
  date: string
  eventType: EventType
  sortOrder: number
  url?: string
}

export type SponsorTier = 'gold' | 'silver' | 'bronze' | 'inkind'

export type Sponsor = {
  name: string
  tier: SponsorTier
  logo: string | null
  url?: string
  note?: string
}

export type HackathonStatus = 'open' | 'coming' | 'closed' | 'finished'

export type TimetableItem = {
  day: 'day1' | 'day2'
  time: string
  title: string
  note?: string
}

export type Hackathon = {
  slug: string
  title: string
  subtitle: string
  catchCopy: string
  status: HackathonStatus
  connpassUrl: string | null
  startDate: string
  endDate: string
  dateLabel: string
  venueName: string
  venueAddress: string
  venueMapUrl?: string
  venueNote?: string
  capacity: string
  fee: string
  heroImage: string | null
  themeTitle: string
  themeDescription: string
  themeExamples: string[]
  targets: { title: string; description: string }[]
  timetable: TimetableItem[]
  timetableNote?: string
  belongings: string[]
  prizes: { title: string; description: string }[]
  judgingCriteria: string[]
  sponsors: Sponsor[]
  sponsorMessage?: string
  sponsorFormUrl?: string
  sponsorDeadline?: string
  faq: { question: string; answer: string }[]
  notes: string[]
  organizerLabel: string
}

export type StudentVoice = {
  slug: string
  name: string
  university: string
  quote: string
  displayOrder: number
}

export type SiteStats = {
  participantCount: string
  sessionCount: string
  continuationLabel: string
  tagline: string
  organizerName: string
  organizerRole: string
  organizerBio: string[]
  organizerPhoto: string | null
}

export type Organizer = {
  name: string
  role: string
  bio: string[]
  photo: string | null
}

export type RoadmapMilestone = {
  slug: string
  year: string
  events: string[]
  status: 'done' | 'upcoming' | 'future'
  sortOrder: number
}

// site-stats.json が無い場合の保険（通常はファイルが存在する）
const fallbackSiteStats: SiteStats = {
  participantCount: '71',
  sessionCount: '15',
  continuationLabel: '1年2ヶ月',
  tagline: '小さく、でも止まらずに。',
  organizerName: 'まきはら　あきら',
  organizerRole: 'TechGuild ギルドマスター',
  organizerBio: [],
  organizerPhoto: null,
}

// ---- フェッチ関数 ----

export async function getEvents(): Promise<EventItem[]> {
  const all = await reader.collections.events.all()
  return all
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      date: entry.date,
      eventType: entry.eventType as EventType,
      sortOrder: entry.sortOrder ?? 0,
      url: entry.url || undefined,
    }))
    .sort((a, b) => b.sortOrder - a.sortOrder)
}

// ---- ハッカソン ----

// Keystatic の画像フィールドは publicPath 込みの絶対パスで保存されるが、
// 手書きでファイル名だけ入れた場合に備えて前置を補う（organizerPhoto と同じ扱い）。
function resolveSponsorLogo(value: string | null | undefined): string | null {
  if (!value) return null
  return value.startsWith('/') ? value : `${SPONSOR_LOGO_PUBLIC_PATH}${value}`
}

function toHackathon(slug: string, entry: HackathonEntry): Hackathon {
  return {
    slug,
    title: entry.title,
    subtitle: entry.subtitle,
    catchCopy: entry.catchCopy,
    status: entry.status as HackathonStatus,
    connpassUrl: entry.connpassUrl || null,
    startDate: entry.startDate,
    endDate: entry.endDate,
    dateLabel: entry.dateLabel,
    venueName: entry.venueName,
    venueAddress: entry.venueAddress,
    venueMapUrl: entry.venueMapUrl || undefined,
    venueNote: entry.venueNote || undefined,
    capacity: entry.capacity,
    fee: entry.fee,
    heroImage: entry.heroImage ?? null,
    themeTitle: entry.themeTitle,
    themeDescription: entry.themeDescription,
    themeExamples: [...entry.themeExamples],
    targets: entry.targets.map((t) => ({
      title: t.title,
      description: t.description,
    })),
    timetable: entry.timetable.map((t) => ({
      day: t.day as TimetableItem['day'],
      time: t.time,
      title: t.title,
      note: t.note || undefined,
    })),
    timetableNote: entry.timetableNote || undefined,
    belongings: [...entry.belongings],
    prizes: entry.prizes.map((p) => ({
      title: p.title,
      description: p.description,
    })),
    judgingCriteria: [...entry.judgingCriteria],
    sponsors: entry.sponsors.map((s) => ({
      name: s.name,
      tier: s.tier as SponsorTier,
      logo: resolveSponsorLogo(s.logo),
      url: s.url || undefined,
      note: s.note || undefined,
    })),
    sponsorMessage: entry.sponsorMessage || undefined,
    sponsorFormUrl: entry.sponsorFormUrl || undefined,
    sponsorDeadline: entry.sponsorDeadline || undefined,
    faq: entry.faq.map((f) => ({ question: f.question, answer: f.answer })),
    notes: [...entry.notes],
    organizerLabel: entry.organizerLabel,
  }
}

export async function getHackathons(): Promise<Hackathon[]> {
  const all = await reader.collections.hackathons.all()
  return all
    .map(({ slug, entry }) => toHackathon(slug, entry as HackathonEntry))
    .sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
}

export async function getHackathon(slug: string): Promise<Hackathon | null> {
  const entry = await reader.collections.hackathons.read(slug)
  if (!entry) return null
  return toHackathon(slug, entry as HackathonEntry)
}

// 開催日が未来で募集中のものを1件（トップ・活動ページからの導線用）
export async function getFeaturedHackathon(): Promise<Hackathon | null> {
  const all = await getHackathons()
  const now = Date.now()
  const upcoming = all
    .filter((h) => h.status !== 'finished')
    .filter((h) => {
      const end = Date.parse(h.endDate)
      return Number.isNaN(end) ? true : end >= now
    })
  // 直近に開催されるものを優先
  return upcoming.sort((a, b) => (a.startDate < b.startDate ? -1 : 1))[0] ?? null
}

export async function getStudentVoices(): Promise<StudentVoice[]> {
  const all = await reader.collections.studentVoices.all()
  return all
    .map(({ slug, entry }) => ({
      slug,
      name: entry.name,
      university: entry.university,
      quote: entry.quote,
      displayOrder: entry.displayOrder ?? 0,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

export async function getSiteStats(): Promise<SiteStats> {
  const s = await reader.singletons.siteStats.read()
  if (!s) return fallbackSiteStats
  return {
    participantCount: s.participantCount,
    sessionCount: s.sessionCount,
    continuationLabel: s.continuationLabel,
    tagline: s.tagline,
    organizerName: s.organizerName,
    organizerRole: s.organizerRole,
    organizerBio: [...s.organizerBio],
    organizerPhoto: resolveOrganizerPhoto(s.organizerPhoto),
  }
}

// Keystatic の管理画面で保存すると organizerPhoto は publicPath 込みの
// 絶対パス（例: /images/organizer/xxx.jpeg）で保存される。一方で手書きで
// ファイル名だけを入れた場合に備え、'/' 始まりはそのまま、それ以外は
// publicPath を前置する（二重前置による 404 を防ぐ）。
function resolveOrganizerPhoto(value: string | null | undefined): string | null {
  if (!value) return null
  return value.startsWith('/')
    ? value
    : `${ORGANIZER_PHOTO_PUBLIC_PATH}${value}`
}

export function extractOrganizer(stats: SiteStats): Organizer {
  return {
    name: stats.organizerName,
    role: stats.organizerRole,
    bio: stats.organizerBio,
    photo: stats.organizerPhoto,
  }
}

// events コレクションから集計値を自動算出（手動メンテ不要）。
// 参加者数だけは events から導けないため site-stats（手動）を使う。
export type ActivitySummary = {
  eventCount: number
  roundtableCount: number
  periodLabel: string
}

// "YYYY.MM" を「年*12 + 月」の数値に変換（ゼロ埋め有無に依存しない比較用）。
// 解析できない場合は null。
function yearMonthValue(ym: string): number | null {
  const [y, m] = ym.split('.').map((v) => parseInt(v, 10))
  if (!y || !m) return null
  return y * 12 + m
}

function periodFromYearMonth(ym: string): string {
  const value = yearMonthValue(ym)
  if (value === null) return ''
  const now = new Date()
  const nowValue = now.getFullYear() * 12 + (now.getMonth() + 1)
  let months = nowValue - value
  if (months < 0) months = 0
  const years = Math.floor(months / 12)
  const rest = months % 12
  if (years === 0) return `${rest}ヶ月`
  if (rest === 0) return `${years}年`
  return `${years}年${rest}ヶ月`
}

export async function getActivitySummary(): Promise<ActivitySummary> {
  const events = await getEvents()
  const eventCount = events.length
  const roundtableCount = events.filter((e) => e.eventType === 'roundtable').length
  // 文字列ソートだと "2025.10" < "2025.3" のように崩れるため、年/月を数値化して最古を求める。
  let earliest: { ym: string; value: number } | null = null
  for (const e of events) {
    if (!e.date) continue
    const value = yearMonthValue(e.date)
    if (value === null) continue
    if (!earliest || value < earliest.value) earliest = { ym: e.date, value }
  }
  const periodLabel = earliest ? periodFromYearMonth(earliest.ym) : ''
  return { eventCount, roundtableCount, periodLabel }
}

export async function getRoadmap(): Promise<RoadmapMilestone[]> {
  const all = await reader.collections.roadmap.all()
  return all
    .map(({ slug, entry }) => ({
      slug,
      year: entry.year,
      events: [...entry.events],
      status: entry.status as RoadmapMilestone['status'],
      sortOrder: entry.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)
}
