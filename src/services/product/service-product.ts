import {endpointBalance,endpointTransfer, endpointTransferList} from "../../api/endpoint";
import {BalanceResponse, TransferHistoryResponse} from "../../models/models";
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

const getListTransfers=async():Promise<TransferHistoryResponse>=>{
  const response = await endpointTransferList.getTransferList();
  return response.data;
}

export const productService = {
  getBalance,
  setTransfer,
  getCurrency,
  getListTransfers
};


