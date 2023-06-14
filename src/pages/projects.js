import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

import { ExternalLinkIcon } from '../assets/ExternalLinkIcon'
import { projectsList } from '../data/projectsList'
import styled from "styled-components";



const ProjectSegment = styled(props => <section {...props} />)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;


const ProjectPreviewDiv = styled(props => <div {...props} />)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
`;

const ProjectCard = styled(props => <div {...props} />)`
  border-radius: var(--border-radius);
  background: var(--card-background-color);
  border: 1px solid var(--border-color);
  padding: 1rem;
  position: relative;
  padding-bottom: 5rem;
`;

const ProjectStars = styled(props => <div {...props} />)`

`;


const ProjectContent = styled(props => <div {...props} />)`
  a {
    display: block;
    font-size: 1.1rem;
    line-height: 1.3;
    font-family: var(--font-family-base);
    color: var(--font-color-heading);
    font-weight: 700;
    margin: 0.25rem 0 0.5rem;
    padding: 0;
    border: 0;
    text-decoration: none;
  }
  
  a:hover{
    color: var(--font-color-bright);
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
  }
  
  time {
    display: block;
    font-family: var(--font-family-monospace);
    color: var(--card-time-color);
    font-size: 0.85rem;
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--font-color-muted);
    font-family: var(--font-family-base);
  }

`;


const ProjectLinks = styled(props => <div {...props} />)`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  a{
    -webkit-appearance: none;
    background: var(--button-background-color);
    display: inline-flex;
    align-items: center;
    font-family: var(--font-family-base);
    line-height: 1;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 500;
    color: var(--font-color-base);
    border: 2px solid var(--border-color);
    gap: 0.25rem;
    letter-spacing: 0;
    padding: 0.5rem 0.6rem;
    font-size: 0.9rem;
  }
  
  a:hover {
    border-color: var(--border-color-hover);
    color: var(--font-color-bright);
  }
`;

const ProjectPage = () => {
    return (
        <Layout pageTitle="Projects">
          <ProjectSegment>
            <ProjectPreviewDiv>
              {projectsList.map((project) => {
                return (
                  <ProjectCard key={project.slug}>
                    <ProjectStars>
                    </ProjectStars>
                    <ProjectContent>
                      <time>{project.date}</time>
                      <a
                        href={`https://github.com/kyleskudlarek/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.name}
                      </a>
                      <p>{project.tagline}</p>
                    </ProjectContent>

                    <ProjectLinks>
                      <a
                        className="button small flex"
                        href={`https://github.com/kyleskudlarek/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source <ExternalLinkIcon />
                      </a>
                    </ProjectLinks>
                    <h2>{project.title}</h2>
                  </ProjectCard>
                    )
              })}
              </ProjectPreviewDiv>
          </ProjectSegment>


        </Layout>
    )
}

export const Head = () => <Seo title="Projects" />

export default ProjectPage