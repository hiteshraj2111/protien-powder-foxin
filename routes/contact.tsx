import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FOXIN — Customer Support" },
      { name: "description", content: "Questions about orders or products? Get in touch with the FOXIN team." },
      { property: "og:title", content: "Contact FOXIN" },
      { property: "og:description", content: "Reach the FOXIN team for product and order support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(1000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "w-full rounded-xl border border-input bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none aria-invalid:border-destructive";

function ContactPage() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(values);
    if (!res.success) {
      const next: Errors = {};
      for (const issue of res.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setValues({ name: "", email: "", message: "" });
    toast.success("Message received!", { description: "Demo form — messages aren't sent anywhere yet." });
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Let's <span className="text-primary">talk.</span></>} subtitle="Questions about products or orders? We're here to help." />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-5">
          <Reveal className="space-y-4 lg:col-span-2">
            {[
              { icon: Mail, label: "Email", value: "hello@foxin.in" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Location", value: "Mumbai, India" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-5 rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                  <p className="font-bold text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={120} className="lg:col-span-3">
            <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-surface p-6 md:p-10">
              {(["name", "email"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={`contact-${k}`} className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">
                    {k === "name" ? "Your name" : "Email"}
                  </label>
                  <input
                    id={`contact-${k}`}
                    type={k === "email" ? "email" : "text"}
                    value={values[k]}
                    onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
                    aria-invalid={!!errors[k]}
                    className={field}
                  />
                  {errors[k] && <p className="mt-2 text-xs text-destructive">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em]">Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  aria-invalid={!!errors.message}
                  className={field}
                />
                {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" variant="hero" size="xl" className="w-full">Send message</Button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
