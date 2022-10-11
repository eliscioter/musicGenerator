import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';
import { Token } from './Token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'personal-website';
  user!: string

  constructor(private dialog: MatDialog, protected userService: UserService, private router: Router) {}

  openDialog() {
    this.dialog.open(LoginComponent)
  }

  verifyRole() {
    const roles = this.userService.getRole()

    if(!roles) return false
    
    const verified = roles.includes('BETA_TESTER')

    return verified
  }

  onLogout() {
    const user = this.userService.getRefreshToken() as string

    this.userService.userLogout(user).subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
