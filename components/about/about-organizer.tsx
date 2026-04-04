import Image from 'next/image'
import type { Organizer } from '@/lib/microcms'

export function AboutOrganizer({ organizer }: { organizer: Organizer }) {
  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-10"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Photo */}
          <div className="md:col-span-4 reveal">
            {organizer.photo ? (
              <Image
                src={organizer.photo.url}
                width={organizer.photo.width}
                height={organizer.photo.height}
                alt={organizer.name}
                className="w-full aspect-square object-cover max-w-64"
              />
            ) : (
              <div
                className="w-full aspect-square max-w-64 border-2 flex items-center justify-center"
                style={{ borderColor: 'var(--forest)', position: 'relative' }}
              >
                <div
                  className="absolute inset-3 border"
                  style={{ borderColor: 'var(--terra)', opacity: 0.4 }}
                />
                <div className="text-center">
                  <p
                    className="font-serif font-black text-6xl opacity-10"
                    style={{ color: 'var(--forest)' }}
                  >
                    G
                  </p>
                </div>
              </div>
            )}
            <p className="mt-4 text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--terra)' }}>
              {organizer.role}
            </p>
          </div>

          {/* Text */}
          <div className="md:col-span-8 flex flex-col gap-5">
            <h2
              className="font-serif font-black leading-tight reveal"
              style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', color: 'var(--forest)' }}
            >
              {organizer.name}より
            </h2>

            <div
              className="text-base leading-relaxed reveal flex flex-col gap-5"
              style={{ color: 'var(--forest)', opacity: 0.82 }}
              dangerouslySetInnerHTML={{ __html: organizer.bio }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
