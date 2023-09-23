import { makeAutoObservable } from 'mobx';

class Basket {
  private _id: string;

  private _version: number;

  private _count: number;

  constructor() {
    this._id = '';
    this._version = 0;
    this._count = 0;
    makeAutoObservable(this);
  }

  setId(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  setVersion(version: number) {
    this._version = version;
  }

  get version() {
    return this._version;
  }

  setCount(count: number) {
    this._count = count;
  }

  get count() {
    return this._count;
  }
}

export default new Basket();
