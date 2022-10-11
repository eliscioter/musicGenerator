import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';

import { UserService } from 'src/app/services/user.service';
import { SongService } from '../../services/song.service';
import { Song } from '../../Songs';

@Component({
  selector: 'app-modify-delete-song',
  templateUrl: './modify-delete-song.component.html',
  styleUrls: ['./modify-delete-song.component.css'],
})
export class ModifyDeleteSongComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  songs: Song[] = [];

  constructor(
    private songService: SongService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.songService.getSongs().subscribe(
      (song) => {
        this.songs = song;
      }
    );
  }

  onDelete(item: Song) {
    this.songService
      .deleteSong(item)
      .subscribe(
        () => (this.songs = this.songs.filter((song) => song._id !== song._id))
      );
    location.reload();
  }
}
