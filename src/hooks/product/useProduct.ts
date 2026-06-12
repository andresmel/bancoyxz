import { useCallback, useState } from "react";
import { productService } from "../../services/product/service-product";
import { useProductContext } from "../../context/ProductContext";
import type { TransferHistoryResponse, TransferRequest } from "../../models/models";
import toast from "react-hot-toast";


export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { balance, saveBalance } = useProductContext();
  const [transferMessage, setTransferMessage] = useState<string | null>(null);
  const [listTransfers, setListTransfers] = useState<TransferHistoryResponse | null>(null);

  const getBalance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const balance = await productService.getBalance();
      saveBalance(balance);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch balance";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [saveBalance]);

  const setTransfer = async (data: TransferRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.setTransfer(data);
      toast.success(response.status || "Transfer successful");
      setTransferMessage(response.status || "Transfer successful");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to set transfer";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrency = () => {
    return productService.getCurrency();
  };


  const getListTransfers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const transfers = await productService.getListTransfers();
      setListTransfers(transfers);
    } catch (err: any) {
      const message =
      err.response?.data?.message || "Failed to fetch transfers list";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    balance,
    getBalance,
    setTransfer,
    transferMessage,
    getCurrency,
    getListTransfers,
    listTransfers,
  };
};
