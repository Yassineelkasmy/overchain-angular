import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterRquest } from '../components/dto/register.request';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
    
  }


  registerNewUser(request: RegisterRquest) {
    this.httpClient.post(environment.apis.usersSerice,request).subscribe((data)=>console.log(data));
  }


  
}
