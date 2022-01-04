import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetamaskService } from 'src/app/services/metamask.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {


 public ethConvertedValue  ?: any;

 public convertedEthValue  ?: any;

 public convertedMinEthValue  ?: any;



  constructor(
    public metamaskService : MetamaskService,
    public statsService : StatsService,

    ) {
    this.contractForm = new FormGroup({
      "code": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "title": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "description": new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      "wallet": new FormControl(null, [Validators.minLength(10) ,Validators.maxLength(100), Validators.required]),
      "priceETH": new FormControl(null,Validators.required),
      "minPriceEth" : new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.statsService.getEthPrice().subscribe(
      {
        next : (resp) => {console.log(resp['1'].current_price); this.ethConvertedValue = resp['1'].current_price ; }
      }
    )
  }

  connect(){

    this.metamaskService.connectAccount();

  }

  convertUsePrice(){
    console.log(this.priceETH?.value)
    console.log(this.ethConvertedValue)
     this.convertedEthValue = this.priceETH?.value / this.ethConvertedValue
    console.log(this.convertedEthValue)

  }

  convertMinUsePrice(){
    console.log(this.minPriceEth?.value)
    console.log(this.ethConvertedValue)
     this.convertedMinEthValue = this.minPriceEth?.value / this.ethConvertedValue
     console.log(this.convertedMinEthValue)
  }

  contractForm: FormGroup;
  isLoading:boolean = false;


  get wallet() {
    return this.contractForm.get("wallet");
  }

  get priceETH() {
    return this.contractForm.get("priceETH");
  }

  get minPriceEth() {
    return this.contractForm.get("minPriceEth");
  }

  get description() {
    return this.contractForm.get("description");
  }


  get address() {
    return this.contractForm.get("address");
  }

}
