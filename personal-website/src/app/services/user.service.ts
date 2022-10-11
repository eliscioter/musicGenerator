import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../User'
import { Role } from '../Role';
import { AddRole } from '../AddRole';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:5002/api/user"

  register(user: User): Observable<User> {
    console.log(user)
    return this.http.post<User>(`${this.url}/store`, user, httpOptions)
  }

  addRole(user: AddRole, id: string): Observable<AddRole> {
    //TODO: After signing up as beta tester, the user still need to re-sign in to see the beta tester feature
    return this.http.patch<AddRole>(`${this.url}/update/${id}`, user)
  }

  auth(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, user, httpOptions).pipe(map(res => {
      const { id, accessToken, refreshToken } = res
  
      localStorage.setItem('id', JSON.stringify(id))
      const token = JSON.stringify(accessToken)
      const refresh_token = JSON.stringify(refreshToken)
      localStorage.setItem('access_token', token)
      localStorage.setItem('refresh_token', refresh_token)
      return res
    }))
  }

  getId() {
    return JSON.parse(localStorage.getItem('id') as string)
  }
  

  role = (user: string): Observable<Role[]> => {
    localStorage.setItem('name', user)
    return this.http.get<Role[]>(`${this.url}/role/${user}`).pipe(map(res => {
      const roles: Role[] = [];
      for(const role of res) {
        roles.push(role)
      }
      localStorage.setItem('role', JSON.stringify(roles))

      return res
    }))
  }

  

  getName() {
    return localStorage.getItem('name')
  }
  
  getRole() {
    return JSON.parse(localStorage.getItem('role') as string) 
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  userLogout(token: string): Observable<string> {
    token = JSON.parse(token)
    localStorage.clear()
    return this.http.delete<string>(`${this.url}/logout/${token}`)
  }
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
}
