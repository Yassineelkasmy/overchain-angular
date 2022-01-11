import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SmartContractType } from 'src/app/enums/SmartContractType';
import { MetamaskService } from 'src/app/services/metamask.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {


  ethConvertedValue? : any;

  convertedEthValue? : any;



  smartContractType : SmartContractType = SmartContractType.Basic;
  whiteList : string[] = [];
  blackList : string[] = [];

 


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
      "minPriceEth" : new FormControl(null),
      "listedWallet": new FormControl(null),
      "type" : new FormControl(0),
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
     this.convertedEthValue = this.priceETH?.value / this.ethConvertedValue
  }

  changeSmartContractType() {
    this.smartContractType = this.type?.value;
  }

  addWalletToList(){
    const walletAddress = this.listedWallet?.value;
    if(this.smartContractType == SmartContractType.WhiteListed)
    this.whiteList.push(walletAddress);
    if(this.smartContractType == SmartContractType.BlackListed)
    this.blackList.push(walletAddress);

    this.listedWallet?.reset();
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

  get type() {
    return this.contractForm.get("type");
  }

  get listedWallet() {
    return this.contractForm.get("listedWallet");
  }


 
   
  




}
