export function CompaniesHero() {
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
          For Companies
        </p>
        <h1
          className="font-serif font-black leading-tight text-balance reveal"
          style={{
            fontSize: 'clamp(28px, 6.5vw, 80px)',
            color: 'var(--forest)',
          }}
        >
          地域の次世代<br />エンジニアを、<br />
          <span style={{ color: 'var(--terra)' }}>一緒に育てませんか。</span>
        </h1>
      </div>
    </section>
  )
}
