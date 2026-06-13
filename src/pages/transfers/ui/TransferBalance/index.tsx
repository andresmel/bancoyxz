import {useProductContext} from "../../../../context/ProductContext";
import { DollarSign } from "lucide-react";

export const TransferBalance = () => {
  const { balance } = useProductContext();
  return (
    <>
      <div className="mt-[6vh] mb-2 flex items-center justify-center bg-sky-800 p-4 rounded-xl w-[500px] mx-auto">
        <h3 className="text-3xl font-semibold mb-2 text-white flex justify-center">Tu Saldo Actual :<span className="flex items-center justify-center text-green-200 mr-2"><DollarSign className="w-8" /> {balance?.accountBalance}</span> </h3>
      </div>
    </>
  );
};
