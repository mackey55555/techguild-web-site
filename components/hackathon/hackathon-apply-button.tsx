import type { HackathonStatus } from '@/lib/cms'

const STATUS_LABEL: Record<HackathonStatus, string> = {
  open: '参加者募集中',
  coming: '近日公開',
  closed: '募集終了',
  finished: '開催終了',
}

export function statusLabel(status: HackathonStatus) {
  return STATUS_LABEL[status]
}

// 申し込みは connpass に集約する（サイト側にフォームは持たない）
export function ApplyButton({
  url,
  status,
  variant = 'gold',
  className = '',
}: {
  url: string | null
  status: HackathonStatus
  variant?: 'gold' | 'forest'
  className?: string
}) {
  const disabled = !url || status === 'closed' || status === 'finished'

  if (disabled) {
    return (
      <span
        className={`inline-flex items-center justify-center px-8 py-4 rounded-full border-[1.5px] text-base font-bold opacity-50 ${className}`}
        style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
      >
        {STATUS_LABEL[status]}
      </span>
    )
  }

  return (
    <a
      href={url as string}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-${variant} inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-[1.5px] text-base font-bold ${className}`}
    >
      connpass で申し込む
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
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
  )
}
