import React from 'react';
import Login from './pages/Login';
import Reg from './pages/Reg';
import Main from './pages/Main';
import Page404 from './pages/Page404';

import { RoutesEnum } from './utils/enums';
import Contacts from './pages/Contacts';
import Products from './pages/Products';

export const publicRoutes = [
  {
    path: RoutesEnum.LOGIN_ROUTE,
    Component: <Login />,
  },
  {
    path: RoutesEnum.REGISTRATION_ROUTE,
    Component: <Reg />,
  },
  {
    path: RoutesEnum.MAIN_ROUTE,
    Component: <Main />,
  },
  {
    path: RoutesEnum.PAGE_404,
    Component: <Page404 />,
  },
  {
    path: RoutesEnum.CONTACTS_ROUTE,
    Component: <Contacts />,
  },
  {
    path: RoutesEnum.PRODUCTS_ROUTE,
    Component: <Products />,
  },
];
