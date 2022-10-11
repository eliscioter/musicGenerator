import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { SongService } from '../../services/song.service'
import { Song } from '../../Songs'

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  song!: Song

  _id!: string
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
  standardUrl?: string
  standardWidth?: number
  standardHeight?: number
  maxUrl?:  string
  maxWidth?: number 
  maxHeight?: number
  embedHtml!: string

  constructor(private songService: SongService, private route: ActivatedRoute, private _location: Location) {
    this._id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.songService.getSong(this._id).subscribe((song) => {
      this.song = song
      this.title = this.song.snippet.title
      this.defUrl = this.song.snippet.thumbnail.def.url
      this.defWidth = this.song.snippet.thumbnail.def.width
      this.defHeight = this.song.snippet.thumbnail.def.height
      this.mediumUrl = this.song.snippet.thumbnail.medium.url
      this.mediumWidth = this.song.snippet.thumbnail.medium.width
      this.mediumHeight = this.song.snippet.thumbnail.medium.height
      this.highUrl = this.song.snippet.thumbnail.high.url
      this.highWidth = this.song.snippet.thumbnail.high.width
      this.highHeight = this.song.snippet.thumbnail.high.height
      this.standardUrl = this.song.snippet.thumbnail.standard?.url 
      this.standardWidth = this.song.snippet.thumbnail?.standard?.width
      this.standardHeight = this.song.snippet.thumbnail?.standard?.height
      this.maxUrl = this.song.snippet.thumbnail?.maxres?.url
      this.maxWidth = this.song.snippet.thumbnail?.maxres?.width
      this.maxHeight = this.song.snippet.thumbnail?.maxres?.height
      this.embedHtml = this.song.player.embedHtml
    })

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
  

  onSongsUpdate(): void {

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
        this.songService.updateSong(newSong1, this._id).subscribe((res) => {
          alert("Data updated successfully")
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
                url: this.standardUrl!,
                width: this.standardWidth!,
                height: this.standardHeight!,
              },
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.updateSong(newSong2, this._id).subscribe((res) => {
          alert("Data updated successfully")
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
                url: this.maxUrl!,
                width: this.maxWidth!,
                height: this.maxHeight!,
              }
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.updateSong(newSong3, this._id).subscribe((res) => {
          alert("Data updated successfully")
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
                url: this.standardUrl!,
                width: this.standardWidth!,
                height: this.standardHeight!,
              },
              maxres: {
                url: this.maxUrl!,
                width: this.maxWidth!,
                height: this.maxHeight!,
              }
            }
          },
          player: {
            embedHtml: this.embedHtml
          }
        }
        this.songService.updateSong(newSong4, this._id).subscribe((res) => {
          alert("Data updated successfully")
        })
        break
      default: 
        alert("Unsucessfully updated data")
        break
    }

    this._location.back()
  }
}