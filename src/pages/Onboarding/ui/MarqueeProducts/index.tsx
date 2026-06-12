import {
  ArrowLeftRight,
  CreditCard,
  Landmark,
  PiggyBank,
  HandCoins,
  Building2,
  ShieldCheck,
  Home,
  Car,
  TrendingUp,
} from "lucide-react";

export const MarqeeProducts = () => {
  return (
    <div className="relative overflow-hidden w-full bg-slate-100 border-y border-slate-200 py-4 rounded-sm">
      <div
        className="
      absolute
      left-0
      top-0
      h-full
      w-20
      z-10
      pointer-events-none
      bg-gradient-to-r
      from-[#DDD]
      to-transparent
    "
      />

      <div
        className="
      absolute
      right-0
      top-0
      h-full
      w-20
      z-10
      pointer-events-none
      bg-gradient-to-l
      from-[#DDD]
      to-transparent
    "
      />

      <div className="marquee-track">
        {/* Primera copia */}
        <div className="flex gap-16 px-8 whitespace-nowrap text-slate-600 font-medium">
          <span className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Transferencias
          </span>

          <span className="flex items-center gap-2">
            <HandCoins className="w-4 h-4" />
            Créditos
          </span>

          <span className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4" />
            Cuentas de Ahorro
          </span>

          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Inversiones
          </span>

          <span className="flex items-center gap-2">
            <HandCoins className="w-4 h-4" />
            Avances
          </span>

          <span className="flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            Préstamos
          </span>

          <span className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Giros Internacionales
          </span>

          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Seguridad Bancaria
          </span>

          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Banca Digital
          </span>

          <span className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Crédito Hipotecario
          </span>

          <span className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Crédito Vehicular
          </span>

          <span className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Tarjetas de Crédito
          </span>
        </div>

        {/* Segunda copia */}
        <div className="flex gap-16 px-8 whitespace-nowrap text-slate-600 font-medium">
          <span className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Transferencias
          </span>

          <span className="flex items-center gap-2">
            <HandCoins className="w-4 h-4" />
            Créditos
          </span>

          <span className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4" />
            Cuentas de Ahorro
          </span>

          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Inversiones
          </span>

          <span className="flex items-center gap-2">
            <HandCoins className="w-4 h-4" />
            Avances
          </span>

          <span className="flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            Préstamos
          </span>

          <span className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Giros Internacionales
          </span>

          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Seguridad Bancaria
          </span>

          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Banca Digital
          </span>

          <span className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Crédito Hipotecario
          </span>

          <span className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Crédito Vehicular
          </span>

          <span className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Tarjetas de Crédito
          </span>
        </div>
      </div>
    </div>
  );
};
