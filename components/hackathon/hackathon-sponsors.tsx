import Image from 'next/image'
import Link from 'next/link'
import type { Hackathon, Sponsor, SponsorTier } from '@/lib/cms'
import { formatJapaneseDate, isBeforeDeadline } from '@/lib/date'

const TIER_ORDER: SponsorTier[] = ['gold', 'silver', 'bronze', 'inkind']

const TIER_LABEL: Record<SponsorTier, string> = {
  gold: 'Gold Sponsor',
  silver: 'Silver Sponsor',
  bronze: 'Bronze Sponsor',
  inkind: '現物協賛',
}

// ロゴ掲載サイズはプラン準拠（大・中・小）。1行に並ぶ枚数を絞るほど1枠が大きくなる。
// 一覧は flex の折り返し＋中央寄せで組むため、端数の行も中央に寄る。
// 幅は「(100% - 行内の隙間の合計) / 1行の枚数」。隙間は gap-5(1.25rem) / md 以上 gap-6(1.5rem)。
const TIER_ITEM_WIDTH: Record<SponsorTier, string> = {
  // 1 → 2枚
  gold: 'w-full sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-1.5rem)/2)]',
  // 1 → 2 → 3枚
  silver:
    'w-full sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]',
  // 2 → 3 → 4枚
  bronze:
    'w-[calc((100%-1.25rem)/2)] sm:w-[calc((100%-2.5rem)/3)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]',
  inkind:
    'w-[calc((100%-1.25rem)/2)] sm:w-[calc((100%-2.5rem)/3)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]',
}

const TIER_LOGO_HEIGHT: Record<SponsorTier, string> = {
  gold: 'h-24 md:h-28',
  silver: 'h-20 md:h-24',
  bronze: 'h-16 md:h-20',
  inkind: 'h-16 md:h-20',
}

// ロゴ未入稿の間は社名テキストで代替するため、ティアごとに文字サイズを変える
const TIER_NAME_SIZE: Record<SponsorTier, string> = {
  gold: 'text-xl md:text-2xl',
  silver: 'text-lg md:text-xl',
  bronze: 'text-base md:text-lg',
  inkind: 'text-base md:text-lg',
}

// ロゴ未入稿でも枠が空いて見えないよう、社名を組んだネームプレートを出す
function hostOf(url?: string) {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const host = hostOf(sponsor.url)

  const inner = (
    <>
      <div className={`relative w-full ${TIER_LOGO_HEIGHT[sponsor.tier]}`}>
        {sponsor.logo ? (
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            sizes="(max-width: 768px) 45vw, 300px"
            className="object-contain"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4"
            style={{ backgroundColor: 'var(--cream)' }}
          >
            <span
              className={`font-serif font-bold text-center leading-snug ${TIER_NAME_SIZE[sponsor.tier]}`}
              style={{ color: 'var(--forest)' }}
            >
              {sponsor.name}
            </span>
            <span
              aria-hidden="true"
              className="block h-0.5 w-8"
              style={{ backgroundColor: 'var(--gold)' }}
            />
            {host && (
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--forest)', opacity: 0.55 }}
              >
                {host}
              </span>
            )}
          </div>
        )}
      </div>
      {sponsor.logo && (
        <p className="mt-4 text-sm font-bold text-center" style={{ color: 'var(--forest)' }}>
          {sponsor.name}
        </p>
      )}
      {sponsor.note && (
        <p className="mt-2 text-xs leading-relaxed text-center" style={{ color: 'var(--forest)', opacity: 0.7 }}>
          {sponsor.note}
        </p>
      )}
    </>
  )

  const className =
    'reveal flex flex-col justify-center p-6 border-2 h-full transition-transform duration-200'

  if (sponsor.url) {
    return (
      <li className={TIER_ITEM_WIDTH[sponsor.tier]}>
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} hover:-translate-y-1`}
          style={{ backgroundColor: '#ffffff', borderColor: 'var(--forest)' }}
        >
          {inner}
        </a>
      </li>
    )
  }

  return (
    <li
      className={`${className} ${TIER_ITEM_WIDTH[sponsor.tier]}`}
      style={{ backgroundColor: '#ffffff', borderColor: 'var(--forest)' }}
    >
      {inner}
    </li>
  )
}

export function HackathonSponsors({ hackathon }: { hackathon: Hackathon }) {
  // 締切を過ぎたら申し込みボタンは出さず、募集文だけ残す
  const acceptingSponsors = isBeforeDeadline(hackathon.sponsorDeadline)
  const deadlineLabel = hackathon.sponsorDeadline
    ? formatJapaneseDate(hackathon.sponsorDeadline)
    : null

  const groups = TIER_ORDER.map((tier) => ({
    tier,
    items: hackathon.sponsors.filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0)

  return (
    <section
      id="sponsors"
      className="scroll-mt-20 py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-4 reveal"
          style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
        >
          Sponsors
        </p>
        <h2
          className="font-serif font-black leading-tight mb-12 reveal-clip"
          style={{ fontSize: 'clamp(26px, 4.5vw, 52px)', color: 'var(--forest)' }}
        >
          {groups.length > 0 ? '協賛企業' : '協賛企業を募集しています'}
        </h2>

        {groups.map((g) => (
          <div key={g.tier} className="mb-12 last:mb-0">
            <p
              className="text-xs uppercase tracking-widest font-bold mb-5 reveal"
              style={{ color: 'var(--forest)', opacity: 0.6, letterSpacing: '0.2em' }}
            >
              {TIER_LABEL[g.tier]}
            </p>
            <ul className="flex flex-wrap justify-center gap-5 md:gap-6">
              {g.items.map((s) => (
                <SponsorCard key={s.name} sponsor={s} />
              ))}
            </ul>
          </div>
        ))}

        <div
          className="mt-12 p-6 md:p-8 border-2 border-dashed reveal flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ borderColor: 'var(--forest)' }}
        >
          <div className="flex-1">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--forest)', opacity: 0.8 }}>
              {hackathon.sponsorMessage ??
                'このハッカソンは、地域の企業のみなさまのご協力で成り立っています。協賛を募集しています。'}
            </p>
            {deadlineLabel && (
              <p className="text-sm font-bold mt-3" style={{ color: 'var(--terra)' }}>
                {acceptingSponsors
                  ? `お申し込みは${deadlineLabel}まで`
                  : `協賛のお申し込みは${deadlineLabel}に締め切りました`}
              </p>
            )}
          </div>
          {!acceptingSponsors ? null : hackathon.sponsorFormUrl ? (
            <a
              href={hackathon.sponsorFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-forest inline-flex items-center justify-center shrink-0 gap-2 px-6 py-3 rounded-full border-[1.5px] text-sm font-bold"
            >
              協賛を申し込む
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
            <Link
              href="/companies#contact"
              className="btn-forest inline-flex items-center justify-center shrink-0 px-6 py-3 rounded-full border-[1.5px] text-sm font-bold"
            >
              協賛について問い合わせる
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
