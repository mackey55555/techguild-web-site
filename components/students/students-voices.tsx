import type { StudentVoice } from '@/lib/microcms'

const FALLBACK_VOICES: StudentVoice[] = [
  { id: '1', name: '田中さん', university: '○○大学 工学部 3年', quote: '授業で学んだ知識だけでは不安でしたが、Tech Guildで実際のプロダクトを作ったことで自信がつきました。チームメンバーとの協力も良い経験になりました。', displayOrder: 1 },
  { id: '2', name: '鈴木さん', university: '△△大学 情報科学科 4年', quote: '就活の面接で「実際にリリースしたアプリがある」と言えたのは大きかったです。企業の方との打ち合わせ経験も、社会人になってから役立っています。', displayOrder: 2 },
  { id: '3', name: '山田さん', university: '□□大学 経済学部 2年', quote: '文系出身でプログラミング歴も浅かったですが、デザインや企画でも貢献できました。技術だけじゃない「ものづくり」の楽しさを知れました。', displayOrder: 3 },
]

export function StudentsVoices({ voices }: { voices: StudentVoice[] }) {
  const data = voices.length > 0 ? voices : FALLBACK_VOICES
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-3 reveal"
            style={{ color: 'var(--terra)' }}
          >
            Voices
          </p>
          <h2
            className="font-serif font-black reveal"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--forest)' }}
          >
            参加者の声
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((voice, idx) => (
            <div
              key={idx}
              className="p-8 border-2 flex flex-col reveal"
              style={{ borderColor: 'var(--forest)', backgroundColor: 'rgba(250,246,238,0.5)' }}
            >
              <blockquote
                className="text-base leading-relaxed flex-1 mb-6"
                style={{ color: 'var(--forest)' }}
              >
                {`"${voice.quote}"`}
              </blockquote>
              <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <p className="font-bold" style={{ color: 'var(--forest)' }}>{voice.name}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--forest)', opacity: 0.6 }}>{voice.university}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
