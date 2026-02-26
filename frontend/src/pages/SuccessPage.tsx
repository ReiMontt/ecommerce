import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

const LIME = "#b8f53e";

export default function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4ef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
        {/* Animated ring stack */}
        <div
          style={{
            position: "relative",
            width: 120,
            height: 120,
            margin: "0 auto 32px",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `${LIME}30`,
              animation: "ping 1.4s ease-out infinite",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 8,
              borderRadius: "50%",
              background: `${LIME}20`,
              animation: "ping 1.4s ease-out infinite",
              animationDelay: "0.3s",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: LIME,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 16px 40px ${LIME}80`,
            }}
          >
            <CheckCircle2 size={52} color="#000" strokeWidth={2.5} />
          </div>
        </div>

        <style>{`
          @keyframes ping {
            0% { transform: scale(0.95); opacity: 0.8; }
            70% { transform: scale(1.3); opacity: 0; }
            100% { transform: scale(1.3); opacity: 0; }
          }
        `}</style>

        {/* Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: "36px 32px",
            border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#000",
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            Payment Successful!
          </h1>
          <p
            style={{
              color: "#aaa",
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Your order has been placed and is being processed. You'll receive a
            confirmation shortly.
          </p>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#f0f0ec" }} />
            <div
              style={{
                width: 32,
                height: 32,
                background: LIME,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Package size={14} color="#000" />
            </div>
            <div style={{ flex: 1, height: 1, background: "#f0f0ec" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => navigate("/orders")}
              style={{
                width: "100%",
                padding: "14px 0",
                background: "#111",
                color: "#fff",
                fontWeight: 900,
                fontSize: 14,
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.15s, transform 0.1s",
              }}
              onMouseDown={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(0.97)")
              }
              onMouseUp={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)")
              }
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#333")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#111")
              }
            >
              View Your Orders <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                padding: "14px 0",
                background: "#f5f5f0",
                color: "#555",
                fontWeight: 900,
                fontSize: 14,
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s, transform 0.1s",
              }}
              onMouseDown={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(0.97)")
              }
              onMouseUp={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)")
              }
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#ebebeb")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#f5f5f0")
              }
            >
              Continue Shopping
            </button>
          </div>

          {/* Lime bar at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: LIME,
            }}
          />
        </div>

        <p style={{ color: "#bbb", fontSize: 11, marginTop: 20 }}>
          Order confirmed · Powered by NexStore
        </p>
      </div>
    </div>
  );
}
