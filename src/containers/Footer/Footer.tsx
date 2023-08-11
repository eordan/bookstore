import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

import github from '../../assets/github.png';

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Container className="d-flex justify-content-between mt-5 p-5">
        <h2>Liblion</h2>
        <div>
          <NavLink target="_blank" to="https://github.com/eordan/bookstore/tree/develop">
            <img src={github} alt="github" />
          </NavLink>
        </div>
      </Container>
    </footer>
  );
}
