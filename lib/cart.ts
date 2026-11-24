// Pure cart logic — kept framework-free so it can be unit tested.

export interface CartLine {
  productId: string;
  weight: string;
  unitPrice: number;
  quantity: number;
}

export const MAX_QTY = 10;

export function lineKey(line: Pick<CartLine, "productId" | "weight">): string {
  return `${line.productId}__${line.weight}`;
}

export function addLine(cart: CartLine[], item: CartLine): CartLine[] {
  const key = lineKey(item);
  const existing = cart.find((l) => lineKey(l) === key);
  if (existing) {
    return cart.map((l) =>
      lineKey(l) === key ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + item.quantity) } : l,
    );
  }
  return [...cart, { ...item, quantity: Math.min(MAX_QTY, Math.max(1, item.quantity)) }];
}

export function removeLine(cart: CartLine[], key: string): CartLine[] {
  return cart.filter((l) => lineKey(l) !== key);
}

export function setQuantity(cart: CartLine[], key: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeLine(cart, key);
  return cart.map((l) =>
    lineKey(l) === key ? { ...l, quantity: Math.min(MAX_QTY, Math.floor(quantity)) } : l,
  );
}

export function cartCount(cart: CartLine[]): number {
  return cart.reduce((n, l) => n + l.quantity, 0);
}

export function cartSubtotal(cart: CartLine[]): number {
  return cart.reduce((n, l) => n + l.unitPrice * l.quantity, 0);
}

export function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (l): l is CartLine =>
        typeof l === "object" &&
        l !== null &&
        typeof (l as CartLine).productId === "string" &&
        typeof (l as CartLine).weight === "string" &&
        typeof (l as CartLine).unitPrice === "number" &&
        typeof (l as CartLine).quantity === "number" &&
        (l as CartLine).quantity > 0,
    );
  } catch {
    return [];
  }
}
