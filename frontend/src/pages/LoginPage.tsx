import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Eye, EyeOff, ArrowRight, Loader2, Package } from "lucide-react";
import { toast } from "sonner";

const LIME = "#b8f53e";

type Mode = "login" | "register";

export default function LoginPage({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/login", { email, password });
      return data;
    },
    onSuccess: (data) => {
      // .NET Identity returns 'accessToken'
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userEmail", email);
      setToken(data.accessToken);
      toast.success("Welcome back");
      navigate("/");
    },
    onError: () => {
      toast.error("Authentication Failed", {
        description: "Invalid email or password. Please try again.",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/register", { email, password });
    },
    onSuccess: () => {
      setMode("login");
      setError("");
      setPassword("");
      toast.success("Account Created", {
        description: "You can now log in.",
      });
    },
    onError: () => {
      toast.error("Authentication Failed", {
        description: "Invalid email or password. Please try again.",
      });
    },
  });

  const isPending = loginMutation.isPending || registerMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") loginMutation.mutate();
    else registerMutation.mutate();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#f5f5f0",
    border: "1px solid transparent",
    borderRadius: 12,
    fontSize: 14,
    color: "#000",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4ef",
        display: "flex",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Left — editorial panel */}
      <div
        style={{
          width: "48%",
          background: "#111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 56px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hidden lg:flex"
      >
        {/* Lime glow blob */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "-20%",
            width: 420,
            height: 420,
            background: `${LIME}22`,
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              background: LIME,
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Package size={18} color="#000" />
          </div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 17,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            NexStore
          </span>
        </div>

        {/* Main copy */}
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 900,
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 16,
            }}
          >
            Premium Commerce
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 4vw, 4rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: 20,
            }}
          >
            Style
            <br />
            Delivered
            <br />
            <span style={{ color: LIME }}>Fast.</span>
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: 280,
            }}
          >
            A premium shopping experience built for the modern world. Explore
            thousands of products.
          </p>
        </div>

        {/* Feature list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            position: "relative",
          }}
        >
          {[
            "Instant checkout flow",
            "Order tracking dashboard",
            "Secure payment sessions",
          ].map((f, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: LIME,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, color: "#888" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Mobile logo */}
          <div
            className="flex lg:hidden"
            style={{ alignItems: "center", gap: 10, marginBottom: 40 }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: LIME,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Package size={17} color="#000" />
            </div>
            <span style={{ fontWeight: 900, fontSize: 16, color: "#000" }}>
              NexStore
            </span>
          </div>

          {/* Mode tabs */}
          <div
            style={{
              display: "flex",
              background: "#ebebeb",
              borderRadius: 12,
              padding: 4,
              marginBottom: 32,
              gap: 4,
            }}
          >
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: 13,
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#000" : "#888",
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#000",
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ color: "#aaa", fontSize: 13, marginBottom: 28 }}>
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Join NexStore today — it's free"}
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#555",
                  marginBottom: 6,
                }}
              >
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.border = `1px solid ${LIME}`)
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border = "1px solid transparent")
                }
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#555",
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = `1px solid ${LIME}`)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = "1px solid transparent")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#bbb",
                    padding: 0,
                    lineHeight: 0,
                  }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  fontSize: 13,
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                padding: "14px 0",
                background: isPending ? "#ddd" : "#111",
                color: "#fff",
                fontWeight: 900,
                fontSize: 14,
                borderRadius: 12,
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.15s, transform 0.1s",
                fontFamily: "inherit",
                marginTop: 4,
              }}
              onMouseDown={(e) => {
                if (!isPending)
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(0.97)";
              }}
              onMouseUp={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)")
              }
              onMouseEnter={(e) => {
                if (!isPending)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#333";
              }}
              onMouseLeave={(e) => {
                if (!isPending)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#111";
              }}
            >
              {isPending ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}{" "}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Lime accent line under form */}
          <div
            style={{
              height: 2,
              background: LIME,
              borderRadius: 2,
              marginTop: 32,
              width: 40,
            }}
          />
        </div>
      </div>
    </div>
  );
}
