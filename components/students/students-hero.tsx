export function StudentsHero() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-4 reveal"
          style={{ color: 'var(--gold)' }}
        >
          For Students
        </p>
        <h1
          className="font-serif font-black leading-tight text-balance reveal"
          style={{ fontSize: 'clamp(36px, 6vw, 60px)', color: 'var(--forest)' }}
        >
          本物をつくる、<br className="md:hidden" />成長する。
        </h1>
        <p
          className="text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed reveal"
          style={{ color: 'var(--forest)', opacity: 0.75 }}
        >
          教室では学べない実践スキルを、地域企業との共創で身につける。<br className="hidden md:block" />
          Tech Guildは、あなたの挑戦を待っています。
        </p>
      </div>
    </section>
  )
}
