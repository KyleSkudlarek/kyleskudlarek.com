'use client'

import { useEffect, useMemo, useState } from 'react'
import { clubs, directories, oneOffs, type Category, type Club, type Status } from './data'

// Weekly-grid view of the standing social schedule. Everything is client-side
// over the static arrays in data.ts — no backend, works under static export.

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CATEGORY_LABELS: Record<Category, string> = {
  run: 'Run',
  dance: 'Dance',
  fitness: 'Fitness',
  social: 'Social',
}

const STATUS_LABELS: Record<Status, string> = {
  active: 'active',
  tbd: 'details tbd',
  parked: 'parked',
}

// Minutes since midnight for ordering cards within a day column.
// Unparseable strings (e.g. "Nights") sort to the evening; null (check IG) last.
function timeRank(time: string | null): number {
  if (time === null) return 1e9
  const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!m) return 18 * 60
  let h = parseInt(m[1], 10) % 12
  if (m[3].toUpperCase() === 'PM') h += 12
  return h * 60 + parseInt(m[2], 10)
}

function chipClass(active: boolean) {
  return [
    'cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors',
    active
      ? 'border-[color-mix(in_srgb,var(--color-glow)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-glow)_12%,transparent)] text-glow'
      : 'border-[var(--hairline)] text-slate hover:border-slate hover:text-mist',
  ].join(' ')
}

function StatusBadge({ status }: { status: Status }) {
  const tone =
    status === 'active'
      ? 'border-[color-mix(in_srgb,var(--color-glow)_45%,transparent)] text-glow'
      : 'border-[var(--hairline)] text-slate'
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${tone}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

// Thumbnail: real photo when `photo` is set; otherwise an obvious
// "replace me" placeholder built from the club's initials.
function Thumb({ club, size }: { club: Club; size: 'card' | 'modal' }) {
  const sizing = size === 'card' ? 'h-9 w-9 text-[0.6rem]' : 'h-40 w-full text-sm'
  if (club.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={club.photo} alt={club.name} className={`${sizing} rounded-sm object-cover`} />
  }
  const initials = club.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
  return (
    <span
      className={`${sizing} flex shrink-0 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-[var(--hairline)] font-mono text-slate`}
    >
      <span>{initials}</span>
      {size === 'modal' && (
        <span className="text-[0.62rem] opacity-70">
          photo → public/garden/atx/{club.id}.webp
        </span>
      )}
    </span>
  )
}

function Modal({ club, onClose }: { club: Club; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const days = club.days.map((d) => DAYS[d]).join(' · ')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[color-mix(in_srgb,var(--color-ink)_82%,transparent)] p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={club.name}
    >
      <div
        className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-xl border border-[var(--hairline)] bg-ground p-6 sm:rounded-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="m-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-glow/70">
              {CATEGORY_LABELS[club.category]}
            </p>
            <h2 className="m-0 mt-1 text-xl font-bold text-bright">{club.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer rounded-sm border border-[var(--hairline)] px-2.5 py-1 font-mono text-xs text-slate transition-colors hover:text-bright"
          >
            esc
          </button>
        </div>

        <div className="mt-4">
          <Thumb club={club} size="modal" />
        </div>

        <dl className="m-0 mt-5 flex flex-col gap-2 font-mono text-[0.72rem]">
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 uppercase tracking-[0.14em] text-slate">When</dt>
            <dd className="m-0 text-mist">
              {days || 'Unscheduled'}
              {club.time ? ` · ${club.time}` : ' · see Instagram'}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 uppercase tracking-[0.14em] text-slate">Where</dt>
            <dd className="m-0 text-mist">{club.location}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 uppercase tracking-[0.14em] text-slate">Status</dt>
            <dd className="m-0">
              <StatusBadge status={club.status} />
            </dd>
          </div>
        </dl>

        <ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0 text-sm leading-[1.65] text-mist/85">
          {club.details.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span aria-hidden="true" className="text-glow/60">
                ·
              </span>
              {line}
            </li>
          ))}
        </ul>

        {(club.instagram || club.website) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {club.instagram && (
              <a
                href={`https://www.instagram.com/${club.instagram}/`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                @{club.instagram}
              </a>
            )}
            {club.website && (
              <a href={club.website} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Website ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Calendar() {
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [showParked, setShowParked] = useState(false)
  const [selected, setSelected] = useState<Club | null>(null)
  // Resolved after mount so the build-time prerender and the client agree.
  const [today, setToday] = useState<number | null>(null)

  useEffect(() => {
    setToday((new Date().getDay() + 6) % 7) // JS Sunday-first → Monday-first
  }, [])

  const categories = useMemo(
    () =>
      (Object.keys(CATEGORY_LABELS) as Category[]).filter((c) =>
        clubs.some((club) => club.category === c),
      ),
    [],
  )

  const visible = clubs.filter(
    (club) =>
      (category === 'all' || club.category === category) &&
      (showParked || club.status !== 'parked'),
  )
  const scheduled = visible.filter((club) => club.days.length > 0)

  const upcoming = useMemo(() => {
    if (today === null) return [] // also gates prerender, where dates can't be compared
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return oneOffs
      .map((event) => ({
        ...event,
        daysOut: Math.round((new Date(`${event.date}T00:00:00`).getTime() - now.getTime()) / 86400000),
      }))
      .filter((event) => event.daysOut >= 0)
      .sort((a, b) => a.daysOut - b.daysOut)
  }, [today])

  return (
    <>
      {/* ── Filters ─────────────────────────────────────────────── */}
      <section className="shell mt-[clamp(2.5rem,6vh,4rem)]">
        <div className="flex flex-wrap items-center gap-2">
          <button className={chipClass(category === 'all')} onClick={() => setCategory('all')}>
            All
          </button>
          {categories.map((c) => (
            <button key={c} className={chipClass(category === c)} onClick={() => setCategory(c)}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-[var(--hairline)] sm:block" aria-hidden="true" />
          <button className={chipClass(showParked)} onClick={() => setShowParked(!showParked)}>
            {showParked ? 'parked shown' : 'parked hidden'}
          </button>
        </div>
      </section>

      {/* ── Upcoming one-offs ───────────────────────────────────── */}
      {upcoming.length > 0 && (
        <section className="shell mt-10">
          <p className="section-label m-0 mb-5">Upcoming</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {upcoming.map((event) => (
              <a
                key={event.id}
                href={event.website ?? (event.instagram ? `https://www.instagram.com/${event.instagram}/` : undefined)}
                target="_blank"
                rel="noreferrer"
                className="card min-w-[13rem] shrink-0 !p-4"
              >
                <p className="m-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-glow">
                  in {event.daysOut} day{event.daysOut === 1 ? '' : 's'}
                </p>
                <p className="m-0 mt-1 font-medium text-bright">{event.name}</p>
                <p className="m-0 mt-0.5 font-mono text-[0.62rem] text-slate">
                  {event.date}
                  {event.location ? ` · ${event.location}` : ''}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── Week grid ───────────────────────────────────────────── */}
      <section className="shell mt-10">
        <p className="section-label m-0 mb-5">Weekly schedule</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-7 md:gap-2">
          {DAYS.map((label, day) => {
            const entries = scheduled
              .filter((club) => club.days.includes(day))
              .sort((a, b) => timeRank(a.time) - timeRank(b.time))
            const isToday = today === day
            return (
              <div
                key={label}
                className={`rounded-lg border p-3 ${
                  isToday
                    ? 'border-[color-mix(in_srgb,var(--color-glow)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-glow)_5%,transparent)]'
                    : 'border-[var(--hairline)]'
                }`}
              >
                <p
                  className={`m-0 mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] ${
                    isToday ? 'text-glow' : 'text-slate'
                  }`}
                >
                  {label}
                  {isToday && <span className="ml-1.5 opacity-70">· today</span>}
                </p>
                <div className="flex flex-col gap-2">
                  {entries.map((club) => (
                    <button
                      key={club.id}
                      onClick={() => setSelected(club)}
                      className="card cursor-pointer !p-2.5 text-left"
                    >
                      <span className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-2">
                        <Thumb club={club} size="card" />
                        <span className="min-w-0">
                          <span className="block text-[0.8rem] font-medium leading-snug text-bright">
                            {club.name}
                          </span>
                          <span className="mt-0.5 block font-mono text-[0.62rem] text-slate">
                            {club.time ?? 'see Instagram'}
                          </span>
                        </span>
                      </span>
                    </button>
                  ))}
                  {entries.length === 0 && (
                    <p className="m-0 py-1 font-mono text-[0.62rem] text-slate/50">no entries</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Quick links ─────────────────────────────────────────── */}
      {/* Every club's external source (Instagram preferred, else website),
          grouped by category, with the discovery directories alongside.
          Unaffected by the filters above — this is the reference list. */}
      <section className="shell mt-12">
        <p className="section-label m-0 mb-5">Quick links</p>
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-x-16 sm:gap-y-8">
          {categories.map((c) => (
            <div key={c}>
              <p className="m-0 mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate">
                {CATEGORY_LABELS[c]}
              </p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 font-mono text-[0.72rem]">
                {clubs
                  .filter((club) => club.category === c)
                  .map((club) => {
                    const href = club.instagram
                      ? `https://www.instagram.com/${club.instagram}/`
                      : club.website
                    return (
                      <li key={club.id}>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-mist transition-colors hover:text-glow"
                          >
                            {club.name} ↗
                          </a>
                        ) : (
                          <span className="text-mist/60">{club.name}</span>
                        )}
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
          <div>
            <p className="m-0 mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate">
              Directories
            </p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0 font-mono text-[0.72rem]">
              {directories.map((dir) => (
                <li key={dir.href}>
                  <a
                    href={dir.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-mist transition-colors hover:text-glow"
                  >
                    {dir.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {selected && <Modal club={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
