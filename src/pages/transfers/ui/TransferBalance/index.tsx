import {useProductContext} from "../../../../context/ProductContext";
import { DollarSign } from "lucide-react";

export const TransferBalance = () => {
  const { balance } = useProductContext();
  return (
    <>
      <div className="mt-[6vh] mb-2 flex items-center justify-center bg-slate-200 p-4 rounded-xl w-[70%] mx-auto">
        <h3 className="text-3xl font-semibold mb-2 text-gray-700 flex justify-center">Your Balance:<span className="flex items-center justify-center"><DollarSign /> {balance?.accountBalance}</span> </h3>
      </div>
    </>
  );
};
