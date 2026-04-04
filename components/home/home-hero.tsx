import Link from 'next/link'

export function HomeHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden clip-diagonal-bottom pt-16"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      {/* Decorative background text */}
      <span
        className="text-texture select-none"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(140px, 28vw, 420px)',
          top: '50%',
          left: '-2%',
          transform: 'translateY(-50%)',
          letterSpacing: '-0.04em',
          opacity: 0.055,
        }}
      >
        {'共創'}
      </span>

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Headline */}
          <div className="lg:col-span-8">
            <h1
              className="font-serif font-black leading-none text-balance reveal"
              style={{
                fontSize: 'clamp(52px, 10vw, 128px)',
                color: 'var(--forest)',
                letterSpacing: '-0.02em',
              }}
            >
              {'学生と企業が、'}
              <br />
              {'地域のITを'}
              <br />
              <span style={{ color: 'var(--gold)' }}>{'一緒に育てる。'}</span>
            </h1>
          </div>

          {/* Right: Sub content */}
          <div className="lg:col-span-4 lg:self-end lg:pb-8 flex flex-col gap-8 reveal">
            <p
              className="text-sm md:text-base leading-relaxed font-medium"
              style={{ color: 'var(--forest)', opacity: 0.75 }}
            >
              Tech Guild is a co-creation community —<br />
              companies and students, equal partners.
            </p>

            {/* CTA Stamps */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/companies"
                className="inline-block px-6 py-3 font-bold text-sm text-center cta-stamp-forest"
              >
                {'企業として関わる'}
              </Link>
              <Link
                href="/students"
                className="inline-block px-6 py-3 font-bold text-sm text-center cta-stamp-gold"
              >
                {'学生として参加する'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
