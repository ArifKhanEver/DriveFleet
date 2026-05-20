import AvailableCars from "@/components/AvailableCars";
import Banner from "@/components/Banner";
import BrandsCarousel from "@/components/BrandsCarousel";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import ProcessSteps from "@/components/ProcessSteps";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

    <Banner></Banner>
    <BrandsCarousel></BrandsCarousel>
    <ProcessSteps></ProcessSteps>
    <AvailableCars></AvailableCars>
    <WhyChooseUs></WhyChooseUs>
    <FAQSection></FAQSection>
    <CTA></CTA>
    </div>
  );
}
