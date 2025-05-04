import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import './index.css';


// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Performans ölçümü (opsiyonel)
reportWebVitals();
