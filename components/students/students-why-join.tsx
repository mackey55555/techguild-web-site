import { Code2, Users, Rocket, Award } from 'lucide-react'

const reasons = [
  {
    icon: Code2,
    title: '実践的な開発経験',
    description: 'リアルな課題、リアルなユーザー。教科書にはない本当のプロダクト開発を経験できます。',
  },
  {
    icon: Users,
    title: '多様なチームで共創',
    description: '異なるスキル・バックグラウンドを持つ仲間と協力し、チーム開発の醍醐味を味わえます。',
  },
  {
    icon: Rocket,
    title: '企業との直接連携',
    description: '地域企業の担当者と直接やり取りしながら、ビジネス視点も養えます。',
  },
  {
    icon: Award,
    title: 'ポートフォリオに残る成果',
    description: '実際にリリースされたプロダクトは、就活で差をつける強力な武器になります。',
  },
]

export function StudentsWhyJoin() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-3 reveal"
            style={{ color: 'var(--terra)' }}
          >
            Why Join
          </p>
          <h2
            className="font-serif font-black reveal"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--forest)' }}
          >
            参加する理由
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-8 border-2 flex gap-6 items-start transition-shadow duration-300 hover:shadow-lg reveal"
              style={{ borderColor: 'var(--forest)', backgroundColor: 'rgba(250,246,238,0.5)' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--gold)', color: 'var(--forest)' }}
              >
                <reason.icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3
                  className="font-serif font-bold text-xl mb-2"
                  style={{ color: 'var(--forest)' }}
                >
                  {reason.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--forest)', opacity: 0.8 }}>
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
