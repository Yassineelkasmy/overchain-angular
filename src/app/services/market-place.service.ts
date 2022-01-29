import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeployedContracts } from '../dto/DeployedContracts';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceService {

  constructor(
    private http : HttpClient
  ) { }



  getDeployedContracts() : Observable<DeployedContracts[]>{


    return this.http.get<DeployedContracts[]>("http://localhost:3000/onSale/properties");
  }


}
