import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components";

import { ExternalLinkIcon } from '../assets/ExternalLinkIcon'
import floppyLogo from "../assets/floppylogo.png";



const NavigationSection = styled.section`
  width: 100%;
  display: flex;
  margin-top: 4rem;
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
  font-size: 1.3rem;
  font-weight: 700;
  background: var(--theme-button-background);
  color: var(--theme-button-color);
  display: inline-flex;

  font-family: var(--font-family-base);
  line-height: 1;
  border-radius: var(--border-radius);
  margin-right: 0.5rem;
  text-decoration: none;
  margin-bottom: 1.5rem;
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
  text-decoration: none;
  color: var(--navbar-color);
  font-size: 1.1rem;
  font-weight: 500;
  padding-bottom: .25rem;
  
  // Add hover effect
  &:active, &:hover {
    color: var(--navbar-color-hover);
    border-bottom:  2px solid var(--rainbow-3);
  }
`;

const GithubNavLink = styled(props => <a {...props} />)`
  //display:inline-block;
  text-decoration: none;
  color: var(--navbar-color);
  font-size: 1.1rem;
  font-weight: 500;
  padding-bottom: .25rem;
  
  // Add hover effect
  &:active, &:hover {
    color: var(--navbar-color-hover);
    border-bottom:  2px solid var(--rainbow-3);
  }
`;

export const Navigation = ({ theme, onUpdateTheme }) => {
  return (
    <NavigationSection>
      <NavContainer>
        <NavLinkBrand to="/">
          <NavLinkLogo src={floppyLogo} alt="Kyle Skudlarek" />
          <NavLinkSpan>Kyle Skudlarek</NavLinkSpan>
        </NavLinkBrand>
        <Nav>
          <NavLinkItem>
            <NavLinkText
              to="/about"
              activeStyle={{
                color: "var(--navbar-color-hover)",
                borderBottom: "2px solid var(--rainbow-3)",
              }}>
              <span>About</span>
            </NavLinkText>
          </NavLinkItem>
          <NavLinkItem>
            <NavLinkText
              to="/blog"
              activeStyle={{
                color: "var(--navbar-color-hover)",
                borderBottom: "2px solid var(--rainbow-3)",
              }}>
              <span>Blog </span>
            </NavLinkText>
          </NavLinkItem>
          <NavLinkItem>
            <NavLinkText
              to="/projects"
              activeStyle={{
                color: "var(--navbar-color-hover)",
                borderBottom: "2px solid var(--rainbow-3)",
              }}>
              <span>Projects</span>
            </NavLinkText>
          </NavLinkItem>
          <NavLinkItem>
            <GithubNavLink
              href={"https://github.com/kyleskudlarek"}
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <ExternalLinkIcon />
            </GithubNavLink>
          </NavLinkItem>
        </Nav>
      </NavContainer>
    </NavigationSection>
  )
}





