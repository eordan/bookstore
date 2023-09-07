import { makeAutoObservable } from 'mobx';
import { ProductProjection } from '@commercetools/platform-sdk';
import { StringUndefined, Breadcrumb } from './types';

class Store {
  private _products: ProductProjection[];

  private _text: StringUndefined;

  private _sort: string;

  private _filter: string[];

  private _breadcrumbs: Breadcrumb[];

  constructor() {
    this._products = [];
    this._text = undefined;
    this._sort = 'name.en asc';
    this._filter = [];
    this._breadcrumbs = [];
    makeAutoObservable(this);
  }

  setProducts(products: ProductProjection[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  get text() {
    return this._text;
  }

  setText(value: StringUndefined) {
    this._text = value;
  }

  get sort() {
    return this._sort;
  }

  setSort(value: string) {
    this._sort = value;
  }

  get filter() {
    return this._filter;
  }

  setFilter(value: string[]) {
    this._filter = value;
  }

  get breadcrumbs() {
    return this._breadcrumbs;
  }

  pushCrumb(value: Breadcrumb) {
    this._breadcrumbs.push(value);
  }

  popCrumb(value: Breadcrumb) {
    this._breadcrumbs = this._breadcrumbs.filter((item) => item.name !== value.name);
  }
}

export default new Store();
