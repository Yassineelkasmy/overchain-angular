import { Component, OnInit } from '@angular/core';
import { AboutUs } from 'src/app/models/AboutUs';
import { Feature } from '../../models/Feature';

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
      'All transactions can be done online through smart contract on the ethereum block chain',
    ),

    new Feature(
      'secure.png',
      'Secure',
      'All transactions can be done securely and anonymously',
    ),
    new Feature(
      'wallet.png',
      'Wallet',
      'Connect your own wallet to buy or sell a property',
    ),
  ];

  aboutUs: AboutUs[] = [
    new AboutUs(
      'platform.png',
      'We`v built a platform to buy & sell properties',
      'Overchain makes real estate investing accessible and affordable for individuals and families. Our real estate investment platform enables people to directly invest in attractive investment properties.',
      true,
    ),
    new AboutUs(
      'ether.png',
      'We`v built a platform to buy & sell shares',
      'Being the second-largest Cryptocurrency makes Ethereum a great currency option for purchasing a property. ... We, therefore, have property buyers and sellers that are open to payment in Crypto.',
      false,
    ),
    new AboutUs(
      'deep.png',
      'Connect your wallet and invest With Confidence',
      'All properties on our platform are listed with all the important informations about the seller and the property it self to give investors the full trust.',
      true,
    ),
    new AboutUs(
      'etheer.png',
      'why using ethereum blockchain ?',
      'Ethereum provides a platform for creating and building smart contracts and distributed applications. A smart contract allows users to exchange just about anything of value: shares, money, real estate, and so on.',
      false,
    ),




  ]

}
