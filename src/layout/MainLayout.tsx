import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex h-dvh p-2 gap-2 2xl:gap-4">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden gap-2 2xl:gap-4">
        <Header />

        <main className="flex-1 overflow-y-auto py-4 px-3 bg-white rounded-sm shadow-xs ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
