import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-hero pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <Reveal className="relative mx-auto max-w-7xl px-5 md:px-8">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl font-display text-5xl text-foreground sm:text-6xl md:text-8xl">
          {title}
        </h1>
        {subtitle && <p className="mt-6 max-w-xl text-lg text-muted-foreground">{subtitle}</p>}
      </Reveal>
    </section>
  );
}
