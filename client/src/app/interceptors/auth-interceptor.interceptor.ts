import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authorization = localStorage.getItem('Authorization');

    if (authorization) {
      const cloned_req = request.clone({
        headers: request.headers.set('Authorization', authorization),
      });

      return next.handle(cloned_req);
    }

    return next.handle(request);
  }
}
