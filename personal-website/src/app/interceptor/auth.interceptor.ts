import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { UserService } from '../services/user.service';
import { Token } from '../Token'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private userService: UserService) {}

  intercept(request: HttpRequest<Token>, next: HttpHandler): Observable<HttpEvent<Token>> {
    
    const token = this.userService.getToken()
    request = request.clone({
      setHeaders: {
        authorization: `${token}`
      }
    })
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          const refresh_token = this.userService.getRefreshToken()
          return this.http.post<HttpEvent<Token>>('http://localhost:5002/api/user/token', {token: refresh_token}, {withCredentials: true}).pipe(
            switchMap(response => {
              const convert = JSON.stringify(response)
              return next.handle(request.clone({
                setHeaders: {
                  authorization: `${convert}`
                }
              }))
            })
          )
        }
        return throwError(() => err)
      })
    )
  }
}
