import Navbar             from "@/components/sections/Navbar";
import HeroSection        from "@/components/sections/HeroSection";
import MarqueeBand        from "@/components/sections/MarqueeBand";
import BentoFeatures      from "@/components/sections/BentoFeatures";

import StatsSection       from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner          from "@/components/sections/CTABanner";
import FooterSection      from "@/components/sections/FooterSection";
import { SplitNarrative } from "@/components/sections/SplitNarrative";
// import { FullBleedGallery } from "@/components/sections/FullBleedGallery";

export default function Page() {
  return (
    <main style={{ background:"#000",overflowX:"hidden" }}>
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <BentoFeatures />
      <SplitNarrative/>
    
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
      <FooterSection />
    </main>
  );
}
