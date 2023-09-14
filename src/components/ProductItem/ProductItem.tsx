import React, { useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { RoutesEnum } from '../../utils/enums';
import './ProductItem.scss';
import { CATEGORIES } from '../../utils/constants';
import { createAnonimousCart } from '../../services/ordersHandler/cartCreator';
import { addLineItem, updateCart } from '../../services/ordersHandler/cartUpdater';
import { getCurrencyData } from '../../services/productsHandler/productsSearcher';

type ProductProps = {
  product: ProductProjection;
};

export function ProductItem({ product }: ProductProps): JSX.Element {
  const navigate = useNavigate();
  let url = '';
  let category = '';
  let price = '';
  let author = '';

  useEffect(() => {
    const resetStorage = () => {
      localStorage.setItem('cartId', '');
      localStorage.setItem('cartVersion', '');
    };
    window.addEventListener('beforeunload', () => resetStorage());
    return () => {
      window.removeEventListener('beforeunload', () => resetStorage());
    };
  });

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

  const addToCart = async () => {
    if (!localStorage.getItem('cartId')) {
      const draft = getCurrencyData('United States');
      const data = await createAnonimousCart(draft);
      if (data) {
        localStorage.setItem('cartId', `${data.id}`);
        localStorage.setItem('cartVersion', `${data.version}`);
      }
    }

    updateCart(`${localStorage.getItem('cartId')}`, Number(localStorage.getItem('cartVersion')), [
      addLineItem(product.id),
    ]).then((data) => {
      localStorage.setItem('cartVersion', `${data.version}`);
      const cartCounter = document.querySelector('.cart-counter');
      if (cartCounter instanceof HTMLElement) {
        cartCounter.textContent = `${data.totalLineItemQuantity}`;
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
