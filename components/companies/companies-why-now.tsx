const reasons = [
  {
    num: '01',
    title: '地域のIT土壌をつくる最初の一社になれる',
    body: '立ち上げ期のコミュニティに関わることは、地域のIT教育の在り方を一緒に定義することでもある。その経験と実績は、どこにもない。',
  },
  {
    num: '02',
    title: '学生と直接関わりながら、技術の現場を一緒に作れる',
    body: '採用でもなく、外注でもなく、本音で話せる関係性を学生と築ける。それが将来の採用や共創につながっていく。',
  },
  {
    num: '03',
    title: '立ち上げ期だからこそ、深く・長く関われる',
    body: '大きなコミュニティになると、一社あたりの影響力は小さくなる。今だからこそ、コミュニティの方向性を一緒に決められる立場でいられる。',
  },
]

export function CompaniesWhyNow() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-bold mb-4 reveal" style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}>
          Why Now
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal"
          style={{ fontSize: 'clamp(22px, 4vw, 48px)', color: 'var(--forest)' }}
        >
          なぜ、今関わるのか。
        </h2>

        <div className="flex flex-col gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.num}
              className="card-hover border-2 p-7 md:p-9 reveal flex flex-col md:flex-row gap-6 items-start"
              style={{
                borderColor: 'var(--forest)',
                backgroundColor: 'var(--cream)',
                animationDelay: `${i * 150}ms`,
              }}
            >
              <span
                className="font-serif font-black flex-shrink-0"
                style={{ fontSize: '40px', color: 'var(--gold)', lineHeight: 1 }}
              >
                {r.num}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-serif font-bold"
                  style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'var(--forest)' }}
                >
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--forest)', opacity: 0.75 }}>
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
