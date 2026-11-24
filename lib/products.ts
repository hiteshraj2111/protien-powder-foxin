import wheyChocolate from "@/assets/whey-chocolate.jpg";
import wheyVanilla from "@/assets/whey-vanilla.jpg";
import massGainer from "@/assets/mass-gainer.jpg";
import plantProtein from "@/assets/plant-protein.jpg";
import aboutLifestyle from "@/assets/about-lifestyle.jpg";
import heroTub from "@/assets/hero-tub.jpg";

export type Category = "whey" | "gainer" | "plant";

export interface WeightOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  line: string; // products sharing a line are flavor variants of each other
  flavor: string;
  category: Category;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  short: string;
  description: string;
  weights: WeightOption[];
}

export const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "whey", label: "Whey Protein" },
  { value: "gainer", label: "Mass Gainer" },
  { value: "plant", label: "Plant Protein" },
];

// Sample listings. 1 KG prices come from the brand brief; 2 KG prices are placeholders.
export const PRODUCTS: Product[] = [
  {
    id: "whey-chocolate",
    slug: "whey-protein-chocolate",
    name: "FOXIN Whey Protein",
    line: "whey",
    flavor: "Chocolate",
    category: "whey",
    image: wheyChocolate,
    gallery: [wheyChocolate, aboutLifestyle, heroTub],
    rating: 4.8,
    reviewCount: 128,
    badge: "Bestseller",
    short: "Rich chocolate whey for your daily protein routine.",
    description:
      "A rich, smooth chocolate whey protein made to fit easily into your daily routine — after training, with breakfast, or whenever you need a convenient protein boost.",
    weights: [
      { label: "1 KG", price: 2499 },
      { label: "2 KG", price: 4699 },
    ],
  },
  {
    id: "whey-vanilla",
    slug: "whey-protein-vanilla",
    name: "FOXIN Whey Protein",
    line: "whey",
    flavor: "Vanilla",
    category: "whey",
    image: wheyVanilla,
    gallery: [wheyVanilla, aboutLifestyle, heroTub],
    rating: 4.7,
    reviewCount: 96,
    short: "Creamy vanilla whey that blends into anything.",
    description:
      "Creamy vanilla whey protein that mixes easily with water or milk and works great in smoothies, oats and shakes.",
    weights: [
      { label: "1 KG", price: 2499 },
      { label: "2 KG", price: 4699 },
    ],
  },
  {
    id: "gainer-chocolate",
    slug: "mass-gainer-chocolate",
    name: "FOXIN Mass Gainer",
    line: "gainer",
    flavor: "Chocolate",
    category: "gainer",
    image: massGainer,
    gallery: [massGainer, aboutLifestyle],
    rating: 4.6,
    reviewCount: 74,
    badge: "New",
    short: "Calorie-dense chocolate shake for big training days.",
    description:
      "A chocolate mass gainer for people with high daily calorie needs, combining carbohydrates and protein in one convenient shake.",
    weights: [
      { label: "1 KG", price: 1899 },
      { label: "2 KG", price: 3499 },
    ],
  },
  {
    id: "plant-natural",
    slug: "plant-protein-natural",
    name: "FOXIN Plant Protein",
    line: "plant",
    flavor: "Natural",
    category: "plant",
    image: plantProtein,
    gallery: [plantProtein, aboutLifestyle],
    rating: 4.7,
    reviewCount: 52,
    short: "Unflavoured plant protein for a dairy-free routine.",
    description:
      "An unflavoured plant-based protein blend for anyone who prefers a dairy-free option. Add it to smoothies, bowls or your favourite recipes.",
    weights: [
      { label: "1 KG", price: 2199 },
      { label: "2 KG", price: 4099 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFlavorSiblings(product: Product): Product[] {
  return PRODUCTS.filter((p) => p.line === product.line);
}

export function filterProducts(
  products: Product[],
  { query, category }: { query?: string; category?: Category | "all" },
): Product[] {
  const q = (query ?? "").trim().toLowerCase();
  return products.filter((p) => {
    if (category && category !== "all" && p.category !== category) return false;
    if (!q) return true;
    return [p.name, p.flavor, p.short, p.category].join(" ").toLowerCase().includes(q);
  });
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value: number): string {
  return inr.format(value);
}
