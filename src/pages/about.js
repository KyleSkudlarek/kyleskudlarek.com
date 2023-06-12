import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import styled from "styled-components";
import { Link } from "gatsby";
import kylepic from "../images/kyle.jpg";

const AboutMeImg = styled(props => <img {...props} />)`
  width: 100%;
  max-height: 100%;
  border-radius: 50%
`;

const AboutMeHeroDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
`;

const AboutMeP = styled.p`
  color: var(--font-color-base);
  font-size: 1.3rem;
`;

const AboutMePLink = styled(props => <Link {...props} />)`
  color: var(--theme-blue);
  
`;

const AboutPage = () => {
    return (
        <Layout pageTitle="About Me">
          <AboutMeHeroDiv>
            <AboutMeP>
              Hey I'm Kyle! I'm a software developer working remotely in
              Austin, TX.
              <br />
              <br />
              Welcome to my spot on the web for my projects, writing, and
              anything else I want to show the world.
              <br />
              <br />
              Check out the <AboutMePLink to="/projects">projects</AboutMePLink> page to see a highlight of my
              open-source work, and the <AboutMePLink to="/blog">blog</AboutMePLink> for my tutorials and more.
            </AboutMeP>
            <div>
              <AboutMeImg src={kylepic}></AboutMeImg>
            </div>
            </AboutMeHeroDiv>
        </Layout>
    )
}

export const Head = () => <Seo title="About Me" />

export default AboutPage