import logo from "../assets/logo-full-p.svg";
import logoInitial from "../assets/logo-initial.svg";
import Menu from "../components/menu/Menu";
import { useIsMobile } from "../hooks/useIsMobile";
import { menuList } from "../constants/menuList";

const Sidebar = () => {
  const isMobile = useIsMobile(767);

  return (
    <aside className="flex flex-col items-center w-14 md:w-48 lg:w-62 xl:w-68 p-4 bg-(--primary-color) text-white gap-2 2xl:gap-6">
      <div className="flex items-center">
        <img
          src={isMobile ? logoInitial : logo}
          alt="Logo"
          className="w-20 lg:w-34 xl:w-38 mb-4"
        />
      </div>

      <nav className="flex-1 space-y-1 md:w-full">
        {menuList.map((item) => (
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
