import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {tokenNotExpired} from "angular2-jwt";
import {Router} from "@angular/router";


@Injectable()
export class AuthService {
  token: string;
  user: object;


  constructor(private http: Http, private router: Router) {
  }

  registerUser(user: any) {
    const url = 'users/register';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, user, {headers: headers})
      .map(res => res.json());

  }

  loginUser(user: any) {
    const url = 'users/authenticate';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, user, {headers: headers})
      .map((res) => {
        const result = res.json();
        if (result.success) {
          this.token = result.token;
          this.user = result.user;
          this.storeUserData(this.user, this.token);
        }
        return result.success;
      });
  }

  storeUserData(user, token) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  checkLogIn() {
    return tokenNotExpired('id_token');
  }

  getToken() {
    if (this.checkLogIn()) {
      return localStorage.getItem('id_token');
    } else {
      this.router.navigate(['login']);
    }
  }
}
