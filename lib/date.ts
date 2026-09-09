const EVENT_DATE_FORMATTER = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

const EVENT_TIME_FORMATTER = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatEventDate(startIso: string, endIso: string | null): string {
  const start = EVENT_DATE_FORMATTER.format(new Date(startIso))
  if (!endIso) return start
  const end = EVENT_TIME_FORMATTER.format(new Date(endIso))
  return `${start} – ${end}`
}

const JP_DATE_FORMATTER = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// "YYYY-MM-DD"（Keystatic の date フィールド）を「2026年9月30日」に整形。
export function formatJapaneseDate(date: string): string | null {
  const parsed = Date.parse(`${date}T00:00:00+09:00`)
  if (Number.isNaN(parsed)) return null
  return JP_DATE_FORMATTER.format(new Date(parsed))
}

// 締切日の当日いっぱい（日本時間 23:59:59）まで受付とみなす。
export function isBeforeDeadline(date: string | undefined, now = Date.now()): boolean {
  if (!date) return true
  const end = Date.parse(`${date}T23:59:59+09:00`)
  if (Number.isNaN(end)) return true
  return now <= end
}
