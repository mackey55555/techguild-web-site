import type { Hackathon } from '@/lib/cms'

export function HackathonTargets({ hackathon }: { hackathon: Hackathon }) {
  if (hackathon.targets.length === 0) return null

  return (
    <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
          style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
        >
          Who Should Join
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal-clip"
          style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--forest)' }}
        >
          こんな人に来てほしい。
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {hackathon.targets.map((t, i) => (
            <li
              key={t.title}
              className="reveal p-6 md:p-8 border-2 shadow-[6px_6px_0_0_var(--forest)]"
              style={{ backgroundColor: '#ffffff', borderColor: 'var(--forest)' }}
            >
              <span
                className="font-serif font-black block mb-3"
                style={{ fontSize: '28px', color: 'var(--gold)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif font-bold text-lg md:text-xl mb-3" style={{ color: 'var(--forest)' }}>
                {t.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--forest)', opacity: 0.75 }}>
                {t.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
