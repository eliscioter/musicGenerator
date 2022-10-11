import { Component, OnInit } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../../User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faCircleXmark = faCircleXmark
  role!: string
  username!: string
  password!: string


  constructor(private dialog: MatDialogRef<LoginComponent>, private userService: UserService) { }

  ngOnInit(): void {
    const role = this.role = 'CUSTOMER'
  }

  closeDialog() {
    this.dialog.close()
  }

  onLogin() {
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.userService.auth(user).subscribe(res => {
      this.userService.role(user.username).subscribe()
      this.closeDialog()
      alert('Logged in')
    }, error => {
      alert('Invalid')
    })
  }

}
