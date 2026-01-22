import { FaHouse } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex items-center px-3 xl:px-4 py-4 xl:py-6 bg-white rounded-sm shadow-xs">
      <span>
        <FaHouse size={16} className="mb-0.5" />
      </span>

      <span className="text-sm xl:text-base ml-1 md:ml-2">Dashboard</span>
    </div>
  );
};

export default Header;
