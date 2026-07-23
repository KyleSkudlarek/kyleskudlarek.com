import Nav from './Nav'

// Header for interior pages (no hero). Nav sits on solid ink here, then a
// title block that echoes the hero's eyebrow + display rhythm.
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}) {
  return (
    <header className="shell pt-7">
      <Nav />
      <div className="mt-[clamp(3rem,9vh,6rem)] flex max-w-[36rem] flex-col gap-5">
        <p className="eyebrow m-0">{eyebrow}</p>
        <h1 className="display m-0">{title}</h1>
        {intro && <p className="lede m-0">{intro}</p>}
      </div>
    </header>
  )
}
