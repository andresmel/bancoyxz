import { Search } from "lucide-react";
import { TransferListTable } from "../TranSferlISTTable";
import { useCallback, useState } from "react";

export const FilterTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [noResults, setNoResults] = useState(false);
  const handleNoResults = useCallback((hasNoResults: boolean) => {
  setNoResults(hasNoResults);
}, []);

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-[6vh] mb-[4vh]">
        {/* Buscador texto */}
        <div className="relative w-[450px]">
          <input
            type="text"
            placeholder="Buscar por valor, destinatario"
            className="
              w-full
              h-[50px]
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              pr-14
              shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-blue-600
            "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearchDate("");
            }}
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
        </div>

        {/* Buscador fecha */}
        <div className="relative w-[220px]">
          <label
            className={`
            absolute left-5 top-1/2 -translate-y-1/2 text-sm pointer-events-none
            ${searchDate ? "text-transparent" : "text-slate-400"}
          `}
          >
            Buscar por fecha
          </label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setSearchTerm("");
            }}
            className="
              h-[50px]
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-blue-600
              cursor-pointer
            "
            style={{ color: searchDate ? "#334155" : "transparent" }}
          />
        </div>
      </div>
      {noResults && (
        <p className="text-center text-slate-500 mt-4">
          No se encontraron transferencias.
        </p>
      )}
      <TransferListTable
        searchTerm={searchTerm}
        searchDate={searchDate}
        onNoResults={handleNoResults}
      />
    </>
  );
};
