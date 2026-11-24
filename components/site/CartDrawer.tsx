import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { lineKey, MAX_QTY } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";
import { formatINR, getProductById } from "@/lib/products";

export function QtyStepper({
  value,
  onChange,
  label,
  size = "sm",
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  size?: "sm" | "lg";
}) {
  const h = size === "lg" ? "h-12" : "h-9";
  return (
    <div className={`inline-flex ${h} items-center rounded-full border border-border bg-background`}>
      <button
        type="button"
        aria-label={`Decrease ${label} quantity`}
        onClick={() => onChange(value - 1)}
        className="flex h-full w-9 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-bold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label} quantity`}
        disabled={value >= MAX_QTY}
        onClick={() => onChange(value + 1)}
        className="flex h-full w-9 items-center justify-center text-muted-foreground transition-colors hover:text-primary disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { lines, isOpen, setOpen, subtotal, count, remove, updateQuantity } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl tracking-wide text-foreground">
            Your cart <span className="text-primary">({count})</span>
          </SheetTitle>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <p className="font-display text-3xl">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Fuel up — add your first FOXIN product.</p>
            <Button asChild variant="hero" size="pill" onClick={() => setOpen(false)}>
              <Link to="/shop">Browse products</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                const key = lineKey(line);
                return (
                  <li key={key} className="flex gap-4 py-5">
                    <img src={product.image} alt={product.name} className="h-24 w-24 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.flavor} · {line.weight}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(key)}
                          aria-label={`Remove ${product.name} ${product.flavor} from cart`}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QtyStepper
                          value={line.quantity}
                          label={product.flavor}
                          onChange={(v) => updateQuantity(key, v)}
                        />
                        <span className="font-bold tabular-nums">{formatINR(line.unitPrice * line.quantity)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border bg-surface px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Subtotal</span>
                <span className="font-display text-3xl text-foreground">{formatINR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <Button asChild variant="hero" size="xl" className="mt-5 w-full" onClick={() => setOpen(false)}>
                <Link to="/checkout">Checkout (demo)</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
