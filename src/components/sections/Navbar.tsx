"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, LogOut, LayoutDashboard, ChevronDown, Leaf } from "lucide-react";
import { useAuthStore } from "@/lib/stores/authStore";

const NAV_LINKS = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Rentals",     href: "/rentals" },
  { label: "Community",   href: "/community" },
  { label: "About",       href: "/about" },
];

const DASH: Record<string, string> = {
  ADMIN:    "/admin",
  VENDOR:   "/vendor",
  CUSTOMER: "/customer",
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); setUserMenu(false); }, [pathname]);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    router.push("/");
  };

  const dashHref = user?.role ? (DASH[user.role] ?? "/") : "/login";
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "U";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/[0.06] bg-black/75 backdrop-blur-[24px] [backdrop-filter:saturate(180%)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#22c55e,#16a34a)] shadow-[0_0_14px_rgba(34,197,94,0.35)]">
              <Leaf size={15} className="text-black" />
            </div>
            <span className="hidden [font-family:var(--font-jakarta)] text-[15px] font-bold tracking-[-0.5px] text-white sm:block">
              Urban<span className="text-[#22c55e]">Bloom</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.2 }}>
                <Link href={l.href}
                  className={`rounded-lg px-3 py-1.5 [font-family:var(--font-dm)] text-[13px] transition-colors duration-150 hover:text-white ${
                    pathname === l.href ? "text-[#22c55e]" : "text-zinc-400/90"
                  }`}
                >{l.label}</Link>
              </motion.div>
            ))}
          </div>

          {/* Right: auth */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#22c55e,#16a34a)] text-[10px] font-bold text-black">
                    {initials}
                  </div>
                  <span className="max-w-[100px] truncate [font-family:var(--font-dm)] text-xs">{user.name}</span>
                  <ChevronDown size={12} className="text-zinc-500" />
                </button>

                <AnimatePresence>
                  {userMenu && (
                    <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-10 z-50 min-w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0af2] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-[20px]"
                    >
                      <div className="px-4 py-2.5 border-b border-white/06">
                        <p className="text-xs font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-[var(--text-3)]">{user.role}</p>
                      </div>
                      <Link href={dashHref} className="flex items-center gap-2.5 px-4 py-2 text-xs text-zinc-400 transition-colors hover:bg-white/05 hover:text-white">
                        <LayoutDashboard size={13} />Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs text-red-400 transition-colors hover:bg-red-500/10">
                        <LogOut size={13} />Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-[13px] text-zinc-400 transition-colors hover:text-white"
                  >Log in</Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/signup"
                    className="rounded-full bg-[#22c55e] px-5 py-2 [font-family:var(--font-jakarta)] text-[13px] font-bold text-black transition-colors hover:bg-[#16a34a]"
                  >Get Started</Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 md:hidden"
            onClick={() => setOpen(!open)}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-white/06 bg-black/95 backdrop-blur-[20px] md:hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={l.href} className="flex items-center rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/05 hover:text-white"
                      >{l.label}</Link>
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-white/06 space-y-2">
                  {isAuthenticated && user ? (
                    <>
                      <Link href={dashHref} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/05">
                        <LayoutDashboard size={14} />Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10">
                        <LogOut size={14} />Sign out
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/login" className="flex-1 rounded-xl border border-white/12 py-2.5 text-center text-sm text-zinc-300">Log in</Link>
                      <Link href="/signup" className="flex-1 rounded-xl bg-[#22c55e] py-2.5 text-center text-sm font-bold text-black">Sign up</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop for user menu */}
      {userMenu && <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />}
    </>
  );
}
