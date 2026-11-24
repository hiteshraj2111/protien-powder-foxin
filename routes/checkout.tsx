import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Info } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { lineKey } from "@/lib/cart";
import { useCart } from "@/lib/cart-context";
import { formatINR, getProductById } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout (Demo) — FOXIN" },
      { name: "description", content: "Review your FOXIN order. Demo checkout — no payment is taken." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "FOXIN Checkout" },
      { property: "og:description", content: "Demo checkout for the FOXIN store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Required").max(300),
  pincode: z.string().trim().regex(/^[0-9]{6}$/, "6-digit PIN code"),
});
type Values = z.infer<typeof schema>;
const FIELDS: { key: keyof Values; label: string; full?: boolean }[] = [
  { key: "name", label: "Full name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email", full: true },
  { key: "address", label: "Address", full: true },
  { key: "pincode", label: "PIN code" },
];

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", address: "", pincode: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [placed, setPlaced] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(values);
    if (!res.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const i of res.error.issues) {
        const k = i.path[0] as keyof Values;
        if (!next[k]) next[k] = i.message;
      }
      setErrors(next);
      return;
    }
    setPlaced(`FX-${Math.floor(100000 + Math.random() * 900000)}`);
    clear();
  };

  if (placed) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center px-5 pt-28 pb-20">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 font-display text-6xl">Order placed</h1>
          <p className="mt-4 text-muted-foreground">
            Demo order <span className="font-bold text-foreground">{placed}</span> — no payment was taken and nothing will ship.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/shop">Keep shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h1 className="font-display text-5xl md:text-7xl">Checkout</h1>
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-accent px-4 py-3 text-sm text-accent-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Demo checkout — no payment gateway is connected, so no money is charged.
        </div>

        {lines.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="font-display text-4xl">Your cart is empty</p>
            <Button asChild variant="hero" size="xl" className="mt-6">
              <Link to="/shop">Browse products</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-5">
            <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl border border-border bg-surface p-6 sm:grid-cols-2 md:p-8 lg:col-span-3">
              <h2 className="font-display text-3xl sm:col-span-2">Shipping details</h2>
              {FIELDS.map((f) => (
                <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
                  <label htmlFor={`co-${f.key}`} className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">{f.label}</label>
                  <input
                    id={`co-${f.key}`}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    aria-invalid={!!errors[f.key]}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-foreground focus:border-primary focus:outline-none aria-invalid:border-destructive"
                  />
                  {errors[f.key] && <p className="mt-1.5 text-xs text-destructive">{errors[f.key]}</p>}
                </div>
              ))}
              <Button type="submit" variant="hero" size="xl" className="sm:col-span-2">
                Place demo order · {formatINR(subtotal)}
              </Button>
            </form>

            <aside className="h-fit rounded-3xl border border-border bg-surface p-6 md:p-8 lg:col-span-2">
              <h2 className="font-display text-3xl">Order summary</h2>
              <ul className="mt-6 divide-y divide-border">
                {lines.map((l) => {
                  const p = getProductById(l.productId);
                  if (!p) return null;
                  return (
                    <li key={lineKey(l)} className="flex items-center gap-4 py-4">
                      <img src={p.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1 text-sm">
                        <p className="font-bold">{p.name}</p>
                        <p className="text-muted-foreground">{p.flavor} · {l.weight} × {l.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">{formatINR(l.unitPrice * l.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Free (demo)</span></div>
                <div className="flex items-baseline justify-between">
                  <span className="uppercase tracking-[0.2em] text-muted-foreground">Total</span>
                  <span className="font-display text-3xl">{formatINR(subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
