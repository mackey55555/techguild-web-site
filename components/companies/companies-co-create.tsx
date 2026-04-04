export function CompaniesCoCreate() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-both overflow-hidden"
      style={{ backgroundColor: 'var(--forest)' }}
    >
      {/* Background text texture */}
      <span
        aria-hidden="true"
        className="select-none absolute"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(100px, 22vw, 320px)',
          color: 'var(--cream)',
          opacity: 0.04,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        共創
      </span>

      <div className="max-w-4xl mx-auto relative text-center flex flex-col items-center gap-8">
        <p
          className="text-xs uppercase tracking-widest font-semibold opacity-50 reveal"
          style={{ color: 'var(--cream)' }}
        >
          Co-creation
        </p>

        <blockquote
          className="font-serif font-black leading-tight reveal-clip"
          style={{
            fontSize: 'clamp(26px, 5.5vw, 64px)',
            color: 'var(--cream)',
          }}
        >
          企業も、<br />
          <span style={{ color: 'var(--gold)' }}>ここでは学ぶ側です。</span>
        </blockquote>

        <p className="text-base leading-relaxed max-w-xl reveal" style={{ color: 'var(--cream)', opacity: 0.8 }}>
          指導する側・される側という関係は、ここにはない。企業の担当者も、学生と同じチームで、同じ課題に向き合う。そこから生まれるものが、このコミュニティの価値です。
        </p>
      </div>
    </section>
  )
}
