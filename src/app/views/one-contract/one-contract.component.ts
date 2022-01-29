import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-contract',
  templateUrl: './one-contract.component.html',
  styleUrls: ['./one-contract.component.scss']
})
export class OneContractComponent implements OnInit {


  public baseContractAddress !:any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      console.log(params.get('address'));

      let contractAddress = params.get('address');
      this.getContract(contractAddress)
      });

  }

  getContract(contractAddress){
    console.log(contractAddress)
  }

}
