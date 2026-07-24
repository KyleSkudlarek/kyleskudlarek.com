import Link from 'next/link'
import { nav, site } from '@/lib/site'

export default function Nav({ overArt = false }: { overArt?: boolean }) {
  // Over the hero artwork, a soft shadow keeps links legible across the
  // brighter passages that survive the top mask.
  const shadow = overArt ? '[text-shadow:0_1px_14px_rgba(8,13,18,0.95)]' : ''
  // Three nav items no longer fit beside the name at phone widths —
  // tighten gaps there and allow a wrap as the fallback.
  return (
    <nav className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-2 sm:gap-8 ${shadow}`}>
      <Link
        href="/"
        className="text-[1.05rem] font-bold tracking-[-0.035em] text-bright no-underline"
      >
        {site.name}
      </Link>
      <ul className="flex list-none gap-4 p-0 sm:gap-7">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.08em] text-mist no-underline transition-colors duration-300 hover:text-glow"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
