import * as React from 'react'
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import floppyLogo from '../assets/floppylogo.png'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;700&family=Merriweather:wght@400;700&display=swap');

  :root {
    /* Colors */
    --gray-0: #f8f9fa;
    --gray-05: #f3f6f9;
    --gray-1: #f1f3f5;
    --gray-2: #e9ecef;
    --gray-3: #dee2e6;
    --gray-4: #ced4da;
    --gray-5: #adb5bd;
    --gray-6: #868e96;
    --gray-65: #555a61;
    --gray-7: #4b5056;
    --gray-8: #31363b;
    --gray-9: #212529;
    --gray-10: #151618;

    --green: #51b681;
    --green-1: #95cd7f;
    --green-2: #73b18a;
    --green-3: #4d8994;
    --green-4: #30619d;
    --green-5: #30379d;

    --red: #f34646;
    --red-1: #efcf4a;
    --red-2: #e0a944;
    --red-3: #d37d36;
    --red-4: #cd583c;
    --red-5: #ab2e3f;

    --blue: #07a7e6;
    --blue-1: #70bdee;
    --blue-2: #618be1;
    --blue-3: #5b5ed5;
    --blue-4: #623ac6;
    --blue-5: #58119f;

    --rainbow-1: #da66b7;
    --rainbow-2: #7549f0;
    --rainbow-3: #4989c6;
    --rainbow-4: #72bf8d;
    --rainbow-5: #f4c950;

    --orange: #ff7e22;
    --yellow: #fca62a;
    --pink: #e855b3;
    --purple: #623ac6;
    --indigo: #5a43f1;
    --indigo-dark: #4509cf;
    --indigo-light: #969bf6;
    --indigo-muted: #f1f2fd;

    /* Font family */
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont,'Helvetica Neue', Arial, sans-serif;
    --font-family-monospace: 'IBM Plex Mono', Menlo, monospace;
    --font-family-heading: 'Merriweather', -apple-system, BlinkMacSystemFont,
    'Helvetica Neue', Arial, sans-serif;

    /* Font color */
    --font-color-base: var(--gray-0);
    --font-color-muted: var(--gray-6);

    /* Borders */
    --border-color: var(--gray-3);
    --border-color-hover: var(--gray-6);
    --border-radius: 4px;

    /* Elements */
    --background-color: #181818;
    --navbar: var(--gray-1);
    --navbar-color: var(--gray-4);
    --theme-button-color: var(--gray-0);
    --theme-button-border: var(--gray-7);

    /* Sizes */
    --content-width: 1160px;
    --content-width--small: 560px;
    --content-width--medium: 700px;
    --navbar-height-large: 80px;
    --navbar-height-small: 60px;


  }

  * {
    margin: 0;
    padding: 0;
  }
  html {
    overscroll-behavior: none;
    overflow: hidden;
    height: 100%;
    font-family: var(--font-family-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    font-size: 16px;
    font-weight: normal;
    font-kerning: normal;
  }
  body {
    overflow: auto;
    height: 100%;
    background: var(--background-color);
  }
`


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  //padding: 1rem 4rem;
  min-height: 100vh;
  color: var(--font-color-base);
  margin-left: auto;
  margin-right: auto;
  max-width: var(--content-width);
  padding-left: 4rem;
  padding-right: 2rem;
  font-family: var(--font-family-base);

  
`;


const Navigation = styled.section`
  width: 100%;
  display: flex;
  margin-top: 3rem;
`;

const NavContainer = styled.div`
  display: block;
  box-sizing: border-box;
  color: #FFFFFF;

  max-width: var(--content-width);

  height: var(--navbar-height-large);

`;

const NavLinkBrand = styled(props => <Link {...props} />)`

  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--navbar-color);
  margin: 0;
  //padding: 0.4rem 0.5rem;
  background: var(--theme-button-background);
  color: var(--theme-button-color);
  display: inline-flex;

  font-family: var(--font-family-base);
  line-height: 1;
  border-radius: var(--border-radius);
  margin-right: 0.5rem;
  text-decoration: none;
  margin-bottom: 1.25rem;

`;

const NavLinkLogo= styled.img`
  height: 25px;
  width: 25px;
  min-height: 20px;
  min-width: 20px;
  margin-right: 0.25rem;
`;


const NavLinkSpan= styled.span`
  display: block;

`;


const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  margin-left: 0.25rem;
`;

const NavLinkItem = styled.div`
  
  padding-right: 2rem;

`;

const NavLinkText = styled(props => <Link {...props} />)`
  color: #FFFFFF;
  text-decoration: none;
  color: var(--navbar-color);
  font-size: 1.1rem;
  font-weight: 500;
`;

const Main = styled.main`
    margin-top: 5rem;
`;

const Heading1 = styled.h1`
  color: var(--font-color-base);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;


const Layout = ({ pageTitle, children }) => {
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
        <React.Fragment>
            <GlobalStyle/>
            <LayoutContainer>
                <Navigation>
                    <NavContainer>
                        <NavLinkBrand to="/">
                            <NavLinkLogo src={floppyLogo} alt="Kyle Skudlarek" />
                            <NavLinkSpan>Kyle Skudlarek</NavLinkSpan>
                        </NavLinkBrand>
                        <Nav>
                            <NavLinkItem>
                                <NavLinkText to="/about">
                                    About
                                </NavLinkText>
                            </NavLinkItem>
                            <NavLinkItem>
                                <NavLinkText to="/blog">
                                    Blog
                                </NavLinkText>
                            </NavLinkItem>
                            <NavLinkItem>
                                <NavLinkText to="/projects">
                                    Projects
                                </NavLinkText>
                            </NavLinkItem>
                        </Nav>
                    </NavContainer>
                </Navigation>
                <Main>
                    <Heading1>
                        {pageTitle}
                    </Heading1>
                    {children}
                </Main>
            </LayoutContainer>
        </React.Fragment>
    )
}

export default Layout