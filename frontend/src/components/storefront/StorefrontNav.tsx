import { useState, useEffect } from "react";
import {
  LogOut,
  ShoppingBag,
  LayoutGrid,
  Receipt,
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchStore } from "@/store/useSearchStore";

/* ── SUB-COMPONENT: Sidebar User Profile ── */
function SidebarProfile({ email }: { email: string | null }) {
  const navigate = useNavigate(); // Add this

  if (!email) {
    return (
      <div className="flex flex-col gap-2 p-5 bg-white/5 rounded-[2rem] border border-white/10 mb-8 text-left">
        <span className="text-white font-black uppercase tracking-tighter font-compressed text-xl">
          Welcome to NexStore
        </span>
        <button
          onClick={() => navigate("/login")}
          className="text-[#b8f53e] text-[10px] font-black uppercase tracking-[0.3em] text-left hover:underline"
        >
          Sign in for member access
        </button>
      </div>
    );
  }

  const initial = email.charAt(0).toUpperCase();
  const name = email.split("@")[0].toUpperCase();

  return (
    <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[2rem] border border-white/10 mb-8 text-left">
      <div className="w-12 h-12 rounded-full bg-[#b8f53e] flex items-center justify-center text-black font-black text-xl flex-shrink-0">
        {initial}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-white font-black uppercase tracking-tighter font-compressed text-xl leading-none truncate">
          {name}
        </span>
        <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1.5 truncate">
          {email}
        </span>
      </div>
    </div>
  );
}

/* ── SUB-COMPONENT: Sidebar Links ── */
function MobileNavLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
    >
      <div className="flex items-center gap-4 text-white/90 font-black uppercase font-compressed tracking-tight text-xl group-hover:text-[#b8f53e] transition-colors">
        <span className="text-slate-500 group-hover:text-[#b8f53e]">
          {icon}
        </span>
        {label}
      </div>
      <ChevronRight
        size={18}
        className="text-slate-800 group-hover:text-[#b8f53e] group-hover:translate-x-1 transition-all"
      />
    </Link>
  );
}

/* ── MAIN COMPONENT ── */
export default function StorefrontNav({ onLogout }: { onLogout: () => void }) {
  // 1. Get everything from the Search Store
  const { search, setSearch, activeCategory, setCategory, categories } =
    useSearchStore();

  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.items.length);
  const clearCart = useCartStore((state) => state.clearCart);
  const userEmail = localStorage.getItem("userEmail");
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogoutAction = () => {
    clearCart();
    onLogout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-16 relative">
          {/* LEFT: Sidebar Toggle */}
          <div className="flex-1 flex items-center justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors active:scale-90">
                  <Menu size={22} strokeWidth={2.5} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[340px] border-none bg-black text-white p-0 overflow-hidden flex flex-col rounded-r-[2.5rem] z-[1001]"
              >
                <div className="flex flex-col h-full p-8 pt-10">
                  <header className="mb-10 text-left">
                    <p className="text-[#b8f53e] font-black text-[10px] uppercase tracking-[0.4em] mb-2">
                      NexStore
                    </p>
                  </header>

                  <SidebarProfile email={userEmail} />

                  <nav className="flex flex-col gap-1">
                    <p className="text-slate-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 px-4 text-left">
                      Navigation
                    </p>
                    <MobileNavLink
                      to="/catalogue"
                      icon={<LayoutGrid size={20} />}
                      label="Marketplace"
                    />
                    <MobileNavLink
                      to="/orders"
                      icon={<Receipt size={20} />}
                      label="My Orders"
                    />
                    <MobileNavLink
                      to="/cart"
                      icon={<ShoppingBag size={20} />}
                      label="Checkout"
                    />
                  </nav>

                  <div className="mt-auto">
                    {isLoggedIn ? (
                      /* SHOW LOGOUT IF LOGGED IN */
                      <button
                        onClick={handleLogoutAction}
                        className="flex items-center justify-between w-full p-5 rounded-[1.5rem] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all group active:scale-95 border border-red-500/20"
                      >
                        <div className="flex items-center gap-3 font-black uppercase font-compressed text-xl tracking-tight">
                          <LogOut size={20} />
                          Logout
                        </div>
                        <ChevronRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    ) : (
                      /* SHOW LOGIN IF GUEST */
                      <button
                        onClick={() => navigate("/login")}
                        className="flex items-center justify-between w-full p-5 rounded-[1.5rem] bg-[#b8f53e] text-black hover:opacity-90 transition-all group active:scale-95"
                      >
                        <div className="flex items-center gap-3 font-black uppercase font-compressed text-xl tracking-tight">
                          <LogOut size={20} className="rotate-180" />
                          Sign In
                        </div>
                        <ChevronRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* CENTER: Logo */}
          <button
            onClick={() => navigate("/")}
            className="absolute left-1/2 -translate-x-1/2 z-20"
          >
            <span className="font-black text-2xl md:text-3xl italic tracking-tighter text-black uppercase font-compressed">
              NexStore
            </span>
          </button>

          {/* RIGHT: Cart Action */}
          <div className="flex-1 flex items-center justify-end">
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
            >
              <ShoppingCart size={22} strokeWidth={2.3} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#b8f53e] text-black text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white leading-none shadow-sm translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ROW 2: Search & Filter */}
        <div className="flex items-center gap-3 h-14 pb-2 md:pb-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest outline-none hover:bg-slate-100 transition-colors">
              {/* FIX: Use activeCategory from store and check for placeholder string */}
              {(activeCategory || "ALL") === "string"
                ? "ALL"
                : activeCategory?.toUpperCase() || "ALL"}{" "}
              <ChevronDown size={12} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="rounded-2xl p-2 w-48 shadow-2xl z-[110]"
            >
              {/* FIX: Use setCategory from store */}
              {categories?.map((cat: string) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="rounded-xl font-bold text-xs uppercase p-3 cursor-pointer hover:bg-[#b8f53e] hover:text-black transition-colors"
                >
                  {cat === "string" ? "All" : cat}
                </DropdownMenuItem>
              )) || <DropdownMenuItem>No Categories</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative flex-1 group min-w-0">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors"
            />
            <input
              type="text"
              placeholder="SEARCH COLLECTION..."
              value={search || ""}
              // FIX: Use setSearch from store
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-full text-[10px] font-bold tracking-widest outline-none focus:bg-white focus:ring-1 focus:ring-slate-200 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
