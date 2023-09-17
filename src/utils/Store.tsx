import { makeAutoObservable } from 'mobx';
import { ProductProjection } from '@commercetools/platform-sdk';
import { StringUndefined, Breadcrumb } from './types';

class Store {
  private _products: ProductProjection[];

  private _text: StringUndefined;

  private _sort: string;

  private _filter: string[];

  private _breadcrumbs: Breadcrumb[];

  private _page: number;

  private _total: number;

  constructor() {
    this._products = [];
    this._total = 0;
    this._text = undefined;
    this._sort = 'variants.attributes.rating desc';
    this._filter = [];
    this._breadcrumbs = [];
    this._page = 1;
    makeAutoObservable(this);
  }

  setProducts(products: ProductProjection[]) {
    this._products = products;
  }

  get products() {
    return this._products;
  }

  setTotal(total: number) {
    this._total = total;
  }

  get total() {
    return this._total;
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

  setBreadcrumbs(value: Breadcrumb[]) {
    this._breadcrumbs = value;
  }

  pushCrumb(value: Breadcrumb) {
    this._breadcrumbs.push(value);
  }

  popCrumb(value: Breadcrumb) {
    this._breadcrumbs = this._breadcrumbs.filter((item) => item.name !== value.name);
  }

  clearBreadcrumbs() {
    this._breadcrumbs.map((item) => {
      item.target.checked = false;
      item.handler(item.target);
      return item;
    });
    this._breadcrumbs = [];
  }

  get page() {
    return this._page;
  }

  setPage(value: number) {
    this._page = value;
  }
}

export default new Store();
