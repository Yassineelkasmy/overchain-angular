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
  ];

  aboutUs: AboutUs[] = [
    new AboutUs(
      'platform.png',
      'We`v built a platform to buy & sell shares',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      true,
    ),
    new AboutUs(
      'ether.png',
      'We`v built a platform to buy & sell shares',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      false,
    ),
    new AboutUs(
      'deep.png',
      'We`v built a platform to buy & sell shares',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      true,
    ),
    new AboutUs(
      'etheer.png',
      'We`v built a platform to buy & sell shares',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      false,
    ),




  ]

}


class Feature {
  constructor(public readonly image:string,
    public readonly title:string,
    public readonly text:string,
    ){}
}

class AboutUs {
  constructor(public readonly image:string,
    public readonly title:string,
    public readonly text:string,
    public readonly reversed:boolean=false,
    ){}
}
