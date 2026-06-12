import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/PublicLayout";
import { PrivateLayout } from "../layouts/PrivateLayout";
import LoginPage from "../pages/Login/Index";
import OnboardingPage from "../pages/Onboarding/index";
import BalancePage from "../pages/balance/index";
import { ProtectedRoute } from "./ProtectedRoutes";
import TransfersPage from "../pages/transfers";

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<PrivateLayout />}>
              <Route index element={<BalancePage />} />
              <Route path="/dashboard/balance" element={<BalancePage />} />
              <Route path="/dashboard/transfers" element={<TransfersPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
