import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import {
  addLine,
  cartCount,
  cartSubtotal,
  parseStoredCart,
  removeLine,
  setQuantity,
  type CartLine,
} from "./cart";
import { getProductById } from "./products";

const STORAGE_KEY = "foxin-cart-v1";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (productId: string, weight: string, quantity?: number) => void;
  remove: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Read persisted cart after hydration to avoid SSR mismatches.
  useEffect(() => {
    setLines(parseStoredCart(window.localStorage.getItem(STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((productId: string, weight: string, quantity = 1) => {
    const product = getProductById(productId);
    const option = product?.weights.find((w) => w.label === weight);
    if (!product || !option) return;
    setLines((prev) => addLine(prev, { productId, weight, unitPrice: option.price, quantity }));
    toast.success(`${product.name} – ${product.flavor} added`, {
      description: `${weight} × ${quantity}`,
      action: { label: "View cart", onClick: () => setOpen(true) },
    });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines),
      isOpen,
      setOpen,
      add,
      remove: (key) => setLines((prev) => removeLine(prev, key)),
      updateQuantity: (key, q) => setLines((prev) => setQuantity(prev, key, q)),
      clear: () => setLines([]),
    }),
    [lines, isOpen, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
