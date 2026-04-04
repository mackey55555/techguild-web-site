import { Lightbulb, Users, Heart } from 'lucide-react'

const items = [
  {
    icon: Lightbulb,
    title: 'ハッカソンのテーマ・課題を提供する',
    body: '自社が取り組む地域課題や技術テーマを持ち込み、学生と一緒に解決策を考える。',
  },
  {
    icon: Users,
    title: '座談会に社員が参加する',
    body: '月一回の座談会に社員を派遣。学生と対等に話す場に出ることで、社員自身の気づきも生まれる。',
  },
  {
    icon: Heart,
    title: 'コミュニティの活動を継続的に支える',
    body: '場所・食事・運営サポートなど、形はさまざま。一緒にこのコミュニティを育てるパートナーとして。',
  },
]

export function CompaniesInvolvement() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-both"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-50 reveal" style={{ color: 'var(--cream)' }}>
          How to Involve
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal"
          style={{ fontSize: 'clamp(22px, 4vw, 48px)', color: 'var(--cream)' }}
        >
          関わり方は3つ。
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="reveal flex flex-col gap-4 p-7 border"
                style={{
                  borderColor: 'rgba(250,246,238,0.2)',
                  backgroundColor: 'rgba(250,246,238,0.04)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <Icon size={28} style={{ color: 'var(--gold)' }} strokeWidth={1.5} />
                <h3
                  className="font-serif font-bold leading-snug"
                  style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: 'var(--cream)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--cream)', opacity: 0.7 }}>
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
