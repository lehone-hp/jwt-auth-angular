import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  private iss = {
    login: 'http://localhost/friiq-backend/public/api/login',
    signup: ''
  };

  constructor() { }

  handle(token) {
    // store token on local storage
    console.log(token);
    this.setToken(token);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getPayload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    // atob --> decoding of
    return JSON.parse(atob(payload));
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.getPayload(token);
      if (payload) {
        // if the index of the iss from this.iss is greate than -1, i.e. payload.iss is in this.iss
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  loggedIn() {
    return this.isValidToken();
  }
}
