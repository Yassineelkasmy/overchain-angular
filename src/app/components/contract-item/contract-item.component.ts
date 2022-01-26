import { Component, Input, OnInit } from '@angular/core';
import { VerifyContractRequest } from 'src/app/dto/verify-contract.request';
import { SmartContractType } from 'src/app/enums/SmartContractType';
import { Contract } from 'src/app/models/Contract';
import { AdminService } from 'src/app/services/admin.service';
import { AdminContractService } from 'src/app/services/Admin-Contract-service/Admin-contract.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.scss']
})
export class ContractItemComponent implements OnInit {

  ethConvertedValue? : any;
  convertedEthValue? : any;

  constructor(
    public adminService: AdminService,
    public adminContractService : AdminContractService,
    public statsService : StatsService
    ) { }

  ngOnInit(): void {
    this.statsService.getEthPrice().subscribe(
      {
        next : (resp) => {console.log(resp['1'].current_price); this.ethConvertedValue = resp['1'].current_price ; }
      }
    )
  }

  @Input() contract?: Contract;

  verifyContract() {
    let verifyContractRequest : VerifyContractRequest = {
      contractId: this.contract?.id!,
    }
    this.adminService.verifyContract(verifyContractRequest).subscribe(
      (contract) => this.contract = contract
    )
    console.log(this.contract)

  }

  deployContract(contract : Contract){

        console.log(contract.type);
        console.log(contract)

        this.convertUsePrice(contract.priceETH)

        console.log(this.convertedEthValue)
        console.log(contract.sellerWallet)
        console.log(contract.propertyId);


        this.adminContractService.deployBaseContract(contract.sellerWallet, this.convertedEthValue, contract.propertyId);




    // if(contract.type === SmartContractType.Basic){
    //   console.log(contract.type);
    //     console.log(contract)

    //     this.convertUsePrice(contract.priceETH)

    //     console.log(this.convertedEthValue)
    //     console.log(contract.sellerWallet)
    //     console.log(contract.propertyId);


    //     this.adminContractService.deployBaseContract(contract.sellerWallet,this.convertedEthValue,contract.propertyId)
    // }
    // if(contract.type === SmartContractType.BlackListed){
    //   console.log(contract.type);
    //   console.log(contract)
    //   this.convertUsePrice(contract.priceETH)
    //   console.log(this.convertedEthValue)
    // }
    // if((contract.type === SmartContractType.WhiteListed)){
    //   console.log(contract.type);
    //   console.log(contract)

    //   this.convertUsePrice(contract.priceETH)

    //   console.log(this.convertedEthValue)
    // }
  }

  convertUsePrice(ethPrice : number){
    this.convertedEthValue = ethPrice / this.ethConvertedValue
  }

}
