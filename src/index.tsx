import React from 'react';
import { createRoot } from 'react-dom/client';
import { loginCustomer } from './services/customerAuther';

import App from './components/App/index';
import './index.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

const request = {
  email: 'request@final.com',
  password: 'tR6dZY32uR5UR52',
};

loginCustomer(request);
