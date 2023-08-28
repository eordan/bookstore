import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Links from '@components/Links';
import { Context } from '../../utils/createContext';
import { RoutesEnum } from '../../utils/enums';
import { LINKS_ARRAY } from '../../utils/constants';

import './Header.scss';

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  return (
    <Navbar collapseOnSelect expand="md" className="p-3">
      <Container>
        <LinkContainer to={RoutesEnum.MAIN_ROUTE}>
          <Navbar.Brand>Pages d&apos;Évasion</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {LINKS_ARRAY.map((link) => (
              <Links key={link.id} to={link.to} title={link.title} />
            ))}
          </Nav>
          <Nav className="d-flex nav-btns">
            <NavLink style={{ textDecoration: 'none' }} to={RoutesEnum.LOGIN_ROUTE}>
              Login
            </NavLink>
            <Button className="ml-3 registration-btn" onClick={() => navigate(RoutesEnum.REGISTRATION_ROUTE)}>
              Registration
            </Button>
            {user.isAuth && (
              <Button
                className="logout-btn"
                variant="dark"
                onClick={() => {
                  user.setIsAuth(false);
                  navigate(RoutesEnum.MAIN_ROUTE);
                }}
              >
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
