import { Outlet } from "react-router-dom";
import { PrivateHeader } from "../../components/Privateheader";
import { Sidebar } from "../../components/Sidebar";

export const PrivateLayout = () => {
  return (
    <>
      <PrivateHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};