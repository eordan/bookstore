import React from 'react';
import { Container } from 'react-bootstrap';

import rightArrow from '../../assets/right-arrow.svg';

export function Div404(): JSX.Element {
  return (
    <Container className="d-flex justify-content-center flex-column align-items-center">
      <h1 className="mt-5 mb-3">404</h1>
      <div className="d-flex align-items-center">
        <p className="mb-0">Home</p>
        <img className="right-arrow" src={rightArrow} alt="arrow" />
        <p className="mb-0">404</p>
      </div>
    </Container>
  );
}
