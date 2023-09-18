import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '@components/AppRouter';
import Header from '@containers/Header';
import Footer from '@containers/Footer';
import { Context } from '../../utils/createContext';
import { getCurrencyData } from '../../services/productsHandler/productsSearcher';
import { createAnonymousCart } from '../../services/ordersHandler/cartCreator';
import { getAnonumousCart } from '../../services/ordersHandler/cartGetter';

export function App(): JSX.Element {
  const { user, basket } = useContext(Context);

  if (localStorage.getItem('isAuth') === 'true') {
    user.setIsAuth(true);
    user.setId(localStorage.getItem('userID') as string);
    user.setVersion(Number(localStorage.getItem('userVersion')));
  }

  useEffect(() => {
    if (!localStorage.getItem('anonTokenDevision')) {
      const draft = getCurrencyData('United States');
      createAnonymousCart(draft).then((data) => {
        basket.setId(data.id);
        basket.setVersion(data.version);
      });
    } else {
      getAnonumousCart().then((data) => {
        basket.setId(data.id);
        basket.setVersion(data.version);
        if (data.totalLineItemQuantity) {
          basket.setCount(data.totalLineItemQuantity);
        }
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}
