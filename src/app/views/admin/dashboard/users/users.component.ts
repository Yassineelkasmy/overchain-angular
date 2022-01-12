import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private adminService: AdminService) {
    this.getUsers()
   }

  ngOnInit(): void {
  }
  users? : User[];

  getUsers() {
    this.adminService.getUsers().subscribe(
      (users) => this.users = users
    )
  }

}
