import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaHouse } from "react-icons/fa6";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHouse size={20} color="white" className="mb-0.5" />,
    },
  ];

  return (
    <aside className="flex flex-col items-center w-14 md:w-48 lg:w-64 py-2 md:px-2 bg-(--primary-color) rounded-sm">
      <div className="flex gap-2 2xl:gap-4 items-center md:px-2 mb-2">
        <img
          src={logo}
          alt="Logo"
          className=" MenuIcon py-2 lg:py-6 2xl:py-8"
        />
        <h1 className="hidden md:block text-white font-bold text-xl lg:text-2xl 2xl:text-3xl tracking-wide">
          RetailMu
        </h1>
      </div>

      <nav className="flex-1 py-2 space-y-2 md:w-full">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center rounded-md transition-all p-2  md:p-3 2xl:p-4 gap-2 ${isActive ? " bg-(--secondary-color)" : "hover:bg-(--secondary-color)"}`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            <p className="hidden md:block text-white text-sm lg:text-base font-medium truncate">
              {item.name}
            </p>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
