import type { Hackathon, TimetableItem } from '@/lib/cms'

const DAY_LABEL: Record<TimetableItem['day'], string> = {
  day1: 'Day 1',
  day2: 'Day 2',
}

function DayColumn({
  day,
  items,
  dateLabel,
}: {
  day: TimetableItem['day']
  items: TimetableItem[]
  dateLabel?: string
}) {
  if (items.length === 0) return null

  return (
    <div className="reveal">
      <div className="flex items-baseline gap-3 mb-6">
        <h3 className="font-serif font-black" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--forest)' }}>
          {DAY_LABEL[day]}
        </h3>
        {dateLabel && (
          <span className="text-sm font-bold" style={{ color: 'var(--terra)' }}>
            {dateLabel}
          </span>
        )}
      </div>

      <ol className="relative pl-6" style={{ borderLeft: '2px solid var(--forest)' }}>
        {items.map((item, i) => (
          <li key={`${item.time}-${i}`} className="relative pb-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                left: '-31px',
                top: '6px',
                width: '12px',
                height: '12px',
                backgroundColor: 'var(--gold)',
                border: '2px solid var(--forest)',
              }}
            />
            <p className="text-sm font-bold tracking-wide mb-1" style={{ color: 'var(--terra)' }}>
              {item.time}
            </p>
            <p className="text-base md:text-lg font-bold leading-snug" style={{ color: 'var(--forest)' }}>
              {item.title}
            </p>
            {item.note && (
              <p className="text-sm mt-1" style={{ color: 'var(--forest)', opacity: 0.65 }}>
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function HackathonTimetable({ hackathon }: { hackathon: Hackathon }) {
  if (hackathon.timetable.length === 0) return null

  const day1 = hackathon.timetable.filter((t) => t.day === 'day1')
  const day2 = hackathon.timetable.filter((t) => t.day === 'day2')

  return (
    <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
          style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
        >
          Timetable
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal-clip"
          style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--forest)' }}
        >
          2日間の流れ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <DayColumn day="day1" items={day1} />
          <DayColumn day="day2" items={day2} />
        </div>

        {hackathon.timetableNote && (
          <p
            className="mt-12 text-sm md:text-base leading-relaxed reveal"
            style={{ color: 'var(--forest)', opacity: 0.7 }}
          >
            {hackathon.timetableNote}
          </p>
        )}

        {hackathon.belongings.length > 0 && (
          <div
            className="mt-12 p-6 md:p-8 border-2 reveal"
            style={{ borderColor: 'var(--forest)', backgroundColor: 'var(--cream)' }}
          >
            <h3 className="font-serif font-bold text-lg mb-4" style={{ color: 'var(--forest)' }}>
              持ち物
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {hackathon.belongings.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm md:text-base font-semibold"
                  style={{ color: 'var(--forest)' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--terra)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
