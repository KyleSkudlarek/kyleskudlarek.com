import React from 'react'

import netlify from '../assets/netlify.png'
import gatsby from '../assets/gatsby.png'
import github from '../assets/github.png'
import styled from 'styled-components'

const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org/', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/taniarascia', label: 'GitHub', icon: github },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: netlify },
]

const FooterLayout = styled(props => <footer {...props} />)`
  padding: 3rem 0;
  font-family: var(--font-family-base);
`;


const FooterSection = styled(props => <section {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;


const FooterNav = styled(props => <nav {...props} />)`
  display: flex;
  gap: 0.25rem;
  margin: 0 1rem;
`;

const FooterA = styled(props => <a {...props} />)`
  display: flex;
  align-items: center;
  color: var(--font-color-base);
  font-size: 0.9rem;
  line-height: 1.2;
  padding: 0 0.5rem;
  
  &:hover {
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
  } 
`;

const FooterSpan = styled(props => <span {...props} />)`
  display: flex;
  align-items: center;
  color: var(--font-color-base);
  font-size: 0.9rem;
  line-height: 1.2;
  padding: 0 0.5rem;
`;

const FooterImg = styled(props => <img {...props} />)`
  display: inline-block;
  max-height: 20px;
  width: auto;
`;

export const Footer = () => {
  return (
    <FooterLayout>
      <FooterSection>
        <FooterNav>
          <span className="desktop-only">Made by Kyle Skudlarek</span>
        </FooterNav>
        <FooterNav>
          {madeWithLinks.map((link) => (
            <FooterA
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <FooterSpan>{link.label}</FooterSpan>
              <FooterImg src={link.icon} alt={link.label} />
            </FooterA>
          ))}
        </FooterNav>
      </FooterSection>
    </FooterLayout>
  )
}
