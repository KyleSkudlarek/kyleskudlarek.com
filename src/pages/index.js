import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

import bitmoji from "../images/bitmoji.svg";
import styled from "styled-components";
import { Link } from 'gatsby'

const BitmojiImg = styled(props => <img {...props} />)`

`;

const IndexHeroDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
`;

const IndexP = styled.p`
  color: var(--font-color-base);
  font-size: 1.3rem;
`;

const IndexPLink = styled(props => <Link {...props} />)`
  color: var(--theme-blue);
  
`;



const IndexPage = () => {
  return (
    <Layout pageTitle="Hey, I'm Kyle!">
      <IndexHeroDiv>
        <IndexP>
          Welcome to my digital zen garden. 🌱
          <br />
          <br />
          I'm a full-stack software developer who works on generative AI,
          enterprise systems and web design.
          I like physics, philosophy, cooking, lifting weights, and stand-up comedy.
          <br />
          <br />
          Check out my <IndexPLink to="/projects">projects</IndexPLink> and {` `}
           <IndexPLink to="/blog">posts</IndexPLink> I've written, or learn
          more <IndexPLink to="/about">about me</IndexPLink>.
        </IndexP>
        <div>
        <BitmojiImg src={bitmoji}></BitmojiImg>
        </div>
        </IndexHeroDiv>
    </Layout>
  )
}

export const Head = () => <Seo />

export default IndexPage