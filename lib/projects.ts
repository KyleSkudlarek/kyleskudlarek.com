// Seed projects. Live star counts are fetched client-side (see ProjectCard)
// so the static export stays server-free. `repo` is the GitHub slug (source +
// stars API); `url` is the hosted site the card title points to.

export type Project = {
  name: string
  repo: string
  url: string
  year: string
  blurb: string
}

export const projects: Project[] = [
  {
    name: 'holderforge.com',
    repo: 'holderforge',
    url: 'https://www.holderforge.com/',
    year: '2025',
    blurb:
      'Web UI for parametric 3D-printable bottle holders — dial in dimensions, get an STL model and an Autodesk Fusion script.',
  },
  {
    name: 'kyleskudlarek.com',
    repo: 'kyleskudlarek.com',
    url: 'https://kyleskudlarek.com/',
    year: '2023',
    blurb: 'This site. Next.js static export, self-hosted type, deployed to S3 + CloudFront.',
  },
  {
    name: 'mountvernonpc.com',
    repo: 'mountvernonpc.com',
    url: 'http://mountvernonpc.com/',
    year: '2014',
    blurb: 'An early client build, still online a decade later.',
  },
]
