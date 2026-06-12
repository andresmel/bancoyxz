import { Loading } from "../../../../components/loading";
import { useProduct } from "../../../../hooks/product/useProduct";
import { ArrowLeftRight } from "lucide-react";
import { useEffect } from "react";

export const TransferListTable = () => {
  const { getListTransfers, loading, error, listTransfers } = useProduct();

  useEffect(() => {
    getListTransfers();
  }, [getListTransfers]);

  return (
    <>
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-[95%] mx-auto mt-[8vh]">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-sky-800 px-6 py-4 flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Historial de Transferencias
            </h2>
          </div>

          {listTransfers?.transfers.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              No existen transferencias registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Valor
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Moneda
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Fecha
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Documento
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Destinatario
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {listTransfers?.transfers.map((transfer, index) => (
                    <tr
                      key={index}
                      className="
                  border-t
                  border-slate-200
                  hover:bg-blue-50
                  transition-colors
                  duration-200
                "
                    >
                      <td className="px-6 py-4 font-bold text-emerald-600">
                        {transfer.currency} {transfer.value.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {transfer.currency}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {transfer.date}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {transfer.payeer.document}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">
                          {transfer.payeer.name}
                        </div>
                      </td>
                      <td>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          Completada
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
