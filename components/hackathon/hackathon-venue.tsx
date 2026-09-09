import type { Hackathon } from '@/lib/cms'

export function HackathonVenue({ hackathon }: { hackathon: Hackathon }) {
  if (!hackathon.venueName) return null

  return (
    <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <p
            className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
            style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
          >
            Venue
          </p>
          <h2
            className="font-serif font-black leading-tight reveal-clip"
            style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--forest)' }}
          >
            会場・アクセス
          </h2>
        </div>

        <div className="md:col-span-7">
          <div
            className="p-6 md:p-8 border-2 shadow-[6px_6px_0_0_var(--forest)] reveal"
            style={{ backgroundColor: '#ffffff', borderColor: 'var(--forest)' }}
          >
            <h3 className="font-serif font-bold text-xl md:text-2xl mb-3" style={{ color: 'var(--forest)' }}>
              {hackathon.venueName}
            </h3>
            {hackathon.venueAddress && (
              <p className="text-base mb-4" style={{ color: 'var(--forest)', opacity: 0.75 }}>
                {hackathon.venueAddress}
              </p>
            )}
            {hackathon.venueNote && (
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--forest)', opacity: 0.7 }}>
                {hackathon.venueNote}
              </p>
            )}
            {hackathon.venueMapUrl && (
              <a
                href={hackathon.venueMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--forest)' }}
              >
                地図で見る
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
