import { SmartContractType } from "../enums/SmartContractType";

export interface Contract {
    id :string;
    userId :string;
    propertyId :string;
    sellerWallet :string;
    priceETH :number;
    verified :boolean;
    type : SmartContractType;
    whiteListWallets :string[];
    blackListWallets :string[];
}