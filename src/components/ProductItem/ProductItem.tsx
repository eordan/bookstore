import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { ProductInterface } from '../../utils/interfaces';

import './ProductItem.scss';

type ProductProps = {
  product: ProductInterface;
};

export function ProductItem({ product }: ProductProps): JSX.Element {
  return (
    <Col>
      <Card bg="light" className="h-100 card">
        <Card.Img src={product.img} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.category}</Card.Text>
          {product.discount ? (
            <div className="d-flex align-items-center">
              <p className="old-price">{product.price}</p>
              <p className="price">{product.discount.newPrice}</p>
            </div>
          ) : (
            <Card.Text className="price">{product.price}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
