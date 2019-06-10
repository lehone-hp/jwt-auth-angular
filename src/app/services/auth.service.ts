import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {JwtTokenService} from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Make sure that whenever the loggedIn status change, we update this.authStatus
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
  authStatus = this.loggedIn.asObservable();

  private baseUrl = 'http://localhost/friiq-backend/public/api';

  constructor(private http: HttpClient,
              private tokenService: JwtTokenService) { }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  changeAuthStatus(newStatus: boolean) {
    this.loggedIn.next(newStatus);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }
}
