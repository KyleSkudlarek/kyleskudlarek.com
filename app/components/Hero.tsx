'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Nav from './Nav'
import { site } from '@/lib/site'

// Sparse star field, biased to the upper sky. Deterministic scatter so it
// reads as placed rather than as noise — and so SSR and client agree.
const STARS = Array.from({ length: 18 }, (_, i) => ({
  left: ((i * 37.4 + 11) % 100).toFixed(1),
  top: (((i * 23.7) % 46) + 4).toFixed(1),
  delay: ((i * 0.43) % 4).toFixed(2),
}))

export default function Hero() {
  const artRef = useRef<HTMLImageElement>(null)

  // Gentle scroll parallax on the artwork layer.
  useEffect(() => {
    const el = artRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      const r = el.getBoundingClientRect()
      const progress = (r.top + r.height / 2 - innerHeight / 2) / innerHeight
      el.style.translate = `0 ${(-progress * 26).toFixed(2)}px`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative">
      <div className="hero-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={artRef} className="drift" data-parallax src="/hero.webp" alt="" />
        <div className="stars">
          {STARS.map((s, i) => (
            <i key={i} style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
          ))}
        </div>
        <div className="hero-scrim" />
      </div>

      <div className="shell absolute inset-0 flex flex-col pt-7">
        <Nav overArt />
        <div className="mt-[clamp(3.5rem,11vh,7rem)] flex max-w-[30rem] flex-col gap-[1.15rem]">
          <p className="eyebrow rise m-0" style={{ animationDelay: '0.10s' }}>
            {site.location}
          </p>
          <h1 className="display rise m-0" style={{ animationDelay: '0.22s' }}>
            Welcome to my <em>digital zen garden.</em>
          </h1>
          <p className="lede rise m-0" style={{ animationDelay: '0.34s' }}>
            I like building things at the intersection of engineering and design. This is home
            base for my projects, experiments, and whatever I&rsquo;m currently curious about.
          </p>
          <div className="rise flex flex-wrap items-center gap-3" style={{ animationDelay: '0.46s' }}>
            {/* Single CTA, leaf-shaped — the front gate into the content hub. */}
            <Link href="/garden/" className="btn-garden no-underline">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 14.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M8 8.5C8 5.2 5.8 3 2.2 3c0 3.7 2.3 5.5 5.8 5.5Z" fill="currentColor" />
                <path d="M8 6.8c0-2.6 2-4.6 5.6-4.6 0 3.6-2.1 5.6-5.6 4.6Z" fill="currentColor" />
              </svg>
              Enter the garden
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
