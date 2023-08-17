import { Injectable } from '@angular/core';


import{
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse}

from'@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Interceptor implements HttpInterceptor {
  constructor(
  private router : Router
  ){}

  intercept( request: HttpRequest<any>, next: HttpHandler ):
  Observable<HttpEvent<any>> {
    // a session storage token nao estava definida na hora que era chamado o login.php ele só seta a session storage se o login.php der sucesso.
    if (!request.url.includes('/login.php')) {
      const token = sessionStorage.getItem('token');
        request = request.clone({
          setHeaders: {
            Authorization:`Bearer ${token}`
          }
        });
    }
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      this.router.navigate(['']);
    }
  }));

  }
}
