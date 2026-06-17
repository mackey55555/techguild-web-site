import { CompaniesContactForm } from '@/components/companies/companies-contact-form'

export function CompaniesCta() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 py-24 md:py-32 px-6 md:px-10 clip-diagonal-top text-center overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      {/* Decorative bg text */}
      <span
        aria-hidden="true"
        className="select-none absolute"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(80px, 18vw, 240px)',
          color: 'var(--cream)',
          opacity: 0.04,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        TALK
      </span>

      <div className="max-w-2xl mx-auto relative flex flex-col items-center gap-8">
        <h2
          className="font-serif font-black leading-tight reveal-clip"
          style={{ fontSize: 'clamp(28px, 5.5vw, 60px)', color: 'var(--cream)' }}
        >
          {'まずは、'}
          <br />
          {'話を聞かせてください。'}
        </h2>

        <p className="text-base leading-relaxed opacity-75 reveal" style={{ color: 'var(--cream)' }}>
          {'下記フォームからお気軽にどうぞ。'}
          <br />
          {'どんな小さな疑問・ご相談でも歓迎です。'}
        </p>

        <div className="w-full reveal">
          <CompaniesContactForm />
        </div>
      </div>
    </section>
  )
}
