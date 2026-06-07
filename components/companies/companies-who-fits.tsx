export function CompaniesWhoFits() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-bold mb-4 reveal" style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}>
          Who Fits
        </p>
        <h2
          className="font-serif font-black leading-tight mb-10 reveal"
          style={{ fontSize: 'clamp(22px, 4vw, 48px)', color: 'var(--forest)' }}
        >
          こんな企業と<br />関わりたい。
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          {[
            '地域のIT人材育成に関心がある',
            '学生と対等に話せるカルチャーを持っている',
            '「即採用」でなく「長期的な関係」を重視する',
            '社員が外に出て、外から刺激を受けることを歓迎する',
            '地域に根ざしたビジネスをしている、またはしたい',
          ].map((item, i) => (
            <div
              key={item}
              className="reveal flex items-start gap-4 py-4 border-b"
              style={{ borderBottomColor: 'rgba(28,56,41,0.12)', transitionDelay: `${i * 80}ms` }}
            >
              <span
                className="font-serif font-black flex-shrink-0 mt-0.5"
                style={{ color: 'var(--gold)', fontSize: '20px', lineHeight: 1.2 }}
              >
                →
              </span>
              <p className="text-base leading-relaxed" style={{ color: 'var(--forest)' }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        <p
          className="font-serif font-bold reveal"
          style={{ fontSize: 'clamp(16px, 2.8vw, 26px)', color: 'var(--terra)' }}
        >
          少しでもご関心をお持ちいただけましたら、<br />ぜひ一度お話しさせてください。
        </p>
      </div>
    </section>
  )
}
