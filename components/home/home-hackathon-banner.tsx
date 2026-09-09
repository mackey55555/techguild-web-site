import Image from 'next/image'
import Link from 'next/link'
import type { Hackathon } from '@/lib/cms'
import { statusLabel } from '@/components/hackathon/hackathon-apply-button'

export function HomeHackathonBanner({ hackathon }: { hackathon: Hackathon | null }) {
  if (!hackathon) return null

  return (
    <section className="pt-10 pb-6 md:pt-14 md:pb-8 px-6 md:px-10" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        <Link
          href={`/hackathon/${hackathon.slug}`}
          className="group block border-2 shadow-[8px_8px_0_0_var(--forest)] transition-all duration-200 hover:shadow-[4px_4px_0_0_var(--forest)] hover:translate-x-[4px] hover:translate-y-[4px] reveal"
          style={{ borderColor: 'var(--forest)', backgroundColor: '#ffffff' }}
        >
          {hackathon.heroImage && (
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '1280 / 524', borderBottom: '2px solid var(--forest)' }}
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

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-5 md:p-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className="stamp-border px-3 py-1 text-xs font-bold tracking-widest"
                  style={{
                    backgroundColor: hackathon.status === 'open' ? 'var(--gold)' : 'transparent',
                    color: 'var(--forest)',
                  }}
                >
                  {statusLabel(hackathon.status)}
                </span>
                <span className="text-sm font-bold" style={{ color: 'var(--terra)' }}>
                  {hackathon.dateLabel}
                </span>
              </div>
              <p className="font-serif font-bold text-lg md:text-2xl leading-snug" style={{ color: 'var(--forest)' }}>
                {hackathon.title}
                {hackathon.subtitle && (
                  <span className="block md:inline md:ml-2 text-base md:text-xl" style={{ opacity: 0.7 }}>
                    {hackathon.subtitle}
                  </span>
                )}
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--forest)', opacity: 0.7 }}>
                {hackathon.venueName}／{hackathon.capacity}／{hackathon.fee}
              </p>
            </div>

            <span
              className="btn-forest inline-flex items-center justify-center shrink-0 gap-2 px-6 py-3 rounded-full border-[1.5px] text-sm font-bold"
            >
              イベント詳細を見る
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
