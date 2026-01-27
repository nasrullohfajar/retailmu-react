import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./features/dashboard/components/Dashboard";
import CategoryPage from "./features/master/category/pages/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
    ],
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
