import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.scss']
})
export class RegisterPropertyComponent implements OnInit {

  constructor(private uploadService:FileUploadService) {
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

  registerProperty() {

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

}

interface OptionalUpload {
  label:string,
  folder:string,
}
