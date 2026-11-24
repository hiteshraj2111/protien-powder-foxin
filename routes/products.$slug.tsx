import { useState } from "react";
import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck, Truck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QtyStepper } from "@/components/site/CartDrawer";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { Stars } from "@/components/site/Stars";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, formatINR, getFlavorSiblings, getProductBySlug } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug, name: product.name, flavor: product.flavor, short: product.short };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — FOXIN" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} – ${loaderData.flavor} | FOXIN`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.short },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.short },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
      <p className="font-display text-6xl">Product not found</p>
      <Button asChild variant="hero" size="xl">
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const product = getProductBySlug(slug);
  // Key by slug so selections reset when switching flavor.
  return product ? <ProductDetail key={product.slug} slug={product.slug} /> : null;
}

function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)!;
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [weight, setWeight] = useState(product.weights[0]?.label ?? "");
  const [qty, setQty] = useState(1);
  const option = product.weights.find((w) => w.label === weight);
  const flavors = getFlavorSiblings(product);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <section className="pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Link to="/shop" className="mb-8 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <Reveal className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
                <img
                  key={activeImg}
                  src={product.gallery[activeImg]}
                  alt={`${product.name} ${product.flavor}`}
                  className="aspect-square w-full animate-in object-cover fade-in duration-500"
                />
              </div>
              <div className="flex gap-3">
                {product.gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={activeImg === i}
                    className={cn(
                      "h-20 w-20 overflow-hidden rounded-xl border-2 transition-all md:h-24 md:w-24",
                      activeImg === i ? "border-primary shadow-glow-sm" : "border-border opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Info */}
            <Reveal delay={120} className="flex flex-col">
              <span className="eyebrow">{product.category === "whey" ? "Whey protein" : product.category === "gainer" ? "Mass gainer" : "Plant protein"}</span>
              <h1 className="mt-3 font-display text-5xl text-foreground md:text-7xl">
                {product.name.replace("FOXIN ", "")}
                <span className="block text-primary">{product.flavor}</span>
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-sm text-muted-foreground">{product.rating} · {product.reviewCount} sample ratings</span>
              </div>
              <p className="mt-6 font-display text-5xl text-foreground">{option ? formatINR(option.price * qty) : ""}</p>
              {qty > 1 && option && <p className="text-xs text-muted-foreground">{formatINR(option.price)} each</p>}
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground">Flavor</p>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Flavor">
                  {flavors.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={f.id === product.id}
                      onClick={() => void navigate({ to: "/products/$slug", params: { slug: f.slug }, resetScroll: false })}
                      className="rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-all hover:text-foreground aria-checked:border-primary aria-checked:bg-accent aria-checked:text-primary"
                    >
                      {f.flavor}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground">Weight</p>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Weight">
                  {product.weights.map((w) => (
                    <button
                      key={w.label}
                      type="button"
                      role="radio"
                      aria-checked={weight === w.label}
                      onClick={() => setWeight(w.label)}
                      className="rounded-full border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-all hover:text-foreground aria-checked:border-primary aria-checked:bg-accent aria-checked:text-primary"
                    >
                      {w.label} · {formatINR(w.price)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <QtyStepper value={qty} onChange={(v) => setQty(Math.max(1, v))} label={product.flavor} size="lg" />
                <Button variant="hero" size="xl" className="flex-1" onClick={() => add(product.id, weight, qty)}>
                  Add to cart
                </Button>
                <Button
                  variant="line"
                  size="xl"
                  className="flex-1"
                  onClick={() => {
                    add(product.id, weight, qty);
                    setOpen(false);
                    void navigate({ to: "/checkout" });
                  }}
                >
                  Buy now
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-y border-border py-6 text-center">
                {[
                  { icon: Truck, t: "Fast dispatch" },
                  { icon: ShieldCheck, t: "Sealed for freshness" },
                  { icon: Zap, t: "Mixes in seconds" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="flex flex-col items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/30 bg-accent px-4 py-3 text-xs text-accent-foreground">
                Sample content: ingredient, nutrition and usage details below are placeholders until actual product information is provided.
              </div>

              <Accordion type="single" collapsible defaultValue="ingredients" className="mt-4">
                <AccordionItem value="ingredients">
                  <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.14em]">Ingredients</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    [Sample] Ingredient list will appear here once confirmed by the manufacturer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="nutrition">
                  <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.14em]">Nutrition facts</AccordionTrigger>
                  <AccordionContent>
                    <table className="w-full text-sm">
                      <caption className="mb-2 text-left text-xs text-muted-foreground">[Sample] Per serving — placeholder values</caption>
                      <tbody className="divide-y divide-border">
                        {["Energy", "Protein", "Carbohydrates", "Fat", "Sugar"].map((n) => (
                          <tr key={n}>
                            <td className="py-2 text-muted-foreground">{n}</td>
                            <td className="py-2 text-right font-bold text-foreground">—</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="directions">
                  <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.14em]">Directions for use</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    [Sample] Serving size and mixing directions will appear here once confirmed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="mb-10 font-display text-4xl md:text-5xl">You may also <span className="text-primary">like</span></h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
