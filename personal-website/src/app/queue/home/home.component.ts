import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role!: string
  id!: string

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userRole = this.role = 'BETA_TESTER';
    const id = this.userService.getId()
    if (!id) return 
    this.id = id
  }
  //TODO: After first sign up, signup for beta tester does not show. Figure it out!
  protected verifyRole() {
    const roles = this.userService.getRole()

    if(!roles) return false
    
    const verified = roles.includes('CUSTOMER') && !roles.includes('BETA_TESTER')

    return verified
  }

}
