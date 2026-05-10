import Link from 'next/link'
import type { NextEvent } from '@/lib/microcms'
import {
  CONNPASS_GROUP_URL,
  type ConnpassEvent,
} from '@/lib/connpass'

export function ActivitiesNextEvent({
  event,
  connpassEvents,
}: {
  event: NextEvent | null
  connpassEvents: ConnpassEvent[]
}) {
  const hasConnpass = connpassEvents.length > 0

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10 clip-diagonal-top text-center"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <p
          className="text-xs uppercase tracking-widest font-semibold opacity-50 reveal"
          style={{ color: 'var(--cream)' }}
        >
          Next Event
        </p>

        {hasConnpass ? (
          <ConnpassUpcoming events={connpassEvents} />
        ) : (
          <Fallback event={event} />
        )}

        <a
          href={CONNPASS_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 font-bold text-base border-2 reveal transition-all duration-300 hover:opacity-90"
          style={{
            borderColor: 'var(--gold)',
            backgroundColor: 'var(--gold)',
            color: 'var(--forest)',
          }}
        >
          connpass グループを見る →
        </a>
      </div>
    </section>
  )
}

function ConnpassUpcoming({ events }: { events: ConnpassEvent[] }) {
  return (
    <>
      <h2
        className="font-serif font-black leading-tight reveal-clip"
        style={{
          fontSize: 'clamp(28px, 5.5vw, 60px)',
          color: 'var(--cream)',
        }}
      >
        次回のイベント
      </h2>
      <ul className="w-full flex flex-col gap-4">
        {events.map((e) => (
          <li key={e.url} className="reveal">
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-left p-5 md:p-6 border-2 shadow-[6px_6px_0_0_var(--gold)] transition-all duration-200 hover:shadow-[3px_3px_0_0_var(--gold)] hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{
                backgroundColor: 'var(--cream)',
                borderColor: 'var(--forest)',
                color: 'var(--forest)',
              }}
            >
              <div className="flex-1">
                {e.startedAt && (
                  <p className="text-xs font-bold tracking-wider mb-2 opacity-70">
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
    </>
  )
}

function Fallback({ event }: { event: NextEvent | null }) {
  const headline = event ? event.headline : '次回のイベントは\n近日公開予定。'
  const subtext = event
    ? event.subtext
    : '詳細はSNSまたはメールマガジンにてお知らせします。'
  const ctaLabel = event ? event.ctaLabel : '参加申込みはこちら →'
  const ctaHref = event ? event.ctaHref : '/students'

  return (
    <>
      <h2
        className="font-serif font-black leading-tight reveal-clip whitespace-pre-line"
        style={{
          fontSize: 'clamp(28px, 5.5vw, 60px)',
          color: 'var(--cream)',
        }}
      >
        {headline}
      </h2>
      <p className="text-sm opacity-60 reveal" style={{ color: 'var(--cream)' }}>
        {subtext}
      </p>
      {event && (
        <Link
          href={ctaHref}
          className="inline-block px-10 py-4 font-bold text-base border-2 reveal transition-all duration-300 hover:bg-transparent"
          style={{
            borderColor: 'var(--gold)',
            backgroundColor: 'var(--gold)',
            color: 'var(--forest)',
          }}
        >
          {ctaLabel}
        </Link>
      )}
    </>
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
