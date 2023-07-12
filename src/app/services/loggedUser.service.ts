import { Injectable } from "@angular/core";

const USER_ID_KEY = 'userId';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  constructor() { }

  public setUserId(value: string) {
    localStorage.setItem(USER_ID_KEY, value);
  }

  public getUserId() {
    return localStorage.getItem(USER_ID_KEY)
  }

  public removeUserId() {
    localStorage.removeItem(USER_ID_KEY);
  }

  public clearData() {
    localStorage.clear();
  }
}