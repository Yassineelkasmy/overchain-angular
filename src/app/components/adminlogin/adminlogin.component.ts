import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  constructor() {

    this.loginForm = new FormGroup(
      {
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      }
    );

  }

  ngOnInit(): void {
  }

  loginForm : FormGroup;

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

}
