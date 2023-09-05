import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '@components/AppRouter';
import Header from '@containers/Header';
import Footer from '@containers/Footer';

export function App(): JSX.Element {
  // eslint-disable-next-line no-alert
  alert('Привет! Пожалуйста, проверьте в последний день! Заранее больше спасибо)');

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}
