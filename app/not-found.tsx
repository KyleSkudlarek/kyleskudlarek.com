import Link from 'next/link'
import PageHeader from './components/PageHeader'

export default function NotFound() {
  return (
    <main>
      <PageHeader
        eyebrow="404"
        title={
          <>
            Off the <em>path.</em>
          </>
        }
        intro="This page wandered off. Let's get you back to solid ground."
      />
      <div className="shell mt-10">
        <Link href="/" className="btn btn-primary no-underline">
          Back home
        </Link>
      </div>
    </main>
  )
}
