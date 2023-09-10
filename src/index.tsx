import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'react-bootstrap';
import user from './utils/User';
import store from './utils/Store';

// import { getQueryDetails, searchProducts } from './services/productsHandler/productsSearcher';

import { getMyCartDraft, createAnonimousCart } from './services/ordersHandler/cartCreator';

import { getCart } from './services/ordersHandler/cartGetter';

import App from './components/App';
import './index.scss';
import { Context } from './utils/createContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Context.Provider value={{ user, store }}>
    <App />
  </Context.Provider>,
);

// const details = getQueryDetails('Harry');
// const data = searchProducts(details);
// console.log(data);

const getCRT = async () => {
  const draft = getMyCartDraft();
  const cart = await createAnonimousCart(draft);
  // console.log(cart);

  const getcart = getCart(cart.id as string);
  console.log(getcart);
};

getCRT();
