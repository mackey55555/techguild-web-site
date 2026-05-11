'use client'

import { useEffect, useRef } from 'react'
import type { RoadmapMilestone } from '@/lib/microcms'
import fallbackMilestones from '@/data/roadmap-milestones.json'

const FALLBACK_MILESTONES = fallbackMilestones as RoadmapMilestone[]

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

              {m.events.map((event, eventIndex) => {
                const parsed = parseMarkdownLink(event)
                return (
                  <p
                    key={`${m.year}-${eventIndex}`}
                    className="text-sm leading-relaxed pl-7"
                    style={{
                      color: m.status === 'done' ? 'var(--cream)' : 'rgba(250,246,238,0.4)',
                    }}
                  >
                    {parsed ? (
                      <a
                        href={parsed.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--gold)' }}
                      >
                        {parsed.text}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </a>
                    ) : (
                      event
                    )}
                  </p>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function parseMarkdownLink(value: string): { text: string; url: string } | null {
  const match = value.match(/^\[(.+)\]\((.+)\)$/)
  if (!match) return null

  const text = match[1]
  const rawUrl = match[2]
  const parsed = parseUrl(rawUrl)
  if (!parsed) return null

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null

  return { text, url: parsed.toString() }
}

function parseUrl(value: string): URL | null {
  try {
    return new URL(value)
  } catch {
    return null
  }
}
