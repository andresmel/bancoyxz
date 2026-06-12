
import { TransferBalance } from "../TransferBalance";
import { HeaderModules } from "../../../../components/HeaderModules";

export const TransferTitle = () => {
  return (
    <>
     <HeaderModules titulo="Transferencias"/>
      <TransferBalance />
      <div className="w-[90%] mx-auto mt-[3vh] mb-[2vh] justify-center flex ">
        <h2 className="text-2xl font-semibold text-gray-800">
          Realice transferencias de forma rápida y segura
        </h2>
        <hr></hr>
      </div>
    </>
  );
};
