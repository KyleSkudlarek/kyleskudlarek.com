import * as React from 'react'
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import floppyLogo from '../assets/floppylogo.png'
import { Navigation} from "./Navigation";
import { Footer } from './Footer'

const GlobalStyle = createGlobalStyle`
  :root {
    /* Colors */
    --gray-0: #f8f9fa;
    --gray-05: #f3f6f9;
    --gray-1: #f1f3f5;
    --gray-2: #e9ecef;
    --gray-3: #2c2c2c;
    --gray-4: #ced4da;
    --gray-5: #adb5bd;
    --gray-6: #868e96;
    --gray-65: #555a61;
    --gray-7: #4b5056;
    --gray-8: #31363b;
    --gray-9: #1f1f1f;
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
    --font-color-base: var(--gray-2);
    --font-color-muted: var(--gray-6);
    --font-color-bright: white;

    /* Borders */
    --border-color: var(--gray-3);
    --border-color-hover: var(--gray-6);
    --border-radius: 4px;

    /* Elements */
    --background-color: #181818;
    --navbar: var(--gray-4);
    --navbar-color: var(--gray-4);
    --navbar-color-hover: white;
    --theme-button-color: var(--gray-0);
    --theme-button-border: var(--gray-7);
    --theme-blue: var(--rainbow-3);
    --card-time-color: var(--rainbow-3);
    --card-background-color: var(--gray-9);

    /* Sizes */
    --content-width: 1160px;
    --content-width--small: 560px;
    --content-width--medium: 900px;
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
  min-height: 100vh;
  color: var(--font-color-base);
  max-width: var(--content-width--medium);
  padding: 0 1rem;
  margin-left: auto;
  margin-right: auto;
  font-family: var(--font-family-base);
`;

const Heading = styled.h1`
  margin-top: 1rem;
  margin-bottom: 3rem;
  color: var(--font-color-base);
  font-family: var(--font-family-base);
  font-size: 2.0rem;
  font-weight: 700;

`;


const Main = styled.main`
  margin-top: 5rem;
  margin-bottom: 20rem;
  max-width: var(--content-width--medium);
  flex-grow: 1;
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
      <div>
      <LayoutContainer>
        <Navigation>
        </Navigation>
        <Main>
          <Heading>
            {pageTitle}
          </Heading>
          {children}
        </Main>
        <Footer />
      </LayoutContainer>
      </div>
    </React.Fragment>
  )
}

export default Layout