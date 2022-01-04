import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false';

   constructor(private http: HttpClient) {
  }

  getEthPrice () : Observable<any>{

    const response:any = this.http.get(this.api);
    return response;
  }

}






