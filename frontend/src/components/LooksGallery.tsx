import { ArrowUpRight } from "lucide-react";

export default function LooksGallery() {
  return (
    <section className="py-24 border-t border-slate-100 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <h2 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
            Looks Gallery — Vol 01
          </h2>
          <button className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-1.5 group">
            View Lookbook
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {/* --- MOBILE LAYOUT (Shown only on small screens) --- */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* 1. Main Visual */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1762094788582-91f7bac0d97d?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-full object-cover object-top"
              alt="Editorial Main"
            />
          </div>

          {/* 2. Side-by-Side: Text + Detail 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center p-4 rounded-[2rem] gap-y-3">
              <p className="text-[#b8f53e] font-black text-xl md:text-[9px] uppercase tracking-widest mb-3">
                The Balance
              </p>
              <h3 className="text-5xl md:text-xl font-black uppercase font-compressed leading-[0.9] tracking-tighter mb-3">
                Modern <br /> Elegance
              </h3>
              <p className="text-lg md:text-[11px] leading-relaxed text-slate-500 font-bold uppercase">
                Classic vibes meets modern trends.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-[2rem] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1610100926890-26d130f677a0?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover object-top"
                alt="Detail 1"
              />
            </div>
          </div>

          {/* 3. Wide Detail Visual */}
          <div className="aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
              className="w-full h-full object-cover"
              alt="Detail 2"
            />
          </div>
        </div>

        {/* --- DESKTOP LAYOUT (Shown only on md and up) --- */}
        <div className="hidden md:grid grid-cols-12 gap-10 items-center">
          {/* Group A: The Primary Image (Left) */}
          <div className="col-span-5">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl shadow-slate-200">
              <img
                src="https://images.unsplash.com/photo-1762094788582-91f7bac0d97d?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover object-top transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                alt="Editorial Main"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Group B: Editorial Text (Center) */}
          <div className="col-span-3 flex flex-col justify-center z-10 px-4">
            <div className="space-y-6">
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#b8f53e] ">
                The Balance
              </p>
              <h3 className="text-2xl font-black uppercase font-compressed leading-none tracking-tighter text-slate-900">
                Elegance & <br /> Modernity
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-500 font-bold uppercase tracking-tight">
                Our looks gallery showcases the perfect balance between classic
                elegance and modern trends.
              </p>
              <div className="w-10 h-1 bg-slate-900" />
              <p className="text-[12px] leading-relaxed text-slate-400 font-medium italic">
                "Craftsmanship meets confidence in every single stitch."
              </p>
            </div>
          </div>

          {/* Group C: Detail Stack (Right) */}
          <div className="col-span-4 grid grid-cols-1 gap-6">
            <div className="group relative aspect-square overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1610100926890-26d130f677a0?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-110"
                alt="Detail 1"
              />
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                alt="Detail 2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
