export function ActivitiesRoundtable() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-both overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

          {/* Photo placeholder */}
          <div className="md:col-span-5 reveal-left order-2 md:order-1">
            <div
              className="relative aspect-video border-2"
              style={{ borderColor: 'rgba(250,246,238,0.3)' }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(240,201,58,0.08)' }}
              />
              <div
                className="absolute -top-4 -left-4 w-full h-full border"
                style={{ borderColor: 'rgba(250,246,238,0.15)', zIndex: -1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p
                  className="font-serif font-black opacity-15"
                  style={{ fontSize: 'clamp(32px, 6vw, 60px)', color: 'var(--cream)' }}
                >
                  DINNER
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-7 flex flex-col gap-6 order-1 md:order-2">
            <p
              className="text-xs uppercase tracking-widest font-bold reveal"
              style={{ color: 'rgba(250,246,238,0.5)', letterSpacing: '0.25em' }}
            >
              Roundtable &amp; Dinner
            </p>

            {/* Big headline */}
            <p
              className="font-serif font-black leading-tight reveal-clip"
              style={{
                fontSize: 'clamp(28px, 5vw, 60px)',
                color: 'var(--gold)',
              }}
            >
              12ヶ月、<br />欠かさずやってきた。
            </p>

            <div className="space-y-4">
              <p className="text-base leading-relaxed reveal" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                月に一度、ご飯を食べながら話す。それだけのことだが、毎回何かが動く。社会人と学生が同じテーブルで、本音で話せる夜。
              </p>
              <p className="text-base leading-relaxed reveal" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                「キャリアの話」もあれば、「今週起きたこと」もある。決まったアジェンダはない。ただ、毎回続いてきたのには理由がある。
              </p>
            </div>

            <div
              className="border-l-4 pl-5 mt-2 reveal"
              style={{ borderLeftColor: 'var(--gold)' }}
            >
              <p
                className="font-serif font-semibold"
                style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'var(--cream)', opacity: 0.9 }}
              >
                毎月の積み重ねが、<br />コミュニティの体温になる。
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
