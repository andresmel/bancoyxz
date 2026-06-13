import { useEffect, useState } from "react";
import { useProduct } from "../../../../hooks/product/useProduct";
import { Loading } from "../../../../components/loading";
import { onlyNumbers } from "../../../../utils/numberUtil";
import { Banknote, DollarSign, SquareUserRound } from "lucide-react";
import { useProductContext } from "../../../../context/ProductContext";
import toast from "react-hot-toast";

export const TrasferCard = () => {
  const { setTransfer, loading, error, transferMessage, getCurrency } =
    useProduct();

  const today = new Date().toISOString().split("T")[0];
  const { balance } = useProductContext();
  const [validateDate, setValidateDate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    value: 0,
    currency: "",
    payeerDocument: "",
    transferDate: "",
  });

  const isValid =
    formData.value > 0 &&
    formData.currency.trim() !== "" &&
    formData.payeerDocument.trim() !== "" &&
    (!validateDate || formData.transferDate !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.value > balance?.accountBalance!) {
      toast.error(
        "No tienes saldo suficiente para realizar esta transferencia",
      );
      return;
    }

    if (!isValid) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (validateDate && formData.transferDate < today) {
      toast.error("La fecha no puede ser menor al día de hoy");
      return;
    }

    const dataToSend = {
      ...formData,
      transferDate: !validateDate ? today : formData.transferDate,
    };

    setTransfer(dataToSend).then(() => {
      if (!error) {
        setFormData({
          value: 0,
          currency: "",
          payeerDocument: "",
          transferDate: "",
        });
      }
    });
  };

  useEffect(() => {
    if (transferMessage) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [transferMessage]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {loading && <Loading />}

      <div className="flex justify-center mt-[20px]">
        <div className="bg-slate-200 p-[24px] rounded-xl w-[400px]">
          <form
            className="flex flex-col gap-[20px] w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="mb-[10px] text-sm font-medium flex items-center gap-2">
                <Banknote className="w-5 h-5" />
                Valor
              </label>

              <input
                type="text"
                name="value"
                required
                value={formData.value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    value: Number(onlyNumbers(e.target.value)),
                  })
                }
                className="border rounded px-[12px] py-[8px] w-full bg-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-[10px] text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Moneda
              </label>

              <select
                name="currency"
                required
                value={formData.currency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currency: e.target.value,
                  })
                }
                className="border rounded px-[12px] py-[8px] w-full bg-white"
              >
                <option value="">Seleccione una moneda</option>

                {getCurrency().map((c) => (
                  <option key={c.id} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-[10px] text-sm font-medium flex items-center gap-2">
                <SquareUserRound className="w-5 h-5" />
                Documento Destinatario
              </label>

              <input
                type="text"
                name="payeerDocument"
                required
                value={formData.payeerDocument}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payeerDocument: onlyNumbers(e.target.value),
                  })
                }
                className="border rounded px-[12px] py-[8px] w-full bg-white"
              />
            </div>

            <div className="flex flex-col gap-3">
              {/* Checkbox bonito */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                    validateDate
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {validateDate && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={validateDate}
                  onChange={(e) => setValidateDate(e.target.checked)}
                  className="hidden"
                />
                <span className="text-sm text-gray-600">
                  Programar transferencia
                </span>
              </label>

              {/* Input fecha */}
              {validateDate && (
                <input
                  type="date"
                  name="transferDate"
                  required
                  min={today}
                  value={formData.transferDate}
                  onChange={(e) =>
                    setFormData({ ...formData, transferDate: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isValid}
              className="
                bg-blue-600
                text-white
                px-[16px]
                py-[8px]
                rounded
                h-[42px]
                w-full
                disabled:bg-gray-400
                disabled:cursor-not-allowed
              "
            >
              Transferir
            </button>
          </form>
        </div>
      </div>

      {showError && (
        <div className="flex justify-center mt-[10px]">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {showMessage && (
        <div className="flex justify-center mt-[10px]">
          <p className="text-green-500 text-2xl">{transferMessage}</p>
        </div>
      )}
    </>
  );
};
