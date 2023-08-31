import { makeAutoObservable } from 'mobx';

class User {
  private _isAuth: boolean;

  private _isEntered: boolean;

  private _firstName: string;

  private _lastName: string;

  private _dateOfBirth: string;

  constructor() {
    this._isAuth = false;
    this._isEntered = false;
    this._firstName = '';
    this._lastName = '';
    this._dateOfBirth = '';
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

  setFirstName(name: string) {
    this._firstName = name;
  }

  get firstName() {
    return this._firstName;
  }

  setLastName(name: string) {
    this._lastName = name;
  }

  get lastName() {
    return this._lastName;
  }

  setDateOfBirth(date: string) {
    this._dateOfBirth = date;
  }

  get dateOfBirth() {
    return this._dateOfBirth;
  }
}

export default new User();
