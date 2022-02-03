
/**
 * ADMIN Deploy the contract After the verification
 */

 import { Injectable } from '@angular/core';
 import WalletConnectProvider from '@walletconnect/web3-provider';
 import Web3 from "web3";
 import Web3Modal from "web3modal";
 import { BaseContractByteCode , BaseContractAbi } from '../../../contracts-files/Base-contract/BaseContract.js';
 import { WhiteListByteCode , WhiteListContractAbi } from '../../../contracts-files/WhiteList-contract/WhiteListContract.js';
 import { BlackListByteCode , BlackListContractAbi } from '../../../contracts-files/BlackList-contract/BlackListContract.js';
import { AdminService } from '../admin.service';
import { DeployContractRequest } from 'src/app/dto/deploy-contract.request.js';

 @Injectable({
   providedIn: 'root'
 })
 export class AdminContractService {


   provider: any;
   web3js : any;
   accounts : any;
   web3Modal: any;

   constructor(
    public adminService: AdminService
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

   contract: any;
   contractAddress !: string;

   public async deployBaseContract(_proertyOwner:string,_price:number,_propertyCode:string,contractId :string): Promise<void>{



     this.provider = await this.web3Modal.connect();
     this.web3js = new Web3(this.provider);
     this.accounts = await this.web3js.eth.getAccounts();


       this.contract =await new this.web3js.eth.Contract(BaseContractAbi);
       this.contract.deploy({
         data: BaseContractByteCode,
         arguments: [_proertyOwner, Web3.utils.toWei(String(_price),"ether"), _propertyCode]
       })
       .send({
         from: this.accounts[0],

       }).then(
         (Resp)=>{
           this.contractAddress = Resp.options.address;
           let deployContractRequest : DeployContractRequest = {
              contractId: contractId,
              contractAddress : this.contractAddress
            }
            console.log(deployContractRequest)
          console.log(this.adminService.deployContract(deployContractRequest).subscribe(
            {
              next : (Resp)=> {console.log(Resp);window.location.reload();},
              error : (e) => console.log(e)
            }
          ));
          }
         );

       }



      async deployWhiteListContract(_proertyOwner:string, _price:number,_propertyCode:string,contractId:string,_whiteAddresses:string[]):Promise<void> {

        this.provider = await this.web3Modal.connect();
        this.web3js = new Web3(this.provider);
        this.accounts = await this.web3js.eth.getAccounts();

        console.log("contract WhiteListByteCode:"+WhiteListByteCode)

        console.log(_whiteAddresses);

        this.contract =await new this.web3js.eth.Contract(WhiteListContractAbi);
        this.contract.deploy({
          data: WhiteListByteCode,
          arguments: [_proertyOwner, Web3.utils.toWei(String(_price),"ether"), _propertyCode,_whiteAddresses]
        })
        .send({
          from: this.accounts[0],

        }).then(
          (Resp)=>{
            this.contractAddress = Resp.options.address;
            console.log("address"+Resp.options.address)
            let deployContractRequest : DeployContractRequest = {
                contractId: contractId,
                contractAddress : this.contractAddress
              }

              console.log(deployContractRequest)
          console.log(this.adminService.deployContract(deployContractRequest).subscribe(
            {
              next : (Resp)=> {console.log(Resp);window.location.reload();},
              error : (e) => console.log(e)
            }
          ));
          }
          );

        }



      async deployBlackListContract(_proertyOwner:string,_price:number,_propertyCode:string,contractId:string,_blackAddresses:string[]):Promise<void> {
        this.provider = await this.web3Modal.connect();
        this.web3js = new Web3(this.provider);
        this.accounts = await this.web3js.eth.getAccounts();

        console.log("contract BlackListByteCode:"+BlackListByteCode)

        console.log(_blackAddresses);


        this.contract =await new this.web3js.eth.Contract(BlackListContractAbi);
        this.contract.deploy({
          data: BlackListByteCode,
          arguments: [_proertyOwner, Web3.utils.toWei(String(_price),"ether"), _propertyCode,_blackAddresses]
        })
        .send({
          from: this.accounts[0],

        }).then(
          (Resp)=>{
            this.contractAddress = Resp.options.address;
            console.log("address"+Resp.options.address)
            let deployContractRequest : DeployContractRequest = {
                contractId: contractId,
                contractAddress : this.contractAddress
              }

              console.log(deployContractRequest)
          console.log(this.adminService.deployContract(deployContractRequest).subscribe(
            {
              next : (Resp)=> {console.log(Resp);window.location.reload();},
              error : (e) => console.log(e)
            }
          ));
          }
          );

      }




     }


