import { HandCoins } from "lucide-react";
import { TransferBalance } from "../TransferBalance";

export const TransferTitle = () => {
  return (
    <>
      <div className="-mx-6 -mt-6 bg-neutral-200 px-8 py-4 flex gap-3 mb-6 justify-center items-center">
        <HandCoins className="w-7 h-7 text-gray-700" />
        <h1 className="text-3xl font-bold text-gray-700">Transferencias</h1>
      </div>
      <div>
        <TransferBalance />
      </div>
      <div className="w-[90%] mx-auto mt-[3vh] mb-[5vh] justify-center flex ">
        <h2 className="text-2xl font-semibold text-gray-800">
          Realice transferencias de forma rápida y segura
        </h2>
        <hr></hr>
      </div>
    </>
  );
};
