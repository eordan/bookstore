import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../utils/enums';

export function Header(): JSX.Element {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Liblion</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Product</Nav.Link>
            <Nav.Link href="#features">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
          <Nav>
            <NavLink style={{ textDecoration: 'none' }} to={RoutesEnum.LOGIN_ROUTE}>
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
