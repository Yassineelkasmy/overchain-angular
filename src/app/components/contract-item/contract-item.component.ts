import { Component, Input, OnInit } from '@angular/core';
import { VerifyContractRequest } from 'src/app/dto/verify-contract.request';
import { Contract } from 'src/app/models/Contract';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.scss']
})
export class ContractItemComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
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


}
