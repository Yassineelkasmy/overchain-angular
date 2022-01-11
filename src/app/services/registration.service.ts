import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterPropertyRequest } from '../dto/register-porperty.request';
import { RegisterUserRquest } from '../dto/register-user.request';
import { SubmitContractRequest } from '../dto/submit-contract.request';
import { SmartContractType } from '../enums/SmartContractType';
import { Contract } from '../models/Contract';
import { Property } from '../models/Property';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
    
  }

  baseEndpoint = environment.apis.usersSerice + "/users";
  propertiesEndPoint = this.baseEndpoint + "/properties";
  contractsEndPoint = this.baseEndpoint + "/contracts";
  submittedProperty?: Property
  selectedProperty?: Property;
  getUser() : Observable<User> {
    return this.httpClient.get<User>(this.baseEndpoint);
  }

  registerNewUser(request: RegisterUserRquest): Observable<User> {
    
    return this.httpClient.post<User>(this.baseEndpoint,request);

  }

  registerNewProperty(request: RegisterPropertyRequest) : Observable<Property> {

    return this.httpClient.post<Property>(this.propertiesEndPoint, request);
  }

  getUserProperties() : Observable<Property[]> {
    return this.httpClient.get<Property[]>(this.propertiesEndPoint)
  }

  submitConrtact(request: SubmitContractRequest, type:SmartContractType) : Observable<Contract> {
    switch (type) {
      case SmartContractType.Basic:
        return this.httpClient.post<Contract>(this.contractsEndPoint+"/createbasic",request);
        
      case SmartContractType.WhiteListed:
        return this.httpClient.post<Contract>(this.contractsEndPoint+"/createwhitelisted",request);
      
      case SmartContractType.BlackListed:
        return this.httpClient.post<Contract>(this.contractsEndPoint+"/createblacklisted",request);
      
    }
  }




  
}
