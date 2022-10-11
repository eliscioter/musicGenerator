import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { UserService } from '../services/user.service'


import { Song } from '../Songs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiurl = 'http://localhost:5000/api/data'

  constructor(private http: HttpClient, private userService: UserService) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiurl}/songs`)
  }

  getSong(item: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiurl}/song/${item}`)
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.apiurl}/store`, song, httpOptions)
  }

  deleteSong(song: Song): Observable<Song> {
    const url = `${this.apiurl}/remove/${song._id}`
    return this.http.delete<Song>(url)
  }

  updateSong(song:Song, item: string): Observable<Song> {
    return this.http.patch<Song>(`${this.apiurl}/update/${item}`, song)
  }

}
