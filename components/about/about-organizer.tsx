import type { ReactNode } from 'react'
import Image from 'next/image'
import type { Organizer } from '@/lib/cms'

// プロフィール文中の [文字](URL) をリンクにする。
// HTML として流し込まず（dangerouslySetInnerHTML は使わない）React 要素として組み立てる。
// 許可するのは https:// で始まる URL だけで、それ以外は書かれた文字をそのまま表示する。
const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

function isAllowedUrl(url: string) {
  if (!url.startsWith('https://')) return false
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}

function renderWithLinks(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(INLINE_LINK)) {
    const [raw, label, url] = match
    const start = match.index ?? 0
    if (start > last) nodes.push(text.slice(last, start))
    nodes.push(
      isAllowedUrl(url) ? (
        <a
          key={start}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--forest)' }}
        >
          {label}
        </a>
      ) : (
        raw
      )
    )
    last = start + raw.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function AboutOrganizer({ organizer }: { organizer: Organizer }) {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Photo */}
          <div className="md:col-span-4 reveal">
            {organizer.photo ? (
              <div className="relative w-full aspect-square max-w-64">
                <Image
                  src={organizer.photo}
                  alt={organizer.name}
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="w-full aspect-square max-w-64 border-2 flex items-center justify-center"
                style={{ borderColor: 'var(--forest)', position: 'relative' }}
              >
                <div
                  className="absolute inset-3 border"
                  style={{ borderColor: 'var(--terra)', opacity: 0.4 }}
                />
                <div className="text-center">
                  <p
                    className="font-serif font-black text-6xl opacity-10"
                    style={{ color: 'var(--forest)' }}
                  >
                    G
                  </p>
                </div>
              </div>
            )}
            <p className="mt-4 text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--terra)' }}>
              {organizer.role}
            </p>
          </div>

          {/* Text */}
          <div className="md:col-span-8 flex flex-col gap-5">
            <p
              className="text-xs uppercase tracking-widest font-bold reveal"
              style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
            >
              Founder ／ ギルドマスター
            </p>
            <h2
              className="font-serif font-black leading-tight reveal"
              style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', color: 'var(--forest)' }}
            >
              {organizer.name}より
            </h2>

            <div
              className="text-base leading-relaxed reveal flex flex-col gap-5"
              style={{ color: 'var(--forest)', opacity: 0.82 }}
            >
              {organizer.bio.map((paragraph, i) => (
                <p key={i}>{renderWithLinks(paragraph)}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
