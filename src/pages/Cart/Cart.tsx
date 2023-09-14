import React, { useEffect, useState } from 'react';
import { Button, Container, ListGroup, Form, Col } from 'react-bootstrap';
// import { NavLink, Navigate, useNavigate } from 'react-router-dom';
// import { RoutesEnum } from '../../utils/enums';

import './Cart.scss';
import '../../styles/main.scss';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem';
import { getCart } from '../../services/ordersHandler/cartGetter';

export function Basket(): JSX.Element {
  const [cart, setCart] = useState<Cart>();
  let totalPrice = 0;

  useEffect(() => {
    if (localStorage.getItem('cartId')) {
      getCart(`${localStorage.getItem('cartId')}`).then((data) => {
        setCart(data);
      });
    }
  }, [localStorage.getItem('cartId')]);

  if (cart) {
    totalPrice = cart.totalPrice.centAmount / 100;
  }

  return (
    <Container className="d-flex mt-3 cart gap-3">
      <Col sm={12} md={9}>
        <ListGroup className="w-100">
          {cart?.lineItems.map((product: LineItem) => (
            <CartItem key={product.id} product={product} />
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
  );
}
