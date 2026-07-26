// Garden post index — the single source of truth for what's published.
// Mirrors the frontmatter contract in PROJECT_NOTES.md (Content architecture):
// title · slug · type · summary · published · updated · tags · featured.
// URLs stay flat (/garden/[slug]); `type` is metadata only, rendered as a
// filter chip. When the MDX pipeline lands this array becomes derived from
// frontmatter instead of hand-maintained.

export type PostType = 'essay' | 'guide' | 'review' | 'travel' | 'progress' | 'experiment'

export type GardenPost = {
  title: string
  slug: string
  type: PostType
  summary: string
  published: string // ISO date
  updated: string // ISO date; shown instead of `published` when later (living posts)
  tags: string[]
  featured: boolean // pins living posts above the chronological feed
}

export const posts: GardenPost[] = [
  {
    title: 'ATX Social Calendar',
    slug: 'atx-social-calendar',
    type: 'experiment',
    summary:
      'Personal reference calendar of recurring Austin run clubs, dance socials, and fitness groups: days, times, locations, and status.',
    published: '2026-07-26',
    updated: '2026-07-26',
    tags: ['austin', 'running', 'dance', 'mini-app'],
    featured: true,
  },
  {
    title: 'How this site is built',
    slug: 'colophon',
    type: 'essay',
    summary:
      'The colophon: Next.js static export, Tailwind v4, Midjourney artwork, and the S3 + CloudFront pipe that serves it.',
    published: '2026-07-23',
    updated: '2026-07-24',
    tags: ['meta', 'next.js', 'aws'],
    featured: false,
  },
]
