const FEED_URL = 'https://okayama-engineer.connpass.com/ja.atom'

export const CONNPASS_GROUP_URL = 'https://okayama-engineer.connpass.com/'

export type ConnpassEvent = {
  title: string
  url: string
  startedAt: string | null // ISO 8601
  endedAt: string | null
}

export async function getConnpassUpcomingEvents(): Promise<ConnpassEvent[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const xml = await res.text()
    const entries = parseEntries(xml)
    const now = Date.now()
    return entries
      .filter((e) => e.startedAt && new Date(e.startedAt).getTime() >= now)
      .sort(
        (a, b) =>
          new Date(a.startedAt as string).getTime() -
          new Date(b.startedAt as string).getTime()
      )
  } catch {
    return []
  }
}

function parseEntries(xml: string): ConnpassEvent[] {
  const results: ConnpassEvent[] = []
  const entryRegex = /<entry\b[^>]*>([\s\S]*?)<\/entry>/g
  let match: RegExpExecArray | null
  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1]
    const title = decodeEntities(
      extract(block, /<title\b[^>]*>([\s\S]*?)<\/title>/)
    )
    const rawUrl = extract(block, /<link\b[^>]*href="([^"]+)"/)
    const summary = decodeEntities(
      extract(block, /<summary\b[^>]*>([\s\S]*?)<\/summary>/)
    )
    if (!title || !rawUrl) continue
    const url = sanitizeConnpassUrl(rawUrl)
    if (!url) continue
    const { startedAt, endedAt } = parseEventDates(summary)
    results.push({ title, url, startedAt, endedAt })
  }
  return results
}

function sanitizeConnpassUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const isHttps = parsed.protocol === 'https:'
    const isConnpassHost =
      parsed.hostname === 'connpass.com' ||
      parsed.hostname.endsWith('.connpass.com')
    if (!isHttps || !isConnpassHost) return null
    return parsed.toString()
  } catch {
    return null
  }
}

function extract(s: string, re: RegExp): string {
  const m = s.match(re)
  return m ? m[1].trim() : ''
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

// 「開催日時: 2026/06/20 15:30 ～ 17:30」のような summary から開始/終了日時を抽出
function parseEventDates(summary: string): {
  startedAt: string | null
  endedAt: string | null
} {
  const startMatch = summary.match(
    /開催日時[:：]?\s*(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\s+(\d{1,2}):(\d{2})/
  )
  if (!startMatch) return { startedAt: null, endedAt: null }
  const [, y, mo, d, h, mi] = startMatch
  const startedAt = toIso(y, mo, d, h, mi)

  // 同日終了時刻 (HH:MM ～ HH:MM) パターン
  const endMatch = summary
    .slice(startMatch.index! + startMatch[0].length)
    .match(/[～〜~]\s*(\d{1,2}):(\d{2})/)
  const endedAt = endMatch ? toIso(y, mo, d, endMatch[1], endMatch[2]) : null
  return { startedAt, endedAt }
}

function toIso(y: string, mo: string, d: string, h: string, mi: string): string {
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}T${h.padStart(2, '0')}:${mi}:00+09:00`
}
