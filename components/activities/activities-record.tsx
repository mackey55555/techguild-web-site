import type { EventItem, EventType } from '@/lib/cms'

const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.8, -1.2, 1.3, -0.7, 1.1, -1.4, 0.6]

const TYPE_LABEL: Record<EventType, string> = {
  roundtable: '座談会',
  hackathon: 'ハッカソン',
  camp: '野営会',
  talk: 'トーク',
  seminar: 'セミナー',
  social: '懇親会',
  other: 'イベント',
}

export function ActivitiesRecord({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="font-serif font-black leading-tight mb-12 reveal"
          style={{ fontSize: 'clamp(24px, 5vw, 56px)', color: 'var(--forest)' }}
        >
          活動の足跡。
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {events.map((event, i) => (
            <div
              key={event.slug}
              className="card-hover border p-4 flex flex-col gap-2 reveal"
              style={{
                borderColor: 'var(--forest)',
                transform: `rotate(${rotations[i % rotations.length]}deg)`,
                backgroundColor: i % 3 === 0 ? 'var(--gold)' : 'var(--cream)',
                boxShadow: '2px 2px 0 rgba(28,56,41,0.12)',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: i % 3 === 0 ? 'var(--forest)' : 'var(--terra)' }}
                >
                  {event.date}
                </p>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
                  style={{
                    color: 'var(--cream)',
                    backgroundColor: 'var(--forest)',
                  }}
                >
                  {TYPE_LABEL[event.eventType]}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed font-medium"
                style={{ color: 'var(--forest)' }}
              >
                {event.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
