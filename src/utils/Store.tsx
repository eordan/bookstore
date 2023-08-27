import { makeAutoObservable } from 'mobx';
import { ProductInterface } from './interfaces';

class Store {
  private _products: Array<ProductInterface>;

  constructor() {
    this._products = [
      {
        id: 1,
        img: '../assets/placeholder.jpg',
        title: 'Product 1',
        price: 100,
      },
      {
        id: 2,
        title: 'Product 2',
        img: '../assets/placeholder.jpg',
        price: 200,
        discount: {
          newPrice: 120,
        },
      },
      {
        id: 3,
        img: '../assets/placeholder.jpg',
        title: 'Product 3',
        price: 500,
      },
      {
        id: 4,
        title: 'Product 4',
        img: '../assets/placeholder.jpg',
        price: 300,
        discount: {
          newPrice: 150,
        },
      },
      {
        id: 5,
        img: '../assets/placeholder.jpg',
        title: 'Product 5',
        price: 100,
      },
      {
        id: 6,
        title: 'Product 6',
        img: '../assets/placeholder.jpg',
        price: 210,
        discount: {
          newPrice: 500,
        },
      },
    ];
    makeAutoObservable(this);
  }

  setProducts(products: Array<ProductInterface>) {
    this._products = products;
  }

  get products() {
    return this._products;
  }
}

export default new Store();
