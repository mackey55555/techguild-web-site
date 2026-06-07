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
          未来の仲間と、<br />
          <span style={{ color: 'var(--gold)' }}>今から出会う。</span>
        </blockquote>

        <p className="text-base leading-relaxed max-w-xl reveal" style={{ color: 'var(--cream)', opacity: 0.8 }}>
          このコミュニティの主役は、学生の成長です。関わってくださる企業には、その学生たちと早くから接点を持っていただけます。短期的な採用活動ではなく、長期的な関係づくりや地域への貢献という形で、共に未来の人材を育てていきませんか。
        </p>
      </div>
    </section>
  )
}
