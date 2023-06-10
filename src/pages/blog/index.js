import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import styled from "styled-components";


const BlogLinkText = styled(props => <Link {...props} />)`
  color: var(--navbar-color);
  font-size: 2.0rem;
  font-weight: 500;
`;


const Article = styled(props => <article {...props} />)`
  color: var(--font-color-muted);
`;


const BlogPage = ({ data }) => {
    return (
        <Layout pageTitle="My Blog Posts">
            {
                data.allMdx.nodes.map(node => (
                    <Article key={node.id}>
                        <h2>
                            <BlogLinkText to={`/blog/${node.frontmatter.slug}`}>
                                {node.frontmatter.title}
                            </BlogLinkText>
                        </h2>
                        <p>Posted: {node.frontmatter.date}</p>
                    </Article>
                ))
            }
        </Layout>
    )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage