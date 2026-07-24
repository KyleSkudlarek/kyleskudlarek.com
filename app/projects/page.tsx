import type { Metadata } from 'next'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Open-source projects by Kyle Skudlarek, including this website and a parametric 3D modeling app.',
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
        intro="Open-source projects I&rsquo;ve made over the years, including this website, a
        parametric 3D modeling app, and my first-ever site."
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
