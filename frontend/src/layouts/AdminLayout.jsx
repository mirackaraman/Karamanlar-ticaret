// src/layouts/AdminLayout.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Ürünler", path: "/admin/products" },
  { name: "Ürün Ekle", path: "/admin/add" },
  { name: "Siparişler", path: "/admin/orders" },
  { name: "Kullanıcılar", path: "/admin/users" },
  { name: "İstatistik", path: "/admin/stats" },
  { name: "Stok", path: "/admin/stock" },
  { name: "Excel Yükle", path: "/admin/uploadexcel" },
  { name: "Geri Bildirimler", path: "/admin/feedback" },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Paneli</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-2 px-3 rounded text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sayfa İçeriği */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
