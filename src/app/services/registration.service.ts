import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterPropertyRequest } from '../dto/register-porperty.request';
import { RegisterUserRquest } from '../dto/register-user.request';
import { Property } from '../models/Property';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
    
  }


  submittedProperty?: Property
  selectedProperty?: Property;
  getUser() : Observable<User> {
    return this.httpClient.get<User>(environment.apis.usersSerice);
  }

  registerNewUser(request: RegisterUserRquest): Observable<User> {
    
    return this.httpClient.post<User>(environment.apis.usersSerice,request);

  }

  registerNewProperty(request: RegisterPropertyRequest) : Observable<Property> {

    return this.httpClient.post<Property>(environment.apis.usersSerice + "/properties", request);
  }

  getUserProperties() : Observable<Property[]> {
    return this.httpClient.get<Property[]>(environment.apis.usersSerice + "/properties")
  }




  
}
