import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — FOXIN" },
      { name: "description", content: "FOXIN Terms & Conditions." },
      { property: "og:title", content: "FOXIN Terms & Conditions" },
      { property: "og:description", content: "Read the FOXIN Terms & Conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms &amp; Conditions" />
      <section className="mx-auto max-w-3xl px-5 py-20 text-muted-foreground md:px-8">
        <p>
          Placeholder: the full Terms & Conditions for FOXIN will be published here before launch. For questions,
          contact hello@foxin.in.
        </p>
      </section>
    </>
  ),
});
