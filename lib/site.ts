// Single source of truth for identity + links, consumed by Nav, Footer,
// and the About "Elsewhere" section so they can never drift apart.

export const site = {
  name: 'Kyle Skudlarek',
  role: 'Full-stack software developer',
  location: 'Austin, Texas',
  githubUser: 'kyleskudlarek',
}

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/garden/', label: 'Garden' },
  // Three items, forever — new content types become Garden filter chips, not nav items.
]

// `blurb` is the one-line context shown on the About page — the thing that
// separates this from a linktree. `null` href = URL not yet provided by Kyle.
export type Link = {
  label: string
  href: string | null
  handle: string
  blurb: string
}

export const links: Link[] = [
  {
    label: 'Skudlabs',
    href: 'https://skudlabs.com',
    handle: 'skudlabs.com',
    blurb: 'Software consulting.',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kyleskudlarek/',
    handle: 'in/kyleskudlarek',
    blurb: 'Career history and experience.',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kyleskudlarek',
    handle: '@kyleskudlarek',
    blurb: 'Coding projects.',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ky_skud/',
    handle: '@ky_skud',
    blurb: 'Photography and travel.',
  },
  {
    label: 'Strava',
    href: 'https://www.strava.com/athletes/133126737',
    handle: 'Kyle Skudlarek',
    blurb: 'Fitness log.',
  },
]
