import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForLogin } from '../models/user';
import { Tokens } from '../models/tokens';
import { KeyValueS } from '../models/key-value-s';

enum KEY {
  TOKEN = 'token',
  R_TOKEN = 'refreshToken'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(user: UserForLogin) {
    return this.http.post('https://localhost:7164/api/account/login', user);
  }

  forgetPassword(email: KeyValueS) {
    return this.http.post('https://localhost:7164/api/account/password/resend', email);
  }

  getToken() {
    return localStorage.getItem(KEY.TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(KEY.R_TOKEN);
  }

  saveTokens(token: string, refreshToken: string) {
    localStorage.setItem(KEY.TOKEN, token);
    localStorage.setItem(KEY.R_TOKEN, refreshToken);
  }

  saveToken(token: string) {
    localStorage.setItem(KEY.TOKEN, token);
  }

  getRole() {
    let token = localStorage.getItem(KEY.TOKEN);
    if (token == undefined || token === '') {
      return null;
    }
    console.log('TT : ' + token);
    let decodedJwt = JSON.parse(window.atob(token.split('.')[1]));
    return decodedJwt.role;
  }

  refreshToken() {
    let tokens = new Tokens();
    try{
      tokens.token = this.getToken()!;
      tokens.refreshToken = this.getRefreshToken()!;
    } catch (e) {
      console.log("User not logged in, the tokens are null");
      // TODO move to login page
    }
    console.log("tokens :" + tokens.token + " - " + tokens.refreshToken);
    return this.http.post('https://localhost:7164/api/account/refresh', tokens);
  }

  isLoggedIn() {
    const token = localStorage.getItem(KEY.TOKEN);
    const refreshToken = localStorage.getItem(KEY.R_TOKEN);
    return token != undefined && token != '' && refreshToken != undefined && refreshToken != '';
  }
}
