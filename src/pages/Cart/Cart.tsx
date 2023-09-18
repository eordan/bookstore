import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, ListGroup, Form, Col } from 'react-bootstrap';
import { Cart, LineItem, MyCartUpdateAction } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../services/ordersHandler/cartGetter';
import { RoutesEnum } from '../../utils/enums';
import { addDiscountCode, removeLineItem, updateCart } from '../../services/ordersHandler/cartUpdater';
import { Context } from '../../utils/createContext';

import './Cart.scss';
import '../../styles/main.scss';
import emptyCart from '../../assets/empty-cart.svg';

export function Basket(): JSX.Element {
  const navigate = useNavigate();
  const { basket } = useContext(Context);
  const [cart, setCart] = useState<Cart>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const recountPrice = (data: Cart) => {
    setTotalPrice(data.totalPrice.centAmount / 100);
  };

  const loadCart = () => {
    getCart().then((data) => {
      if (data.totalLineItemQuantity) {
        setCart(data);
        setIsEmpty(false);
        recountPrice(data);
      } else {
        setIsEmpty(true);
      }
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const clearCart = () => {
    getCart().then((data) => {
      const removeProducts: MyCartUpdateAction[] = [];
      data.lineItems.forEach((item) => {
        removeProducts.push(removeLineItem(item.id, item.quantity));
      });
      updateCart(basket.id, basket.version, removeProducts).then((response) => {
        basket.setVersion(response.version);
        basket.setCount(0);
        loadCart();
      });
    });
  };

  const placeOrder = () => {
    updateCart(basket.id, basket.version, [addDiscountCode('FALL23')]).then((data) => {
      basket.setVersion(data.version);
    });
  };

  if (!cart && !isEmpty) {
    return <h3 className="text-center">Loading...</h3>;
  }

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
          <Col md={12} lg={9}>
            <ListGroup className="w-100">
              {cart?.lineItems.map((product: LineItem) => (
                <CartItem key={product.id} product={product} recountPrice={recountPrice} loadCart={loadCart} />
              ))}
            </ListGroup>
          </Col>
          <Col md={12} lg={3} className="d-flex flex-column align-items-center p-0 mb-3">
            <Form className="d-flex flex-column justify-content-between total w-100 p-3">
              <Form.Text className="d-flex justify-content-between mb-4">
                <h3>Total:</h3>
                <h3>{totalPrice}$</h3>
              </Form.Text>
              <Form.Group className="mb-3 position-relative">
                <Form.Control placeholder="Promo Code" />
                <Button variant="outline" className="code-btn" onClick={() => placeOrder()} />
              </Form.Group>
              <Button type="submit">Place order</Button>
            </Form>
            <Button variant="outline-secondary" className="mt-4" onClick={() => clearCart()}>
              Clear cart
            </Button>
          </Col>
        </Container>
      )}
    </Container>
  );
}
