import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPropertyRequest } from 'src/app/dto/register-porperty.request';
import { OptionalUpload } from 'src/app/models/OptionalUpload';
import { Property } from 'src/app/models/Property';
import { AccountService } from 'src/app/services/account.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.scss']
})
export class RegisterPropertyComponent implements OnInit {

  constructor(
    private uploadService:FileUploadService,
    public registrationService: RegistrationService,
    public accountService: AccountService,
    private router: Router,
    ) {
    this.verifyForm = new FormGroup({
      "code": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "title": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "description": new FormControl(null, [Validators.minLength(20), Validators.maxLength(100), Validators.required]),
      "address": new FormControl(null, [Validators.minLength(10) ,Validators.maxLength(100), Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  maxOptionals = 7;
  totalOptionals: number = 0;
  optionals: OptionalUpload[] = [];

  verifyForm: FormGroup;
  isLoading:boolean = false;
  
  newPorperty:boolean = false;
  
  addOptional() {
    if(this.totalOptionals <= this.maxOptionals){
    this.totalOptionals++;
    this.uploadService.minPropertyVerificationFiles++;
    this.optionals.push({
      label:"Optional Document " + this.totalOptionals,
      folder:"optional"+ this.totalOptionals,
    })
  }
  }

  get canSubmit() : boolean {

    return this.verifyForm.valid && 
    this.uploadService.minPropertyVerificationFiles == this.uploadService.propertyVerificationFilesCount;
  }

  

  removeOptional() {
    this.totalOptionals--;
    this.uploadService.minPropertyVerificationFiles--;
    this.optionals.pop();
  }

  get code() {
    return this.verifyForm.get("code");
  }

  get title() {
    return this.verifyForm.get("title");
  }

  get description() {
    return this.verifyForm.get("description");
  }


  get address() {
    return this.verifyForm.get("address");
  }

  updatePropertyCode() {
    this.uploadService.propertyCode = this.code?.value;
  }

  selectProperty(property:Property) {
    this.registrationService.selectedProperty = property;
    this.router.navigate(["/submission/createcontract"]);
  }

  registerPorperty() {
    let registerPorpertyRequest : RegisterPropertyRequest = {
      code: this.code?.value,
      title: this.title?.value,
      address: this.address?.value,
      description: this.description?.value,
      optionals: this.optionals.length
    }
    this.registrationService.registerNewProperty(registerPorpertyRequest)
    .subscribe((property) => {
      this.registrationService.submittedProperty = property
      this.newPorperty = false;
    } )
  }



}

