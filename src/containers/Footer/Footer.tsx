import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Links from '@components/Links';
import { LINKS_ARRAY } from '../../utils/constants';
import { RoutesEnum } from '../../utils/enums';

import './Footer.scss';

import github from '../../assets/github.png';

export function Footer(): JSX.Element {
  return (
    <Navbar className="p-3 footer" data-bs-theme="dark">
      <Container className="footer-container">
        <LinkContainer to={RoutesEnum.MAIN_ROUTE}>
          <Navbar.Brand>Pages d&apos;Évasion</Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {LINKS_ARRAY.map((link) => (
              <Links key={link.id} to={link.to} title={link.title} />
            ))}
          </Nav>
          <Nav>
            <NavLink className="github-link" target="_blank" to="https://github.com/eordan/bookstore/tree/develop">
              <img src={github} alt="github" />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
