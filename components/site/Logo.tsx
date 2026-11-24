import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Minimal geometric fox head mark. */
export function FoxMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <path d="M3 3 L12.5 10.5 H19.5 L29 3 L27 18.5 L16 29 L5 18.5 Z" fill="currentColor" />
      <path
        d="M9 15.5 L14 17.5 L12 19.5 Z M23 15.5 L18 17.5 L20 19.5 Z"
        className="fill-background"
      />
      <path d="M16 29 L13.5 23.5 H18.5 Z" className="fill-background" opacity="0.85" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="FOXIN home" className={cn("group flex items-center gap-2.5", className)}>
      <FoxMark className="text-primary transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span className="font-display text-2xl tracking-[0.08em] text-foreground">FOXIN</span>
    </Link>
  );
}
