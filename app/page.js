import Image from "next/image";
import { HeaderSection } from "./home-components/Header";
import { PricingSection } from "./home-components/Pricing";
import { TempSection } from "./home-components/Temp";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <PricingSection />
      <TempSection />
    </>
  );
}
