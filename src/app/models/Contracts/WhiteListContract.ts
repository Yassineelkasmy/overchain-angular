export class WhiteListContract{
  constructor (
    public owner : string,

    public propertyOwner : string,

    public propertyCode : string,

    public price : string,

    public bought : boolean,
    public paused : boolean,
    public activated : boolean
  ){}
}
