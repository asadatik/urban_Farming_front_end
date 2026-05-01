"use client";
import Link from "next/link";

const LINKS = {
  Explore:   ["About Us","Our Mission","Meet the Team","Success Stories","Collaborations"],
  Services:  ["Garden Rentals","Produce Marketplace","Live Tracking","Farm Consultancy","Sustainability Reports"],
  Connect:   ["Contact Us","Join by Invitation","Instagram","YouTube","Newsletter"],
  Resources: ["Blog","Industry Trends","Event Calendar","Help Center","FAQs"],
  Legal:     ["Privacy Policy","Terms of Service","Cookie Policy","Copyright Info"],
};

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-black px-4 pb-10 pt-20 md:px-8 lg:px-20">
      <div className="pointer-events-none absolute bottom-8 left-16 z-0 select-none whitespace-nowrap [font-family:var(--font-jakarta)] text-[clamp(80px,10vw,140px)] font-black tracking-[-4px] text-transparent [text-stroke:1px_rgba(255,255,255,0.04)]">
        UrbanBloom
      </div>

      <div className="relative z-[1] mx-auto max-w-[1240px]">
        <div className="mb-14 flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M11 2C6 2 2 6 2 11s4 9 9 9 9-4 9-9" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M11 6v10M8 9l3-3 3 3" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="[font-family:var(--font-jakarta)] text-[15px] font-bold tracking-[-0.5px] text-white">UrbanBloom</span>
            </div>
            <p className="max-w-[260px] [font-family:var(--font-dm)] text-[13px] leading-[1.6] text-[var(--text-3)]">
              Empowering urban farmers, one rooftop at a time.
            </p>
          </div>

          <div>
            <p className="mb-2.5 [font-family:var(--font-jakarta)] text-[13px] font-semibold text-white">Stay in the loop</p>
            <div className="flex flex-wrap gap-2">
              <input
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 [font-family:var(--font-dm)] text-[13px] text-[var(--text-2)] outline-none transition-colors focus:border-[#22c55e66] sm:w-[220px]"
              />
              <button className="cursor-pointer rounded-xl bg-[#22c55e] px-5 py-2.5 [font-family:var(--font-jakarta)] text-[13px] font-bold text-black">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <p className="mb-4 [font-family:var(--font-jakarta)] text-[13px] font-semibold text-white">{col}</p>
              {items.map((item) => (
                <div key={item} className="mb-2.5">
                  <Link href="#" className="block [font-family:var(--font-dm)] text-[13px] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]">{item}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-6">
          <p className="[font-family:var(--font-dm)] text-[13px] text-[var(--text-4)]">© 2025 UrbanBloom · All Rights Reserved</p>
          <div className="flex items-center gap-5">
            {["Terms","Privacy","Cookies"].map((l) => (
              <Link key={l} href="#" className="[font-family:var(--font-dm)] text-[13px] text-[var(--text-4)] transition-colors hover:text-white">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
