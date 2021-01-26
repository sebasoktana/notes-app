import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  url = 'https://dev-55154279.okta.com/api/v1/authn';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    }
  }

  async loginOkta(user: User) {
    if (user.userName !== '' && user.password !== '') {

      //Okta
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      const body = {
        "username": user.userName,
        "password": user.password,
        "options": {
          "multiOptionalFactorEnroll": true,
          "warnBeforePasswordExpired": true
        }
      }

      let res;
      try {
        res = await this.http.post<any>(this.url, body, { headers }).toPromise();

        if (res.status == 'SUCCESS') {
          localStorage.setItem('token', res.sessionToken);
          localStorage.setItem('user', JSON.stringify(res._embedded.user.profile));
          this.loggedIn.next(true);
          this.router.navigate(['/home']);
          return res;
        } else {
          return res;
        }
      } catch {

        return res;

      }

    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}

export interface User {
  userName: string;
  password: string;
}
