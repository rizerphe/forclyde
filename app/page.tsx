import Hero from "../components/Hero";
import ExampleChat from "../components/ExampleChat";
import CTA from "../components/CTA";
import FAQ from "@/components/FAQ";
import HidingDocuments from "@/components/HidingDocuments";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full gap-8 items-center">
        <Hero />
        <HidingDocuments />
        <ExampleChat />
        <CTA />
        <FAQ />
      </div>
    </>
  );
}
