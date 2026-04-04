import type { RoundtableSession } from '@/lib/microcms'

const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.8, -1.2, 1.3, -0.7, 1.1, -1.4, 0.6]

const FALLBACK_SESSIONS: RoundtableSession[] = [
  { id: '1',  date: '2024.01', topic: 'キャリアの話と、地域ITの現状',         sessionOrder: 1  },
  { id: '2',  date: '2024.02', topic: 'エンジニアが学生に伝えたいこと',       sessionOrder: 2  },
  { id: '3',  date: '2024.03', topic: 'ハッカソン振り返りと次回構想',         sessionOrder: 3  },
  { id: '4',  date: '2024.04', topic: '失敗談から学ぶものづくりの話',         sessionOrder: 4  },
  { id: '5',  date: '2024.05', topic: 'デザインとエンジニアリングの境界線',   sessionOrder: 5  },
  { id: '6',  date: '2024.06', topic: '地域で働くということ',                 sessionOrder: 6  },
  { id: '7',  date: '2024.07', topic: '個人プロジェクトを持つ意味',           sessionOrder: 7  },
  { id: '8',  date: '2024.08', topic: 'オープンソースの話と参加のきっかけ',   sessionOrder: 8  },
  { id: '9',  date: '2024.09', topic: 'テクノロジーと地域課題',               sessionOrder: 9  },
  { id: '10', date: '2024.10', topic: '学生の「本音」を聞く夜',               sessionOrder: 10 },
  { id: '11', date: '2024.11', topic: 'チームで動くときの摩擦と成長',         sessionOrder: 11 },
  { id: '12', date: '2024.12', topic: '2024年の振り返りと2025年へ',           sessionOrder: 12 },
]

export function ActivitiesRecord({ sessions }: { sessions: RoundtableSession[] }) {
  const data = sessions.length > 0 ? sessions : FALLBACK_SESSIONS
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="font-serif font-black leading-tight mb-12 reveal"
          style={{ fontSize: 'clamp(24px, 5vw, 56px)', color: 'var(--forest)' }}
        >
          12ヶ月分の、積み重ね。
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.map((session, i) => (
            <div
              key={session.date}
              className="card-hover border p-4 flex flex-col gap-2 reveal"
              style={{
                borderColor: 'var(--forest)',
                transform: `rotate(${rotations[i]}deg)`,
                backgroundColor: i % 3 === 0 ? 'var(--gold)' : 'var(--cream)',
                boxShadow: '2px 2px 0 rgba(28,56,41,0.12)',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: i % 3 === 0 ? 'var(--forest)' : 'var(--terra)' }}
              >
                {session.date}
              </p>
              <p
                className="text-xs leading-relaxed font-medium"
                style={{ color: 'var(--forest)' }}
              >
                {session.topic}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
