'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-clip')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // stagger siblings
            const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-clip') ?? [])
            const index = siblings.indexOf(entry.target as Element)
            const delay = index * 80

            setTimeout(() => {
              entry.target.classList.add('revealed')
            }, delay)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}
