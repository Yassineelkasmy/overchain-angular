import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRquest } from '../components/dto/register.request';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
    
  }






  getUser() : Observable<User> {
    return this.httpClient.get<User>(environment.apis.usersSerice);
  }

  registerNewUser(request: RegisterRquest): Observable<User> {
    
    return this.httpClient.post<User>(environment.apis.usersSerice,request);
    
  }


  
}
