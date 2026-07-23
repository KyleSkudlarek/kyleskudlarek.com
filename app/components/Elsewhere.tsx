import { links } from '@/lib/site'

// The annotated "find me elsewhere" hub. One line of context per link is what
// separates this from a linktree. Used on both home and About.
export default function Elsewhere() {
  return (
    <section className="shell mt-24">
      <p className="section-label m-0 mb-8">My Links</p>
      <ul className="m-0 flex list-none flex-col gap-px bg-[var(--hairline)] p-0">
        {links.map((link) => {
          const inner = (
            <div className="flex flex-col gap-2 bg-ink px-1 py-5 transition-colors group-hover:bg-ground sm:flex-row sm:items-baseline sm:gap-6">
              <div className="flex min-w-[12rem] items-baseline gap-3">
                <span className="text-[1.05rem] font-medium text-bright transition-colors group-hover:text-glow">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-slate">{link.handle}</span>
              </div>
              <span className="text-sm text-mist/80">{link.blurb}</span>
              {link.href && (
                <span className="ml-auto hidden font-mono text-xs text-slate transition-colors group-hover:text-glow sm:inline">
                  ↗
                </span>
              )}
            </div>
          )
          return (
            <li key={link.label} className="group">
              {link.href ? (
                <a href={link.href} target="_blank" rel="noreferrer" className="block no-underline">
                  {inner}
                </a>
              ) : (
                // URL pending — visible for completeness, not yet linked.
                <div className="opacity-70" title="Coming soon">
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
