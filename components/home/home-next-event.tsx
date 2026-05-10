import {
  CONNPASS_GROUP_URL,
  type ConnpassEvent,
} from '@/lib/connpass'

export function HomeNextEvent({ events }: { events: ConnpassEvent[] }) {
  if (events.length === 0) return null

  return (
    <section
      className="relative pt-6 pb-16 md:pt-8 md:pb-20 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 md:mb-6 reveal">
          <p
            className="text-sm md:text-base uppercase tracking-widest font-bold"
            style={{ color: 'var(--forest)' }}
          >
            Next Event
          </p>
          <a
            href={CONNPASS_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--forest)' }}
          >
            connpass グループを見る
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {events.slice(0, 2).map((e) => (
            <li key={e.url} className="reveal">
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 p-5 md:p-6 border-2 shadow-[6px_6px_0_0_var(--forest)] transition-all duration-200 hover:shadow-[3px_3px_0_0_var(--forest)] hover:translate-x-[3px] hover:translate-y-[3px]"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: 'var(--forest)',
                  color: 'var(--forest)',
                }}
              >
                <div className="flex-1">
                  {e.startedAt && (
                    <p className="inline-flex items-center gap-1.5 text-sm md:text-base font-bold tracking-wide mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      {formatDate(e.startedAt, e.endedAt)}
                    </p>
                  )}
                  <p className="font-serif font-bold text-lg md:text-xl leading-snug">
                    {e.title}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const FORMATTER = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

const TIME_FORMATTER = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
})

function formatDate(startIso: string, endIso: string | null): string {
  const start = FORMATTER.format(new Date(startIso))
  if (!endIso) return start
  const end = TIME_FORMATTER.format(new Date(endIso))
  return `${start} – ${end}`
}
