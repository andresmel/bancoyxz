import {endpointBalance} from "../../api/endpoint";
import {BalanceResponse} from "../../models/models";

const getBalance = async (): Promise<BalanceResponse> => {
  const response = await endpointBalance.getBalance();
  return response.data;
};

export const productService = {
  getBalance,
};
