import { BalanceCard } from "./ui/BalanceCard";
import { TitleBalance } from "./ui/BalanceTitle";
import { BalanceCarousel } from "./ui/BalanceCarrusel";
export default function BalancePage() {
  return (
    <>
       <BalanceCarousel />
      <TitleBalance />
      <BalanceCard />
    </>
  );
}
