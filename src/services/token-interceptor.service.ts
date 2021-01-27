// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { AuthService } from './auth.service'
// import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenInterceptorService implements HttpInterceptor {

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService
//   ) { }

//   intercept(req, next): Observable<HttpEvent<any>> {
//     console.log('llego interceptor')

//     const tokenInterceptor = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.authService.getToken()}`
//       }
//     })

//     return next.handle(tokenInterceptor);
//   }

// }

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

    intercept(req, next): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token) {
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next.handle(clonedRequest);
        }

        return next.handle(req)
    }
}