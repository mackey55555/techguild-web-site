import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollRevealProvider } from '@/components/scroll-reveal-provider'
import { statusLabel } from '@/components/hackathon/hackathon-apply-button'
import { getHackathons } from '@/lib/cms'
import { CONNPASS_GROUP_URL } from '@/lib/connpass'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'ハッカソン | Tech Guild',
  description:
    'Tech Guildが開催するハッカソンの一覧です。学生と社会人が混ざったチームで、短期集中でつくりきります。',
}

export default async function HackathonIndexPage() {
  const hackathons = await getHackathons()

  return (
    <ScrollRevealProvider>
      <section className="pt-32 pb-24 px-6 md:px-10" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest font-bold mb-6 reveal"
            style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
          >
            Hackathon
          </p>
          <h1
            className="font-serif font-black leading-tight mb-6 reveal"
            style={{ fontSize: 'clamp(28px, 6.5vw, 72px)', color: 'var(--forest)' }}
          >
            ハッカソン
          </h1>

          <p
            className="max-w-2xl text-base leading-relaxed mb-12 reveal"
            style={{ color: 'var(--forest)', opacity: 0.8 }}
          >
            学生と社会人が混ざったチームで、短期集中でつくりきる。Tech Guild が開催するハッカソンの一覧です。お申し込みは各イベントの connpass ページから。
          </p>

          {hackathons.length === 0 ? (
            <div
              className="p-8 border-2 border-dashed reveal"
              style={{ borderColor: 'var(--forest)' }}
            >
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--forest)', opacity: 0.8 }}>
                現在公開中のハッカソンはありません。次回の開催情報は connpass グループでお知らせします。
              </p>
              <a
                href={CONNPASS_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-forest inline-flex items-center justify-center px-6 py-3 rounded-full border-[1.5px] text-sm font-bold"
              >
                connpass グループを見る
              </a>
            </div>
          ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map((h) => (
              <li key={h.slug} className="reveal">
                <Link
                  href={`/hackathon/${h.slug}`}
                  className="group flex flex-col h-full p-6 md:p-8 border-2 shadow-[6px_6px_0_0_var(--forest)] transition-all duration-200 hover:shadow-[3px_3px_0_0_var(--forest)] hover:translate-x-[3px] hover:translate-y-[3px]"
                  style={{ backgroundColor: '#ffffff', borderColor: 'var(--forest)' }}
                >
                  <span
                    className="stamp-border self-start px-3 py-1 text-xs font-bold tracking-widest mb-4"
                    style={{
                      backgroundColor: h.status === 'open' ? 'var(--gold)' : 'transparent',
                      color: 'var(--forest)',
                    }}
                  >
                    {statusLabel(h.status)}
                  </span>
                  <p className="text-sm font-bold mb-2" style={{ color: 'var(--terra)' }}>
                    {h.dateLabel}
                  </p>
                  <h2 className="font-serif font-bold text-xl md:text-2xl leading-snug" style={{ color: 'var(--forest)' }}>
                    {h.title}
                  </h2>
                  {h.subtitle && (
                    <p className="text-base mt-1" style={{ color: 'var(--forest)', opacity: 0.7 }}>
                      {h.subtitle}
                    </p>
                  )}
                  <p className="text-sm mt-4" style={{ color: 'var(--forest)', opacity: 0.7 }}>
                    {h.venueName}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          )}
        </div>
      </section>
    </ScrollRevealProvider>
  )
}
