import { FaHouse, FaGear } from "react-icons/fa6";

export const menuList = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHouse />,
  },
  {
    path: "",
    name: "Pengaturan",
    icon: <FaGear />,
    children: [
      {
        path: "/category",
        name: "Kategori",
      },
      {
        path: "/product",
        name: "Produk",
      },
      {
        path: "/supplier",
        name: "Supplier",
      },
      {
        path: "/storage",
        name: "Penyimpanan",
      },
    ],
  },
];
