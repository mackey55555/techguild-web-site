export function HomeCommunityFeel() {
  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      {/* Decorative background text */}
      <span
        className="text-texture select-none absolute"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(80px, 14vw, 200px)',
          top: '50%',
          right: '-1%',
          transform: 'translateY(-50%)',
          opacity: 0.04,
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          color: 'var(--forest)',
          lineHeight: 1,
        }}
      >
        Community
      </span>

      <div className="max-w-7xl mx-auto relative">
        {/* Overflow pull-quote */}
        <blockquote
          className="reveal font-serif font-black leading-none"
          style={{
            fontSize: 'clamp(28px, 6vw, 80px)',
            color: 'var(--forest)',
            maxWidth: '110%',
            marginLeft: '-2%',
          }}
        >
          {'「一人にさせない。'}
          <br />
          {'それが、この'}
          <br />
          {'コミュニティの'}
          <br />
          {'ルールです。」'}
        </blockquote>

        <div className="mt-10 flex items-center gap-4 reveal">
          <div className="h-px w-12" style={{ backgroundColor: 'var(--terra)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--terra)' }}>
            Tech Guild の哲学
          </p>
        </div>
      </div>
    </section>
  )
}
