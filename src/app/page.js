import Image from "next/image";
import HeroSection from "./components/Hero";
import PartnerSection from "./components/PartnerSection";
import ServiceSectionHome from "./components/ServiceSectionHome";
import VideoBgHome from "./components/VideoBgHome";
import PackageHome from "./components/PackageHome";
import Test from "./components/test";

export default function Home() {
  return (
    <>
     <HeroSection />
     {/* <PartnerSection /> */}
     <ServiceSectionHome />
     <VideoBgHome />
     <PackageHome />
     {/* <Test /> */}
    </>
  );
}
