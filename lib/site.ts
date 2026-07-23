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
  // Writing lands here later, as the fourth and final nav item.
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
    label: 'GitHub',
    href: 'https://github.com/kyleskudlarek',
    handle: '@kyleskudlarek',
    blurb: 'Open-source work and the source for this site.',
  },
  {
    label: 'skudlabs',
    // TODO(kyle): confirm skudlabs.com vs scudlabs.com — notes and brief disagree.
    href: 'https://skudlabs.com',
    handle: 'skudlabs.com',
    blurb: 'My software consulting practice.',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kyleskudlarek/',
    handle: 'in/kyleskudlarek',
    blurb: 'Career history and the professional side.',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ky_skud/',
    handle: '@ky_skud',
    blurb: 'Photography and life outside the terminal.',
  },
  {
    label: 'Strava',
    href: 'https://www.strava.com/athletes/133126737',
    handle: 'Kyle Skudlarek',
    blurb: 'Lifting and the occasional run.',
  },
]
