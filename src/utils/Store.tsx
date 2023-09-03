import { makeAutoObservable } from 'mobx';
import { ProductInterface } from './interfaces';

// Test image
import img from '../assets/placeholder.jpg';

class Store {
  private _products: Array<ProductInterface>;

  constructor() {
    // The array is filled with test data. Then all the books from the api will be loaded into it

    this._products = [
      {
        id: 1,
        img,
        title: 'Product 1',
        price: '100$',
        category: 'Fantasy',
        description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
      },
      {
        id: 2,
        title: 'Product 2',
        img,
        price: '200$',
        discount: {
          newPrice: '120$',
        },
        category: 'Love',
        description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
      },
      {
        id: 3,
        img,
        title: 'Product 3',
        price: '500$',
        category: 'Love',
        description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
      },
      {
        id: 4,
        title: 'Product 4',
        img,
        price: '300$',
        discount: {
          newPrice: '150$',
        },
        category: 'Fantasy',
        description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
      },
      {
        id: 5,
        img,
        title: 'Product 5',
        price: '100$',
        category: 'History',
        description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
      },
      {
        id: 6,
        title: 'Product 6',
        img,
        price: '210$',
        discount: {
          newPrice: '500$',
        },
        category: 'Love',
        description: 'ladkjewkfnekj dkfjn ejwbf edwhd hdvfwefbw lkwdn skfn kjfb jsbdj ld. HJdhvewhkd sbs bdhj s',
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
