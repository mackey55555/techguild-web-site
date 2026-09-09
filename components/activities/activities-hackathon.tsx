import Link from 'next/link'
import { ACTIVITIES_HACKATHON } from '@/lib/content'
import type { Hackathon } from '@/lib/cms'

export function ActivitiesHackathon({ featured }: { featured?: Hackathon | null }) {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      <span
        aria-hidden="true"
        className="select-none absolute"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(80px, 18vw, 240px)',
          color: 'var(--forest)',
          opacity: 0.04,
          top: '50%',
          left: '-1%',
          transform: 'translateY(-50%)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        HACKATHON
      </span>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="text-xs uppercase tracking-widest font-bold reveal" style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}>
              {ACTIVITIES_HACKATHON.label}
            </p>

            <h2 className="font-serif font-black leading-tight reveal-clip" style={{ fontSize: 'clamp(28px, 5.5vw, 66px)', color: 'var(--forest)' }}>
              {ACTIVITIES_HACKATHON.title}
            </h2>

            <h3 className="font-serif font-bold reveal" style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: 'var(--forest)' }}>
              {ACTIVITIES_HACKATHON.subtitle}
            </h3>

            <div className="h-1 w-24 reveal" style={{ backgroundColor: 'var(--gold)' }} />

            <div className="space-y-4">
              <p className="text-base leading-relaxed reveal" style={{ color: 'var(--forest)', opacity: 0.8 }}>
                {ACTIVITIES_HACKATHON.description}
              </p>
              <p className="text-base leading-relaxed reveal" style={{ color: 'var(--forest)', opacity: 0.8 }}>
                {ACTIVITIES_HACKATHON.participants}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {ACTIVITIES_HACKATHON.features.map((item, i) => (
                <div key={i} className="px-4 py-3 border stamp-border reveal text-sm font-semibold" style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
                  {item}
                </div>
              ))}
            </div>

            {featured && (
              <Link
                href={`/hackathon/${featured.slug}`}
                className="btn-forest inline-flex items-center justify-center gap-2 self-start mt-4 px-6 py-3 rounded-full border-[1.5px] text-sm font-bold reveal"
              >
                次回ハッカソン「{featured.title}」の詳細
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
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          <div className="md:col-span-5 reveal-right">
            <div className="relative aspect-square border-2" style={{ borderColor: 'var(--forest)' }}>
              <div className="absolute inset-0" style={{ backgroundColor: 'var(--gold)', opacity: 0.15 }} />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2" style={{ borderColor: 'var(--gold)', zIndex: -1 }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-serif font-black text-center opacity-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--forest)' }}>HACK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
