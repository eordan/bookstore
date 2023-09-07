import { makeAutoObservable } from 'mobx';

class User {
  private _isAuth: boolean;

  private _isEntered: boolean;

  private _id: string;

  private _version: number;

  constructor() {
    this._isAuth = false;
    this._isEntered = false;
    this._id = '';
    this._version = 0;
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
}

export default new User();
