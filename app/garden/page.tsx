import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Garden',
  description:
    'How kyleskudlarek.com is built: Next.js static export, Tailwind CSS v4, Midjourney artwork, and an S3 + CloudFront deploy.',
}

// The Garden becomes the MDX content hub (essays, guides, experiments).
// Until the post pipeline lands, its front page is a colophon: a concise,
// technical tour of how the site itself is built. First post, in effect.

const STACK = [
  {
    label: 'Framework',
    value: 'Next.js 16 · App Router · static export',
    detail:
      'output: "export" — every page is prerendered to plain HTML at build time. There is no server anywhere in this site.',
  },
  {
    label: 'UI',
    value: 'React 19 · TypeScript 5',
    detail:
      'Client-side JavaScript is limited to what needs it: the hero parallax, the star field, and live GitHub star counts on Projects.',
  },
  {
    label: 'Styling',
    value: 'Tailwind CSS v4',
    detail:
      'CSS-first configuration — design tokens live in an @theme block, reusable pieces in @layer components. No tailwind.config file.',
  },
  {
    label: 'Type',
    value: 'Satoshi · JetBrains Mono',
    detail:
      'Both self-hosted through next/font, so rendering the page makes zero external font requests.',
  },
  {
    label: 'Images',
    value: 'sharp',
    detail:
      'A small build script converts source art to WebP. The hero went from a 2.0 MB PNG to a 243 KB WebP.',
  },
]

const PALETTE = [
  { hex: '#080D12', varName: '--color-ink', role: 'page surface' },
  { hex: '#0B1A24', varName: '--color-ground', role: 'elevated surfaces' },
  { hex: '#4A7A9B', varName: '--color-slate', role: 'borders, tertiary' },
  { hex: '#9BAEBB', varName: '--color-mist', role: 'body text' },
  { hex: '#8BD09D', varName: '--color-glow', role: 'accent' },
  { hex: '#EAF3F5', varName: '--color-bright', role: 'headings' },
]

const REQUEST_PATH = [
  { name: 'Route 53', role: 'DNS' },
  { name: 'CloudFront', role: 'CDN + TLS' },
  { name: 'S3', role: 'static files' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label m-0 mb-6">{children}</p>
}

export default function GardenPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Colophon"
        title={
          <>
            How this site is <em>built.</em>
          </>
        }
        intro="The Garden is where essays, guides, and experiments will grow. While the first
        posts take root, here is the site itself, explained — the stack, the artwork, and the
        pipe that serves it."
      />

      {/* ── Stack ─────────────────────────────────────────────── */}
      <section className="shell mt-[clamp(2.5rem,6vh,4rem)]">
        <SectionLabel>Stack</SectionLabel>
        <dl className="m-0 flex flex-col gap-px bg-[var(--hairline)]">
          {STACK.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 bg-ink py-5 sm:grid-cols-[10rem_18rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-slate">
                {row.label}
              </dt>
              <dd className="m-0 font-medium text-bright">{row.value}</dd>
              <dd className="m-0 max-w-[36rem] text-sm text-mist/80">{row.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Artwork ───────────────────────────────────────────── */}
      <section className="shell mt-20">
        <SectionLabel>The artwork</SectionLabel>
        <div className="grid items-start gap-x-14 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.webp"
            alt="The hero artwork: a Van Gogh-styled night landscape with swirling sky, mountains, and a winding gravel path through grass"
            className="w-full rounded-sm border border-[var(--hairline)]"
          />
          <div className="flex flex-col gap-4 text-[0.95rem] leading-[1.75]">
            <p className="m-0">
              The landscape is a <span className="text-bright">Midjourney</span> generation —
              prompted toward a Van Gogh night-sky treatment of a zen garden, iterated across
              variant grids until one composition held up at full width.
            </p>
            <p className="m-0">
              On the home page it is never shown as a rectangle: CSS{' '}
              <code className="font-mono text-[0.85em] text-glow">mask-image</code> fades both
              edges so it emerges from behind the nav and dissolves into the page, a
              directional scrim protects only the text side, and a scroll-linked parallax
              moves it a few pixels. All motion respects{' '}
              <code className="font-mono text-[0.85em] text-glow">prefers-reduced-motion</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Palette ───────────────────────────────────────────── */}
      <section className="shell mt-20">
        <SectionLabel>Palette</SectionLabel>
        <p className="m-0 mb-8 max-w-[38rem] text-[0.95rem] leading-[1.75]">
          Every color is sampled from the artwork, so the interface and the image read as one
          object. The accent is the hue of the grass, lifted in lightness until it clears WCAG
          AAA contrast on the page surface (10.8:1).
        </p>
        <ul className="m-0 grid list-none grid-cols-2 gap-px bg-[var(--hairline)] border border-[var(--hairline)] p-0 sm:grid-cols-3 lg:grid-cols-6">
          {PALETTE.map((swatch) => (
            <li key={swatch.varName} className="bg-ink p-4">
              <span
                className="mb-3 block h-14 w-full rounded-sm border border-[var(--hairline)]"
                style={{ background: swatch.hex }}
              />
              <span className="block font-mono text-[0.68rem] text-bright">{swatch.hex}</span>
              <span className="block font-mono text-[0.62rem] text-slate">{swatch.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Infrastructure ────────────────────────────────────── */}
      <section className="shell mt-20">
        <SectionLabel>Serving it</SectionLabel>
        <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="rounded-sm border border-[var(--hairline)] px-4 py-3 text-slate">
            browser
          </span>
          {REQUEST_PATH.map((node) => (
            <div key={node.name} className="flex items-center gap-3">
              <span aria-hidden="true" className="text-slate">
                →
              </span>
              <span className="rounded-sm border border-[var(--hairline)] px-4 py-3">
                <span className="text-bright">{node.name}</span>{' '}
                <span className="text-slate">· {node.role}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex max-w-[38rem] flex-col gap-4 text-[0.95rem] leading-[1.75]">
          <p className="m-0">
            All AWS, no platform-as-a-service: DNS on Route 53, TLS and caching on CloudFront,
            and the exported HTML sitting in an S3 bucket. Deploying is one command — build,
            sync the output to S3, invalidate the CDN cache.
          </p>
          <p className="m-0">
            The source is public at{' '}
            <a
              href="https://github.com/KyleSkudlarek/kyleskudlarek.com"
              target="_blank"
              rel="noreferrer"
              className="text-glow"
            >
              github.com/KyleSkudlarek/kyleskudlarek.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── What grows next ───────────────────────────────────── */}
      <section className="shell mt-20">
        <SectionLabel>What grows here next</SectionLabel>
        <p className="m-0 max-w-[38rem] text-[0.95rem] leading-[1.75]">
          An MDX pipeline — posts written in markdown that can embed live React components, so
          a guide can carry runnable code and a progress log can carry an interactive chart.
          Essays, guides, reviews, and experiments will all land here as they are written.
        </p>
      </section>
    </main>
  )
}
