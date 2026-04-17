import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../auth/auth.hook";
import PageLoader from "../../components/loader/PageLoader";

const GuestRoute = () => {
  const { data, isLoading } = useMe();

  if (isLoading) return <PageLoader />;
  if (data) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default GuestRoute;
