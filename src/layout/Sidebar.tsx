import logo from "../assets/logo.svg";
import { FaHouse, FaGear, FaLayerGroup } from "react-icons/fa6";
import Menu from "../components/Menu";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHouse />,
    },
    {
      path: "",
      name: "Pengaturan",
      icon: <FaGear />,
      children: [
        {
          path: "/category",
          name: "Kategori",
          icon: <FaLayerGroup />,
        },
      ],
    },
  ];

  return (
    <aside className="flex flex-col items-center w-14 md:w-48 lg:w-68 p-4 bg-(--primary-color) text-white gap-4">
      <div className="flex gap-2 2xl:gap-4 items-center md:px-2">
        <img
          src={logo}
          alt="Logo"
          className="w-5 lg:w-7 2xl:w-8 xl:w py-2 lg:py-6"
        />
        <h1 className="hidden md:block text-white font-bold text-xl lg:text-2xl 2xl:text-3xl tracking-wide">
          RetailMu
        </h1>
      </div>

      <nav className="flex-1 py-2 space-y-1 md:w-full">
        {menuItems.map((item) => (
          <Menu
            key={item.path}
            path={item.path}
            icon={item.icon}
            name={item.name}
            children={item.children}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
