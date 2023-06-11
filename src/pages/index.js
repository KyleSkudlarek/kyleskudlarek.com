import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

import floppyLogo from "../assets/floppylogo.png";
import bitmoji from "../images/bitmoji.svg";
import styled from "styled-components";

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





const IndexPage = () => {
  return (
    <Layout>
      <IndexHeroDiv>
        <IndexP>
          Welcome to my digital garden. 🌱
          <br />
          <br />
          I'm a full-stack software developer who works on generative AI,
          enterprise systems and web design.
          I like physics, philosophy, cooking, lifting weights, and stand-up comedy.
          <br />
          <br />
          Check out my projects and
          posts I've written, or learn
          more about me.
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