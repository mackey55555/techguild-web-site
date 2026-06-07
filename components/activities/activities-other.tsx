const items = [
  {
    label: 'Seminar',
    title: 'セミナー',
    body: '東京などから第一線で活躍するエンジニアを招き、技術や経験を直接学ぶ会。地域にいながら、外の視点に触れられる機会です。',
  },
  {
    label: 'Camp',
    title: '野営会',
    body: 'スピンオフ企画。自然の中でリフレッシュしながら、いつもと違う空気で交流する。ゆるくつながる、もうひとつの場。',
  },
  {
    label: 'For Students',
    title: '学生向けの会',
    body: '勉強会や就活の相談会など、学生の成長を後押しする会も随時開催。「やってみたい」をいつでも受け止めます。',
  },
]

export function ActivitiesOther() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
          style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
        >
          Other Activities
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal"
          style={{ fontSize: 'clamp(22px, 4vw, 48px)', color: 'var(--forest)' }}
        >
          そのほかの活動。
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="card-hover border-2 p-7 md:p-8 flex flex-col gap-3 reveal"
              style={{
                borderColor: 'var(--forest)',
                backgroundColor: 'var(--cream)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <p
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: 'var(--terra)' }}
              >
                {item.label}
              </p>
              <h3
                className="font-serif font-black"
                style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: 'var(--forest)' }}
              >
                {item.title}
              </h3>
              <div className="h-1 w-12" style={{ backgroundColor: 'var(--gold)' }} />
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--forest)', opacity: 0.8 }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
