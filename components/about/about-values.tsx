import { ABOUT_VALUES } from '@/lib/content'

export function AboutValues() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest font-bold mb-10 reveal" style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}>
          {ABOUT_VALUES.label}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {ABOUT_VALUES.items.map((v, i) => (
            <div
              key={i}
              className="card-hover border-2 p-7 md:p-9 reveal flex flex-col gap-3"
              style={{ borderColor: 'var(--forest)', backgroundColor: 'var(--cream)' }}
            >
              <span className="font-serif font-black text-5xl leading-none opacity-15" style={{ color: 'var(--forest)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif font-bold" style={{ fontSize: 'clamp(20px, 3vw, 30px)', color: 'var(--forest)' }}>
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--forest)', opacity: 0.75 }}>
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
