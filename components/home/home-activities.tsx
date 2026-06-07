import Link from 'next/link'

export function HomeActivities({ eventCount }: { eventCount: number }) {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-top"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-semibold mb-12 reveal" style={{ color: 'var(--terra)' }}>
          Activities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Large card — Hackathon */}
          <div
            className="md:col-span-7 p-8 md:p-10 border-2 card-hover reveal flex flex-col justify-between min-h-64"
            style={{ borderColor: 'var(--forest)', backgroundColor: 'var(--cream)' }}
          >
            <div>
              <p
                className="text-xs uppercase tracking-widest font-bold mb-6"
                style={{ color: 'var(--terra)' }}
              >
                Hackathon
              </p>
              <h3
                className="font-serif font-black leading-tight mb-4"
                style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--forest)' }}
              >
                学生と社会人<br />で開発する。
              </h3>
              <div
                className="h-1 w-20 mb-4"
                style={{ backgroundColor: 'var(--gold)' }}
              />
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--forest)', opacity: 0.75 }}>
                同じチームでプロダクトをゼロからつくる。学生も社会人も同じスタートラインから、ものづくりに挑む。
              </p>
            </div>
            <Link
              href="/activities"
              className="mt-6 inline-block text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--terra)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
            >
              詳細を見る →
            </Link>
          </div>

          {/* Right column: 2 smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-6">

            {/* Roundtable card */}
            <div
              className="p-6 md:p-8 border-2 card-hover-neg reveal flex flex-col justify-between min-h-36"
              style={{ borderColor: 'var(--forest)', backgroundColor: 'var(--cream)' }}
            >
              <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--terra)' }}>
                Roundtable
              </p>
              <p className="font-serif font-bold text-lg leading-snug" style={{ color: 'var(--forest)' }}>
                LTや技術の話、悩み相談まで。混ざって語る座談会。
              </p>
            </div>

            {/* Stat teaser card */}
            <div
              className="p-6 md:p-8 border-2 card-hover reveal flex flex-col justify-center"
              style={{
                borderColor: 'var(--gold)',
                backgroundColor: 'var(--gold)',
                minHeight: '120px',
              }}
            >
              <p
                className="font-serif font-black leading-none"
                style={{ fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--forest)' }}
              >
                {eventCount}回
              </p>
              <p className="text-xs font-semibold mt-1 uppercase tracking-widest" style={{ color: 'var(--forest)', opacity: 0.7 }}>
                イベント開催
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
