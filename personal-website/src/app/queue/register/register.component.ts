import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../User'
import {  UserService } from '../../services/user.service'
import { AddRole } from '../../AddRole'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  role!: string
  id!: string
  username!: string
  password!: string
  re_password!: string

  constructor(private router: Router, private route: ActivatedRoute, protected userService: UserService) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.role = 'CUSTOMER'
    if (this.userService.isLoggedIn()) {
      console.log('bar')
      this.username = this.userService.getName() as string
    }
  }

  private checkPassword() {
    const pass = this.password
    const re_pass = this.re_password

    return pass === re_pass ? true : false
  }

  protected onRegister() {
    console.log('hello')
    if(this.userService.isLoggedIn()) {
      console.log('foo')
      const role: AddRole = {
        role: 'BETA_TESTER'
      }
      this.userService.addRole(role, this.id).subscribe(res => {
        alert("You are now a beta tester")
      })
      return
    }
    if (this.checkPassword()) {
      console.log('hi')
      const form: User = {
        username: this.username,
        password: this.password,
        role: [this.role]
      }
      const user: User = {
        username: this.username,
        password: this.password
      }
      console.log(`${form.username}\n${form.password}\n${form.role}`)
      this.userService.register(form).subscribe( res => {
        this.userService.auth(user).subscribe(res => {
          this.router.navigate(['/'])
          alert(`Welcome ${user.username}`)
        }, error => {
          console.log(error)
          alert('Invalid')
        })
        
      })
    } else {
      alert('Password do not match')
    }
  }

}
