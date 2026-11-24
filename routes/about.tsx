import { createFileRoute } from "@tanstack/react-router";
import { Flame, Target, Users } from "lucide-react";

import instaLift from "@/assets/insta-lift.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { AboutSplit, Reviews, WhyFoxin } from "@/components/site/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FOXIN — More Than Nutrition" },
      { name: "description", content: "FOXIN is a sports nutrition brand built around fitness, consistency and personal growth." },
      { property: "og:title", content: "About FOXIN" },
      { property: "og:description", content: "More than nutrition. It's a lifestyle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Flame, title: "Passion", text: "We live the grind — early mornings, heavy sets, and the work nobody sees." },
  { icon: Target, title: "Consistency", text: "Real progress comes from showing up. Our products make that easier." },
  { icon: Users, title: "Community", text: "Every FOXIN customer is part of a movement of people pushing forward." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={<>Built for those who <span className="text-primary">show up.</span></>}
        subtitle="FOXIN started with a simple belief: every fitness journey deserves quality nutrition and a powerful mindset."
      />
      <AboutSplit />
      <section className="relative overflow-hidden py-24 md:py-32">
        <img src={instaLift} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="rounded-2xl border border-border bg-background/70 p-8 backdrop-blur">
              <Icon className="h-9 w-9 text-primary" strokeWidth={1.5} />
              <h3 className="mt-8 font-display text-4xl">{title}</h3>
              <p className="mt-3 text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <WhyFoxin />
      <Reviews />
    </>
  );
}
