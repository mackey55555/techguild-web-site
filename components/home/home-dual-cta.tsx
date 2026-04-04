import Link from 'next/link'

export function HomeDualCta() {
  return (
    <section
      className="relative clip-diagonal-top overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      {/* Diagonal divider line */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left — For Companies */}
          <div
            className="flex flex-col items-center justify-center py-20 md:py-28 px-8 md:px-12 gap-8 relative reveal"
            style={{ borderRight: '1px solid rgba(250,246,238,0.15)' }}
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold opacity-50"
              style={{ color: 'var(--cream)' }}
            >
              For Companies
            </p>
            <h2
              className="font-serif font-black text-center leading-snug"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: 'var(--cream)' }}
            >
              {'地域のITを'}
              <br />
              {'一緒につくる。'}
            </h2>
            <Link
              href="/companies"
              className="inline-block px-8 py-4 font-bold text-sm border-2 transition-all hover:bg-cream hover:text-forest"
              style={{
                borderColor: 'var(--cream)',
                color: 'var(--cream)',
                transform: 'rotate(-1deg)',
              }}
            >
              {'企業として関わる'}
            </Link>
          </div>

          {/* Right — For Students */}
          <div
            className="flex flex-col items-center justify-center py-20 md:py-28 px-8 md:px-12 gap-8 reveal"
            style={{ backgroundColor: 'rgba(240,201,58,0.08)' }}
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold opacity-70"
              style={{ color: 'var(--gold)' }}
            >
              For Students
            </p>
            <h2
              className="font-serif font-black text-center leading-snug"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: 'var(--gold)' }}
            >
              {'本物をつくる'}
              <br />
              {'場所がある。'}
            </h2>
            <Link
              href="/students"
              className="inline-block px-8 py-4 font-bold text-sm border-2 transition-all hover:bg-transparent hover:text-gold"
              style={{
                backgroundColor: 'var(--gold)',
                borderColor: 'var(--gold)',
                color: 'var(--forest)',
                transform: 'rotate(1deg)',
              }}
            >
              {'学生として参加する'}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
