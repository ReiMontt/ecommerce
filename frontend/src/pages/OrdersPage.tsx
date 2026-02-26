import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import {
  Loader2,
  Clock,
  Package,
  CheckCircle2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const STATUS_MAP: Record<
  string,
  { label: string; class: string; icon: LucideIcon }
> = {
  Pending: {
    label: "Pending",
    class: "bg-amber-50 text-amber-600",
    icon: Clock,
  },
  Paid: {
    label: "Success",
    class: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
  },
  Failed: {
    label: "Declined",
    class: "bg-red-50 text-red-600",
    icon: AlertCircle,
  },
};

export default function OrdersPage() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/order");
      return data;
    },
  });

  const formatDate = (iso: string) => {
    return new Date(iso)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-black p-1.5 rounded-lg">
              <Package size={16} className="text-[#b8f53e]" />
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              Transaction History
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase font-compressed tracking-tighter text-slate-900 leading-none">
            Your Orders
          </h1>
        </header>

        {/* --- Content Area --- */}
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-2xl shadow-slate-100">
          {/* List Header */}
          <div className="hidden md:grid grid-cols-5 bg-slate-50/50 px-10 py-6 border-b-2 border-slate-100">
            {[
              "Reference",
              "Item Details",
              "Quantity",
              "Total Price",
              "Status",
            ].map((h) => (
              <span
                key={h}
                className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="divide-y-2 divide-slate-100">
            {isLoading ? (
              <div className="py-32 flex justify-center">
                <Loader2 className="animate-spin text-slate-200" size={40} />
              </div>
            ) : isError ? (
              <div className="py-32 text-center text-red-500 font-bold uppercase text-xs tracking-widest">
                Failed to sync with OrderService
              </div>
            ) : orders?.length === 0 ? (
              <div className="py-32 text-center text-slate-300 font-bold uppercase text-xs tracking-[0.3em]">
                No transaction history found
              </div>
            ) : (
              orders?.map((order) => {
                const s = STATUS_MAP[order.status] || {
                  label: order.status,
                  class: "bg-slate-100",
                  icon: Clock,
                };
                const Icon = s.icon;
                return (
                  <div
                    key={order.id}
                    className="grid grid-cols-1 md:grid-cols-5 px-6 md:px-10 py-8 items-center gap-6 md:gap-0 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-black text-sm tracking-tight text-slate-900">
                      #ORD-{order.id.toString().padStart(4, "0")}
                    </span>

                    <div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                        SKU-{order.productId}
                      </span>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-slate-600">
                      {order.quantity} Units
                    </span>

                    <span className="text-lg font-black text-slate-900 font-compressed tracking-tight">
                      ₱{order.totalAmount.toLocaleString()}
                    </span>

                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${s.class}`}
                    >
                      <Icon size={14} strokeWidth={3} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Accent */}
          <div className="h-3 bg-[#b8f53e]" />
        </div>
      </div>
    </div>
  );
}
