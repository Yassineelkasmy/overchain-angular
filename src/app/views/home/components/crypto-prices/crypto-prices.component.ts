import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stats } from 'fs';
import { StatsService } from 'src/app/services/stats.service';


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

  coins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price','Price Change','Market cap' , '24H Volume'];

  constructor(public statsService : StatsService) {}

  ngOnInit() {
      this.statsService.getEthPrice().subscribe(
        {
          next : (resp) =>{
                  console.log(resp)
                  resp.forEach( (resp:Coin) => {
                      this.coins.push(resp)
                    }
                  );
                },
          error : (e) => { console.log(e)}
        }
      )
  }



}
