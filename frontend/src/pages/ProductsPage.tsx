import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useCartStore } from "../store/useCartStore";
import { ShoppingCart, Check, ArrowRight } from "lucide-react";
import LooksGallery from "@/components/LooksGallery";
import FeaturedScroll from "@/components/FeaturedScroll";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  isAdded: boolean;
  onAdd: () => void;
}

interface HeroPanel {
  name: string;
  tag: string;
  bg: string;
  imageUrl: string;
  headline: string | null;
}

const HERO_PANELS = [
  {
    name: "Brown",
    tag: "New Drop",
    bg: "bg-[#e2ddd8]",
    imageUrl:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=90",
    headline: "Redefine Your\nStyle with NexStore\nFashion…",
  },
  {
    name: "Arden Blake",
    tag: "SS 2026",
    bg: "bg-[#cfd3d8]",
    imageUrl:
      "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=900&q=90",
    headline: null,
  },
];

function HeroPanel({ panel }: { panel: HeroPanel; index: number }) {
  return (
    /* ── LAYER 1: THE SHADOW WRAPPER ── */
    /* We put the shadow and margins here. No overflow-hidden on this level! */
    <div className="relative w-full h-[500px] md:h-full p-1">
      <div
        className={`relative w-full h-full rounded-[2rem] bg-white
        shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
        hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] 
        transition-all duration-500 group cursor-pointer`}
      >
        {/* ── LAYER 2: THE CLIPPING WRAPPER ── */}
        {/* This layer handles the image zoom and rounded corners */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
          <img
            src={panel.imageUrl}
            alt={panel.name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[3s] ease-out group-hover:scale-105"
          />

          {/* Gradient & Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-60" />

          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start gap-4">
              {panel.headline ? (
                <h3 className="text-white text-xs md:text-lg lg:text-xl font-medium leading-tight uppercase max-w-[140px] md:max-w-[240px] drop-shadow-md">
                  {panel.headline}
                </h3>
              ) : (
                <div />
              )}
              <span className="bg-[#b8f53e] text-black text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                {panel.tag}
              </span>
            </div>

            <div className="relative pb-2">
              <h2 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase font-compressed leading-[0.9] transition-all duration-700 ease-out group-hover:-translate-y-2 drop-shadow-2xl">
                {panel.name}
              </h2>
            </div>
          </div>
        </div>

        {/* ── LAYER 3: THE BORDER OVERLAY ── */}
        <div className="absolute inset-0 border border-black/5 rounded-[2rem] pointer-events-none" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [search] = useState("");
  const [activeCategory] = useState("All");
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const addItem = useCartStore((s) => s.addItem);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/product");
      return data;
    },
  });

  const filtered = products?.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)) &&
      (activeCategory === "All" || p.category === activeCategory)
    );
  });

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(
      () =>
        setAddedIds((prev) => {
          const n = new Set(prev);
          n.delete(product.id);
          return n;
        }),
      1600,
    );
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* ── SECTION 1: CONSTRAINED (Hero + Grid) ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-auto md:h-[680px]">
            {HERO_PANELS.map((panel, i) => (
              <HeroPanel key={panel.name} panel={panel} index={i} />
            ))}
          </div>
        </motion.section>

        <section className="mt-12 md:mt-24 mb-6 md:mb-10 flex items-end justify-between border-b border-slate-100 pb-4 md:border-none md:pb-0">
          <div className="flex-1">
            <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1 md:mb-3">
              {activeCategory === "string"
                ? "COLLECTION 2025"
                : activeCategory.toUpperCase()}
            </p>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic font-compressed leading-[0.8] md:leading-none">
              Ready to Wear
            </h2>
          </div>
          <Link to="/catalogue">
            <button className="flex items-center gap-2 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase border-b-2 border-black pb-0.5 transition-all">
              {" "}
              Explore All <ArrowRight size={12} />
            </button>
          </Link>
        </section>

        <section className="mb-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1, // 👈 This creates the "waterfall" effect
                },
              },
            }}
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16"
          >
            {filtered?.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <ProductCard
                  product={product}
                  isAdded={addedIds.has(product.id)}
                  onAdd={() => handleAdd(product)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ── SECTION 2: FULL BLEED (Black Background) ── */}
      {/* By moving this OUTSIDE the max-w-7xl div, it will touch both edges of the screen */}
      <FeaturedScroll />

      {/* ── SECTION 3: CONSTRAINED AGAIN (Gallery + Newsletter) ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <LooksGallery />

        <section className="bg-slate-50 py-24 rounded-[3rem] my-12 text-center px-6">
          <h2 className="text-5xl font-compressed font-black uppercase tracking-tighter mb-4">
            Join the Collective
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-10">
            Get early access to limited drops and SS25 releases.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              className="flex-1 bg-white px-6 py-4 rounded-2xl text-[10px] font-bold outline-none ring-1 ring-slate-200 focus:ring-black transition-all"
            />
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors active:scale-95">
              Join
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ProductCard({ product, isAdded, onAdd }: ProductCardProps) {
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
