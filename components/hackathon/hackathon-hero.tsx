import Image from 'next/image'
import type { Hackathon } from '@/lib/cms'
import { ApplyButton, statusLabel } from '@/components/hackathon/hackathon-apply-button'

export function HackathonHero({ hackathon }: { hackathon: Hackathon }) {
  const facts = [
    { label: '日程', value: hackathon.dateLabel },
    { label: '会場', value: hackathon.venueName },
    { label: '定員', value: hackathon.capacity },
    { label: '参加費', value: hackathon.fee },
  ].filter((f) => f.value)

  return (
    <section
      className="relative pt-32 pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <span
        aria-hidden="true"
        className="select-none absolute"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(80px, 18vw, 240px)',
          color: 'var(--forest)',
          opacity: 0.04,
          top: '38%',
          left: '-2%',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        HACKATHON
      </span>

      <div className="max-w-7xl mx-auto relative">
        {hackathon.heroImage && (
          <div
            className="relative w-full mb-10 border-2 overflow-hidden reveal"
            style={{ borderColor: 'var(--forest)', aspectRatio: '1280 / 524' }}
          >
            <Image
              src={hackathon.heroImage}
              alt={`${hackathon.title} ${hackathon.subtitle}`.trim()}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6 reveal">
          <span
            className="stamp-border px-3 py-1 text-xs font-bold tracking-widest"
            style={{
              backgroundColor: hackathon.status === 'open' ? 'var(--gold)' : 'transparent',
              color: 'var(--forest)',
            }}
          >
            {statusLabel(hackathon.status)}
          </span>
          <p
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
          >
            Hackathon
          </p>
        </div>

        <h1
          className="font-serif font-black leading-tight text-balance reveal"
          style={{ fontSize: 'clamp(30px, 6.5vw, 78px)', color: 'var(--forest)' }}
        >
          {hackathon.title}
        </h1>

        {hackathon.subtitle && (
          <p
            className="font-serif font-bold mt-3 reveal"
            style={{ fontSize: 'clamp(17px, 3vw, 30px)', color: 'var(--terra)' }}
          >
            {hackathon.subtitle}
          </p>
        )}

        <div className="h-1 w-24 my-8 reveal" style={{ backgroundColor: 'var(--gold)' }} />

        {hackathon.catchCopy && (
          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed reveal"
            style={{ color: 'var(--forest)', opacity: 0.85 }}
          >
            {hackathon.catchCopy}
          </p>
        )}

        <div className="mt-10 reveal">
          <ApplyButton url={hackathon.connpassUrl} status={hackathon.status} />
          <p className="text-sm mt-3" style={{ color: 'var(--forest)', opacity: 0.6 }}>
            お申し込み・最新情報は connpass のイベントページから
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-14 border-2 reveal" style={{ borderColor: 'var(--forest)', backgroundColor: 'var(--forest)' }}>
          {facts.map((f) => (
            <div key={f.label} className="p-5" style={{ backgroundColor: '#ffffff' }}>
              <dt
                className="text-xs font-bold tracking-widest mb-2"
                style={{ color: 'var(--terra)', letterSpacing: '0.2em' }}
              >
                {f.label}
              </dt>
              <dd className="text-base font-bold leading-snug" style={{ color: 'var(--forest)' }}>
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
