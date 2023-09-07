import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '@components/AppRouter';
import Header from '@containers/Header';
import Footer from '@containers/Footer';
import { Context } from '../../utils/createContext';

export function App(): JSX.Element {
  const { user } = useContext(Context);

  if (localStorage.getItem('isAuth') === 'true') {
    user.setIsAuth(true);
    user.setId(localStorage.getItem('userID') as string);
    user.setVersion(Number(localStorage.getItem('userVersion')));
  }

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}
