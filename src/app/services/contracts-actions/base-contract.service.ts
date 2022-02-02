import { Injectable } from '@angular/core';

import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from "web3";
import Web3Modal from "web3modal";
import {BaseContractAbi } from '../../../contracts-files/Base-contract/BaseContract.js';
import { BaseContract } from 'src/app/models/Contracts/BaseContract';
import { SmartContractType } from 'src/app/enums/SmartContractType';

@Injectable({
  providedIn: 'root'
})
export class BaseContractService {


  provider: any;
  web3js : any;
  accounts : any;
  web3Modal: any;

  constructor(
  ){
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });

  }

  public owner !: string;
  public propertyOwner !: string;
  public propertyCode !: string;
  public price !: any;
  public paused  !: boolean;
  public activated !:boolean;
  public bought !:boolean;

  public async getContractInfo(_contractAddress : string) : Promise<BaseContract>{

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance

    let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);

    await contract.methods.owner().call().then(
      (resp: string) => this.owner = resp
    );

    await contract.methods.propertyOwner().call().then(
      (resp: string) => this.propertyOwner = resp
    );

    await contract.methods.propertyCode().call().then(
      (resp: string) => this.propertyCode = resp
    );

    await contract.methods.price().call().then(
      (resp: any) =>  {
        this.price =  Number (Web3.utils.fromWei(String(resp), 'ether')).toFixed(4);
      }
    );

    await  contract.methods.paused().call().then(
      (resp: boolean) => this.paused  = resp
    );

    await  contract.methods.activated().call().then(
      (resp: boolean) => this.activated= resp
    );

    await contract.methods.bought().call().then(
      (resp: boolean) => this.bought = resp
    );

      return new BaseContract(
        this.owner,
        this.propertyOwner,
        this.propertyCode,
        this.price,
        SmartContractType.Basic,
        this.bought,
        this.paused,
        this.activated
      );

  }


  async buyBaseContract(_contractAddress : string){
    this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

      let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);
      let price: any ;
      await contract.methods.price().call().then(
        (Resp) => price = Resp
        );

        console.log("price : "+ price)
        await contract.methods.buyProperty().send({
          from:this.accounts[0],
          value: price,
          gasPrice : 10000000000
        }).then(
          console.log
          );

        }


  async changeBasePropertyPrice(_contractAddress : String, _price : number):Promise<void>{
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);

    await contract.methods.changePrice(Web3.utils.toWei(String(_price),"ether")).send({from: this.accounts[0]}).then(
        (Resp)=>{
          console.log(Resp);
          // CHANGE PRICE IN DB
        }
      )
    }


    async reSaleBaseProperty(_contractAddress : string , _price : number):Promise<void>{
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

      let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);

      await contract.methods.reSale(Web3.utils.toWei(String(_price),"ether")).send(
        {
          from : this.accounts[0],
          gasPrice : 10000000000
        }
        ).then(
          console.log
      )
    }

    async pauseBaseContract(_contractAddress: string):Promise<void>{
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

    let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);

    await contract.methods.pauseContract().send(
      {
        from : this.accounts[0],

      }
    ).then(
      console.log

    );
  }

    async unPauseBaseContract(_contractAddress: string):Promise<void>{
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

    let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);

    await contract.methods.unPauseContract().send(
      {
        from : this.accounts[0],
      }
    ).then(
      console.log
    )
  }


  async inActiveBaseContract(_contractAddress : string ):Promise<void>{
      this.provider = await this.web3Modal.connect(); // set provider
      this.web3js = new Web3(this.provider); // create web3 instance
      this.accounts = await this.web3js.eth.getAccounts();

    let contract =await new this.web3js.eth.Contract(BaseContractAbi,_contractAddress);

    await contract.methods.deActivate().send(
      {
        from : this.accounts[0],

      }
    ).then(
      console.log

    );
  }



}
