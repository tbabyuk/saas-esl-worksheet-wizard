import Image from "next/image";

import { HeaderSection } from "./home-components/Header";
import { PricingSection } from "./home-components/Pricing";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <PricingSection />
    </>
  );
}
