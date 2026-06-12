
import { HandCoins } from "lucide-react";
export const TransferListTitle = () => {
  return (
    <div className="-mx-6 -mt-6 bg-neutral-100 px-8 py-4 flex gap-3 mb-6 justify-center items-center shadow-xl">
      <HandCoins className="w-7 h-7 text-gray-700" />
      <h1 className="text-3xl font-bold text-gray-800">Historial de Transferencias</h1>
    </div>
  );
};
