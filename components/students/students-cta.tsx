import Link from 'next/link'

export function StudentsCta() {
  return (
    <section
      className="py-24 md:py-32"
      style={{
        background: 'linear-gradient(135deg, var(--gold) 0%, #e6b732 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          className="font-serif font-black leading-tight reveal"
          style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--forest)' }}
        >
          次のイベントに<br className="md:hidden" />参加しよう。
        </h2>
        <p
          className="text-lg md:text-xl mt-6 leading-relaxed max-w-xl mx-auto reveal"
          style={{ color: 'var(--forest)', opacity: 0.85 }}
        >
          まずは説明会やハッカソン見学から。<br className="hidden md:block" />
          あなたのペースで、一歩を踏み出そう。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/activities#next-event"
            className="inline-block px-8 py-4 font-bold text-sm transition-all duration-300 border-2 reveal"
            style={{
              backgroundColor: 'var(--forest)',
              borderColor: 'var(--forest)',
              color: 'var(--cream)',
            }}
          >
            次回のイベントを見る
          </Link>
          <a
            href="https://forms.example.com/student-interest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 font-bold text-sm transition-all duration-300 border-2 reveal"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--forest)',
              color: 'var(--forest)',
            }}
          >
            興味あるリストに登録
          </a>
        </div>

        <p className="text-sm mt-8 reveal" style={{ color: 'var(--forest)', opacity: 0.6 }}>
          {'質問やご相談は '}
          <a href="mailto:students@techguild.example.com" className="underline">
            {'students@techguild.example.com'}
          </a>
          {' まで'}
        </p>
      </div>
    </section>
  )
}
