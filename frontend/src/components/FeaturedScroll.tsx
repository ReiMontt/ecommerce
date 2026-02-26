import { useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const SCROLL_ITEMS = [
  {
    id: 1,
    label: "JACKET",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
  },
  {
    id: 2,
    label: "DENIM",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
  },
  {
    id: 3,
    label: "OUTERWEAR",
    image:
      "https://images.unsplash.com/photo-1762331231016-c6d1d875cb0a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    label: "ARCHIVE",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
  },
];

export default function FeaturedScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showGuide, setShowGuide] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const s = scrollRef.current.scrollLeft;
    if (s > 100) setShowGuide(false);
    else setShowGuide(true);
  };

  return (
    /* ── 1. BACKGROUND BLEED (Full width) ── */
    <section className="w-full bg-black py-20 md:py-32 overflow-hidden relative">
      {/* ── 2. CENTERED CONTENT WRAPPER (This fixes the mx-auto) ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* ── 3. FLEX LAYOUT ── */}
        <div className="flex flex-col md:flex-row h-auto md:h-[650px] w-full relative gap-0">
          {/* FIXED LEFT BLOCK: Aligned with site margin */}
          <div
            className="md:sticky md:top-0 z-30 flex-shrink-0 w-full md:w-[450px] bg-black flex flex-col justify-center py-6 md:pr-20"
            style={{
              backgroundImage: `linear-gradient(45deg, #0a0a0a 25%, transparent 25%, transparent 50%, #0a0a0a 50%, #0a0a0a 75%, transparent 75%, transparent)`,
              backgroundSize: "4px 4px",
            }}
          >
            <h2 className="text-white text-4xl md:text-7xl font-black uppercase font-compressed leading-[0.85] tracking-tighter italic">
              New <br /> Styles <br /> For A <br /> Modern <br /> Look
            </h2>
            <div className="mt-8 md:mt-12 flex items-center gap-2 text-[#b8f53e] font-black text-[10px] tracking-[0.3em] uppercase">
              Featured <ArrowRight size={14} />
            </div>
          </div>

          {/* HORIZONTAL SCROLL AREA */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-1 overflow-x-auto no-scrollbar snap-x snap-mandatory bg-black"
          >
            {SCROLL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-[85vw] md:w-[550px] h-[400px] md:h-full snap-start border-r border-white/5"
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={item.label}
                />
                <div className="absolute bottom-10 left-10 z-10">
                  <span className="text-white font-black text-[11px] tracking-[0.5em] uppercase px-4 py-2 bg-black/20 backdrop-blur-md">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-[10vw] md:w-[20vw]" />
          </div>

          {/* GUIDE ARROW (Positioned relative to the 7xl container) */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-700 hidden md:block ${showGuide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="flex flex-col items-center animate-bounce pr-5">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <ChevronRight size={32} className="text-[#b8f53e]" />
              </div>
              <span className="mt-4 text-[#b8f53e] font-black text-[9px] uppercase tracking-[0.6em] [writing-mode:vertical-lr]">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
