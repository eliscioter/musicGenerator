import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Song } from '../../Songs'
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  title!: string 
  defUrl!: string
  defWidth!: number
  defHeight!: number 
  mediumUrl!: string 
  mediumWidth!: number 
  mediumHeight!: number 
  highUrl!: string 
  highWidth!: number 
  highHeight!: number
  standardUrl!: string
  standardWidth!: number
  standardHeight!: number
  maxUrl!:  string
  maxWidth!: number 
  maxHeight!: number
  embedHtml!: string


  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
  }

  onValidate() {
    if ((!this.standardUrl || !this.standardWidth || !this.standardHeight) && (!this.maxUrl || !this.maxWidth || !this.maxHeight)) {
      return 1
    } else if ((this.standardUrl || this.standardWidth || this.standardHeight) && (!this.maxUrl || !this.maxWidth || !this.maxHeight)) {
      return 2
    } else if ((!this.standardUrl || !this.standardWidth || !this.standardHeight) && (this.maxUrl || this.maxWidth || this.maxHeight)){
      return 3
    }else if ((this.standardUrl || this.standardWidth || this.standardHeight) && (this.maxUrl || this.maxWidth || this.maxHeight)) {
      return 4
    } else {
      return 0
    }
  }

  onSongsCreate() {
    switch (this.onValidate()) {
      case 1: 
        const newSong1: Song = {
          snippet: { 
            title: this.title,
            thumbnail: {
              def: {
                url: this.defUrl,
                width: this.defWidth,
                height: this.defHeight,
              },
              medium: {
                url:  this.mediumUrl,
                width: this.mediumWidth,
                height: this.mediumHeight,
              },
              high: {
                url:  this.highUrl,
                width: this.highWidth,
                height: this.highHeight,
              }
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.addSong(newSong1).subscribe((res) => {
          this.router.navigate(['/home']);
          alert("Data added successfully")
        })
        break
      case 2: 
        const newSong2: Song = {
          snippet: { 
            title: this.title,
            thumbnail: {
              def: {
                url: this.defUrl,
                width: this.defWidth,
                height: this.defHeight,
              },
              medium: {
                url:  this.mediumUrl,
                width: this.mediumWidth,
                height: this.mediumHeight,
              },
              high: {
                url:  this.highUrl,
                width: this.highWidth,
                height: this.highHeight,
              },
              standard: {
                url: this.standardUrl,
                width: this.standardWidth,
                height: this.standardHeight,
              },
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.addSong(newSong2).subscribe((res) => {
          this.router.navigate(['/home']);
          alert("Data added successfully")
        })
        break
      case 3: 
        const newSong3: Song = {
          snippet: { 
            title: this.title,
            thumbnail: {
              def: {
                url: this.defUrl,
                width: this.defWidth,
                height: this.defHeight,
              },
              medium: {
                url:  this.mediumUrl,
                width: this.mediumWidth,
                height: this.mediumHeight,
              },
              high: {
                url:  this.highUrl,
                width: this.highWidth,
                height: this.highHeight,
              },
              maxres: {
                url: this.maxUrl,
                width: this.maxWidth,
                height: this.maxHeight,
              }
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.addSong(newSong3).subscribe((res) => {
          this.router.navigate(['/home']);
          alert("Data added successfully")
        })
        break
      case 4: 
        const newSong4: Song = {
          snippet: { 
            title: this.title,
            thumbnail: {
              def: {
                url: this.defUrl,
                width: this.defWidth,
                height: this.defHeight,
              },
              medium: {
                url:  this.mediumUrl,
                width: this.mediumWidth,
                height: this.mediumHeight,
              },
              high: {
                url:  this.highUrl,
                width: this.highWidth,
                height: this.highHeight,
              },
              standard: {
                url: this.standardUrl,
                width: this.standardWidth,
                height: this.standardHeight,
              },
              maxres: {
                url: this.maxUrl,
                width: this.maxWidth,
                height: this.maxHeight,
              }
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.addSong(newSong4).subscribe((res) => {
          this.router.navigate(['/home']);
          alert("Data added successfully")
        })
        break
      default: 
        alert("Unsucessfully added data")
        this.router.navigate(['/home']);
        break
    }
  }
}
