import type { Hackathon } from '@/lib/cms'

export function HackathonPrize({ hackathon }: { hackathon: Hackathon }) {
  if (hackathon.prizes.length === 0 && hackathon.judgingCriteria.length === 0) return null

  return (
    <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
          style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
        >
          Award
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal-clip"
          style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--forest)' }}
        >
          発表と表彰
        </h2>

        {hackathon.prizes.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {hackathon.prizes.map((p) => (
              <li
                key={p.title}
                className="reveal p-6 md:p-8 border-2"
                style={{ borderColor: 'var(--forest)', backgroundColor: 'var(--cream)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
                  </svg>
                  <h3 className="font-serif font-bold text-lg md:text-xl" style={{ color: 'var(--forest)' }}>
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--forest)', opacity: 0.75 }}>
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        )}

        {hackathon.judgingCriteria.length > 0 && (
          <div className="mt-10 reveal">
            <h3 className="font-serif font-bold text-lg mb-4" style={{ color: 'var(--forest)' }}>
              審査の観点
            </h3>
            <ul className="flex flex-wrap gap-3">
              {hackathon.judgingCriteria.map((c) => (
                <li
                  key={c}
                  className="px-4 py-2 border text-sm font-semibold"
                  style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
