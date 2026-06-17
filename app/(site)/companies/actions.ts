'use server'

import { companyInquirySchema, purposeLabel } from '@/lib/contact'

export type InquiryResult = { ok: true } | { ok: false; error: string }

const GENERIC_ERROR =
  '送信に失敗しました。時間をおいて再度お試しください。'

export async function submitCompanyInquiry(
  input: unknown,
): Promise<InquiryResult> {
  const parsed = companyInquirySchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: '入力内容をご確認ください。' }
  }
  const data = parsed.data

  // honeypot: 隠しフィールドが埋まっていれば bot とみなし、
  // 送信はせず成功として扱う（bot にエラーを返さない）。
  if (data.companyWebsite && data.companyWebsite.trim() !== '') {
    return { ok: true }
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL is not set')
    return { ok: false, error: GENERIC_ERROR }
  }

  const payload = {
    username: 'Web問い合わせ',
    embeds: [
      {
        title: '🏢 企業ページからの問い合わせ',
        color: 0x1c3829, // var(--forest)
        fields: [
          { name: '会社名', value: data.companyName, inline: true },
          { name: 'ご担当者', value: data.contactName, inline: true },
          { name: 'メール', value: data.email },
          { name: '用途', value: purposeLabel(data.purpose) },
        ],
        description: `**お問い合わせ内容**\n${data.message}`,
        timestamp: new Date().toISOString(),
      },
    ],
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error(
        'Discord webhook failed',
        res.status,
        await res.text().catch(() => ''),
      )
      return { ok: false, error: GENERIC_ERROR }
    }
  } catch (e) {
    console.error('Discord webhook error', e)
    return { ok: false, error: GENERIC_ERROR }
  }

  return { ok: true }
}
