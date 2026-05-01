import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-next",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "UrbanBloom — Urban Farming Platform", template: "%s | UrbanBloom" },
  description: "Connect with urban farmers, rent garden spaces, and buy certified organic produce.",
  keywords: ["urban farming", "organic produce", "garden rental", "sustainable farming", "Bangladesh"],
  authors: [{ name: "UrbanBloom Team" }],
  openGraph: {
    title: "UrbanBloom",
    description: "The premier urban farming platform",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body style={{ background: "#000", color: "#fff" }}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: "14px",
                fontFamily: "var(--font-dm)",
                fontSize: "13px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
