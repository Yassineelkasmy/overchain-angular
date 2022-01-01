import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.scss']
})
export class RegisterPropertyComponent implements OnInit {

  constructor() {
    this.verifyForm = new FormGroup({
      "code": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "title": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "description": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "address": new FormControl(null, [Validators.minLength(10) ,Validators.maxLength(100), Validators.required]),
    });
  }

  ngOnInit(): void {
  }

   // google maps zoom level



  verifyForm: FormGroup;
  isLoading:boolean = false;


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




}
