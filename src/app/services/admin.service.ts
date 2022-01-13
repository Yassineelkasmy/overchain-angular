import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VerifyUserRequest } from '../dto/verify-user.request';
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

  getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.basePath + "/users");
  }

  getProperties() : Observable<Property[]> {
    return this.httpClient.get<Property[]>(this.basePath + "/properties");
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


}
