import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRquest } from '../components/dto/register.request';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
    
  }






  getUser() {
    return this.httpClient.get(environment.apis.usersSerice);
  }

  registerNewUser(request: RegisterRquest): Observable<Object> {
    
    return this.httpClient.post(environment.apis.usersSerice,request);
    
  }


  
}
