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
    name: 'skudlabs.com',
    repo: 'skudlabs.com',
    url: 'https://skudlabs.com/',
    year: '2026',
    blurb: 'My software consulting practice',
  },
  {
    name: 'holderforge.com',
    repo: 'holderforge',
    url: 'https://www.holderforge.com/',
    year: '2025',
    blurb: 'Parametric 3D-printable bottle holders',
  },
  {
    name: 'kyleskudlarek.com',
    repo: 'kyleskudlarek.com',
    url: 'https://kyleskudlarek.com/',
    year: '2023',
    blurb: 'The source of this site',
  },
  {
    name: 'mountvernonpc.com',
    repo: 'mountvernonpc.com',
    url: 'http://mountvernonpc.com/',
    year: '2014',
    blurb: 'My first website, old school',
  },
]
