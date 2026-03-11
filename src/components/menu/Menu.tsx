import type { IMenu } from "./types";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MenuItem } from "./MenuItem";

const Menu = ({ path, icon, name, children }: IMenu) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (children && children.length > 0) {
    return (
      <div className="flex flex-col space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center rounded-md transition-all p-2 md:p-3 2xl:p-4 gap-2 cursor-pointer"
        >
          <span className="shrink-0 text-white">{icon}</span>
          <p className="hidden md:block text-white text-xs lg:text-sm font-medium truncate">
            {name}
          </p>

          <div className="hidden md:block ml-auto text-white ">
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </button>

        {isOpen &&
          children.map((child) => (
            <MenuItem
              key={child.path}
              path={child.path}
              name={child.name}
              icon={child.icon}
            />
          ))}
      </div>
    );
  }

  return <MenuItem path={path} name={name} icon={icon} />;
};

export default Menu;
