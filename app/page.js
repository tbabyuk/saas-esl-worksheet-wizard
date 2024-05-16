import Image from "next/image";
import { HeaderSection } from "./home-components/header";
import PricingSection from "./home-components/pricing";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <PricingSection />
    </>
  );
}
