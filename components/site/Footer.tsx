import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const linkCls = "text-sm text-muted-foreground transition-colors hover:text-primary";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 font-display text-3xl text-primary">Fuel your power.</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Premium sports nutrition for people who show up every day.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
              { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`FOXIN on ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Quick links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className={linkCls}>Home</Link></li>
            <li><Link to="/shop" className={linkCls}>Shop</Link></li>
            <li><Link to="/about" className={linkCls}>About</Link></li>
            <li><Link to="/benefits" className={linkCls}>Benefits</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Shop</h3>
          <ul className="space-y-3">
            <li><Link to="/shop" search={{ category: "whey" }} className={linkCls}>Whey Protein</Link></li>
            <li><Link to="/shop" search={{ category: "gainer" }} className={linkCls}>Mass Gainer</Link></li>
            <li><Link to="/shop" search={{ category: "plant" }} className={linkCls}>Plant Protein</Link></li>
            <li><Link to="/contact" className={linkCls}>Customer support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> hello@foxin.in</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>Copyright © 2026 FOXIN. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
