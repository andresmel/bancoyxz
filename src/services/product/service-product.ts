import {endpointBalance,endpointTransfer} from "../../api/endpoint";
import {BalanceResponse} from "../../models/models";
import {TransferRequest,TransferResponse} from "../../models/models";
import {currency} from "../../api/currency";
const getBalance = async (): Promise<BalanceResponse> => {
  const response = await endpointBalance.getBalance();
  return response.data;
};

const setTransfer = async (request: TransferRequest): Promise<TransferResponse> => {
 const response = await endpointTransfer.setTransfer(request);
 return response.data;
};

const getCurrency=()=>{
  const response = currency;
  return response;
}

export const productService = {
  getBalance,
  setTransfer,
  getCurrency
};


