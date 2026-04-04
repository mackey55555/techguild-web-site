'use client'

import { useEffect, useRef } from 'react'

const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-clip'

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // JS が有効なときだけ非表示アニメーションを有効化
    container.classList.add('js-reveal')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px' }
    )

    const observe = (root: Element) => {
      root.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains('revealed')) io.observe(el)
      })
    }
    observe(container)

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(SELECTOR)) io.observe(node)
            observe(node)
          }
        })
      })
    })
    mo.observe(container, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
