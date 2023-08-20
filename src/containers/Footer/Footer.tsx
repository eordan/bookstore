import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Links from '@components/Links';
import { LINKS_ARRAY } from '../../utils/constants';

import './Footer.scss';

import github from '../../assets/github.png';

export function Footer(): JSX.Element {
  // return (
  //   <footer className="footer">
  //     <Container className="d-flex justify-content-between p-4">
  //       <h2>Liblion</h2>
  //       <Navbar.Collapse id="responsive-navbar-nav">
  //         <Nav className="me-auto">
  //           {LINKS_ARRAY.map((link) => (
  //             <Links key={link.id} to={link.to} title={link.title} />
  //           ))}
  //         </Nav>
  //       </Navbar.Collapse>
  //       <div>
  //         <NavLink target="_blank" to="https://github.com/eordan/bookstore/tree/develop">
  //           <img src={github} alt="github" />
  //         </NavLink>
  //       </div>
  //     </Container>
  //   </footer>
  // );
  return (
    <Navbar className="p-3 footer" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Liblion</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {LINKS_ARRAY.map((link) => (
              <Links key={link.id} to={link.to} title={link.title} />
            ))}
          </Nav>
          <Nav>
            <NavLink target="_blank" to="https://github.com/eordan/bookstore/tree/develop">
              <img src={github} alt="github" />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
