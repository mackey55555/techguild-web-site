export function HomeMVV() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10 clip-diagonal-both"
      style={{ backgroundColor: 'var(--forest)', color: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Mission — wide card */}
          <div
            className="md:col-span-7 reveal p-8 md:p-10 border"
            style={{ borderColor: 'rgba(250,246,238,0.15)', backgroundColor: 'rgba(250,246,238,0.05)' }}
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-60"
              style={{ color: 'var(--gold)' }}
            >
              Mission
            </p>
            <p
              className="font-serif font-bold leading-snug text-balance"
              style={{ fontSize: 'clamp(20px, 3.5vw, 34px)', color: 'var(--cream)' }}
            >
              生きる力が自然と<br />身に付くコミュニティを<br />育て続ける。
            </p>
          </div>

          {/* Vision — top-right */}
          <div
            className="md:col-span-5 reveal p-6 md:p-8 border"
            style={{ borderColor: 'rgba(250,246,238,0.15)', backgroundColor: 'rgba(250,246,238,0.05)' }}
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-60"
              style={{ color: 'var(--gold)' }}
            >
              Vision
            </p>
            <p
              className="font-serif font-semibold leading-snug text-balance"
              style={{ fontSize: 'clamp(16px, 2.4vw, 22px)', color: 'var(--cream)' }}
            >
              関わる人たちが、<br />
              <span style={{ color: 'var(--gold)' }}>「不可能なことなんてない」</span>
              <br />と思えるようになること。
            </p>
          </div>

          {/* Values — bottom, accent */}
          <div
            className="md:col-span-12 reveal p-6 md:p-8 border-l-4"
            style={{
              borderLeftColor: 'var(--gold)',
              backgroundColor: 'rgba(240,201,58,0.06)',
              borderTop: '1px solid rgba(250,246,238,0.1)',
              borderRight: '1px solid rgba(250,246,238,0.1)',
              borderBottom: '1px solid rgba(250,246,238,0.1)',
            }}
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-3 opacity-60"
              style={{ color: 'var(--gold)' }}
            >
              Values
            </p>
            <p
              className="font-serif font-bold"
              style={{ fontSize: 'clamp(18px, 3vw, 30px)', color: 'var(--gold)' }}
            >
              小さく、みんなでとにかくやる。その後、考える。
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
