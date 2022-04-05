import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  get_user_observable = () => {
    return this.user;
  };

  set_user = (user: User | null) => {
    this.user.next(user);
  };

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
    const expires = localStorage.getItem('expires');

    if (expires) {
      const expiration = JSON.parse(expires);
      return moment(expiration);
    } else {
      return moment().subtract(1, 'days');
    }
  }

  is_token_expired() {
    return moment().isBefore(this.get_expiration());
  }

  visit_protected(set_user_name: Function) {
    this.http.get(this.url('/protected')).subscribe((res) => {
      const response = res as { user_name: string };
      set_user_name(response.user_name);
    });
  }

  register(user: string) {
    this.http.post(this.url('/sign-up'), user).subscribe((res) => {
      const response = res as { user: User; expires: string; token: string };
      this.set_user(response.user);
      this.set_local_storage(response);
    });
  }

  login(user: string) {
    this.http.post(this.url('/sign-in'), user).subscribe((res) => {
      const response = res as { user: User; expires: string; token: string };
      this.set_user(response.user);
      this.set_local_storage(response);
    });
  }

  logout() {
    this.set_user(null);
    localStorage.removeItem('Authorization');
    localStorage.removeItem('expires');
    this.router.navigate(['']);
  }
}
