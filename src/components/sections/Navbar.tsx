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
  const router   = useRouter();
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);
  const [userMenu,  setUserMenu]  = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); setUserMenu(false); }, [pathname]);

  const handleLogout = () => { logout(); setUserMenu(false); router.push("/"); };
  const dashHref  = user?.role ? (DASH[user.role] ?? "/") : "/login";
  const initials  = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() ?? "U";

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[66px] max-w-7xl items-center justify-between px-5 md:px-10">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_18px_rgba(34,197,94,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(34,197,94,0.6)]">
              <Leaf size={15} strokeWidth={2.2} className="text-black" />
            </div>
            <span className="hidden font-heading text-[17px] font-bold tracking-[-0.6px] text-white sm:block">
              Urban<span className="text-emerald-400">Bloom</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center md:flex">
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={l.href}
                  className={`relative px-4 py-1.5 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 hover:text-white ${
                    pathname === l.href ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {l.label}
                  {pathname === l.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right — auth */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-white/[0.04] px-3 py-2 text-sm text-white transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.07]"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[10px] font-bold text-black">
                    {initials}
                  </div>
                  <span className="max-w-[96px] truncate text-[12.5px] font-medium">{user.name}</span>
                  <ChevronDown size={11} className={`text-zinc-500 transition-transform duration-200 ${userMenu ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-12 z-50 min-w-[190px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0c0c0c]/95 py-1 shadow-[0_20px_48px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                    >
                      <div className="border-b border-white/[0.06] px-4 py-3">
                        <p className="text-[12.5px] font-semibold text-white">{user.name}</p>
                        <p className="text-[11px] text-zinc-600">{user.role}</p>
                      </div>
                      <Link href={dashHref} className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white">
                        <LayoutDashboard size={13} /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-red-400 transition-colors hover:bg-red-500/10">
                        <LogOut size={13} /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-[13.5px] font-medium text-zinc-500 transition-colors duration-200 hover:text-white">
                  Log in
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/signup"
                    className="rounded-full bg-emerald-500 px-5 py-2 font-heading text-[13px] font-bold text-black shadow-[0_0_16px_rgba(34,197,94,0.35)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(34,197,94,0.5)]"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.09] text-zinc-400 transition-colors hover:border-white/[0.15] hover:text-white md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={15} /> : <Menu size={15} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-0.5 px-4 py-4">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      className={`flex items-center rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-white/[0.05] hover:text-white ${
                        pathname === l.href ? "text-white" : "text-zinc-500"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="space-y-2 border-t border-white/[0.06] pt-3">
                  {isAuthenticated && user ? (
                    <>
                      <Link href={dashHref} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] text-zinc-300 transition-colors hover:bg-white/[0.05]">
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] text-red-400 transition-colors hover:bg-red-500/[0.08]">
                        <LogOut size={14} /> Sign out
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/login" className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-center text-[13.5px] font-medium text-zinc-300 transition-colors hover:border-white/[0.18] hover:text-white">
                        Log in
                      </Link>
                      <Link href="/signup" className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-center text-[13.5px] font-bold text-black transition-colors hover:bg-emerald-400">
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {userMenu && <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />}
    </>
  );
}