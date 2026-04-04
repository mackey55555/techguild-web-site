import { ABOUT_EXISTENCE } from '@/lib/content'

export function AboutExistence() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-both"
      style={{ backgroundColor: 'var(--forest)', color: 'var(--cream)' }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-semibold mb-8 opacity-50 reveal" style={{ color: 'var(--cream)' }}>
          {ABOUT_EXISTENCE.label}
        </p>

        <div className="space-y-6">
          {ABOUT_EXISTENCE.paragraphs.map((text, i) => (
            <p key={i} className="text-base md:text-lg leading-relaxed reveal" style={{ color: 'var(--cream)', opacity: 0.88 }}>
              {text}
            </p>
          ))}
        </div>

        <blockquote className="mt-12 pl-6 border-l-4 reveal" style={{ borderLeftColor: 'var(--gold)' }}>
          <p className="font-serif font-bold leading-snug whitespace-pre-line" style={{ fontSize: 'clamp(20px, 3.5vw, 34px)', color: 'var(--gold)' }}>
            {ABOUT_EXISTENCE.quote}
          </p>
        </blockquote>
      </div>
    </section>
  )
}
