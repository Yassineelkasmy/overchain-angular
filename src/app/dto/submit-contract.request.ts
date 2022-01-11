export interface SubmitContractRequest {
    wallet:string;
    price:number;
    propertyCode:string;
    whiteListWallets:string[];
    blackListWallets:string[];
}