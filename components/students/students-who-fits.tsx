const fits = [
  'プログラミングを学んでいて、実践で腕試しをしたい方',
  'プログラミング未経験・これから始めてみたい方',
  'チーム開発やプロダクト開発を経験したい方',
  'ポートフォリオに載せられる成果物が欲しい方',
  '地域・社会に貢献するものづくりに興味がある方',
  'IT業界・スタートアップに興味がある方',
]

export function StudentsWhoFits() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--forest)' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="font-serif font-black reveal"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--cream)' }}
          >
            こんな人に来てほしい
          </h2>
        </div>

        <div
          className="p-8 md:p-10 border-2 reveal"
          style={{ borderColor: 'var(--gold)', backgroundColor: 'rgba(250,246,238,0.05)' }}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {fits.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 leading-relaxed"
                style={{ color: 'var(--cream)' }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--gold)' }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p
          className="text-center mt-10 leading-relaxed reveal"
          style={{ color: 'var(--cream)', opacity: 0.85 }}
        >
          「まだ何もできない」と思っていても大丈夫。
          <br className="hidden sm:block" />
          やってみたい気持ちさえあれば、私たちがしっかり受け止めます。
        </p>
      </div>
    </section>
  )
}
