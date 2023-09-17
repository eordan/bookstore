import { createContext } from 'react';
import user from './User';
import store from './Store';
import basket from './Basket';

export const Context = createContext({
  user,
  store,
  basket,
});
