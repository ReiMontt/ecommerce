import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, HelpCircle, Info } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export default function NavTop({ onMenuToggle }: { onMenuToggle: () => void }) {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <div className="flex items-center justify-between h-14 px-4 md:px-8 border-b border-slate-50">
      {/* LEFT: Hamburger */}
      <div className="flex-1 flex items-center">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* CENTER: Logo (Properly centered in the middle of the screen) */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 group transition-transform active:scale-95"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-600 group-hover:rotate-90 transition-transform duration-500"
        >
          <path
            d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-black text-xl tracking-tighter italic text-slate-900">
          NexStore
        </span>
      </button>

      {/* RIGHT: Actions */}
      <div className="flex-1 flex items-center justify-end gap-1 md:gap-3">
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
          <Info size={16} /> About
        </button>
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
          <HelpCircle size={16} /> FAQs
        </button>

        <div className="w-px h-6 bg-slate-100 mx-1 hidden sm:block" />

        {/* Cart: Fixed badge centering */}
        <button
          onClick={() => navigate("/cart")}
          className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-700 active:scale-90"
        >
          <ShoppingCart size={22} strokeWidth={2.5} />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-[#b8f53e] text-black text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white leading-none shadow-sm">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
