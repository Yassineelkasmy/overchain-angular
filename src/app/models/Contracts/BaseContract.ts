import { SmartContractType } from "src/app/enums/SmartContractType";

export class BaseContract{
  constructor (
    public owner : string,

    public propertyOwner : string,

    public propertyCode : string,

    public price : any,
    public type :  SmartContractType,
    public bought : boolean,
    public paused : boolean,
    public activated : boolean
  ){}
}
