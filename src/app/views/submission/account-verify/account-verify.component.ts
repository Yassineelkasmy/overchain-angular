import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss']
})
export class AccountVerifyComponent implements OnInit {

  constructor() {
    this.verifyForm = new FormGroup({
      "firstName": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "lastName": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "phone": new FormControl(null, [Validators.minLength(10) ,Validators.maxLength(20), Validators.required]),
      "address": new FormControl(null, [Validators.minLength(10) ,Validators.maxLength(100), Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  verifyForm: FormGroup;
  isLoading:boolean = false;


  get firstName() {
    return this.verifyForm.get("firstName");
  }

  get lastName() {
    return this.verifyForm.get("lastName");
  }

  get address() {
    return this.verifyForm.get("address");
  }

  get phone() {
    return this.verifyForm.get("phone");
  }




}
