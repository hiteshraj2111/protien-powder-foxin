import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Clock,
  Dumbbell,
  Instagram,
  Leaf,
  ShieldCheck,
  Sparkles,
  Utensils,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import heroTub from "@/assets/hero-tub.jpg";
import aboutLifestyle from "@/assets/about-lifestyle.jpg";
import instaLift from "@/assets/insta-lift.jpg";
import instaDumbbells from "@/assets/insta-dumbbells.jpg";
import instaShaker from "@/assets/insta-shaker.jpg";
import instaNutrition from "@/assets/insta-nutrition.jpg";
import wheyChocolate from "@/assets/whey-chocolate.jpg";
import plantProtein from "@/assets/plant-protein.jpg";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Stars } from "./Stars";

const wrap = "mx-auto max-w-7xl px-5 md:px-8";

/* ---------- HERO ---------- */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.7) % 9,
  duration: 8 + (i % 5) * 1.5,
}));

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-background">
      <img
        src={heroTub}
        alt="FOXIN Whey Protein tub glowing with neon green light"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-60 md:opacity-100"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent md:via-background/60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-fade-bottom" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 animate-particle rounded-full bg-primary shadow-glow-sm"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className={`${wrap} relative w-full pt-28 pb-20`}>
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-accent px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
              Premium sports nutrition
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-7 font-display text-[3.6rem] text-foreground sm:text-7xl md:text-8xl lg:text-[7rem]">
              Unleash your
              <br />
              <span className="text-primary text-glow">inner beast.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-md text-lg text-muted-foreground">
              Premium Nutrition. Powerful Performance. Your Fitness Journey Starts Here.
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/shop">
                Shop now <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="line" size="xl">
              <Link to="/shop" search={{ category: "all" }}>
                Explore collection
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={400} className="mt-14 flex gap-10 border-t border-border pt-8">
            {[
              { k: "4", v: "Signature formulas" },
              { k: "3", v: "Product lines" },
              { k: "1 KG", v: "Starting size" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl text-foreground md:text-4xl">{s.k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
export function Marquee() {
  const words = ["Fuel your power", "Train hard", "Recover smart", "Stay consistent", "Unleash the beast"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-border bg-primary py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl text-primary-foreground">
            {w} <Zap className="h-5 w-5 fill-primary-foreground" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- FEATURED ---------- */
export function FeaturedProducts() {
  return (
    <section className="py-24 md:py-32">
      <div className={wrap}>
        <SectionHeading
          eyebrow="The lineup"
          title={<>Fuel your <span className="text-primary">performance</span></>}
          subtitle="Discover premium nutrition designed for your fitness goals."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button asChild variant="line" size="xl">
            <Link to="/shop">
              View all products <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- WHY FOXIN ---------- */
const WHY = [
  { icon: Leaf, title: "Quality ingredients", text: "Thoughtfully selected ingredients." },
  { icon: Sparkles, title: "Great taste", text: "Enjoy delicious flavors in your daily nutrition routine." },
  { icon: ShieldCheck, title: "Quality focus", text: "Quality-conscious product presentation and standards." },
  { icon: Dumbbell, title: "Fitness lifestyle", text: "Nutrition designed for active lifestyles." },
];

export function WhyFoxin() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className={`${wrap} relative`}>
        <SectionHeading eyebrow="The difference" title={<>Why <span className="text-primary">FOXIN?</span></>} />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90} className="group relative bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised">
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-accent text-primary transition-all duration-500 group-hover:shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{text}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT SPLIT ---------- */
export function AboutSplit() {
  return (
    <section className="py-24 md:py-32">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        <Reveal className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" aria-hidden="true" />
          <img
            src={aboutLifestyle}
            alt="FOXIN whey tub with shaker and scoop on a gym bench"
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-3xl border border-border object-cover shadow-card"
          />
          <div className="absolute -right-3 -bottom-6 rounded-2xl border border-primary/40 bg-background/90 px-6 py-5 backdrop-blur md:-right-8">
            <p className="font-display text-4xl text-primary">Est. 2026</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Built for the grind</p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <span className="eyebrow">About FOXIN</span>
          <h2 className="mt-4 font-display text-5xl text-foreground md:text-7xl">
            More than nutrition.
            <br />
            <span className="text-primary">It's a lifestyle.</span>
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            FOXIN is a sports nutrition brand built around the passion for fitness, consistency and personal
            growth. We believe that every fitness journey deserves quality nutrition and a powerful mindset.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-10">
            <Link to="/about">
              Discover our story <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- BENEFITS ---------- */
export const BENEFITS = [
  { icon: Activity, title: "Supports daily protein intake", text: "An easy way to help reach your daily protein target." },
  { icon: BatteryCharging, title: "Supports muscle recovery", text: "Protein is part of a balanced post-training routine." },
  { icon: Clock, title: "Convenient daily nutrition", text: "Shake, sip and go — ready in under a minute." },
  { icon: Utensils, title: "Fits active lifestyles", text: "Blend into smoothies, oats or your favourite recipes." },
];

export function BenefitsGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-24 md:py-32">
      <div className={wrap}>
        {heading && (
          <SectionHeading
            eyebrow="Benefits"
            title={<>Power your <span className="text-primary">fitness journey</span></>}
          />
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 90}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 animate-pulse-glow rounded-full bg-primary/10 blur-2xl" />
              <Icon className="relative h-10 w-10 text-primary transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
              <h3 className="relative mt-10 text-xl font-extrabold text-foreground">{title}</h3>
              <p className="relative mt-3 text-sm text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Supplements are not a substitute for a varied diet. Consult a professional for personal advice.
        </p>
      </div>
    </section>
  );
}

/* ---------- REVIEWS ---------- */
const REVIEWS = [
  { name: "Arjun M.", initials: "AM", rating: 5, text: "Chocolate whey mixes smooth and actually tastes good with just water. My post-gym go-to now." },
  { name: "Priya S.", initials: "PS", rating: 5, text: "Love the vanilla in my morning oats. The packaging looks premium on my kitchen shelf too." },
  { name: "Rohan K.", initials: "RK", rating: 4, text: "Plant protein is a solid dairy-free option. Blends well in smoothies with banana and peanut butter." },
];

export function Reviews() {
  return (
    <section className="border-y border-border bg-surface py-24 md:py-32">
      <div className={wrap}>
        <SectionHeading
          eyebrow="Community"
          title={<>What our <span className="text-primary">community</span> says</>}
          subtitle="Demo testimonials shown for layout purposes — not verified customer reviews."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 100} className="relative flex flex-col rounded-2xl border border-border bg-background p-8">
              <span className="absolute top-6 right-6 rounded-full border border-border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Demo
              </span>
              <span className="font-display text-7xl leading-none text-primary">“</span>
              <p className="mt-2 flex-1 text-base text-foreground">{r.text}</p>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary font-extrabold text-primary-foreground">
                  {r.initials}
                </div>
                <div>
                  <p className="font-bold text-foreground">{r.name}</p>
                  <Stars rating={r.rating} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */
const emailSchema = z.string().trim().email("Please enter a valid email address.").max(255);

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = emailSchema.safeParse(email);
    if (!res.success) {
      setError(res.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're in the FOXIN movement!", { description: "Demo signup — no email is stored yet." });
    }, 700);
  };

  return (
    <section className="py-24 md:py-32">
      <div className={wrap}>
        <Reveal className="relative overflow-hidden rounded-3xl border border-primary/30 bg-hero px-6 py-16 text-center md:px-16 md:py-24">
          <div className="grid-lines pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">Newsletter</span>
            <h2 className="mt-4 font-display text-5xl text-foreground md:text-7xl">
              Join the <span className="text-primary">FOXIN</span> movement
            </h2>
            <p className="mt-5 text-muted-foreground">Get fitness inspiration, product updates and exclusive offers.</p>
            <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="h-14 w-full rounded-full border border-input bg-background/80 px-6 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none aria-invalid:border-destructive"
                />
                {error && (
                  <p id="newsletter-error" className="mt-2 pl-6 text-xs text-destructive">{error}</p>
                )}
              </div>
              <Button type="submit" variant="hero" size="xl" disabled={loading} className="h-14">
                {loading ? "Joining…" : "Subscribe"}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- INSTAGRAM ---------- */
const INSTA = [
  { src: instaLift, alt: "Athlete lifting a barbell in a dark gym" },
  { src: wheyChocolate, alt: "FOXIN chocolate whey tub" },
  { src: instaShaker, alt: "Protein powder poured into a shaker" },
  { src: instaDumbbells, alt: "Dumbbells on a rack with neon light" },
  { src: instaNutrition, alt: "Oats, bananas, almonds and protein scoop" },
  { src: plantProtein, alt: "FOXIN plant protein pouch" },
];

export function InstagramGrid() {
  return (
    <section className="pb-24 md:pb-32">
      <div className={wrap}>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="@foxin.nutrition" title={<>Follow the <span className="text-primary">FOXIN</span> energy</>} align="left" className="mb-0 md:mb-0" />
          <Button asChild variant="line" size="xl">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram /> Follow on Instagram
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {INSTA.map((img, i) => (
            <Reveal key={img.alt} delay={i * 60}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
                aria-label={`${img.alt} on Instagram`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="h-7 w-7 text-primary" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
