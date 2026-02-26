import { useQuery } from "@tanstack/react-query";
import { productActions } from "../lib/api";
import { useSearchStore } from "../store/useSearchStore";
import {
  SlidersHorizontal,
  SearchX,
  ChevronRight,
  LayoutGrid,
  ShoppingCart,
  Check,
} from "lucide-react";
import { Loader2 } from "lucide-react";

function ProductCard({ product, isAdded, onAdd }: any) {
  return (
    <div className="group cursor-pointer flex flex-col w-full">
      {/* 
          Aspect Ratio: 3/4 is standard, but we ensure the image 
          doesn't have extra bottom margin 
      */}
      <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-100">
        <img
          src={
            product.imageUrl ||
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
          }
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 shadow-"
          alt={product.name}
        />

        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl ${
              isAdded ? "bg-[#b8f53e] text-black" : "bg-black text-white"
            }`}
          >
            {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
            {isAdded ? "Added" : "Add to Bag"}
          </button>
        </div>
      </div>

      {/* --- Text Section: Tightened --- */}
      <div className="mt-3 md:mt-4 px-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-0.5 md:gap-4">
          <h3 className="text-[11px] md:text-sm font-black text-slate-800 tracking-tight leading-tight uppercase truncate">
            {product.name}
          </h3>
          <span className="text-[11px] md:text-sm font-black text-slate-900">
            ₱{product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 md:mt-1">
          {product.category}
        </p>

        {/* On Mobile, show a simple '+' button for cart instead of the big hover button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="md:hidden mt-3 w-full py-2 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-tighter active:bg-slate-50 transition-colors"
        >
          {isAdded ? "✓ Added" : "+ Add to Bag"}
        </button>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  const { search, activeCategory, setCategory, categories } = useSearchStore();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productActions.getAll,
  });

  // Filter Logic
  const filtered = products?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "ALL" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-200" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT: FILTER SIDEBAR (Hidden on Mobile) --- */}
          <aside className="hidden lg:block lg:col-span-3 space-y-12 sticky top-32 h-fit">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <SlidersHorizontal size={14} /> Categories
              </h3>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center justify-between group text-[11px] font-bold uppercase tracking-widest transition-all ${
                      activeCategory === cat
                        ? "text-black"
                        : "text-slate-400 hover:text-black"
                    }`}
                  >
                    {cat === "string" ? "Featured" : cat}
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${activeCategory === cat ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-[2rem]">
              <h4 className="font-black text-xs uppercase mb-2">
                New SS25 Drop
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase">
                Our latest collection is now live. Explore modern tech
                aesthetics.
              </p>
            </div>
          </aside>

          {/* --- RIGHT: PRODUCT GRID --- */}
          <main className="lg:col-span-9">
            {filtered && filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                <SearchX size={48} className="mx-auto text-slate-200 mb-4" />
                <h2 className="text-xl font-black uppercase font-compressed tracking-tight">
                  No Items Found
                </h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
