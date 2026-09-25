import { FranceRenovBanner } from "@/components/layout/FranceRenovBanner";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBanner />
      <Header />
      <main>{children}</main>
      <FranceRenovBanner />
      <Footer />
    </>
  );
}
