import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service'
import { Data } from '../../Data'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-current-song',
  templateUrl: './current-song.component.html',
  styleUrls: ['./current-song.component.css']
})
export class CurrentSongComponent implements OnInit {

  datas: Data[] = []
  title: string[] = []
  vid: SafeHtml = ''
  
  constructor(private dataService: DataService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => this.datas = data)
    this.dataService.getData().subscribe((data) => {
      let titleArr: string[] = []
      for (let i = 0; i < data.length; i++) {
        titleArr.push(data[i].snippet.title)
      }
      this.title = titleArr
    })
    this.dataService.getData().subscribe((vid) => {
      this.vid = this.domSanitizer.bypassSecurityTrustHtml(vid[0].player.embedHtml)
    })
  }
}
