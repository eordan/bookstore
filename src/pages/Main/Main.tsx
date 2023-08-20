import React from 'react';
import { Container } from 'react-bootstrap';

import './Main.scss';

export function Main(): JSX.Element {
  return (
    <section className="main">
      <Container className="d-flex main-container">
        <h1 className="title m-5">We love literature</h1>
      </Container>
    </section>
  );
}
