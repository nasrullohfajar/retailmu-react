import { useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { routeMap } from "../constants/routeConfig";

const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = pathnames.map((_, index) => {
    const url = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label =
      routeMap[url] ||
      pathnames[index].charAt(0).toUpperCase() + pathnames[index].slice(1);

    return {
      label: label,
      path: url,
    };
  });

  console.log(breadcrumbItems);

  return (
    <header className="flex items-center px-3 xl:px-6 py-4 lg:py-6 bg-white rounded-sm shadow-xs">
      <Breadcrumb items={breadcrumbItems} />
    </header>
  );
};

export default Header;
