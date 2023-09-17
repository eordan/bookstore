import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { RoutesEnum } from '../../utils/enums';
import { CATEGORIES } from '../../utils/constants';
import { addLineItem, updateCart } from '../../services/ordersHandler/cartUpdater';
import { Context } from '../../utils/createContext';

import './ProductItem.scss';

type ProductProps = {
  product: ProductProjection;
};

export function ProductItem({ product }: ProductProps): JSX.Element {
  const navigate = useNavigate();
  const { basket } = useContext(Context);
  let url = '';
  let category = '';
  let price = '';
  let author = '';

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
    price = (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2);
  }

  if (product.masterVariant.attributes) {
    author = product.masterVariant.attributes[0].value;
  }

  const addToCart = () => {
    updateCart(basket.id, basket.version, [addLineItem(product.id)]).then((data) => {
      basket.setVersion(data.version);
      if (data.totalLineItemQuantity) {
        basket.setCount(data.totalLineItemQuantity);
      }
    });
  };

  return (
    <Col>
      <Card bg="light" className="h-100" onClick={() => navigate(`${RoutesEnum.PRODUCTS_ROUTE}/${product.id}`)}>
        <Card.Img src={url} />
        <Card.Body>
          <Card.Title>{product.name.en}</Card.Title>
          <Card.Subtitle className="text-secondary mb-2">{author}</Card.Subtitle>
          <Card.Text>{category}</Card.Text>
          {product.masterVariant.scopedPriceDiscounted ? (
            <div className="d-flex align-items-center">
              <p className="old-price">{price}</p>
              <p className="price">
                {((product.masterVariant.scopedPrice?.currentValue.centAmount as number) / 100).toFixed(2)}
              </p>
            </div>
          ) : (
            <Card.Text className="price">{price}</Card.Text>
          )}
          <Button
            onClick={(event) => {
              event.stopPropagation();
              addToCart();
            }}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
