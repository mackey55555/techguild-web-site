'use client'

import { useEffect, useRef } from 'react'

function StatBox({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = 'stamp-in 0.5s cubic-bezier(0.4,0,0.2,1) both'
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-8 md:p-10 border-2 reveal"
      style={{
        borderColor: 'rgba(250,246,238,0.3)',
        opacity: 1,
      }}
    >
      <span
        className="font-serif font-black leading-none"
        style={{ fontSize: 'clamp(52px, 9vw, 96px)', color: 'var(--gold)' }}
      >
        {value}
      </span>
      <span
        className="text-xs uppercase tracking-widest font-semibold mt-2 opacity-60"
        style={{ color: 'var(--cream)' }}
      >
        {label}
      </span>
    </div>
  )
}

export function HomeTrackRecord({
  participantCount,
  eventCount,
  periodLabel,
  tagline,
}: {
  participantCount: string
  eventCount: number
  periodLabel: string
  tagline: string
}) {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      {/* Decorative bg text */}
      <span
        className="text-texture-light select-none absolute"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(100px, 20vw, 260px)',
          bottom: '10%',
          right: '-2%',
          opacity: 0.05,
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          color: 'var(--cream)',
          lineHeight: 1,
        }}
      >
        Record
      </span>

      <div className="max-w-7xl mx-auto relative">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-10 reveal"
          style={{ color: 'rgba(250,246,238,0.5)' }}
        >
          Track Record
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 reveal">
          <StatBox value={participantCount} label="参加者" />
          <StatBox value={`${eventCount}`} label="イベント" />
          <StatBox value={periodLabel} label="活動" />
        </div>

        <p
          className="font-serif font-black text-center reveal"
          style={{
            fontSize: 'clamp(22px, 4vw, 48px)',
            color: 'var(--gold)',
          }}
        >
          {tagline}
        </p>
      </div>
    </section>
  )
}
