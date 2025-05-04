import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layoutlar
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Admin koruması
import AdminRoute from "./components/AdminRoute";

// Sayfalar - Kullanıcı
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TestPage from "./pages/TestPage";

// Sayfalar - Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductPage from "./pages/AdminProductPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailPage from "./pages/AdminOrderDetailPage";
import AdminStatsPage from "./pages/AdminStatsPage";
import AdminStockPage from "./pages/AdminStockPage";
import AdminTopProducts from "./pages/AdminTopProducts";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminExcelUploadPage from "./pages/AdminExcelUploadPage";
import AdminFeedbackPage from "./pages/AdminFeedbackPage";
import AdminLogsPage from "./pages/admin/AdminLogsPage";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Kullanıcı Rotaları (UserLayout ile) */}
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/products" element={<UserLayout><ProductList /></UserLayout>} />
        <Route path="/product/:id" element={<UserLayout><ProductDetailPage /></UserLayout>} />
        <Route path="/cart" element={<UserLayout><CartPage /></UserLayout>} />
        <Route path="/checkout" element={<UserLayout><CheckoutPage /></UserLayout>} />
        <Route path="/thankyou" element={<UserLayout><ThankYouPage /></UserLayout>} />
        <Route path="/test" element={<UserLayout><TestPage /></UserLayout>} />
        <Route path="/myorders" element={<UserLayout><MyOrdersPage /></UserLayout>} />
        <Route path="/orders" element={<UserLayout><MyOrdersPage /></UserLayout>} />
        <Route path="/orders/:id" element={<UserLayout><AdminOrderDetailPage /></UserLayout>} />
        <Route path="/login" element={<UserLayout><LoginPage /></UserLayout>} />
        <Route path="/register" element={<UserLayout><RegisterPage /></UserLayout>} />
        <Route path="/contact" element={<UserLayout><ContactPage /></UserLayout>} />
        <Route path="/about" element={<UserLayout><AboutPage /></UserLayout>} />
        <Route path="/privacy" element={<UserLayout><PrivacyPage /></UserLayout>} />

        {/* 🔒 Admin Rotaları (AdminLayout ile sarıldı) */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProductPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminLayout><EditProductPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/add" element={<AdminRoute><AdminLayout><AddProductPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrdersPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/orders/:id" element={<AdminRoute><AdminLayout><AdminOrderDetailPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/stats" element={<AdminRoute><AdminLayout><AdminStatsPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/stock" element={<AdminRoute><AdminLayout><AdminStockPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/top-products" element={<AdminRoute><AdminLayout><AdminTopProducts /></AdminLayout></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsersPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/uploadexcel" element={<AdminRoute><AdminLayout><AdminExcelUploadPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/feedback" element={<AdminRoute><AdminLayout><AdminFeedbackPage /></AdminLayout></AdminRoute>} />
        <Route path="/admin/logs" element={<AdminLogsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
