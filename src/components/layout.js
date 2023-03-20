import * as React from 'react'
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }
  html {
      overscroll-behavior: none;
      overflow: hidden;
      height: 100%;
  }
  body {
      overflow: auto;
      height: 100%;
  }
`
  

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #181818;
    color: #FFFFFF;
`;

const Heading = styled.h1`
    color: rebeccapurple;
`;

const NavLinks = styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0;
`;

const NavLinkItem = styled.li`
    padding-right: 2rem;
`;

const NavLinkText = styled(props => <Link {...props} />)`
    color: #FFFFFF;
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
        <Container>
            <nav>
                <NavLinks>
                    <NavLinkItem>
                        <NavLinkText to="/">
                            Home
                        </NavLinkText>
                    </NavLinkItem>
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
                </NavLinks>
            </nav>
            <main>
                <Heading>
                    {pageTitle}
                </Heading>
                {children}
            </main>
        </Container>
      </React.Fragment>
    )
}

export default Layout