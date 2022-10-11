import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../User'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username!: string
  password!: string

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    const user: User = {
      username: this.username,
      password: this.password
    }
    this.userService.auth(user).subscribe(res => {
      this.router.navigate(['/home']);
      alert("logged in successfully") 
    }, error => {
      console.log(error)
      alert("Invalid credentials")
    })

  }
}