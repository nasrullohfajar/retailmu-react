import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex h-dvh">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto py-4 px-3 bg-white rounded-sm shadow-xs gap-2 2xl:gap-4 m-2 2xl:m-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
