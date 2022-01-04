import { Injectable, OnInit } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class MetamaskService{
  web3js: any;
  private provider: any;
  accounts: any;
  contract:any;

  public connected : boolean = false ;
  web3Modal

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();



  constructor() {
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


  public async connectAccount() {
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
    this.connected == true;
    //console.log(this.accounts)
    //this.connected = true ;
    //console.log("hello "+this.connected)
    //console.log("hey"+this.connected)

    //contract.methods.sendEth("0x604BC7De2C6e6f0A40c35099Ae5ECabe11021FcD").send({value: Web3.utils.toWei("2","ether")})

    //console.log("contract : "+contract)
  }

 /* async sendEth(wallet_address){

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.contract = new this.web3js.eth.Contract(abi, address,{gasPrice: '20000000000', from: wallet_address});

    const create = await this.contract.methods.sendEth(wallet_address)
                    .send(
                      {value: Web3.utils.toWei("10","ether"),
                      from: this.accounts[0],
                      gas: '21000'
                    })
    console.log(create)
  }*/


  /*async setMessage(message){
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.contract = new this.web3js.eth.Contract(abi, address);

    const create = await this.contract.methods.setMessage(message).send({value: Web3.utils.toWei("5","ether"),from: this.accounts[0]});
    console.log(create)
  }*/



}
