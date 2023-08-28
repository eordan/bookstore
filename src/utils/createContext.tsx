import { createContext } from 'react';
import user from './User';
import store from './Store';

export const Context = createContext({
  user,
  store,
});
