import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Design Token Colors ─────────────────────────────────────
      colors: {
        // Canvas
        canvas: {
          base:    "#020617", // slate-950 — page background
          card:    "#0f172a", // slate-900 — cards/sections
          border:  "#1e293b", // slate-800 — subtle borders
          hover:   "#162032", // card hover state
          muted:   "#0d1829", // deeper muted sections
        },
        // Primary accent — Emerald
        primary: {
          DEFAULT: "#10b981", // emerald-500
          dim:     "#059669", // emerald-600
          glow:    "#34d399", // emerald-400 — lighter glow
          muted:   "#064e3b", // emerald-900 — bg for pills
          text:    "#6ee7b7", // emerald-300 — text on dark
        },
        // Text hierarchy
        ink: {
          DEFAULT: "#f1f5f9", // slate-100 — primary text
          muted:   "#94a3b8", // slate-400 — secondary text
          faint:   "#475569", // slate-600 — placeholder text
          inverse: "#020617", // text on light bg
        },
        // Status colours
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error:   "#ef4444",
          info:    "#3b82f6",
          pending: "#8b5cf6",
        },
        // Keep shadcn CSS variable references
        background:    "hsl(var(--background))",
        foreground:    "hsl(var(--foreground))",
        card:          { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover:       { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        secondary:     { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:         { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:        { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive:   { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border:        "hsl(var(--border))",
        input:         "hsl(var(--input))",
        ring:          "hsl(var(--ring))",
      },

      // ── Typography ──────────────────────────────────────────────
      fontFamily: {
        heading: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      // ── Spacing ─────────────────────────────────────────────────
      spacing: {
        "sidebar-w":      "260px",
        "sidebar-w-mini": "72px",
        "topnav-h":       "64px",
      },

      // ── Border radius ────────────────────────────────────────────
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        card: "20px",
        bento:"24px",
      },

      // ── Shadows ──────────────────────────────────────────────────
      boxShadow: {
        "card":       "0 1px 3px 0 rgb(0 0 0 / 0.5), 0 0 0 1px #1e293b",
        "card-hover": "0 4px 24px 0 rgb(16 185 129 / 0.08), 0 0 0 1px #1e293b",
        "glow-sm":    "0 0 12px 2px rgb(16 185 129 / 0.25)",
        "glow-md":    "0 0 24px 4px rgb(16 185 129 / 0.20)",
        "glow-lg":    "0 0 48px 8px rgb(16 185 129 / 0.15)",
        "nav":        "0 1px 0 0 #1e293b, 0 4px 24px 0 rgb(0 0 0 / 0.4)",
        "sidebar":    "1px 0 0 0 #1e293b",
        "inner-glow": "inset 0 1px 0 0 rgb(255 255 255 / 0.04)",
      },

      // ── Animations ────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-24px)", opacity: "0" },
          to:   { transform: "translateX(0)",     opacity: "1" },
        },
        "slide-in-up": {
          from: { transform: "translateY(16px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px 2px rgb(16 185 129 / 0.2)" },
          "50%":       { boxShadow: "0 0 24px 4px rgb(16 185 129 / 0.4)" },
        },
        "shimmer": {
          from: { backgroundPosition: "200% center" },
          to:   { backgroundPosition: "-200% center" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "fade-in":       "fade-in 0.4s ease forwards",
        "slide-in-left": "slide-in-left 0.4s ease forwards",
        "slide-in-up":   "slide-in-up 0.4s ease forwards",
        "pulse-glow":    "pulse-glow 3s ease-in-out infinite",
        "shimmer":       "shimmer 3s linear infinite",
        "float":         "float 4s ease-in-out infinite",
        "spin-slow":     "spin-slow 8s linear infinite",
        "accordion-down":"accordion-down 0.2s ease-out",
        "accordion-up":  "accordion-up 0.2s ease-out",
      },

      // ── Backdrop blur ──────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },

      // ── Background image ──────────────────────────────────────
      backgroundImage: {
        "gradient-radial":    "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-green":         "radial-gradient(at 40% 20%, rgb(16 185 129 / 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(52 211 153 / 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(6 78 59 / 0.3) 0px, transparent 50%)",
        "shimmer-green":      "linear-gradient(105deg, transparent 40%, rgb(16 185 129 / 0.08) 50%, transparent 60%)",
        "card-shine":         "linear-gradient(135deg, rgb(255 255 255 / 0.03) 0%, transparent 50%, rgb(255 255 255 / 0.01) 100%)",
        "sidebar-gradient":   "linear-gradient(180deg, #0f172a 0%, #0a1628 100%)",
        "hero-gradient":      "radial-gradient(ellipse 80% 60% at 50% -20%, rgb(16 185 129 / 0.2) 0%, transparent 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
