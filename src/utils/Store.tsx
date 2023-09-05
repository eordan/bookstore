import { makeAutoObservable } from 'mobx';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductProjectionsQueryParameters } from './types';

class Store {
  private _products: ProductProjection[];

  private _storeDetails: ProductProjectionsQueryParameters;

  private _maxPrice: number;

  private _minPrice: number;

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
    this._maxPrice = 0;
    this._minPrice = 0;
    makeAutoObservable(this);
  }

  setProducts(products: ProductProjection[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  get maxPrice() {
    return this._maxPrice;
  }

  set maxPrice(value: number) {
    this._maxPrice = value;
  }

  get minPrice() {
    return this._minPrice;
  }

  set minPrice(value: number) {
    this._minPrice = value;
  }

  get storeDetails() {
    return this._storeDetails;
  }

  set storeDetails(value: ProductProjectionsQueryParameters) {
    this._storeDetails = value;
  }
}

export default new Store();
