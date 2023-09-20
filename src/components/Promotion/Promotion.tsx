import React from 'react';
import { Container } from 'react-bootstrap';

import './Promotion.scss';

type PromotionProps = {
  width: string;
};

export function Promotion({ width }: PromotionProps): JSX.Element {
  return (
    <Container className="promo p-1 m-0" style={{ maxWidth: width }}>
      <h6 className="m-0 p1">Falling into Books:</h6>
      <h6 className="m-0 p-1">25% OFF on Orders 49$+</h6>
      <h6 className="promo-code m-0 py-1 px-2">Code: FALL23</h6>
    </Container>
  );
}
