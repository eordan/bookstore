import React, { useEffect, useState } from 'react';
import { Button, Container, ListGroup, Form, Col } from 'react-bootstrap';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../services/ordersHandler/cartGetter';
import { RoutesEnum } from '../../utils/enums';

import './Cart.scss';
import '../../styles/main.scss';
import emptyCart from '../../assets/empty-cart.svg';

export function Basket(): JSX.Element {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const recountPrice = (data: Cart) => {
    setTotalPrice(data.totalPrice.centAmount / 100);
  };

  useEffect(() => {
    if (localStorage.getItem('cartId')) {
      getCart().then((data) => {
        if (data.totalLineItemQuantity) {
          setCart(data);
          setIsEmpty(false);
          recountPrice(data);
        }
      });
    }
  }, [localStorage.getItem('cartId')]);

  return (
    <Container>
      {isEmpty && (
        <Container className="d-flex flex-column justify-content-center align-items-center my-3">
          <img src={emptyCart} alt="empty cart" className="empty-cart" />
          <h3>Your cart is empty</h3>
          <p className="text-secondary text-center">
            You have no items in your shopping cart.
            <br />
            Let&apos;s go buy something!
          </p>
          <Button onClick={() => navigate(RoutesEnum.PRODUCTS_ROUTE)}>Shop Now</Button>
        </Container>
      )}
      {!isEmpty && (
        <Container className="d-flex mt-3 cart gap-3">
          <Col sm={12} md={9}>
            <ListGroup className="w-100">
              {cart?.lineItems.map((product: LineItem) => (
                <CartItem key={product.id} product={product} recountPrice={recountPrice} />
              ))}
            </ListGroup>
          </Col>
          <Col sm={12} md={3} className="d-flex flex-column align-items-center p-0 mb-3">
            <Form className="d-flex flex-column justify-content-between total w-100 p-3">
              <Form.Text className="d-flex justify-content-between mb-4">
                <h3>Total:</h3>
                <h3>{totalPrice}$</h3>
              </Form.Text>
              <Form.Group className="mb-3">
                <Form.Control placeholder="Have a promocode?" />
              </Form.Group>
              <Button type="submit">Place order</Button>
            </Form>
            <Button variant="outline-secondary" className="mt-4">
              Clear cart
            </Button>
          </Col>
        </Container>
      )}
    </Container>
  );
}
