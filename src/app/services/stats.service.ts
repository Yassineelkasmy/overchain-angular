import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap:number;
  price_change_percentage_24h: number;
  total_volume: number;
}


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price','Price Change','Market cap' , '24H Volume'];

   constructor(private http: HttpClient) {
  }

  getEthPrice () : Observable<any>{

    const response:any = this.http.get(this.api);
    return response;
  }


  /*this.http.get<Coin[]>(this.api).subscribe(
    {
      next: (res) => {
      this.coins = res;
      },
    error : (err) => {console.error(err)}
  }
  );*/
}






