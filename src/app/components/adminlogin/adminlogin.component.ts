import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  constructor(
    public accountService: AccountService,
    public authService: AuthService,
  ) {

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


  get canSubmit() : boolean {
    return this.loginForm.valid;
  }

  login() {
    this.authService.SignIn(
      this.username?.value,
      this.password?.value
    );
  }

}
