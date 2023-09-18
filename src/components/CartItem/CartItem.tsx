import React, { useState, useContext } from 'react';
import { Button, ListGroup, Col } from 'react-bootstrap';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { addLineItem, removeLineItem, updateCart } from '../../services/ordersHandler/cartUpdater';
import { Context } from '../../utils/createContext';

import './CartItem.scss';
import '../../styles/main.scss';
import del from '../../assets/delete.svg';

type CartItemProps = {
  product: LineItem;
  recountPrice: (data: Cart) => void;
  loadCart: () => void;
};

export function CartItem({ product, recountPrice, loadCart }: CartItemProps): JSX.Element {
  const [quantity, setQuantity] = useState(product.quantity);
  const [productTotalPrice, setProductTotalPrice] = useState(product.totalPrice.centAmount / 100);
  const { basket } = useContext(Context);
  let img = '';
  let author = '';
  let price = 0;

  if (product.variant.images) {
    img = product.variant.images[0].url;
  }

  if (product.variant.attributes) {
    author = product.variant.attributes[0].value;
  }

  if (product.price.discounted) {
    price = product.price.discounted.value.centAmount / 100;
  } else {
    price = product.price.value.centAmount / 100;
  }

  const updatePrices = (data: Cart) => {
    basket.setVersion(data.version);
    if (data.totalLineItemQuantity) {
      basket.setCount(data.totalLineItemQuantity);
    } else {
      basket.setCount(0);
    }
    recountPrice(data);
    const items = data.lineItems.filter((item) => item.productId === product.productId);
    if (items[0]) {
      setQuantity(items[0].quantity);
      setProductTotalPrice(items[0].totalPrice.centAmount / 100);
    }
  };

  const increaseItems = () => {
    updateCart(basket.id, basket.version, [addLineItem(product.productId)]).then((data) => {
      updatePrices(data);
    });
  };

  const decreaseItems = () => {
    updateCart(basket.id, basket.version, [removeLineItem(product.id)]).then((data) => {
      updatePrices(data);
    });
  };

  const removeProduct = () => {
    updateCart(basket.id, basket.version, [removeLineItem(product.id, quantity)]).then((data) => {
      updatePrices(data);
      loadCart();
    });
  };

  return (
    <ListGroup.Item className="d-flex align-items-center flex-wrap flex-row mb-3 p-2 item">
      <Col md={3} sm={4} xs={5} className="d-flex justify-content-center">
        <img className="item-img" src={img} alt="book" />
      </Col>
      <Col md={4} sm={8} xs={7}>
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
        <div className="text-secondary">{price}$ unit</div>
      </Col>
      <Col md={2} sm={6} xs={5}>
        <h5 className="m-0 text-center font-weight-500">{productTotalPrice}$</h5>
      </Col>
      <Col md={1} xs={2} className="d-flex justify-content-center">
        <Button type="button" className="delete-btn p-1" onClick={() => removeProduct()}>
          <img src={del} alt="delete" />
        </Button>
      </Col>
    </ListGroup.Item>
  );
}
