export function ActivitiesHero() {
  return (
    <section
      className="relative pt-32 pb-20 px-6 md:px-10 clip-diagonal-bottom overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      {/* Background text texture */}
      <span
        aria-hidden="true"
        className="select-none absolute"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(100px, 20vw, 260px)',
          color: 'var(--cream)',
          opacity: 0.05,
          bottom: '5%',
          right: '-2%',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        DO
      </span>

      <div className="max-w-7xl mx-auto relative">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-6 reveal"
          style={{ color: 'var(--gold)', opacity: 0.8, letterSpacing: '0.25em' }}
        >
          Activities
        </p>
        <h1
          className="font-serif font-black leading-tight text-balance reveal"
          style={{
            fontSize: 'clamp(32px, 7vw, 84px)',
            color: 'var(--cream)',
          }}
        >
          何をするコミュニティか。
        </h1>
      </div>
    </section>
  )
}
