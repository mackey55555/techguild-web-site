import {
  CONNPASS_GROUP_URL,
  type ConnpassEvent,
} from '@/lib/connpass'

export function StudentsCta({
  connpassEvents,
}: {
  connpassEvents: ConnpassEvent[]
}) {
  const hasEvents = connpassEvents.length > 0

  return (
    <section
      className="py-24 md:py-32 px-6"
      style={{
        background: 'linear-gradient(135deg, var(--gold) 0%, #e6b732 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
          style={{ color: 'var(--forest)', opacity: 0.7 }}
        >
          Next Event
        </p>

        {hasEvents ? (
          <UpcomingEvents events={connpassEvents} />
        ) : (
          <Fallback />
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={CONNPASS_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 font-bold text-sm transition-all duration-300 border-2 reveal"
            style={{
              backgroundColor: 'var(--forest)',
              borderColor: 'var(--forest)',
              color: 'var(--cream)',
            }}
          >
            connpass グループを見る →
          </a>
          <a
            href="https://forms.example.com/student-interest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 font-bold text-sm transition-all duration-300 border-2 reveal"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--forest)',
              color: 'var(--forest)',
            }}
          >
            興味あるリストに登録
          </a>
        </div>

        <p
          className="text-sm mt-8 reveal"
          style={{ color: 'var(--forest)', opacity: 0.6 }}
        >
          {'質問やご相談は '}
          <a href="mailto:students@techguild.example.com" className="underline">
            {'students@techguild.example.com'}
          </a>
          {' まで'}
        </p>
      </div>
    </section>
  )
}

function UpcomingEvents({ events }: { events: ConnpassEvent[] }) {
  return (
    <>
      <h2
        className="font-serif font-black leading-tight reveal"
        style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          color: 'var(--forest)',
        }}
      >
        次回のイベント
      </h2>
      <ul className="mt-8 flex flex-col gap-4">
        {events.map((e) => (
          <li key={e.url} className="reveal">
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-left p-5 md:p-6 border-2 shadow-[6px_6px_0_0_var(--forest)] transition-all duration-200 hover:shadow-[3px_3px_0_0_var(--forest)] hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{
                backgroundColor: 'var(--cream)',
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
    </>
  )
}

function Fallback() {
  return (
    <>
      <h2
        className="font-serif font-black leading-tight reveal"
        style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          color: 'var(--forest)',
        }}
      >
        次のイベントに<br className="md:hidden" />参加しよう。
      </h2>
      <p
        className="text-lg md:text-xl mt-6 leading-relaxed max-w-xl mx-auto reveal"
        style={{ color: 'var(--forest)', opacity: 0.85 }}
      >
        まずは説明会やハッカソン見学から。<br className="hidden md:block" />
        あなたのペースで、一歩を踏み出そう。
      </p>
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
