import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'react-bootstrap';
import user from './utils/User';
import store from './utils/Store';

import { getQueryDetails, searchProducts } from './services/productsHandler/productsSearcher';

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
