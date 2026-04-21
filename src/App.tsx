import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./features/auth/LoginPage";
import Dashboard from "./features/dashboard/components/Dashboard";
import CategoryPage from "./features/master/category/CategoryPage";
import SupplierPage from "./features/master/supplier/SupplierPage";
import StoragePage from "./features/master/storage/StoragePage";
import ProductPage from "./features/master/product/ProductPage";

import ProtectedRoute from "./features/routes/ProtectedRoute";
import GuestRoute from "./features/routes/GuestRoute";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          { path: "dashboard", element: <Dashboard /> },
          { path: "category", element: <CategoryPage /> },
          { path: "supplier", element: <SupplierPage /> },
          { path: "storage", element: <StoragePage /> },
          { path: "product", element: <ProductPage /> },
        ],
      },
    ],
  },

  {
    element: <GuestRoute />,
    children: [{ path: "login", element: <LoginPage /> }],
  },

  {
    path: "*",
    element: (
      <div className="flex h-screen items-center justify-center">
        404 - Halaman Tidak Ditemukan
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
