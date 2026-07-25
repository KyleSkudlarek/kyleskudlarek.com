import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'
import Elsewhere from '../components/Elsewhere'

export const metadata: Metadata = {
  title: 'About',
  description: 'A bit more about Kyle Skudlarek — software developer in Austin, Texas.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Austin, Texas"
        title={
          <>
            Hey, I&rsquo;m <em>Kyle.</em>
          </>
        }
      />

      <section className="shell mt-[clamp(2.5rem,6vh,4rem)] grid gap-x-16 gap-y-10 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="flex max-w-[38rem] flex-col gap-5 text-[1.02rem] leading-[1.75]">
          <p className="m-0">
            I&rsquo;m a software developer working remotely in Austin, TX. Welcome to my spot on
            the web for my projects, writing, and anything else I want to show the world.
          </p>
          <p className="m-0">
            My work runs across generative AI, enterprise systems, and web design &mdash;
            full-stack, end to end. Outside the terminal I&rsquo;m into physics, philosophy,
            cooking, lifting weights, and stand-up comedy.
          </p>
        </div>

        {/* Photo. Plain img: static export ships pre-optimized WebP. */}
        <div className="order-first md:order-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about.webp"
            alt="Kyle Skudlarek"
            className="aspect-square w-full max-w-[16rem] rounded-sm border border-[var(--hairline)] object-cover"
          />
        </div>
      </section>

      <Elsewhere prominent />
    </main>
  )
}
