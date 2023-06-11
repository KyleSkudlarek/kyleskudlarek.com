import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'


const IndexPage = () => {
    return (
        <Layout>
            <p>I'm making this by following the Gatsby Tutorial.</p>

        </Layout>
    )
}

export const Head = () => <Seo />

export default IndexPage