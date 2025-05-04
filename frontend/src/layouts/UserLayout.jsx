// src/layouts/UserLayout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
