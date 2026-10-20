import type { Hackathon } from '@/lib/cms'
import { ApplyButton } from '@/components/hackathon/hackathon-apply-button'
import { CONNPASS_GROUP_URL } from '@/lib/connpass'

export function HackathonCta({ hackathon }: { hackathon: Hackathon }) {
  const finished = hackathon.status === 'finished'

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10 clip-diagonal-top text-center overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <span
        aria-hidden="true"
        className="select-none absolute"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(80px, 18vw, 240px)',
          color: 'var(--cream)',
          opacity: 0.04,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        JOIN
      </span>

      <div className="max-w-2xl mx-auto relative flex flex-col items-center gap-8">
        <h2
          className="font-serif font-black leading-tight reveal-clip"
          style={{ fontSize: 'clamp(28px, 5.5vw, 60px)', color: 'var(--cream)' }}
        >
          {finished ? (
            <>
              ご参加・ご協賛、
              <br />
              ありがとうございました。
            </>
          ) : (
            <>
              2日間、
              <br />
              つくりきってみませんか。
            </>
          )}
        </h2>

        <p className="text-base leading-relaxed opacity-75 reveal" style={{ color: 'var(--cream)' }}>
          {hackathon.dateLabel}
          <br />
          {hackathon.venueName}／{hackathon.capacity}／{hackathon.fee}
        </p>

        {finished ? (
          <a
            href={CONNPASS_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center px-8 py-4 rounded-full border-[1.5px] text-base font-bold reveal"
          >
            次回の開催情報を connpass で見る
          </a>
        ) : (
          <div className="reveal">
            <ApplyButton url={hackathon.connpassUrl} status={hackathon.status} />
          </div>
        )}

        {hackathon.organizerLabel && (
          <p className="text-sm opacity-60" style={{ color: 'var(--cream)' }}>
            主催：{hackathon.organizerLabel}
          </p>
        )}
      </div>
    </section>
  )
}
