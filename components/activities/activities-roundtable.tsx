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
                  TALK
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
              Roundtable
            </p>

            {/* Big headline */}
            <p
              className="font-serif font-black leading-tight reveal-clip"
              style={{
                fontSize: 'clamp(28px, 5vw, 60px)',
                color: 'var(--gold)',
              }}
            >
              毎月、技術と<br />本音を交わす。
            </p>

            <div className="space-y-4">
              <p className="text-base leading-relaxed reveal" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                LTや最近の技術の話、日々の悩み相談まで。学生と社会人が混ざって、ゆるく、でも深く語り合う。決まったアジェンダはなく、立場を越えてフラットに話せる場です。
              </p>
              <p className="text-base leading-relaxed reveal" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                毎回いろんなテーマが飛び交い、新しい気づきが生まれる。会のあとには、希望者で懇親会も。
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
