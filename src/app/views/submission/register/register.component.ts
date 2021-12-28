import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepsComponent } from '../steps/steps.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() {
    this.signUpForm  = new FormGroup({
    "email" : new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      "passwordConfirmation": new FormControl(null,
        [
          Validators.required,
        ])
    });

  }
  signUpForm : FormGroup;

  ngOnInit(): void {
  }

  submit(feed: boolean) {
      this.onSubmit.emit(feed);
  }


  @Output() onSubmit = new EventEmitter<boolean>(false);

  isLogin: boolean = false;

  signUp(){
    console.log(this.signUpForm.value);
  }

}
