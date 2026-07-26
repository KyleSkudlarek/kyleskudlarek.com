import type { Metadata } from 'next'
import PageHeader from '../../components/PageHeader'
import Calendar from './Calendar'

export const metadata: Metadata = {
  title: 'ATX Social Calendar',
  description:
    'A weekly reference calendar of recurring Austin run clubs, dance socials, and fitness groups: days, times, locations, and current status.',
}

export default function AtxSocialCalendarPage() {
  return (
    <main className="pb-24">
      <PageHeader
        eyebrow="Garden · experiment"
        title={
          <>
            ATX social <em>calendar.</em>
          </>
        }
        intro="Personal reference for recurring Austin run clubs, dance socials, and fitness
        groups: days, times, locations, and current status."
      />
      <Calendar />
    </main>
  )
}
