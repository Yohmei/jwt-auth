import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  url(route: string) {
    return 'http://localhost:3001/api' + route;
  }

  add_new_user(user: string) {
    this.http.post(this.url('/sign-up'), user).subscribe(console.log);
  }

  login(user: string) {
    this.http.post(this.url('/sign-in'), user).subscribe(console.log);
  }
}
