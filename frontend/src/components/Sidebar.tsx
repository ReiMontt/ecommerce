import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  ShoppingCart,
  LogOut,
  Plus,
  Package,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const LIME = "#b8f53e";

const navItems = [
  { to: "/", label: "Marketplace", icon: LayoutGrid, end: true },
  { to: "/orders", label: "My Orders", icon: ClipboardList },
  { to: "/cart", label: "Checkout", icon: ShoppingCart },
];

export default function Sidebar() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const navigate = useNavigate();

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: 240,
        background: "#fff",
        borderRight: "1px solid rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        zIndex: 40,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#2563eb",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Package size={18} color="#fff" />
          </div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 17,
              color: "#000",
              letterSpacing: "-0.02em",
            }}
          >
            NexStore
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: isActive ? 900 : 500,
              fontSize: 14,
              color: isActive ? "#fff" : "#555",
              background: isActive ? "#111" : "transparent",
              transition: "background 0.15s, color 0.15s",
              position: "relative",
            })}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.getAttribute("aria-current")) {
                el.style.background = "#f5f5f0";
                el.style.color = "#000";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.getAttribute("aria-current")) {
                el.style.background = "transparent";
                el.style.color = "#555";
              }
            }}
          >
            {({ isActive }) => (
              <>
                <Icon size={16} color={isActive ? "#fff" : "currentColor"} />
                <span style={{ flex: 1 }}>{label}</span>
                {label === "Checkout" && totalItems > 0 && (
                  <span
                    style={{
                      background: LIME,
                      color: "#000",
                      fontSize: 10,
                      fontWeight: 900,
                      borderRadius: 20,
                      minWidth: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 5px",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div
        style={{
          padding: "12px 12px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* Add Product CTA */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 16px",
            borderRadius: 12,
            background: "#111",
            color: "#fff",
            fontWeight: 900,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#333")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#111")
          }
          onMouseDown={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform =
              "scale(0.97)")
          }
          onMouseUp={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1)")
          }
        >
          <Plus size={15} />
          Browse Products
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 12,
            background: "transparent",
            color: "#aaa",
            fontWeight: 600,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#e33";
            (e.currentTarget as HTMLButtonElement).style.background = "#fff5f5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#aaa";
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}
