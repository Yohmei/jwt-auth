import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url(route: string) {
    return 'http://localhost:3001/api' + route;
  }

  set_local_storage(res: { expires: string; token: string }) {
    const { expires, token } = res;
    const expires_moment = moment().add(expires);
    localStorage.setItem('Authorization', token);
    localStorage.setItem('expires', JSON.stringify(expires_moment.valueOf()));
  }

  get_expiration() {
    const expires = localStorage.getItem('expires') || '';
    const expiration = JSON.parse(expires);
    return moment(expiration);
  }

  is_logged_in() {
    return moment().isBefore(this.get_expiration());
  }

  visit_protected() {
    this.http.get(this.url('/protected')).subscribe((res) => {
      console.log(res);
    });
  }

  register(user: string) {
    this.http.post(this.url('/sign-up'), user).subscribe((res) => {
      const response = res as { expires: string; token: string };
      console.log(res);
      this.set_local_storage(response);
    });
  }

  login(user: string) {
    this.http.post(this.url('/sign-in'), user).subscribe((res) => {
      const response = res as { expires: string; token: string };
      console.log(res);
      this.set_local_storage(response);
    });
  }

  logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('expires');
  }
}
