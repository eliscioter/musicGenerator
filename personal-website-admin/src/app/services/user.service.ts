import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { User } from '../User'
import { Token } from '../Token';
import { AuthInterceptor } from '../interceptor/auth.interceptor';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  router: any;

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5001/api/auth'
  
  auth(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user, httpOptions).pipe(map(res => {
        const { accessToken, refreshToken } = res
        const t = JSON.stringify(accessToken)
        const r = JSON.stringify(refreshToken)
        localStorage.setItem('access_token', t)
        localStorage.setItem('refresh_token', r)
        return res
    }))
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  
  userLogout(token: any) {
    token = JSON.parse(token)
    const httpOptions1 = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        token: token

      }),
    }
    localStorage.clear()

    return this.http.delete(`${this.apiUrl}/logout`, httpOptions1)
    
  }
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  authStatus() {
    return true
  }
}
