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
            I&rsquo;m a full-stack software developer working on generative AI, enterprise
            systems, and web design. I like physics, philosophy, cooking, lifting weights, and
            stand-up comedy.
          </p>
          <div className="rise flex flex-wrap items-center gap-3" style={{ animationDelay: '0.46s' }}>
            <Link href="/projects/" className="btn btn-primary no-underline">
              View projects
            </Link>
            <Link href="/about/" className="btn btn-ghost no-underline">
              More about me
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
