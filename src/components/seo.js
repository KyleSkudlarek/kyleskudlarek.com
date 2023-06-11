import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Seo = ({ title }) => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return (
      // If title is not empty, add a pipe and the site title, else just the site title
      <title>{title ? `${title} | ${data.site.siteMetadata.title}` : `${data.site.siteMetadata.title}`}</title>
      //<title>{title} | {data.site.siteMetadata.title}</title>

    )
}

export default Seo