export function AboutHero() {
  return (
    <section
      className="relative pt-32 pb-20 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <p
          className="text-xs uppercase tracking-widest font-bold mb-6 reveal"
          style={{ color: 'var(--terra)', letterSpacing: '0.25em' }}
        >
          About
        </p>
        <h1
          className="font-serif font-black leading-tight text-balance reveal"
          style={{
            fontSize: 'clamp(32px, 7vw, 84px)',
            color: 'var(--forest)',
          }}
        >
          なぜ、この<br />
          コミュニティを<br />
          つくったのか。
        </h1>
      </div>
    </section>
  )
}
