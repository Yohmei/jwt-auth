import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  url(route: string) {
    return 'http://localhost:3001/api' + route;
  }

  test() {
    this.http.get(this.url('/test')).subscribe(console.log);
  }
}
