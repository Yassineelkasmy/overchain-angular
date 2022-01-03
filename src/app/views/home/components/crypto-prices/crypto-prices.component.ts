import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



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


@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.scss'],

})


export class CryptoPricesComponent implements OnInit {

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price','Price Change','Market cap' , '24H Volume'];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    /*this.http.get<any>('https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js').subscribe(
      {
        next : (Response)=> {console.log(Response)},
        error : (e) => { console.log(e)}
      }
    );*/


    this.http.get<Coin[]>(this.api).subscribe(
      {
        next: (res) => {
        this.coins = res;
        },
      error : (err) => {console.error(err)}
    }
    );
  }



}
