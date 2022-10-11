import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faMusic, faPlus } from '@fortawesome/free-solid-svg-icons'
import { UserService } from './services/user.service';
import { User } from './User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  faMusic = faMusic
  faPlus = faPlus
  token!: string

  title = 'personal-website-admin';
  constructor(protected userService: UserService, private router: Router) {}



  onLogout() {
    let user = this.userService.getRefreshToken()
    this.userService.userLogout(user).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
  
}
