import { Outlet } from "react-router-dom";
import StorefrontNav from "./storefront/StorefrontNav";
import Footer from "./Footer";
import { useScrollToTop } from "../store/useScrollToTop"; // We will create this next

export default function MainLayout({ onLogout }: { onLogout: () => void }) {
  useScrollToTop(); // Fixes the scroll jumping issue

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <StorefrontNav onLogout={onLogout} />
      <main className="flex-1">
        <Outlet /> {/* This is where Marketplace, Cart, etc. will render */}
      </main>
      <Footer />
    </div>
  );
}
