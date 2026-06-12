import { useProduct } from "../../../../hooks/product/useProduct";
import { useEffect } from "react";
import { Loading } from "../../../../components/loading";
import { Wallet } from "lucide-react";
import  {useAuth} from "../../../../context/AuthUserContext";
export const BalanceCard = () => {
  const { balance, getBalance, loading, error } = useProduct();
  const { user } = useAuth();
  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {balance !== null && (
        <div className="w-[70%] mx-auto mt-4 rounded-xl p-6 shadow-sm bg-slate-200">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-500 uppercase mb-2">
                Cuenta
              </span>
              <div className="flex items-center gap-3">
                <Wallet className="w-10 h-10 text-gray-700 shrink-0" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-base font-semibold text-gray-800">
                    {user?.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    **********745
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-500 uppercase mb-2">
                Currency
              </span>

              <span className="text-3xl font-bold text-gray-700">
                {balance?.currency}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-500 uppercase mb-2">
                Balance
              </span>

              <span className="text-3xl font-bold text-gray-800">
                {balance?.accountBalance}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
