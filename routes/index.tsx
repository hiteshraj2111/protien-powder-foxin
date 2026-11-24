import { createFileRoute } from "@tanstack/react-router";

import {
  AboutSplit,
  BenefitsGrid,
  FeaturedProducts,
  Hero,
  InstagramGrid,
  Marquee,
  Newsletter,
  Reviews,
  WhyFoxin,
} from "@/components/site/sections";

// The home route ships no og:image, so hosting can inject the project's social preview.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOXIN — Unleash Your Inner Beast | Premium Protein" },
      {
        name: "description",
        content: "Shop FOXIN whey protein, mass gainer and plant protein. Premium sports nutrition — fuel your power.",
      },
      { property: "og:title", content: "FOXIN — Unleash Your Inner Beast" },
      {
        property: "og:description",
        content: "Premium whey, mass gainer and plant protein from FOXIN. Fuel your power.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <WhyFoxin />
      <AboutSplit />
      <BenefitsGrid />
      <Reviews />
      <Newsletter />
      <InstagramGrid />
    </>
  );
}
