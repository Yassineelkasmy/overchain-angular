import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';


@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss']
})
export class AccountVerifyComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private registrationService : RegistrationService,
    private router: Router,
    
    ) {
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


  changeAccount() {

    this.authService.SignOut();
    this.router.navigate(["/submission/register"]);
    
  }

  

}
