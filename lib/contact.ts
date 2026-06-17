import { z } from 'zod'

// 問い合わせの用途。value は内部値、label は表示・Discord通知に使う。
export const INQUIRY_PURPOSES = [
  { value: 'sponsor', label: '協賛・スポンサー' },
  { value: 'recruit', label: '採用・求人' },
  { value: 'speaker', label: '登壇・イベント協力' },
  { value: 'media', label: '取材・メディア' },
  { value: 'other', label: 'その他' },
] as const

export const companyInquirySchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, '会社名を入力してください')
    .max(100, '100文字以内で入力してください'),
  contactName: z
    .string()
    .trim()
    .min(1, 'ご担当者名を入力してください')
    .max(100, '100文字以内で入力してください'),
  email: z
    .string()
    .trim()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください')
    .max(200, '200文字以内で入力してください'),
  purpose: z.enum(['sponsor', 'recruit', 'speaker', 'media', 'other'], {
    errorMap: () => ({ message: '用途を選択してください' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, '10文字以上で入力してください')
    .max(2000, '2000文字以内で入力してください'),
  // honeypot: bot対策。画面上は隠しており、人間は空のまま送信する。
  companyWebsite: z.string().optional(),
})

export type CompanyInquiry = z.infer<typeof companyInquirySchema>

export function purposeLabel(value: string): string {
  return INQUIRY_PURPOSES.find((p) => p.value === value)?.label ?? value
}
