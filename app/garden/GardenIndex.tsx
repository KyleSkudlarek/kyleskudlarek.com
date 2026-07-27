'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { GardenPost, PostType } from '@/lib/garden'

// Interactive feed for the Garden index: type chips + text filter + sort.
// All client-side over the static post array — no server anywhere.

const TYPE_LABELS: Record<PostType, string> = {
  essay: 'Essays',
  guide: 'Guides',
  review: 'Reviews',
  travel: 'Travel',
  progress: 'Progress',
  experiment: 'Experiments',
}

type Sort = 'updated' | 'name'

// Decorative art panel so entries scan apart at a glance. Keyed by slug,
// drawn entirely from design tokens; unknown slugs fall back to the post
// type's initial in a dashed frame.
function PostArt({ slug, type }: { slug: string; type: PostType }) {
  const frame =
    'h-20 w-20 shrink-0 overflow-hidden rounded-md border border-[var(--hairline)] sm:h-24 sm:w-24'

  if (slug === 'atx-social-calendar') {
    // Mini calendar app: title bar + month grid with a few busy days.
    const busy = [2, 8, 10, 16, 20]
    const today = 13
    return (
      <span aria-hidden="true" className={`${frame} flex flex-col bg-ground`}>
        <span className="flex items-center border-b border-[var(--hairline)] px-2 py-1.5">
          <span className="h-1 w-7 rounded-full bg-glow/60" />
        </span>
        <span className="grid flex-1 grid-cols-7 gap-px bg-[var(--hairline)] p-px">
          {Array.from({ length: 21 }, (_, i) => (
            <span
              key={i}
              className={
                i === today
                  ? 'bg-[color-mix(in_srgb,var(--color-glow)_35%,var(--color-ink))]'
                  : busy.includes(i)
                    ? 'bg-[color-mix(in_srgb,var(--color-slate)_35%,var(--color-ink))]'
                    : 'bg-ink'
              }
            />
          ))}
        </span>
      </span>
    )
  }

  if (slug === 'colophon') {
    // The site palette as stacked paint chips.
    return (
      <span aria-hidden="true" className={`${frame} flex flex-col`}>
        <span className="flex-[2] bg-glow" />
        <span className="flex-1 bg-bright" />
        <span className="flex-1 bg-mist" />
        <span className="flex-1 bg-slate" />
        <span className="flex-1 bg-ground" />
        <span className="flex-1 bg-ink" />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${frame} flex items-center justify-center border-dashed font-mono text-lg text-slate`}
    >
      {type[0].toUpperCase()}
    </span>
  )
}

function chipClass(active: boolean) {
  return [
    'cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors',
    active
      ? 'border-[color-mix(in_srgb,var(--color-glow)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-glow)_12%,transparent)] text-glow'
      : 'border-[var(--hairline)] text-slate hover:border-slate hover:text-mist',
  ].join(' ')
}

export default function GardenIndex({ posts }: { posts: GardenPost[] }) {
  const [type, setType] = useState<PostType | 'all'>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('updated')

  // Only offer chips for types that actually have posts.
  const types = useMemo(
    () => (Object.keys(TYPE_LABELS) as PostType[]).filter((t) => posts.some((p) => p.type === t)),
    [posts],
  )

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = posts.filter((p) => {
      if (type !== 'all' && p.type !== type) return false
      if (!q) return true
      return [p.title, p.summary, p.type, ...p.tags].join(' ').toLowerCase().includes(q)
    })
    return filtered.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      if (sort === 'name') return a.title.localeCompare(b.title)
      return b.updated.localeCompare(a.updated)
    })
  }, [posts, type, query, sort])

  return (
    <section className="shell mt-[clamp(2.5rem,6vh,4rem)]">
      <div className="flex flex-wrap items-center gap-2">
        <button className={chipClass(type === 'all')} onClick={() => setType('all')}>
          All
        </button>
        {types.map((t) => (
          <button key={t} className={chipClass(type === t)} onClick={() => setType(t)}>
            {TYPE_LABELS[t]}
          </button>
        ))}
        <span className="mx-1 hidden h-4 w-px bg-[var(--hairline)] sm:block" aria-hidden="true" />
        <button
          className={chipClass(false)}
          onClick={() => setSort(sort === 'updated' ? 'name' : 'updated')}
          title="Toggle sort order"
        >
          sort: {sort === 'updated' ? 'updated ↓' : 'a–z'}
        </button>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search…"
          aria-label="Search the garden"
          className="min-w-[10rem] flex-1 rounded-full border border-[var(--hairline)] bg-transparent px-4 py-1.5 font-mono text-[0.72rem] text-mist placeholder:text-slate/70 focus:border-slate focus:outline-none sm:max-w-[14rem]"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {shown.map((post) => {
          const living = post.updated > post.published
          return (
            <Link key={post.slug} href={`/garden/${post.slug}/`} className="card group">
              <div className="flex items-center gap-4 sm:gap-6">
                <PostArt slug={post.slug} type={post.type} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-glow/70">
                      {post.type}
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate">
                      {living ? `updated ${post.updated}` : post.published}
                    </span>
                  </div>
                  <h2 className="m-0 mt-2 text-lg font-medium text-bright transition-colors group-hover:text-glow">
                    {post.title}
                  </h2>
                  <p className="m-0 mt-1.5 max-w-[38rem] text-sm leading-[1.7] text-mist/80">
                    {post.summary}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
        {shown.length === 0 && (
          <p className="m-0 py-10 text-center font-mono text-xs text-slate">
            nothing here matches.
          </p>
        )}
      </div>
    </section>
  )
}
