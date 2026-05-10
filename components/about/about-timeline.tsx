'use client'

import { useEffect, useRef } from 'react'
import type { RoadmapMilestone } from '@/lib/microcms'

const FALLBACK_MILESTONES: RoadmapMilestone[] = [
  { id: '1', year: '2026', events: '初ハッカソン開催（17名）\n座談会 12回連続', status: 'done', sortOrder: 1 },
  { id: '2', year: '2027', events: '活動拡大中…', status: 'upcoming', sortOrder: 2 },
  { id: '3', year: '2028', events: '地域ITコミュニティの標準モデルへ', status: 'future', sortOrder: 3 },
]

export function AboutTimeline({ milestones }: { milestones: RoadmapMilestone[] }) {
  const data = milestones.length > 0 ? milestones : FALLBACK_MILESTONES
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'width 1.4s cubic-bezier(0.4,0,0.2,1)'
          el.style.width = '100%'
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-50 reveal" style={{ color: 'var(--cream)' }}>
          Roadmap
        </p>
        <p
          className="font-serif font-bold mb-12 reveal"
          style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'var(--cream)', opacity: 0.7 }}
        >
          まだ始まったばかり。でも、止まっていない。
        </p>

        {/* Timeline track */}
        <div className="relative mb-8">
          {/* Background track */}
          <div
            className="h-px w-full"
            style={{ backgroundColor: 'rgba(250,246,238,0.2)' }}
          />
          {/* Animated fill */}
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-px"
            style={{ backgroundColor: 'var(--gold)', width: '0%' }}
          />
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((m, i) => (
            <div
              key={m.year}
              className="reveal flex flex-col gap-3"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Node */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                  style={{
                    borderColor: m.status === 'done' ? 'var(--gold)' : 'rgba(250,246,238,0.3)',
                    backgroundColor: m.status === 'done' ? 'var(--gold)' : 'transparent',
                  }}
                />
                <span
                  className="font-serif font-black"
                  style={{
                    fontSize: '28px',
                    color: m.status === 'done' ? 'var(--gold)' : 'rgba(250,246,238,0.4)',
                  }}
                >
                  {m.year}
                </span>
              </div>

              {m.events.split('\n').map((event) => (
                <p
                  key={event}
                  className="text-sm leading-relaxed pl-7"
                  style={{
                    color: m.status === 'done' ? 'var(--cream)' : 'rgba(250,246,238,0.4)',
                  }}
                >
                  {event}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
