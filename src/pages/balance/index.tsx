import { BalanceCard } from "./ui/BalanceCard";
import { TitleBalance } from "./ui/BalanceTitle";
import { BalanceCarousel } from "./ui/BalanceCarrusel";
import {HeaderModules} from "../../components/HeaderModules";



export default function BalancePage() {
  return (
    <>
      <HeaderModules titulo={"Mis Productos"} />
      <BalanceCarousel />
      <TitleBalance />
      <BalanceCard />
    </>
  );
}
