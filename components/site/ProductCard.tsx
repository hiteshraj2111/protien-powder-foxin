import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/lib/cart-context";
import { formatINR, type Product } from "@/lib/products";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [quickOpen, setQuickOpen] = useState(false);
  const base = product.weights[0];
  if (!base) return null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden">
        <Link to="/products/$slug" params={{ slug: product.slug }} aria-label={`${product.name} ${product.flavor}`}>
          <img
            src={product.image}
            alt={`${product.name} ${product.flavor} ${base.label}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setQuickOpen(true)}
          className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" /> Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <Stars rating={product.rating} />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {base.label}
          </span>
        </div>
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          <h3 className="text-lg font-extrabold leading-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
            <span className="block text-sm font-semibold text-muted-foreground">{product.flavor}</span>
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-2xl text-foreground">{formatINR(base.price)}</span>
          <Button variant="hero" size="pill" onClick={() => add(product.id, base.label)} aria-label={`Add ${product.name} ${product.flavor} to cart`}>
            <Plus /> Add
          </Button>
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </article>
  );
}

function QuickView({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { add } = useCart();
  const [weight, setWeight] = useState(product.weights[0]?.label ?? "");
  const option = product.weights.find((w) => w.label === weight);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden border-border bg-surface p-0 sm:max-w-3xl">
        <div className="grid md:grid-cols-2">
          <img src={product.image} alt={`${product.name} ${product.flavor}`} className="aspect-square w-full object-cover" />
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <span className="eyebrow">{product.flavor}</span>
            <DialogTitle className="font-display text-4xl text-foreground">{product.name}</DialogTitle>
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-muted-foreground">({product.reviewCount} sample ratings)</span>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">{product.description}</DialogDescription>
            <div className="flex gap-2" role="radiogroup" aria-label="Weight">
              {product.weights.map((w) => (
                <button
                  key={w.label}
                  type="button"
                  role="radio"
                  aria-checked={weight === w.label}
                  onClick={() => setWeight(w.label)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors aria-checked:border-primary aria-checked:bg-accent aria-checked:text-primary"
                >
                  {w.label}
                </button>
              ))}
            </div>
            <span className="font-display text-4xl">{option ? formatINR(option.price) : ""}</span>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Button
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={() => {
                  add(product.id, weight);
                  onOpenChange(false);
                }}
              >
                Add to cart
              </Button>
              <Button asChild variant="line" size="xl" className="flex-1">
                <Link to="/products/$slug" params={{ slug: product.slug }}>
                  Full details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
