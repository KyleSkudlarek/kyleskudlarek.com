// ATX Social Calendar content. Hand-edited — this file IS the editor.
// To change an event, edit its entry; to add a photo, drop a file into
// public/garden/atx/ and set `photo: '/garden/atx/<file>'` on the entry.

export type Category = 'run' | 'dance' | 'fitness' | 'social'

// active — going / on the schedule now.
// tbd    — committed to, details (studio, day, time) still being pinned down.
// parked — deliberately shelved for later (e.g. needs a fitness base first).
export type Status = 'active' | 'tbd' | 'parked'

export type Club = {
  id: string
  name: string
  category: Category
  status: Status
  days: number[] // 0 = Monday … 6 = Sunday; empty = no fixed day yet
  time: string | null // null = announced weekly, check Instagram
  location: string
  blurb: string // one line on the grid card
  details: string[] // bullets in the expanded view
  instagram?: string // handle, no @
  website?: string
  photo?: string // /garden/atx/<file>; omitted = placeholder rendered
}

export type OneOff = {
  id: string
  name: string
  date: string // ISO date — countdown is computed from this
  category: Category
  location?: string
  instagram?: string
  website?: string
}

export const clubs: Club[] = [
  {
    id: 'good-grief',
    name: 'Good Grief Running',
    category: 'run',
    status: 'active',
    days: [0],
    time: '7:00 AM',
    location: 'Noble Joe Coffee Co · Lady Bird Lake trail',
    blurb: 'Mental-health-oriented, conversational pace.',
    details: [
      '2.5 or 4 mile routes along Lady Bird Lake, 8–11 min/mi pace groups.',
      'Mission-backed: finding the good in grief. ~100 runners, very laid back.',
      'Coffee at Noble Joe (1620 E Riverside Dr) after.',
    ],
    instagram: 'goodgriefrunning',
  },
  {
    id: 'morning-jos',
    name: "Morning Jo's",
    category: 'run',
    status: 'active',
    days: [1],
    time: '6:00 AM',
    location: "Jo's Coffee, 1300 S Congress Ave",
    blurb: '~200 runners, all paces, coffee after.',
    details: [
      'Main route: 4 mi out-and-back around the Capitol; 3–6 mi options.',
      '“All faces, all paces” — walkers welcome.',
      "Post-run coffee at Jo's until ~7:30.",
    ],
    instagram: 'themorningjos',
    website: 'https://themorningjos.com',
  },
  {
    id: 'fleet-feet-gateway',
    name: 'Fleet Feet Gateway Run',
    category: 'run',
    status: 'active',
    days: [2],
    time: '6:30 PM',
    location: 'Fleet Feet, Gateway',
    blurb: '3–5 miles, all ages and paces.',
    details: [
      'Store-hosted community evening run.',
      'Evening start; the midweek option.',
    ],
    website: 'https://www.fleetfeet.com/s/austin/communityruns',
  },
  {
    id: 'rawdawg',
    name: 'Rawdawg Run Club',
    category: 'run',
    status: 'active',
    days: [5],
    time: '~8:00 AM',
    location: 'Pinned on IG weekly · ends at Barton Springs',
    blurb: 'Short run, then a swim. Young crowd.',
    details: [
      '~2 miles, finishing at Barton Springs with a swim.',
      'Start point is pinned on Instagram each week.',
    ],
    instagram: 'rawdawgrunclub',
  },
  {
    id: 'eastside-beer-runners',
    name: 'Eastside Beer Runners',
    category: 'run',
    status: 'active',
    days: [6],
    time: null,
    location: 'Rotating trailheads (Greenbelt, Walnut Creek, …)',
    blurb: 'Trail run, then tacos/brunch.',
    details: [
      'Trailhead rotates: Barton Creek Greenbelt, Walnut Creek, and others.',
      'Time and location announced on Instagram each week.',
    ],
    instagram: 'esbrunnersatx',
  },
  {
    id: 'raw-running',
    name: 'RAW Running',
    category: 'run',
    status: 'parked',
    days: [],
    time: null,
    location: 'TBD',
    blurb: 'Training-focused: speed, track, long runs.',
    details: ['Parked until comfortably at 5+ mile fitness.'],
  },
  {
    id: 'goodpain',
    name: 'GOODPAIN',
    category: 'run',
    status: 'parked',
    days: [],
    time: null,
    location: 'TBD',
    blurb: 'Training-focused, race-prep crowd.',
    details: ['Parked until comfortably at 5+ mile fitness.'],
    instagram: 'goodpain.run',
  },
  {
    id: 'bachata-series',
    name: 'Beginner Bachata Series',
    category: 'dance',
    status: 'tbd',
    days: [3],
    time: 'Evening · TBD',
    location: 'Studio TBD',
    blurb: 'Wed or Thu evening once a studio is picked.',
    details: [
      'Shortlisting a studio from the Austin salsa/bachata directories.',
      'Directory: salsavida.com/guides/texas/austin/socials',
      'Calendar: danceus.org/events/salsa/austin-tx-salsa-calendar',
    ],
    website: 'https://www.salsavida.com/guides/texas/austin/socials',
  },
  {
    id: 'studio-3',
    name: 'Studio 3',
    category: 'fitness',
    status: 'tbd',
    days: [],
    time: null,
    location: 'Studio 3',
    blurb: 'Group fitness classes — current schedule TBD.',
    details: ['Slotting class times in around the run clubs.'],
  },
  {
    id: 'pickle-ranch',
    name: 'Austin Pickle Ranch',
    category: 'fitness',
    status: 'tbd',
    days: [],
    time: null,
    location: '11000 N I-35, Building B',
    blurb: 'Open play pickleball — day TBD.',
    details: ['Open play, leagues, and coaching; all skill levels.'],
    instagram: 'austinpickleranch',
    website: 'https://austinpickleranch.com',
  },
]

// One-off dated events show in the Upcoming strip with a countdown.
// Example:
// { id: 'slutcon', name: 'Slutcon', date: '2026-09-25', category: 'social' },
export const oneOffs: OneOff[] = []

// Where new entries come from — rendered as a footer list on the page.
export const directories = [
  { label: 'SweatPals — fitness events app', href: 'https://www.sweatpals.com' },
  { label: '365 Things Austin — run club directory', href: 'https://365thingsaustin.com/austin-run-clubs/' },
  { label: 'Salsa Vida — Austin socials guide', href: 'https://www.salsavida.com/guides/texas/austin/socials' },
  { label: 'DanceUS — Austin salsa calendar', href: 'https://www.danceus.org/events/salsa/austin-tx-salsa-calendar/' },
]
