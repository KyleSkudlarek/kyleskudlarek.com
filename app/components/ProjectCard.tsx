'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/lib/projects'
import { site } from '@/lib/site'

// Fetches the live star count on mount. Works on a static export because it
// runs in the browser. Fails silently — a missing count never breaks the card.
export default function ProjectCard({ project }: { project: Project }) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/repos/${site.githubUser}/${project.repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [project.repo])

  const repoUrl = `https://github.com/${site.githubUser}/${project.repo}`

  return (
    <div className="card group">
      <div className="flex items-baseline justify-between gap-4">
        {/* Title links to the repo; kept as the card's primary target. */}
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="m-0 text-[1.15rem] font-bold tracking-[-0.035em] text-bright no-underline transition-colors group-hover:text-glow"
        >
          {project.name}
        </a>
        <span className="font-mono text-xs text-slate">
          {stars !== null ? `★ ${stars}` : ''}
        </span>
      </div>
      <p className="mt-2 mb-0 text-sm text-mist/80">{project.blurb}</p>
      <div className="mt-5 flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-khaki">
        <span>{project.year}</span>
        <a href={repoUrl} target="_blank" rel="noreferrer" className="text-slate no-underline hover:text-glow">
          GitHub ↗
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="text-slate no-underline hover:text-glow">
            Live demo ↗
          </a>
        )}
      </div>
    </div>
  )
}
