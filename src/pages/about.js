import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'



const AboutPage = () => {
    return (
        <Layout pageTitle="About Me">
            <p>Hi there! I'm the proud creator of this site. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. A corporis cupiditate
              distinctio ea enim esse ipsam iusto minima nisi perferendis,
              praesentium quas quibusdam recusandae? Eius ex necessitatibus
              perferendis provident quidem?</p>
        </Layout>
    )
}

export const Head = () => <Seo title="About Me" />

export default AboutPage