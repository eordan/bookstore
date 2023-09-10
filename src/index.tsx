import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'react-bootstrap';
import user from './utils/User';
import store from './utils/Store';

import { getCurrencyData, getQueryDetails, searchProducts } from './services/productsHandler/productsSearcher';

import { createAnonimousCart } from './services/ordersHandler/cartCreator';

import { getCart } from './services/ordersHandler/cartGetter';

import { addLineItem, updateCart } from './services/ordersHandler/cartUpdater';

import App from './components/App';
import './index.scss';
import { Context } from './utils/createContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Context.Provider value={{ user, store }}>
    <App />
  </Context.Provider>,
);

const details = getQueryDetails('Harry');
const data = searchProducts(details);
console.log(data);

const getCrt = async () => {
  const draft = getCurrencyData('Canada');
  const cart = await createAnonimousCart(draft);
  console.log(cart);

  const getcart = getCart(cart.id as string);
  console.log(getcart);

  const item = addLineItem('983d26e8-2c7a-40d5-9fa5-9ddd7af931a7');
  const updatedCart = updateCart(cart.id, cart.version, [item]);
  console.log(updatedCart);
};

getCrt();
