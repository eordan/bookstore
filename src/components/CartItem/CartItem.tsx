import React, { useState, useContext } from 'react';
import { Button, ListGroup, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { addLineItem, removeLineItem, updateAnonymousCart } from '../../services/ordersHandler/cartUpdater';
import { Context } from '../../utils/createContext';
import { RoutesEnum } from '../../utils/enums';

import './CartItem.scss';
import '../../styles/main.scss';
import del from '../../assets/delete.svg';

type CartItemProps = {
  product: LineItem;
  price: number;
  totalPrice: number;
  oldTotalPrice: number;
  recountPrice: (data: Cart) => void;
  loadCart: () => void;
};

export function CartItem({
  product,
  price,
  totalPrice,
  oldTotalPrice,
  recountPrice,
  loadCart,
}: CartItemProps): JSX.Element {
  const [quantity, setQuantity] = useState(product.quantity);
  const { basket } = useContext(Context);
  const navigate = useNavigate();
  let img = '';
  let author = '';

  if (product.variant.images) {
    img = product.variant.images[0].url;
  }

  if (product.variant.attributes) {
    author = product.variant.attributes[0].value;
  }

  const updatePrices = (data: Cart) => {
    basket.setVersion(data.version);
    if (data.totalLineItemQuantity) {
      basket.setCount(data.totalLineItemQuantity);
    } else {
      basket.setCount(0);
    }
    recountPrice(data);
    const item = data.lineItems.find((element) => element.productId === product.productId);
    if (item) {
      setQuantity(item.quantity);
    }
  };

  const increaseItems = () => {
    updateAnonymousCart(basket.id, basket.version, [addLineItem(product.productId)]).then((data) => {
      updatePrices(data);
    });
  };

  const decreaseItems = () => {
    updateAnonymousCart(basket.id, basket.version, [removeLineItem(product.id)]).then((data) => {
      updatePrices(data);
    });
  };

  const removeProduct = () => {
    updateAnonymousCart(basket.id, basket.version, [removeLineItem(product.id, quantity)]).then((data) => {
      updatePrices(data);
      loadCart();
    });
  };

  return (
    <ListGroup.Item className="d-flex align-items-center flex-wrap flex-row mb-3 p-2 item">
      <Col md={3} sm={4} xs={5} className="d-flex justify-content-center" style={{ cursor: 'pointer' }} onClick={() => navigate(`${RoutesEnum.PRODUCTS_ROUTE}/${product.productId}`)}>
        <img className="item-img" src={img} alt="book" />
      </Col>
      <Col md={4} sm={8} xs={7} style={{ cursor: 'pointer' }} onClick={() => navigate(`${RoutesEnum.PRODUCTS_ROUTE}/${product.productId}`)}>
        <h5 className="book-name" title={product.name.en}>
          {product.name.en}
        </h5>
        <h6 className="author text-secondary" style={{ fontWeight: 400 }} title={author}>
          {author}
        </h6>
      </Col>
      <Col md={2} sm={4} xs={5} className="d-flex flex-column align-items-center p-0 mt-4">
        <div className="d-flex quantity-block">
          <Button
            disabled={quantity === 1}
            variant="secondary"
            className="quantity-item"
            onClick={() => decreaseItems()}
          >
            -
          </Button>
          <div className="quantity-item">{quantity}</div>
          <Button variant="secondary" className="quantity-item" onClick={() => increaseItems()}>
            +
          </Button>
        </div>
        <div className="text-secondary cart-price">{price}$ unit</div>
      </Col>
      <Col md={2} sm={6} xs={5}>
        <h5 className="text-center font-weight-500 item-price price cart-price">{totalPrice}$</h5>
        {oldTotalPrice !== totalPrice && (
          <h6 className="mt-1 me-0 text-center old-price cart-price">{oldTotalPrice}$</h6>
        )}
        {oldTotalPrice === totalPrice && <h6>&nbsp;</h6>}
      </Col>
      <Col md={1} xs={2} className="d-flex justify-content-center">
        <Button type="button" className="delete-btn p-1" onClick={() => removeProduct()}>
          <img src={del} alt="delete" />
        </Button>
      </Col>
    </ListGroup.Item>
  );
}
