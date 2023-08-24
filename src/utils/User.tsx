import { makeAutoObservable } from 'mobx';

class User {
  private _isAuth: boolean;

  private _isEntered: boolean;

  constructor() {
    this._isAuth = false;
    this._isEntered = false;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  get isAuth() {
    return this._isAuth;
  }

  setIsEntered(bool: boolean) {
    this._isEntered = bool;
  }

  get isEntered() {
    return this._isEntered;
  }
}

export default new User();
