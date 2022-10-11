import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Data } from '../Data'


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private apiUrl = 'http://localhost:5000/api/data/songs'
  constructor(private domSanitizer: DomSanitizer, private http: HttpClient) { }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl)
  }
}
