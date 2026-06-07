import 'server-only'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'

// Keystatic のコンテンツ（リポジトリ内のファイル）を読み出す層。
// ビルド時 / ISR 時にファイルシステムから解決される。
const reader = createReader(process.cwd(), keystaticConfig)

const ORGANIZER_PHOTO_PUBLIC_PATH = '/images/organizer/'

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
    organizerPhoto: s.organizerPhoto
      ? `${ORGANIZER_PHOTO_PUBLIC_PATH}${s.organizerPhoto}`
      : null,
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
