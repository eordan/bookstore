import ProductItem from '@components/ProductItem';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../../utils/createContext';

export function ProductList(): JSX.Element {
  const { store } = useContext(Context);

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-3 mb-5">
      {store.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Row>
  );
}
