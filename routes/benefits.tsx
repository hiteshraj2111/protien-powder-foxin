import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import instaShaker from "@/assets/insta-shaker.jpg";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { BenefitsGrid } from "@/components/site/sections";

export const Route = createFileRoute("/benefits")({
  head: () => ({
    meta: [
      { title: "Benefits — Power Your Fitness Journey | FOXIN" },
      { name: "description", content: "How FOXIN protein fits into an active lifestyle: daily protein, recovery routines and convenience." },
      { property: "og:title", content: "FOXIN Benefits" },
      { property: "og:description", content: "Power your fitness journey with convenient daily nutrition." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BenefitsPage,
});

const FAQ = [
  { q: "When should I have a protein shake?", a: "Many people enjoy one after training or alongside a meal. Choose what fits your routine best." },
  { q: "Whey or plant protein?", a: "Whey is dairy-based; plant protein is a dairy-free alternative. Both can fit a balanced diet." },
  { q: "What is a mass gainer for?", a: "Mass gainers are calorie-dense shakes for people with high daily energy needs." },
  { q: "Can I mix it with milk?", a: "Yes — water, milk or plant milk all work. Milk gives a creamier texture." },
];

function BenefitsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Benefits"
        title={<>Power your <span className="text-primary">fitness journey</span></>}
        subtitle="Simple, convenient nutrition that fits the way you train and live."
      />
      <BenefitsGrid heading={false} />
      <section className="border-y border-border bg-surface py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <img src={instaShaker} alt="Protein powder poured into a shaker" loading="lazy" className="aspect-square w-full rounded-3xl border border-border object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Good <span className="text-primary">questions</span></h2>
            <Accordion type="single" collapsible className="mt-8">
              {FAQ.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button asChild variant="hero" size="xl" className="mt-10">
              <Link to="/shop">Find your fuel <ArrowRight /></Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
