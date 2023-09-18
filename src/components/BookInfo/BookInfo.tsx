import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Carousel, Col, Container, Row, Image, Button } from 'react-bootstrap';
import { Cart } from '@commercetools/platform-sdk';
import SliderModal from '@containers/SliderModal';
import { RoutesEnum } from '../../utils/enums';
import { NumberUndefined, StringUndefined } from '../../utils/types';
import { Context } from '../../utils/createContext';
import { getCart } from '../../services/ordersHandler/cartGetter';
import { addLineItem, removeLineItem, updateCart } from '../../services/ordersHandler/cartUpdater';

import './BookInfo.scss';

import Lorem1 from '../../assets/lorem1.jpg';
import Lorem2 from '../../assets/lorem2.jpg';
import rightArrow from '../../assets/right-arrow.svg';
import star from '../../assets/star.svg';

interface Props {
  title: StringUndefined;
  url: string;
  author: string;
  price: string;
  discountedPrice: NumberUndefined;
  rating: StringUndefined;
  id: string;
}

export function BookInfo({ title, url, author, price, discountedPrice, rating, id }: Props) {
  const { basket } = useContext(Context);
  const [modalShow, setModalShow] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  let productId: string = '';

  useEffect(() => {
    getCart().then((data) => {
      const cartItem = data.lineItems.find((item) => item.productId === id);
      productId = cartItem?.id as string;
      if (cartItem) {
        setIsAdded(true);
        setQuantity(cartItem.quantity);
      }
    });
  });

  const cartControl = (data: Cart) => {
    basket.setVersion(data.version);
    if (data.totalLineItemQuantity) {
      basket.setCount(data.totalLineItemQuantity);
    } else {
      basket.setCount(0);
    }
    const cartItem = data.lineItems.find((item) => item.productId === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setIsAdded(false);
      setQuantity(0);
    }
  };

  const addToCart = () => {
    updateCart(basket.id, basket.version, [addLineItem(id)]).then((data) => {
      cartControl(data);
    });
  };

  const increaseItems = () => {
    updateCart(basket.id, basket.version, [addLineItem(id)]).then((data) => {
      cartControl(data);
    });
  };

  const decreaseItems = () => {
    updateCart(basket.id, basket.version, [removeLineItem(productId)]).then((data) => {
      cartControl(data);
    });
  };

  return (
    <div className="bg-light p-5">
      <Container>
        <div className="d-flex align-items-center mb-5">
          <NavLink style={{ textDecoration: 'none', color: '#252b42' }} to={RoutesEnum.MAIN_ROUTE}>
            Home
          </NavLink>
          <img className="right-arrow" src={rightArrow} alt="arrow" />
          <NavLink style={{ textDecoration: 'none', color: '#252b42' }} to={RoutesEnum.PRODUCTS_ROUTE}>
            Products
          </NavLink>
          <img className="right-arrow" src={rightArrow} alt="arrow" />
          <p className="last-crumb mb-0">{title}</p>
        </div>
        <Row className="d-flex justify-content-center">
          <SliderModal show={modalShow} onHide={() => setModalShow(false)} url={url} />
          <Col md={3}>
            <Carousel variant="dark" onClick={() => setModalShow(true)}>
              <Carousel.Item>
                <Image className="w-100" src={url} fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image className="w-100" src={Lorem1} fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image className="w-100" src={Lorem2} fluid />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col className="description p-5" md={8}>
            <h1 className="book-title">{title}</h1>
            <h4>Author: {author}</h4>
            <div className="book-rating">
              <Image src={star} alt="star" />
              <p>{rating}</p>
            </div>
            {discountedPrice ? (
              <div className="d-flex align-items-center">
                <p className="detailed old-price">${price}</p>
                <p className="detailed price">${(discountedPrice / 100).toFixed(2)}</p>
              </div>
            ) : (
              <p className="detailed price mt-4">${price}</p>
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
                className="mt-2"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsAdded(true);
                  addToCart();
                }}
              >
                Add to cart
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
