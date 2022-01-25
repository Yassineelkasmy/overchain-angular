import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/models/Contract';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-contract-deploy',
  templateUrl: './contract-deploy.component.html',
  styleUrls: ['./contract-deploy.component.scss']
})
export class ContractDeployComponent implements OnInit {

  constructor(public admibService:AdminService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.contractId =this._Activatedroute.snapshot.paramMap.get("id")!;
    this.admibService.getContract(this.contractId).subscribe(
      (contract) => this.contract = contract
    );
  }

  contract?: Contract;
  contractId?:string;

}
