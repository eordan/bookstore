import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ProductProjection, Cart } from '@commercetools/platform-sdk';
import { RoutesEnum } from '../../utils/enums';
import { CATEGORIES } from '../../utils/constants';
import { addLineItem, removeLineItem, updateCart } from '../../services/ordersHandler/cartUpdater';
import { getCart } from '../../services/ordersHandler/cartGetter';
import { Context } from '../../utils/createContext';

import './ProductItem.scss';

type ProductProps = {
  product: ProductProjection;
};

export const ProductItem = observer(({ product }: ProductProps): JSX.Element => {
  const navigate = useNavigate();
  const { basket } = useContext(Context);
  let url = '';
  let category = '';
  let price = '';
  let author = '';
  let productId: string = '';
  let discounted = '';
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

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
    price = (product.masterVariant.prices[1].value.centAmount / 100).toFixed(2);
    if (product.masterVariant.prices[1].discounted) {
      discounted = (product.masterVariant.prices[1].discounted.value.centAmount / 100).toFixed(2);
    }
  }

  if (product.masterVariant.attributes) {
    author = product.masterVariant.attributes[0].value;
  }

  const cartControl = (data: Cart) => {
    basket.setVersion(data.version);
    if (data.totalLineItemQuantity) {
      basket.setCount(data.totalLineItemQuantity);
    } else {
      basket.setCount(0);
    }
    const cartItem = data.lineItems.find((item) => item.productId === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setIsAdded(false);
      setQuantity(0);
    }
  };

  useEffect(() => {
    getCart().then((data) => {
      const cartItem = data.lineItems.find((item) => item.productId === product.id);
      productId = cartItem?.id as string;
      if (cartItem) {
        setIsAdded(true);
        setQuantity(cartItem.quantity);
      }
    });
  });

  const addToCart = () => {
    updateCart(basket.id, basket.version, [addLineItem(product.id)]).then((data) => {
      cartControl(data);
    });
  };

  const increaseItems = () => {
    updateCart(basket.id, basket.version, [addLineItem(product.id)]).then((data) => {
      cartControl(data);
    });
  };

  const decreaseItems = () => {
    updateCart(basket.id, basket.version, [removeLineItem(productId)]).then((data) => {
      cartControl(data);
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
          {discounted ? (
            <div className="d-flex align-items-center">
              <p className="old-price">${price}</p>
              <p className="price">${discounted}</p>
            </div>
          ) : (
            <Card.Text className="price">${price}</Card.Text>
          )}
          {isAdded ? (
            <div className="d-flex quantity-block">
              <Button
                variant="secondary"
                className="quantity-item"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseItems();
                }}
              >
                -
              </Button>
              <div className="quantity-item">{quantity}</div>
              <Button
                variant="secondary"
                className="quantity-item"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseItems();
                }}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setIsAdded(true);
                addToCart();
              }}
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
});
