import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { UserService } from '../services/user.service'
import { Token } from '../Token'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private http: HttpClient) {}

  intercept(request: HttpRequest<Token>, next: HttpHandler): Observable<HttpEvent<Token>> {
  
    const token = this.userService.getToken();
    console.log(token)
    request = request.clone({
      setHeaders: {
        authorization: `${token}`,
      }
    })
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          const refreshToken = this.userService.getRefreshToken()

          return this.http.post<HttpEvent<Token>>('http://localhost:5001/api/auth/token', {token: refreshToken}, {withCredentials: true}).pipe(
            switchMap(response => {
              const convert = JSON.stringify(response)
              return next.handle(request.clone({
                setHeaders: {
                  authorization: `${convert}`,
                }
              }))
            })
          )
        }
        return throwError(() => err)
      })
    );
  }
}
