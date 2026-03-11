import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

const Breadcrumb = ({ items, button }: BreadcrumbProps) => {
  const isDashboard = items.some((item) => item.label === "Dashboard");

  return (
    <div className="bg-white">
      <nav className="flex items-center">
        <div className="flex items-center space-x-2">
          <FaHome size={18} />

          <Link
            to={"/"}
            className="text-(--primary-color) font-medium text-sm xl:text-base"
          >
            Dashboard
          </Link>
        </div>

        {!isDashboard && (
          <BiChevronRight size={18} className="mx-2 text-gray-400" />
        )}

        {!isDashboard &&
          items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <div key={index} className="flex items-center">
                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    className="text-(--primary-color) font-medium text-sm xl:text-base"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-500 font-medium text-sm xl:text-base">
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <BiChevronRight size={18} className="mx-2 text-gray-400" />
                )}
              </div>
            );
          })}
      </nav>

      {button && <div>{button}</div>}
    </div>
  );
};

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  button?: React.ReactNode;
}

export default Breadcrumb;
