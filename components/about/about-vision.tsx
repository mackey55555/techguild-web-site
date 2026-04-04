import { ABOUT_VISION } from '@/lib/content'

export function AboutVision() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden clip-diagonal-both"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-11">
            <h2
              className="font-serif font-black leading-tight mb-8 reveal-clip whitespace-pre-line"
              style={{ fontSize: 'clamp(26px, 5.5vw, 64px)', color: 'var(--cream)' }}
            >
              {ABOUT_VISION.title}
            </h2>

            <p className="text-base leading-relaxed max-w-2xl reveal" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              {ABOUT_VISION.description}
            </p>
          </div>

          <div className="md:col-span-1 flex md:justify-center md:pt-4">
            <p
              className="text-xs uppercase tracking-widest font-bold reveal"
              style={{
                color: 'var(--gold)',
                letterSpacing: '0.3em',
                writingMode: 'vertical-rl',
                whiteSpace: 'nowrap',
                opacity: 0.6,
              }}
            >
              {ABOUT_VISION.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
