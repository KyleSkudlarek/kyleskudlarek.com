import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'


const ProjectPage = () => {
    return (
        <Layout pageTitle="Projects">
            <p>Hi there! These are all my projects!</p>
        </Layout>
    )
}

export const Head = () => <Seo title="Projects" />

export default ProjectPage