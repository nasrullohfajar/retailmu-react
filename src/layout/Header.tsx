import { useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { getMenuNameByPath } from "../utils/menuHelper";
import { menuList } from "../constants/menuList";
import { useMe } from "../features/auth/auth.hook";
import { useLogout } from "../features/auth/auth.hook";
import PageLoader from "../components/loader/PageLoader";

const Header = () => {
  const { data, isLoading } = useMe();
  const { mutate: logout } = useLogout();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = pathnames.map((_, index) => {
    const url = `/${pathnames.slice(0, index + 1).join("/")}`;

    const labelFromMenu = getMenuNameByPath(url, menuList);

    const label =
      labelFromMenu ||
      pathnames[index].charAt(0).toUpperCase() + pathnames[index].slice(1);

    return {
      label: label,
      path: url,
    };
  });

  if (isLoading) return <PageLoader />;

  return (
    <header className="flex items-center px-3 xl:px-6 py-4 lg:py-6 bg-white rounded-sm shadow-xs justify-between">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex gap-4 items-center">
        <p className="text-xs lg:text-sm">Halo, {data?.data?.name}</p>
        <p>|</p>
        <button
          onClick={() => logout()}
          className="text-xs lg:text-sm hover:cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
