import type { Hackathon } from '@/lib/cms'

export function HackathonFaq({ hackathon }: { hackathon: Hackathon }) {
  if (hackathon.faq.length === 0 && hackathon.notes.length === 0) return null

  return (
    <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-4xl mx-auto">
        {hackathon.faq.length > 0 && (
          <>
            <p
              className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
              style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
            >
              FAQ
            </p>
            <h2
              className="font-serif font-black leading-tight mb-10 reveal-clip"
              style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--forest)' }}
            >
              よくある質問
            </h2>

            <ul className="border-t-2" style={{ borderColor: 'var(--forest)' }}>
              {hackathon.faq.map((f) => (
                <li key={f.question} className="border-b-2 reveal" style={{ borderColor: 'var(--forest)' }}>
                  <details className="group">
                    <summary
                      className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 font-bold text-base md:text-lg"
                      style={{ color: 'var(--forest)' }}
                    >
                      {f.question}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--terra)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </summary>
                    <p
                      className="pb-5 text-sm md:text-base leading-relaxed"
                      style={{ color: 'var(--forest)', opacity: 0.75 }}
                    >
                      {f.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </>
        )}

        {hackathon.notes.length > 0 && (
          <div
            className="mt-14 p-6 md:p-8 reveal"
            style={{ backgroundColor: 'var(--cream)', border: '2px solid var(--terra)' }}
          >
            <h3 className="font-serif font-bold text-lg mb-4" style={{ color: 'var(--terra)' }}>
              参加にあたっての注意事項
            </h3>
            <ul className="flex flex-col gap-2">
              {hackathon.notes.map((n) => (
                <li
                  key={n}
                  className="text-sm md:text-base leading-relaxed pl-5 relative"
                  style={{ color: 'var(--forest)', opacity: 0.8 }}
                >
                  <span aria-hidden="true" className="absolute left-0" style={{ color: 'var(--terra)' }}>
                    ・
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
