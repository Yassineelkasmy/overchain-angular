export class DeployedContracts {
  constructor(
    public  propertyCode : string,
    public  contractAddress : string,
    public  type : string,
    public  sellerWallet : string,
    public  price : number,
    public  priceToEth : number,
    public  title : string,
    public  description : string,
    public  propertyAddress : string
  ){}
}
