import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  features:Feature[] = [
    new Feature(
      'contract.png',
      'Contract',
      'All transactions can be done online through smart contract on the block chain',
    ),

    new Feature(
      'secure.png',
      'Secure',
      'All transactions can be done online through smart contract on the block chain',
    ),
    new Feature(
      'wallet.png',
      'Wallet',
      'All transactions can be done online through smart contract on the block chain',
    ),
  ]
}


class Feature {
  constructor(public readonly image:string,
    public readonly title:string,
    public readonly text:string,

    ){}
}
