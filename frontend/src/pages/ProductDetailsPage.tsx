import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../store/useCartStore";
import { ArrowLeft, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { productActions } from "@/lib/api";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productActions.getOne(Number(id)),
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-slate-200" size={32} />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
        {/* Navigation / Breadcrumb */}
        <button
          onClick={() => navigate(-1)} // 👈 This goes back WITHOUT reloading
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* --- LEFT: Optimized Image Container --- */}
          <div className="w-full lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] max-h-[70vh] bg-slate-50 rounded-[2rem] overflow-hidden">
              <img
                src={
                  product?.imageUrl ||
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
                }
                className="w-full h-full object-cover object-top"
                alt={product?.name}
              />
            </div>
          </div>

          {/* --- RIGHT: Product Info --- */}
          <div className="flex flex-col h-full justify-center lg:py-12">
            <div className="max-w-md">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                {product?.category || "Limited Drop"}
              </span>

              <h1 className="text-5xl md:text-7xl font-black uppercase font-compressed tracking-tighter leading-[0.85] mb-6">
                {product?.name}
              </h1>

              <p className="text-2xl font-black text-slate-900 tracking-tighter mb-8 border-b border-slate-100 pb-8">
                ₱{product?.price.toLocaleString()}
              </p>

              <div className="space-y-6 mb-12">
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {product?.description ||
                    "High-performance materials meets avant-garde design. A cornerstone piece for the modern wardrobe."}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <FeatureItem
                    icon={<ShieldCheck size={16} />}
                    text="Identity Verified Checkout"
                  />
                  <FeatureItem
                    icon={<Truck size={16} />}
                    text="Standard Manila Delivery (2-3 Days)"
                  />
                </div>
              </div>

              {/* Actions: Large and High-Contrast */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    if (!product) return;
                    addItem(product);
                    toast.success("Added to Bag");
                  }}
                  className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-200"
                >
                  Add to Bag
                </button>
                <button className="w-full py-5 bg-[#b8f53e] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] hover:opacity-90 transition-all active:scale-[0.98]">
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-400">
      <div className="text-slate-900">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest">
        {text}
      </span>
    </div>
  );
}
