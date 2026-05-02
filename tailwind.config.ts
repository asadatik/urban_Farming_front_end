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
      colors: {
        canvas: {
          base:   "#020617",
          card:   "#0f172a",
          border: "#1e293b",
          hover:  "#162032",
          muted:  "#0d1829",
        },

        /* Single unified emerald accent — matches globals.css --accent */
        primary: {
          DEFAULT: "#10b981",
          dim:     "#059669",
          glow:    "#34d399",
          muted:   "#064e3b",
          text:    "#6ee7b7",
        },

        ink: {
          DEFAULT: "#f1f5f9",
          muted:   "#94a3b8",
          faint:   "#475569",
          inverse: "#020617",
        },

        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error:   "#ef4444",
          info:    "#3b82f6",
          pending: "#8b5cf6",
        },

        /* Shadcn bridge */
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        /* Use --accent-shadcn (renamed) to avoid collision with primary token */
        accent:      { DEFAULT: "hsl(var(--accent-shadcn))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border:      "hsl(var(--border-hsl))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
      },

      fontFamily: {
        /* --font-jakarta-next injected by Next.js in layout.tsx */
        heading: ["var(--font-jakarta-next)", "system-ui", "sans-serif"],
        /* --font-dm loaded via Google Fonts in globals.css */
        body:    ["var(--font-dm)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      spacing: {
        "sidebar-w":      "260px",
        "sidebar-w-mini": "72px",
        "topnav-h":       "64px",
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
        lg:    "var(--radius)",
        md:    "calc(var(--radius) - 2px)",
        sm:    "calc(var(--radius) - 4px)",
        card:  "20px",
        bento: "24px",
      },

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

      keyframes: {
        "fade-in":       { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-in-left": { from: { transform: "translateX(-24px)", opacity: "0" }, to: { transform: "translateX(0)", opacity: "1" } },
        "slide-in-up":   { from: { transform: "translateY(16px)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
        "pulse-glow":    { "0%, 100%": { boxShadow: "0 0 12px 2px rgb(16 185 129 / 0.2)" }, "50%": { boxShadow: "0 0 24px 4px rgb(16 185 129 / 0.4)" } },
        "shimmer":       { from: { backgroundPosition: "200% center" }, to: { backgroundPosition: "-200% center" } },
        "float":         { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "spin-slow":     { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        "accordion-down":{ from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":  { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },

      animation: {
        "fade-in":        "fade-in 0.4s ease forwards",
        "slide-in-left":  "slide-in-left 0.4s ease forwards",
        "slide-in-up":    "slide-in-up 0.4s ease forwards",
        "pulse-glow":     "pulse-glow 3s ease-in-out infinite",
        "shimmer":        "shimmer 3s linear infinite",
        "float":          "float 4s ease-in-out infinite",
        "spin-slow":      "spin-slow 8s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },

      backdropBlur: { xs: "2px" },

      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-green":       "radial-gradient(at 40% 20%, rgb(16 185 129 / 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(52 211 153 / 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(6 78 59 / 0.3) 0px, transparent 50%)",
        "shimmer-green":    "linear-gradient(105deg, transparent 40%, rgb(16 185 129 / 0.08) 50%, transparent 60%)",
        "card-shine":       "linear-gradient(135deg, rgb(255 255 255 / 0.03) 0%, transparent 50%, rgb(255 255 255 / 0.01) 100%)",
        "sidebar-gradient": "linear-gradient(180deg, #0f172a 0%, #0a1628 100%)",
        "hero-gradient":    "radial-gradient(ellipse 80% 60% at 50% -20%, rgb(16 185 129 / 0.2) 0%, transparent 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;