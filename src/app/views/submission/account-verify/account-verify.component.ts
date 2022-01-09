import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserRquest } from 'src/app/dto/register-user.request';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RegistrationService } from 'src/app/services/registration.service';


@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss']
})
export class AccountVerifyComponent implements OnInit {

  constructor(
    private authService:AuthService,
    public accountService: AccountService,
    private afAuth: AngularFireAuth, 
    private uploadService: FileUploadService,
    public registrationService : RegistrationService,
   
    
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
   
    
  }

  get canSubmit() : boolean {

    return this.verifyForm.valid && 
    this.uploadService.minAccountVerificationFiles == this.uploadService.accountVerificationFilesCount;
  }


  register() {
    let registerRquest : RegisterUserRquest = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      address: this.address?.value,
      phone:this.phone?.value
    } 
    this.registrationService.registerNewUser(registerRquest).subscribe(
      (user) => this.accountService.setCurrentUser(user)
    )  }



  

}
