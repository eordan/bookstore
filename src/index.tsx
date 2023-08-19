import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap';
import 'react-bootstrap';
import user from './utils/User';

import App from './components/App';
import './index.scss';

export const Context = createContext(user);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Context.Provider value={user}>
    <App />
  </Context.Provider>,
);
