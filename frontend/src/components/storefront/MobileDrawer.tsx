import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  LayoutGrid,
  ClipboardList,
  ShoppingCart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

const LIME = "#b8f53e";
const FF = "'Helvetica Neue', Arial, sans-serif";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function MobileDrawer({
  open,
  onClose,
  categories,
  activeCategory,
  onCategoryChange,
}: MobileDrawerProps) {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 998,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: 300,
          background: "#fff",
          zIndex: 999,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: FF,
          boxShadow: open ? "4px 0 40px rgba(0,0,0,0.12)" : "none",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 16px",
            borderBottom: "1px solid #f0f0ec",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontWeight: 900,
                fontSize: 16,
                color: "#000",
                letterSpacing: "-0.02em",
                fontStyle: "italic",
              }}
            >
              NexStore
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f5f5f0",
              border: "none",
              cursor: "pointer",
              padding: 7,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              color: "#555",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <div
          style={{
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "#bbb",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "4px 10px 8px",
            }}
          >
            Navigation
          </p>

          {[
            {
              label: "Marketplace",
              icon: <LayoutGrid size={16} />,
              action: () => go("/"),
            },
            {
              label: "Cart",
              icon: <ShoppingCart size={16} />,
              action: () => go("/cart"),
              badge: totalItems > 0 ? totalItems : null,
            },
            {
              label: "My Orders",
              icon: <ClipboardList size={16} />,
              action: () => go("/orders"),
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderRadius: 10,
                fontFamily: FF,
                fontSize: 14,
                fontWeight: 600,
                color: "#222",
                width: "100%",
                textAlign: "left",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#f5f5f0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "none")
              }
            >
              <span style={{ color: "#777" }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: LIME,
                    color: "#000",
                    fontSize: 10,
                    fontWeight: 900,
                    padding: "1px 7px",
                    borderRadius: 10,
                  }}
                >
                  {item.badge}
                </span>
              )}
              <ChevronRight size={14} color="#ccc" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#f0f0ec", margin: "4px 20px" }} />

        {/* Categories */}
        <div style={{ padding: "12px 12px", flex: 1 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: "#bbb",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "4px 10px 8px",
            }}
          >
            Categories
          </p>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "9px 12px",
                  background: active ? "#000" : "none",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 10,
                  fontFamily: FF,
                  fontSize: 13,
                  fontWeight: active ? 900 : 500,
                  color: active ? "#fff" : "#444",
                  textAlign: "left",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#f5f5f0";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "none";
                }}
              >
                {cat}
                {active && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: LIME,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div style={{ padding: "12px 12px 28px" }}>
          <div
            style={{ height: 1, background: "#f0f0ec", margin: "0 0 12px" }}
          />
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 10,
              fontFamily: FF,
              fontSize: 13,
              fontWeight: 600,
              color: "#999",
              width: "100%",
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#e33";
              (e.currentTarget as HTMLButtonElement).style.background =
                "#fef2f2";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#999";
              (e.currentTarget as HTMLButtonElement).style.background = "none";
            }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
