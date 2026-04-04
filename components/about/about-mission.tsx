import { ABOUT_MISSION } from '@/lib/content'

export function AboutMission() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-1 flex md:justify-center md:pt-4">
            <p
              className="text-xs uppercase tracking-widest font-bold md:writing-vertical-lr reveal"
              style={{
                color: 'var(--terra)',
                letterSpacing: '0.3em',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                whiteSpace: 'nowrap',
              }}
            >
              {ABOUT_MISSION.label}
            </p>
          </div>

          <div className="md:col-span-11 relative">
            <div
              className="absolute hidden md:block"
              aria-hidden="true"
              style={{
                top: '-16px',
                left: '-20px',
                width: '240px',
                height: '80px',
                backgroundColor: 'var(--forest)',
                opacity: 0.08,
                zIndex: 0,
              }}
            />

            <h2
              className="font-serif font-black leading-tight mb-8 relative z-10 reveal-clip"
              style={{ fontSize: 'clamp(26px, 5.5vw, 64px)', color: 'var(--forest)' }}
            >
              {ABOUT_MISSION.title}
            </h2>

            <p className="text-base leading-relaxed max-w-2xl reveal" style={{ color: 'var(--forest)', opacity: 0.8 }}>
              {ABOUT_MISSION.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
