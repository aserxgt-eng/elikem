import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Stats } from '@/components/landing/Stats';
import { ProductHighlights } from '@/components/landing/ProductHighlights';
import { Features } from '@/components/landing/Features';
import { TrustedQuality } from '@/components/landing/TrustedQuality';
import { Contact } from '@/components/landing/Contact';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <ProductHighlights />
      <Features />
      <TrustedQuality />
      <Contact />
      <Footer />
    </main>
  );
}
