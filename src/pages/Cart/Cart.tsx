import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, ListGroup, Form, Col } from 'react-bootstrap';
import { Cart, LineItem, MyCartUpdateAction } from '@commercetools/platform-sdk';
import CartItem from '@components/CartItem';
import { useNavigate } from 'react-router-dom';
import { getAnonumousCart } from '../../services/ordersHandler/cartGetter';
import { RoutesEnum } from '../../utils/enums';
import {
  addDiscountCode,
  removeDiscountCode,
  removeLineItem,
  updateAnonymousCart,
} from '../../services/ordersHandler/cartUpdater';
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
  // const [saving, setSaving] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isCodeApplied, setCodeApplied] = useState(false);

  const recountPrice = (data: Cart) => {
    setTotalPrice(data.totalPrice.centAmount / 100);
  };

  const loadCart = () => {
    getAnonumousCart().then((cartResponse) => {
      if (cartResponse.totalLineItemQuantity) {
        setCart(cartResponse);
        setIsEmpty(false);
        recountPrice(cartResponse);
      } else {
        setIsEmpty(true);
      }
      if (cartResponse.discountCodes.length !== 0) {
        updateAnonymousCart(basket.id, basket.version, [
          removeDiscountCode({ id: '831f3285-4caf-4153-881c-d840620cd76c', typeId: 'discount-code' }),
        ]).then((codeResponse) => {
          basket.setVersion(codeResponse.version);
        });
      }
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const clearCart = () => {
    getAnonumousCart().then((data) => {
      const removeProducts: MyCartUpdateAction[] = [];
      data.lineItems.forEach((item) => {
        removeProducts.push(removeLineItem(item.id, item.quantity));
      });
      updateAnonymousCart(basket.id, basket.version, removeProducts).then((response) => {
        basket.setVersion(response.version);
        basket.setCount(0);
        loadCart();
      });
    });
  };

  const placeOrder = () => {
    updateAnonymousCart(basket.id, basket.version, [addDiscountCode(promoCode)]).then(
      (data) => {
        basket.setVersion(data.version);
        recountPrice(data);
        if (data.discountCodes[0].state !== 'MatchesCart') {
          setCodeError('Total price too low');
        } else {
          setCodeApplied(true);
          setCodeError('');
        }
      },
      () => {
        setCodeError('Code not found');
      },
    );
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
          <Col sm={12} lg={9}>
            <ListGroup className="w-100">
              {cart?.lineItems.map((product: LineItem) => (
                <CartItem key={product.id} product={product} recountPrice={recountPrice} loadCart={loadCart} />
              ))}
            </ListGroup>
          </Col>
          <Col sm={12} lg={3} className="d-flex flex-column align-items-center p-0 mb-3">
            <Form className="d-flex flex-column justify-content-between total w-100 p-3">
              <Form.Text className="d-flex justify-content-between mb-4">
                <h3>Total:</h3>
                <h3>{totalPrice}$</h3>
              </Form.Text>
              {/* <Form.Text className="d-flex justify-content-between mb-2">
                <h6 className="text-secondary">Saving:</h6>
                <h6 className="text-secondary">{saving}$</h6>
              </Form.Text> */}
              {!isCodeApplied && (
                <Form.Group className="d-flex gap-2">
                  <Form.Control
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline-secondary" className="code-btn" onClick={() => placeOrder()}>
                    Apply
                  </Button>
                </Form.Group>
              )}
              {isCodeApplied && (
                <h6 className="text-center text-success mb-0 p-2" style={{ height: 38 }}>
                  Promo code appplied!
                </h6>
              )}
              <p className="message mb-3 px-2">{codeError}</p>
              <Button type="submit" className="place-order-btn mx-auto">
                Place order
              </Button>
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
