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
