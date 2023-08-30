import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'react-bootstrap';
import user from './utils/User';

import { searchProducts, getQueryDetails, getCategoriesList, getProduct } from './services/productsSearcher';

import App from './components/App';
import './index.scss';
import { Context } from './utils/createContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Context.Provider value={user}>
    <App />
  </Context.Provider>,
);

const params = getQueryDetails(undefined, ['categories.id:"a43c316c-1ee5-40f4-928c-647d317fbbb2"']);
const data = searchProducts(params);
console.log(data);

const categories = getCategoriesList();
console.log(categories);

const product = getProduct('b83d5f12-dc51-4f1c-9ef6-e3acf5550ec3', 'US');
console.log(product);
