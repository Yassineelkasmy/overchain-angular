import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'autoprefixer';
import { SubmitContractRequest } from 'src/app/dto/submit-contract.request';
import { SmartContractType } from 'src/app/enums/SmartContractType';
import { MetamaskService } from 'src/app/services/metamask.service';
import { RegistrationService } from 'src/app/services/registration.service';
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
    public registrationService: RegistrationService,
    public router : Router
    ) {
    this.contractForm = new FormGroup({
      "wallet": new FormControl(null, [Validators.minLength(10) ,Validators.maxLength(100), Validators.required]),
      "price": new FormControl(null,Validators.required),
      "listedWallet": new FormControl(null, Validators.required),
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

    this.metamaskService.connectAccount().then(
      ()=> this.wallet?.setValue(this.metamaskService.accounts[0])
    );

  }

  convertUsePrice(){
     this.convertedEthValue = this.price?.value / this.ethConvertedValue
  }

  changeSmartContractType() {
    this.smartContractType = this.type?.value;
    this.listedWallet?.reset();
  }

  removeWalletFromList(walletAddr:string) {
    if(this.smartContractType == SmartContractType.WhiteListed)
    this.whiteList = this.whiteList.filter((addr)=> addr != walletAddr);

    if(this.smartContractType == SmartContractType.BlackListed)
    this.blackList = this.blackList.filter((addr)=> addr != walletAddr);

    this.listedWallet?.reset();
  }

  addWalletToList(){
    const walletAddress = this.listedWallet?.value;
    if(this.smartContractType == SmartContractType.WhiteListed)
    this.whiteList.push(walletAddress);
    if(this.smartContractType == SmartContractType.BlackListed)
    this.blackList.push(walletAddress);
  }



  contractForm: FormGroup;
  isLoading:boolean = false;


  get wallet() {
    return this.contractForm.get("wallet");
  }

  get price() {
    return this.contractForm.get("price");
  }

  get type() {
    return this.contractForm.get("type");
  }

  get listedWallet() {
    return this.contractForm.get("listedWallet");
  }

  get canSubmit() : boolean | undefined {
    if(this.smartContractType == SmartContractType.Basic)
    return (this.wallet?.valid && this.price?.valid)
    if(this.smartContractType == SmartContractType.WhiteListed)
    return (this.wallet?.valid && this.price?.valid && this.whiteList.length>0)
    else return (this.wallet?.valid && this.price?.valid && this.blackList.length>0)
  }

  submitContract() {
    let submitContractRequest: SubmitContractRequest = {
      wallet: this.wallet?.value,
      price: this.price?.value,
      propertyCode: this.registrationService.selectedProperty?.code!,
      whiteListWallets: this.whiteList,
      blackListWallets: this.blackList,

    }

    this.registrationService.submitConrtact(submitContractRequest, this.smartContractType)
    .subscribe((data)=>{ console.log(data); this.router.navigate["/submission/registerproperty"]; alert("Contract under verification now ! It will be listed in the marketplace as soon as possible :) ")})
  }






}
