import { site } from '@/lib/site'

export default function Footer() {
  const year = 2026 // static export; a live clock would need JS for no reason
  return (
    <footer className="mt-24 border-t border-[var(--hairline)]">
      <div className="shell py-10">
        <p className="m-0 font-mono text-xs uppercase tracking-[0.12em] text-slate">
          &copy; {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
