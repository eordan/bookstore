import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { RoutesEnum } from '../../utils/enums';
import './ProductItem.scss';
import { CATEGORIES } from '../../utils/constants';

type ProductProps = {
  product: ProductProjection;
};

export function ProductItem({ product }: ProductProps): JSX.Element {
  const navigate = useNavigate();
  let url = '';
  let category = '';
  let price = 0;

  if (product.masterVariant.images) {
    const img = product.masterVariant.images[0];
    url = img.url;
  }

  Object.entries(CATEGORIES).forEach((el) => {
    if (el[1] === product.categories[0].id) {
      [category] = el;
    }
  });

  if (product.masterVariant.prices) {
    price = product.masterVariant.prices[0].value.centAmount;
  }

  return (
    <Col>
      <Card
        bg="light"
        className="h-100 card"
        onClick={() => navigate(`${RoutesEnum.PRODUCTS_ROUTE}/${product.slug.en}`)}
      >
        <Card.Img src={url} />
        <Card.Body>
          <Card.Title>{product.name.en}</Card.Title>
          <Card.Text>{category}</Card.Text>
          {product.masterVariant.scopedPriceDiscounted ? (
            <div className="d-flex align-items-center">
              <p className="old-price">{price}</p>
              <p className="price">{product.masterVariant.scopedPrice?.currentValue.centAmount}</p>
            </div>
          ) : (
            <Card.Text className="price">{price}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
