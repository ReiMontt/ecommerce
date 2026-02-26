import { Search } from "lucide-react";

interface NavBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function NavBar({
  categories,
  activeCategory,
  onCategoryChange,
}: NavBarProps) {
  // Inside NavBar.tsx

  return (
    <div className="border-b border-slate-100">
      <div className="flex items-center gap-4 h-14 px-4 overflow-hidden">
        {/* Search Input - Expands */}
        <div className="relative flex-1 group">
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:bg-white border-2 border-transparent focus:border-[#b8f53e]/50"
          />
        </div>

        {/* Category List - Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
