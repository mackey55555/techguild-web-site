import type { StudentVoice } from '@/lib/cms'

export function StudentsVoices({ voices }: { voices: StudentVoice[] }) {
  // 実データが無い間はセクションごと非表示にする
  if (voices.length === 0) return null
  const data = voices
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
          {data.map((voice) => (
            <div
              key={voice.slug}
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
