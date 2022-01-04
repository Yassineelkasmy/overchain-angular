import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stats } from 'fs';
import { StatsService } from 'src/app/services/stats.service';




@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.scss'],

})


export class CryptoPricesComponent implements OnInit {


  constructor(public statsService : StatsService) {}

  ngOnInit() {
    /*this.http.get<any>('https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js').subscribe(
      {
        next : (Response)=> {console.log(Response)},
        error : (e) => { console.log(e)}
      }
    )*/;
      this.statsService.getEthPrice().subscribe(
        {
          next : (resp) => console.log(resp['1'].current_price)
        }
      )
  }
}
