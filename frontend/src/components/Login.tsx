import { useState } from "react";
import { authActions } from "../lib/api";

export default function Login({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("admin@test.com"); // Identity usually uses Email
  const [password, setPassword] = useState("Password123!"); // Identity requires strong pass

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await authActions.register({ email, password });
        alert("Registration successful! Please login.");
        setIsRegistering(false);
      } else {
        const data = await authActions.login({ email, password });
        // Log it to be 100% sure what the key is
        console.log("Identity Response:", data);

        const token = data.accessToken; // .NET 8 Identity uses 'accessToken'
        localStorage.setItem("token", token);
        setToken(token);
      }
    } catch (err) {
      alert(
        "Auth failed! Ensure you are using an Email and a Strong Password (length 8+, Uppercase, Number, Symbol).",
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100"
      >
        <h2 className="text-3xl font-black mb-2 text-center text-slate-800">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-slate-500 text-center mb-8">
          {isRegistering
            ? "Join GadgetStore today"
            : "Login to manage your gadgets"}
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <p className="mt-6 text-center text-slate-600 font-medium">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isRegistering ? "Log In" : "Register Now"}
          </button>
        </p>
      </form>
    </div>
  );
}
