import { useCartStore } from "../store/useCartStore";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  CreditCard,
  ArrowRight,
  Loader2,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const navigate = useNavigate();

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (items.length === 0) throw new Error("Cart is empty");

      // 1. Create the Order (Using PascalCase for .NET)
      // We process the first item for now.
      const orderRes = await api.post("/order", {
        ProductId: items[0].id,
        Quantity: items[0].quantity,
      });

      // 2. Create Payment Session
      const paymentRes = await api.post("/payment/create-session", {
        OrderId: orderRes.data.id,
      });

      return paymentRes.data.url;
    },
    onSuccess: (url) => {
      toast.success("Redirecting to Secure Checkout...");
      window.location.href = url;
    },
    onError: (error: any) => {
      console.error(error);
      const message = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(", ")
        : "Checkout failed. Please check if Services are running.";
      toast.error("Checkout Error", { description: message });
    },
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-32 text-center">
        <h2 className="text-4xl font-black uppercase font-compressed mb-4">
          Your bag is empty
        </h2>
        <button
          onClick={() => navigate("/catalogue")}
          className="text-[#b8f53e] bg-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
      <h1 className="text-5xl font-black uppercase font-compressed tracking-tighter mb-12">
        Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 items-center"
            >
              <img
                src={item.imageUrl}
                className="w-24 h-32 object-cover rounded-2xl bg-white"
                alt=""
              />
              <div className="flex-1">
                <h3 className="font-black uppercase text-lg tracking-tight">
                  {item.name}
                </h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                  Unit Price: ₱{item.price}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-black text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-xl mb-4">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-black text-white p-10 rounded-[2.5rem] sticky top-32 shadow-2xl shadow-slate-200">
            <h2 className="text-2xl font-black uppercase font-compressed tracking-widest mb-8">
              Summary
            </h2>
            <div className="space-y-4 mb-10 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-black text-sm">
                  ₱{totalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#b8f53e]">FREE</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-lg">
                <span className="text-white">Total</span>
                <span className="text-[#b8f53e] font-black">
                  ₱{totalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => checkoutMutation.mutate()}
              disabled={checkoutMutation.isPending}
              className="w-full bg-[#b8f53e] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:bg-slate-700"
            >
              {checkoutMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Secure Checkout <CreditCard size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
