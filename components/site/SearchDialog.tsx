import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PRODUCTS, filterProducts, formatINR } from "@/lib/products";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const results = filterProducts(PRODUCTS, { query });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] translate-y-0 gap-0 overflow-hidden border-border bg-surface p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
            void navigate({ to: "/shop", search: { q: query || undefined } });
          }}
          className="flex items-center gap-3 border-b border-border px-5"
        >
          <Search className="h-5 w-5 text-primary" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search whey, gainer, chocolate…"
            className="h-16 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </form>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">No products match “{query}”.</li>
          )}
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                onClick={() => onOpenChange(false)}
                className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-foreground/5"
              >
                <img src={p.image} alt="" className="h-14 w-14 rounded-md object-cover" loading="lazy" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.flavor} · {formatINR(p.weights[0]?.price ?? 0)}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
