import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '@components/AppRouter';
import Header from '@containers/Header';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}
