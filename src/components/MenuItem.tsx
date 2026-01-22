import { NavLink } from "react-router-dom";
import type { IMenu } from "../types/Menu";

export const MenuItem = ({ path, icon, name, className }: IMenu) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }: { isActive: boolean }) =>
        `flex items-center rounded-md transition-all p-2 md:p-3 2xl:p-4  gap-2 ${isActive ? " bg-(--secondary-color)" : "hover:bg-(--secondary-color)"} ${className}`
      }
    >
      <span className="shrink-0 text-white">{icon}</span>
      <p className="hidden md:block text-white text-xs lg:text-sm font-medium truncate">
        {name}
      </p>
    </NavLink>
  );
};
