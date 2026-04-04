const fits = [
  'プログラミングを学んでいて、実践で腕試しをしたい方',
  'チーム開発やプロダクト開発を経験したい方',
  'ポートフォリオに載せられる成果物が欲しい方',
  '地域・社会に貢献するものづくりに興味がある方',
  'スタートアップやIT業界への就職を考えている方',
]

const notFits = [
  'プログラミングの基礎学習から始めたい方（まずは学習を進めてから!）',
  '自分のペースだけで活動したい方（チーム活動が中心です）',
  '単位や報酬目的だけの方（主体性を大切にしています）',
]

export function StudentsWhoFits() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--forest)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="font-serif font-black reveal"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--cream)' }}
          >
            こんな人に向いています
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Fits */}
          <div
            className="p-8 border-2 reveal"
            style={{ borderColor: 'var(--gold)', backgroundColor: 'rgba(250,246,238,0.05)' }}
          >
            <h3
              className="font-serif font-bold text-xl mb-6 flex items-center gap-2"
              style={{ color: 'var(--gold)' }}
            >
              <span className="text-2xl">○</span> 参加をおすすめ
            </h3>
            <ul className="space-y-3">
              {fits.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 leading-relaxed"
                  style={{ color: 'var(--cream)' }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--gold)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not Fits */}
          <div
            className="p-8 border-2 reveal"
            style={{ borderColor: 'rgba(250,246,238,0.3)', backgroundColor: 'rgba(250,246,238,0.02)' }}
          >
            <h3
              className="font-serif font-bold text-xl mb-6 flex items-center gap-2"
              style={{ color: 'var(--cream)', opacity: 0.7 }}
            >
              <span className="text-2xl">△</span> 今は待ったほうが良いかも
            </h3>
            <ul className="space-y-3">
              {notFits.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 leading-relaxed"
                  style={{ color: 'var(--cream)', opacity: 0.7 }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--cream)', opacity: 0.5 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
