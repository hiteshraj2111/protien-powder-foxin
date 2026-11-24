import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { CATEGORIES, PRODUCTS, filterProducts, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string | undefined; category?: Category | "all" | undefined };

const CATEGORY_VALUES = CATEGORIES.map((c) => c.value);

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const out: ShopSearch = {};
    const q = search["q"];
    const category = search["category"];
    if (typeof q === "string" && q.trim()) out.q = q.slice(0, 80);
    if (typeof category === "string" && (CATEGORY_VALUES as string[]).includes(category)) {
      out.category = category as Category | "all";
    }
    return out;
  },
  head: () => ({
    meta: [
      { title: "Shop Protein & Supplements — FOXIN" },
      { name: "description", content: "Browse FOXIN whey protein, mass gainer and plant protein. Filter by type and find your flavor." },
      { property: "og:title", content: "Shop FOXIN Protein" },
      { property: "og:description", content: "Whey, mass gainer and plant protein — find your FOXIN fuel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q = "", category = "all" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const results = filterProducts(PRODUCTS, { query: q, category });

  const update = (next: ShopSearch) =>
    void navigate({ search: (prev) => ({ ...prev, ...next }), replace: true, resetScroll: false });

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={<>The <span className="text-primary">FOXIN</span> collection</>}
        subtitle="Premium nutrition designed for your fitness goals."
      />
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  role="tab"
                  aria-selected={category === c.value}
                  onClick={() => update({ category: c.value === "all" ? undefined : c.value })}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all",
                    category === c.value
                      ? "border-primary bg-primary text-primary-foreground shadow-glow-sm"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="shop-search" className="sr-only">Search products</label>
              <input
                id="shop-search"
                value={q}
                onChange={(e) => update({ q: e.target.value || undefined })}
                placeholder="Search products…"
                className="h-12 w-full rounded-full border border-input bg-surface pr-10 pl-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              {q && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => update({ q: undefined })}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-24 text-center">
              <p className="font-display text-4xl text-foreground">No matches</p>
              <p className="mt-3 text-sm text-muted-foreground">Try another search or category.</p>
              <button
                type="button"
                onClick={() => update({ q: undefined, category: undefined })}
                className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
