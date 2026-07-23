import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Software Kyle Skudlarek has built, with live GitHub star counts.',
}

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Things I&rsquo;ve <em>built.</em>
          </>
        }
        intro="A running list of projects worth showing. Star counts are pulled live from GitHub."
      />
      <section className="shell mt-[clamp(2.5rem,6vh,4rem)]">
        <div className="card-grid">
          {projects.map((project) => (
            <ProjectCard key={project.repo} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}
