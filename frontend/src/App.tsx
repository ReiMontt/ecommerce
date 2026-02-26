import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";
import Marketplace from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import SuccessPage from "./pages/SuccessPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { ProtectedRoute, PublicRoute } from "./components/AuthGuard";
import MainLayout from "./components/MainLayout";
import CataloguePage from "./pages/CatalougePage";

const queryClient = new QueryClient();

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.clear(); // Clean everything
    setToken(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-center" richColors />

        <Routes>
          {/* ── GUEST WORLD: No Nav, No Footer ── */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
          </Route>

          {/* ── SHOP WORLD: Wrapped in MainLayout ── */}
          <Route element={<MainLayout onLogout={handleLogout} />}>
            {/* Public Shop Pages */}
            <Route path="/" element={<Marketplace />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />

            {/* Protected Shop Pages */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/success" element={<SuccessPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
