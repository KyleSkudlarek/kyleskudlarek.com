import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { MDXProvider } from "@mdx-js/react"
import MDXRenderer from "gatsby-plugin-mdx"
import CodeBlock from '../../components/CodeBlock'

// const components = {
//   pre: CodeBlock
// }

const BlogPost = ({ data, children }) => {
    const image = getImage(data.mdx.frontmatter.hero_image)

    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <p>Posted: {data.mdx.frontmatter.date}</p>
            <GatsbyImage
                image={image}
                alt={data.mdx.frontmatter.hero_image_alt}
            />
          {/*<MDXProvider components={components}>*/}
            <MDXProvider>
            {/*<MDXRenderer>{children}</MDXRenderer>*/}
            {children}
          </MDXProvider>
        </Layout>
    )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost