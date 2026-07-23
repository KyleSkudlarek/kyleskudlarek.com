// Seed projects. Live star counts are fetched client-side (see ProjectCard)
// so the static export stays server-free. `repo` is the GitHub slug used both
// for the stars API and the card link; `demo` is an optional live URL.

export type Project = {
  name: string
  repo: string
  year: string
  blurb: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'kyleskudlarek.com',
    repo: 'kyleskudlarek.com',
    year: '2023',
    blurb: 'This site. Next.js static export, self-hosted type, deployed to S3 + CloudFront.',
  },
  {
    name: 'mountvernonpc.com',
    repo: 'mountvernonpc.com',
    year: '2014',
    blurb: 'An early client build, still online a decade later.',
    demo: 'http://mountvernonpc.com/',
  },
]
