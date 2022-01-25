import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VerifyContractRequest } from '../dto/verify-contract.request';
import { VerifyPropertyRequest } from '../dto/verify-property.request';
import { VerifyUserRequest } from '../dto/verify-user.request';
import { Contract } from '../models/Contract';
import { Property } from '../models/Property';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient:HttpClient
  ) {

   }

  basePath = environment.apis.usersSerice + "/admin";

  //Users
  getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.basePath + "/users");
  }

  downloadUserFolder(uid : string) {

    const filename = uid + ".zip";
    const userFolderUrl = this.basePath + "/userfolder/" + uid + ".zip";

    return this.httpClient.get(userFolderUrl, {responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    );
  }

  verifyUser(request: VerifyUserRequest) : Observable<User>{
    return this.httpClient.post<User>(this.basePath+"/verifyuser", request);
  }


  //Properties
  getProperties() : Observable<Property[]> {
    return this.httpClient.get<Property[]>(this.basePath + "/properties");
  }

  downloadPropertyFolder(code : string , uid:string) {
    let downloadPropertyFolderRequest  = {
      userId:uid
    }

    const filename = code + ".zip";
    const userFolderUrl = this.basePath + "/propertyfolder/" + code + ".zip";

    return this.httpClient.post(userFolderUrl, downloadPropertyFolderRequest,{responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
        downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    );
  }

  verifyProperty(request: VerifyPropertyRequest) : Observable<Property>{
    return this.httpClient.post<Property>(this.basePath+"/verifyproperty", request);
  }


  //Contracts
  getContracts() : Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.basePath + "/contracts");
  }

  verifyContract(request: VerifyContractRequest) : Observable<Contract> {
    return this.httpClient.post<Contract>(this.basePath + "/verifycontract" , request);
  }

  getContract(contractId:string) {
    return this.httpClient.get<Contract>(this.basePath + "/contracts/" + contractId);

  }

}
