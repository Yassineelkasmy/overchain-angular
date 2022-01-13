import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/models/Contract';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
    this.getContracts();
  }

  contracts?: Contract[];

  getContracts() {
    this.adminService.getContracts().subscribe(
      (contracts) => this.contracts = contracts
    )
  }

}
