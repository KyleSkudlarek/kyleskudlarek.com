import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'
import GardenIndex from './GardenIndex'
import { posts } from '@/lib/garden'

export const metadata: Metadata = {
  title: 'Garden',
  description:
    'Essays, guides, and experiments from Kyle Skudlarek: the site colophon, an Austin social calendar, and whatever comes next.',
}

export default function GardenPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Digital garden"
        title={
          <>
            Essays, guides, and <em>experiments.</em>
          </>
        }
      />
      <GardenIndex posts={posts} />
    </main>
  )
}
