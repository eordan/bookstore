import { makeAutoObservable } from 'mobx';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductProjectionsQueryParameters } from './types';

class Store {
  private _products: ProductProjection[];

  private _storeDetails: ProductProjectionsQueryParameters;

  constructor() {
    this._products = [];
    this._storeDetails = {
      text: undefined,
      fuzzy: undefined,
      limit: undefined,
      offset: undefined,
      filter: undefined,
      sort: undefined,
      currency: undefined,
    };
    makeAutoObservable(this);
  }

  setProducts(products: ProductProjection[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  get storeDetailes() {
    return this._storeDetails;
  }
}

export default new Store();
