import Link from 'next/link'
import type { NextEvent } from '@/lib/microcms'

export function ActivitiesNextEvent({ event }: { event: NextEvent | null }) {
  const headline = event ? event.headline : '次回のイベントは\n近日公開予定。'
  const subtext = event
    ? event.subtext
    : '詳細はSNSまたはメールマガジンにてお知らせします。'
  const ctaLabel = event ? event.ctaLabel : '参加申込みはこちら →'
  const ctaHref = event ? event.ctaHref : '/students'

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10 clip-diagonal-top text-center"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <p className="text-xs uppercase tracking-widest font-semibold opacity-50 reveal" style={{ color: 'var(--cream)' }}>
          Next Event
        </p>

        <h2
          className="font-serif font-black leading-tight reveal-clip whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5.5vw, 60px)',
            color: 'var(--cream)',
          }}
        >
          {headline}
        </h2>

        <p className="text-sm opacity-60 reveal" style={{ color: 'var(--cream)' }}>
          {subtext}
        </p>

        <Link
          href={ctaHref}
          className="inline-block px-10 py-4 font-bold text-base border-2 reveal transition-all duration-300 hover:bg-transparent"
          style={{
            borderColor: 'var(--gold)',
            backgroundColor: 'var(--gold)',
            color: 'var(--forest)',
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
