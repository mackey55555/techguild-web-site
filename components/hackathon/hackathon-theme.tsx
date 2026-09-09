import type { Hackathon } from '@/lib/cms'

export function HackathonTheme({ hackathon }: { hackathon: Hackathon }) {
  if (!hackathon.themeTitle && !hackathon.themeDescription) return null

  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-both overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <p
              className="text-xs uppercase tracking-widest font-bold mb-6 reveal"
              style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}
            >
              Theme
            </p>
            <h2
              className="font-serif font-black leading-tight reveal-clip"
              style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--cream)' }}
            >
              {hackathon.themeTitle}
            </h2>
          </div>

          <div className="md:col-span-7 flex flex-col gap-8">
            <p
              className="text-base md:text-lg leading-relaxed reveal"
              style={{ color: 'var(--cream)', opacity: 0.85 }}
            >
              {hackathon.themeDescription}
            </p>

            {hackathon.themeExamples.length > 0 && (
              <div className="flex flex-wrap gap-3 reveal">
                {hackathon.themeExamples.map((ex) => (
                  <span
                    key={ex}
                    className="px-4 py-2 rounded-full border text-sm font-semibold"
                    style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
