import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductInterface } from '../../utils/interfaces';
import { RoutesEnum } from '../../utils/enums';
import './ProductItem.scss';

type ProductProps = {
  product: ProductInterface;
};

export function ProductItem({ product }: ProductProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Col>
      <Card bg="light" className="h-100 card" onClick={() => navigate(`${RoutesEnum.PRODUCTS_ROUTE}/${product.id}`)}>
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
