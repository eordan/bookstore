import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

import './Header.scss';

export function Header(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Liblion</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">
              <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={RoutesEnum.MAIN_ROUTE}>
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link href="#pricing">Product</Nav.Link>
            <Nav.Link href="#features">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <NavLink style={{ textDecoration: 'none' }} to={RoutesEnum.LOGIN_ROUTE}>
              Login
            </NavLink>
            <Button className="ml-3 registration-btn" onClick={() => navigate(RoutesEnum.REGISTRATION_ROUTE)}>
              Registration
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
