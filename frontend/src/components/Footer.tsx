import { Github, Twitter, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Collection",
    links: [
      { title: "All Products", href: "/catalogue" }, // Updated to our new route
      { title: "New Arrivals", href: "/catalogue" },
      { title: "Best Sellers", href: "/catalogue" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Shipping", href: "#" },
      { title: "Returns", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy", href: "#" },
      { title: "Terms", href: "#" },
    ],
  },
];

const Footer = () => {
  // Helper to ensure we always start at the top of the new page
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-black text-white pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16">
          {/* LEFT: Brand Info */}
          <div className="max-w-sm">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-block transition-transform active:scale-95"
            >
              <span className="font-black text-3xl italic tracking-tighter uppercase font-compressed block mb-6">
                NexStore
              </span>
            </Link>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.15em] leading-relaxed mb-8">
              Redefining tech aesthetics for the modern era. Designed in Manila,
              built for the digital vanguard.
            </p>

            {/* Social Links (External) */}
            <div className="flex items-center gap-6 text-slate-500">
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter size={18} />}
              />
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram size={18} />}
              />
              <SocialLink
                href="https://facebook.com"
                icon={<Facebook size={18} />}
              />
              <SocialLink
                href="https://github.com"
                icon={<Github size={18} />}
              />
            </div>
          </div>

          {/* RIGHT: Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h6 className="text-[#b8f53e] font-black text-[10px] uppercase tracking-[0.2em] mb-8">
                  {section.title}
                </h6>
                <ul className="space-y-5">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {/* Using Link for Internal Routing */}
                      <Link
                        to={link.href}
                        onClick={scrollToTop}
                        className="text-slate-400 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all hover:translate-x-1 inline-block"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Legal & Locations */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 font-black text-[9px] uppercase tracking-[0.4em] text-center md:text-left">
            &copy; {new Date().getFullYear()} NEXSTORE INTERNATIONAL. ALL RIGHTS
            RESERVED.
          </p>

          <div className="flex items-center gap-4 text-slate-600 font-black text-[9px] uppercase tracking-[0.3em]">
            <span className="hover:text-white transition-colors cursor-default">
              Manila
            </span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="hover:text-white transition-colors cursor-default">
              Sydney
            </span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="hover:text-white transition-colors cursor-default">
              London
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-component for Social Links
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#b8f53e] transition-all hover:-translate-y-1 active:scale-90"
    >
      {icon}
    </a>
  );
}

export default Footer;
