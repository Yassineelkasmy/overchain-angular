import { Component, Input, OnInit } from '@angular/core';
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
  }

  userFolderUrl?: string;

  @Input() user?:User;







}
