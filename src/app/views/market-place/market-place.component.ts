import { Component, OnInit } from '@angular/core';
import { DeployedContracts } from 'src/app/dto/DeployedContracts';
import { AdminService } from 'src/app/services/admin.service';
import { MarketPlaceService } from 'src/app/services/market-place.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  constructor(
    public marketPlaceService: MarketPlaceService,
    public adminService : AdminService,
    public statsService : StatsService
  ) { }

  public ethPrice !: number;

  public deployedContracts ?: DeployedContracts [];

  ngOnInit(): void {

    this.statsService.getEthPrice().subscribe(
      {
        next : (resp) => {console.log(resp['1'].current_price); this.ethPrice = resp['1'].current_price ; },
        error : (e)=>console.log(e)
      }
    )
    this.getDeployedContracts()
  }


  public getDeployedContracts() {
    this.adminService.getDeployedContracts().subscribe(
      {
        next : (contracts) => {
          contracts.forEach(contract => {
            let convertedPrice = (contract.price / this.ethPrice).toFixed(2);
            contract.priceToEth = Number(convertedPrice)
          });

          console.log(contracts);
          this.deployedContracts = contracts;
        },
        error: (e) => console.log(e)
      }
    )
  }

  // getDeployedContracts(){
  //   this.marketPlaceService.getDeployedContracts().subscribe(
  //     {
  //       next : (contracts) => {
  //         console.log(contracts);
  //         this.DeployedContract = contracts;
  //       },
  //       error: (e) => console.log(e)
  //     }
  //   );
  // }


}
