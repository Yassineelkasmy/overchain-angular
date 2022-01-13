import { Component, Input, OnInit } from '@angular/core';
import { VerifyUserRequest } from 'src/app/dto/verify-user.request';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  constructor(public adminService: AdminService ) {

  }

  ngOnInit(): void {
    this.user = this.userInput;
    console.log(this.user?.verified)
  }

  userFolderUrl?: string;

  @Input() userInput?:User;
  user?:User;

  verifyUser() {
    let verifyRequest : VerifyUserRequest = {
      userId: this.user?.uid!,
    }
    this.adminService.verifyUser(verifyRequest).subscribe(
      (user) => {
        this.user = user
        console.log(this.user?.verified)
      }
    )
  }







}
