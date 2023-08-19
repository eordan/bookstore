import { makeAutoObservable } from 'mobx';

class User {
  private _isAuth: boolean;

  constructor() {
    this._isAuth = false;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  get isAuth() {
    return this._isAuth;
  }
}

export default new User();
