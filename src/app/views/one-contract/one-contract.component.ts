import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmartContractType } from 'src/app/enums/SmartContractType';
import { BaseContract } from 'src/app/models/Contracts/BaseContract';
import { BlackListContract } from 'src/app/models/Contracts/BlackListContract';
import { WhiteListContract } from 'src/app/models/Contracts/WhiteListContract';
import { BaseContractService } from 'src/app/services/contracts-actions/base-contract.service';
import { BlackListContractService } from 'src/app/services/contracts-actions/black-list-contract.service';
import { WhiteListContractService } from 'src/app/services/contracts-actions/white-list-contract.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-one-contract',
  templateUrl: './one-contract.component.html',
  styleUrls: ['./one-contract.component.scss']
})
export class OneContractComponent implements OnInit {

    baseContract  !: BaseContract;
    whiteListContract  !: WhiteListContract;
    blackListContract  !: BlackListContract;


    contractAddress;
    contractType;

    ethConvertedValue? : any;

    convertedEthValue? : any;

  constructor(
    private route: ActivatedRoute,
    private baseContractService : BaseContractService,
    private whiteListContractService : WhiteListContractService,
    private blackListContractService : BlackListContractService,
    private statsService : StatsService
  ) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      this.contractAddress = params.get('address');
      this.contractType = params.get('type');
      this.getContract(this.contractType,this.contractAddress)
      });


      this.statsService.getEthPrice().subscribe(
        {
          next : (resp) => {console.log(resp['1'].current_price); this.ethConvertedValue = resp['1'].current_price ; }
        }
      )
  }

  getContract(type,contractAddress){

    switch(type) {
      case 'BASIC': {
          console.log(type);
          this.baseContractService.getContractInfo(contractAddress).then(
            (_baseContr)=> {
              this.baseContract = _baseContr
              this.baseContract.type= SmartContractType.Basic;
              console.log(this.baseContract);

            }
          );

         break;
      }
      case 'WHITELISTED' :{
        console.log(type);
          this.whiteListContractService.getContractInfo(contractAddress).then(
            (_whiteListContract)=> {
              console.log(_whiteListContract)
              this.baseContract = _whiteListContract;
              this.baseContract.type= SmartContractType.WhiteListed;
            }
          );
         break;
      }
      case 'BLACKLISTED' :{
        console.log(type);
        this.blackListContractService.getContractInfo(contractAddress).then(
          (_blackListContract)=> {
            console.log(_blackListContract)
            this.baseContract = _blackListContract
            this.baseContract.type= SmartContractType.BlackListed;
          }
        );
       break;
      }

   }

  }

  buyProperty() {

    switch(this.contractType) {
      case 'BASIC': {
          console.log(this.contractType);
          this.baseContractService.buyBaseContract(this.contractAddress).then( ()=> this.getContract )
         break;
      }
      case 'WHITELISTED' :{
        console.log(this.contractType);
        this.whiteListContractService.buyWhiteListContract(this.contractAddress);
         break;
      }
      case 'BLACKLISTED' :{
        console.log(this.contractType);
        this.blackListContractService.buyBlackListContract(this.contractAddress);
       break;
      }

   }
  }

  changePropertyPrice(newPrice : any) {

    newPrice = newPrice / this.ethConvertedValue

    switch(this.contractType) {
      case 'BASIC': {
          console.log(this.contractType);
          this.baseContractService.changeBasePropertyPrice(this.contractAddress,newPrice).then( ()=> this.getContract )

          break;
        }

        case 'WHITELISTED' :{
          console.log(this.contractType);
          this.whiteListContractService.changeWhiteListPropertyPrice(this.contractAddress,newPrice);

         break;
      }

      case 'BLACKLISTED' :{
        console.log(this.contractType);
        this.blackListContractService.changeBlackListPropertyPrice(this.contractAddress,newPrice);

       break;
      }

   }

  }

  reSaleBaseProperty(reSalePropertyPrice : any){
    reSalePropertyPrice = reSalePropertyPrice / this.ethConvertedValue ;

    switch(this.contractType) {
      case 'BASIC': {
          console.log(this.contractType);
          this.baseContractService.reSaleBaseProperty(this.contractAddress,reSalePropertyPrice).then( ()=> this.getContract )

          break;
        }

        case 'WHITELISTED' :{
          console.log(this.contractType);

          console.log(this.addressesList);

          this.whiteListContractService.reSaleWhiteListProperty(this.contractAddress,reSalePropertyPrice,this.addressesList);

          break;
        }

        case 'BLACKLISTED' :{
          console.log(this.contractType);

          console.log(this.addressesList);
          this.blackListContractService.reSaleBlackListProperty(this.contractAddress,reSalePropertyPrice,this.addressesList);

       break;
      }

   }
  }


  // PAUSE / UNPAUSE PROPERTY :


  pauseContract(){

    switch(this.contractType) {
      case 'BASIC': {
          console.log(this.contractType);
          this.baseContractService.pauseBaseContract(this.contractAddress).then( ()=> this.getContract )

          break;
        }

        case 'WHITELISTED' :{
          console.log(this.contractType);
          this.whiteListContractService.pauseWhiteListContract(this.contractAddress);

         break;
      }

      case 'BLACKLISTED' :{
        console.log(this.contractType);
          this.blackListContractService.pauseBlackListContract(this.contractAddress);

       break;
      }

   }
  }

  unPauseContract(){

    switch(this.contractType) {
      case 'BASIC': {
          console.log(this.contractType);
          this.baseContractService.unPauseBaseContract(this.contractAddress).then( ()=> this.getContract );

          break;
        }

        case 'WHITELISTED' :{
          console.log(this.contractType);
          this.whiteListContractService.unPauseWhiteListContract(this.contractAddress);

         break;
      }

      case 'BLACKLISTED' :{
        console.log(this.contractType);
          this.blackListContractService.unPauseBlackListContract(this.contractAddress);

       break;
      }

   }
  }


  inActiveContract(){

    switch(this.contractType) {
      case 'BASIC': {
          console.log(this.contractType);
          this.baseContractService.inActiveBaseContract(this.contractAddress).then( ()=> this.getContract )

          break;
        }

        case 'WHITELISTED' :{
          console.log(this.contractType);
          this.whiteListContractService.inActiveWhiteListContract(this.contractAddress);

         break;
      }

      case 'BLACKLISTED' :{
        console.log(this.contractType);
          this.blackListContractService.inActiveBlackListContract(this.contractAddress);

       break;
      }

   }
  }


  addressVerified !: boolean;
  addressAdded !: boolean;
  addressRemoved !: boolean;
  // START WHITE LIST CONTRACT
  async verifyAddressWhiteList(walletAddress:string){

    await this.whiteListContractService.verifyWhiteAddress(this.contractAddress,walletAddress).then(
      (res)=> this.addressVerified=res
    )
  }

  async addAddressToWhiteList(walletAddress : string){
    await this.whiteListContractService.addAddressToWhiteList(this.contractAddress,walletAddress).then(
      (res) => this.addressAdded = res
    )
  }

  async removeAddressFromWhiteList(walletAddress : string){
    await this.whiteListContractService.removeAddressFromWhiteList(this.contractAddress,walletAddress).then(
      (res) => this.addressRemoved = res
    )
  }

  // END WHITE LIST CONTRACT

  // START BLACK LIST CONTRACT
  async verifyAddressBlackList(walletAddress:string){

    await this.blackListContractService.verifyBlackAddress(this.contractAddress,walletAddress).then(
      (res)=> this.addressVerified=res
    )
  }

  async addAddressToBlackList(walletAddress : string){
    console.log(walletAddress);
     await this.blackListContractService.addAddressToBlackList(this.contractAddress,walletAddress).then(
      (res) => this.addressAdded = res
    )
  }

  async removeAddressFromBlackList(walletAddress : string){
    console.log(walletAddress);
     await this.blackListContractService.removeAddressFromBlackList(this.contractAddress,walletAddress).then(
      (res) => this.addressRemoved = res
    )
  }


  // END BLACK LIST CONTRACT






    convertUsePrice(newPrice){
      this.convertedEthValue = newPrice / this.ethConvertedValue
  }

  addressesList: string [] = [];

  addWalletToList(addressWallet : string){

    console.log("addressa "+addressWallet);

    switch(this.contractType) {
      case 'WHITELISTED' :
        this.addressesList.push(addressWallet);
        console.log("white addresses");

        console.log(this.addressesList);
        break;
      case 'BLACKLISTED' :
        this.addressesList.push(addressWallet);
        console.log("black addresses");

        console.log(this.addressesList);
        break ;
    }



  }

  removeWalletFromList(walletAddr:string) {

    switch(this.contractType) {
      case 'WHITELISTED' :

        this.addressesList = this.addressesList.filter((addr)=> addr != walletAddr);
        break;
      case 'BLACKLISTED' :

        this.addressesList = this.addressesList.filter((addr)=> addr != walletAddr);
        break ;
    }

  }
}
