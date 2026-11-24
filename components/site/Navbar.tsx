import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/benefits", label: "Benefits" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/95 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-background/30 py-5 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="relative text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="icon" size="icon" aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <Search />
          </Button>
          <Button
            variant="icon"
            size="icon"
            aria-label={`Open cart, ${count} items`}
            onClick={() => setOpen(true)}
            className="relative"
          >
            <ShoppingBag />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-primary-foreground shadow-glow-sm">
                {count}
              </span>
            )}
          </Button>
          <Button asChild variant="hero" size="pill" className="ml-2 hidden sm:inline-flex">
            <Link to="/shop">Shop now</Link>
          </Button>
          <Button
            variant="icon"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="flex w-full flex-col border-border bg-background sm:max-w-sm">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Logo />
          <ul className="mt-10 flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-border py-4 font-display text-4xl text-foreground transition-colors hover:text-primary data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="hero" size="xl" className="mt-auto">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop now
            </Link>
          </Button>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
