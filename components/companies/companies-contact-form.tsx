'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitCompanyInquiry } from '@/app/(site)/companies/actions'
import {
  companyInquirySchema,
  INQUIRY_PURPOSES,
  type CompanyInquiry,
} from '@/lib/contact'

const fieldClass =
  'w-full rounded-md border-2 px-4 py-3 text-base outline-none transition-[box-shadow] placeholder:opacity-50 focus:ring-2 focus:ring-[var(--gold)]'

const fieldStyle = {
  backgroundColor: 'var(--cream)',
  color: 'var(--forest)',
  borderColor: 'var(--forest-light)',
} as const

const labelClass = 'block text-sm font-bold mb-2'
const errorClass = 'mt-1.5 text-sm font-medium'

export function CompaniesContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyInquiry>({
    resolver: zodResolver(companyInquirySchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      message: '',
      companyWebsite: '',
    },
  })

  async function onSubmit(values: CompanyInquiry) {
    setServerError(null)
    const res = await submitCompanyInquiry(values)
    if (res.ok) {
      setSubmitted(true)
    } else {
      setServerError(res.error)
    }
  }

  if (submitted) {
    return (
      <div
        className="w-full max-w-xl mx-auto rounded-md border-2 px-8 py-12 text-center"
        style={{
          backgroundColor: 'var(--cream)',
          borderColor: 'var(--gold)',
          color: 'var(--forest)',
        }}
      >
        <p className="font-serif font-black text-2xl mb-3">
          お問い合わせを受け付けました
        </p>
        <p className="text-base opacity-80">
          内容を確認のうえ、ご記入のアドレス宛に
          <br />
          担当より追ってご連絡いたします。
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-xl mx-auto text-left flex flex-col gap-5"
      style={{ color: 'var(--cream)' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="companyName" className={labelClass}>
            会社名 <span style={{ color: 'var(--gold)' }}>*</span>
          </label>
          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            style={fieldStyle}
            aria-invalid={!!errors.companyName}
            {...register('companyName')}
          />
          {errors.companyName && (
            <p className={errorClass} style={{ color: 'var(--gold)' }}>
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contactName" className={labelClass}>
            ご担当者名 <span style={{ color: 'var(--gold)' }}>*</span>
          </label>
          <input
            id="contactName"
            type="text"
            autoComplete="name"
            className={fieldClass}
            style={fieldStyle}
            aria-invalid={!!errors.contactName}
            {...register('contactName')}
          />
          {errors.contactName && (
            <p className={errorClass} style={{ color: 'var(--gold)' }}>
              {errors.contactName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          メールアドレス <span style={{ color: 'var(--gold)' }}>*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          style={fieldStyle}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className={errorClass} style={{ color: 'var(--gold)' }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="purpose" className={labelClass}>
          お問い合わせの用途 <span style={{ color: 'var(--gold)' }}>*</span>
        </label>
        <select
          id="purpose"
          defaultValue=""
          className={fieldClass}
          style={fieldStyle}
          aria-invalid={!!errors.purpose}
          {...register('purpose')}
        >
          <option value="" disabled>
            選択してください
          </option>
          {INQUIRY_PURPOSES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {errors.purpose && (
          <p className={errorClass} style={{ color: 'var(--gold)' }}>
            {errors.purpose.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          お問い合わせ内容 <span style={{ color: 'var(--gold)' }}>*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          className={`${fieldClass} resize-y`}
          style={fieldStyle}
          placeholder="ご相談内容をご記入ください（10文字以上）"
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className={errorClass} style={{ color: 'var(--gold)' }}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* honeypot: 人間には見えない。bot が埋めたら送信側で弾く。 */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyWebsite">Webサイト（入力不要）</label>
        <input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('companyWebsite')}
        />
      </div>

      {serverError && (
        <p
          className="text-sm font-bold text-center"
          style={{ color: 'var(--gold)' }}
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-block px-10 py-4 font-bold text-base border-2 btn-gold disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ borderColor: 'var(--gold)' }}
      >
        {isSubmitting ? '送信中…' : '送信する'}
      </button>

      <p className="text-xs text-center opacity-60">
        送信内容は運営にのみ共有されます。
      </p>
    </form>
  )
}
