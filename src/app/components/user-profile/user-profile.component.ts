import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/models/AuthUser';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() currenUser?: User | null;
  @Input() currentAuthUser?: AuthUser | null;

}
