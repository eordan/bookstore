import ProductList from '@components/ProductList';
import React from 'react';
import { Container } from 'react-bootstrap';

export function Products(): JSX.Element {
  return (
    <Container>
      <ProductList />
    </Container>
  );
}
