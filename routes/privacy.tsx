import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FOXIN" },
      { name: "description", content: "FOXIN Privacy Policy." },
      { property: "og:title", content: "FOXIN Privacy Policy" },
      { property: "og:description", content: "Read the FOXIN Privacy Policy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl px-5 py-20 text-muted-foreground md:px-8">
        <p>
          Placeholder: the full Privacy Policy for FOXIN will be published here before launch. For questions,
          contact hello@foxin.in.
        </p>
      </section>
    </>
  ),
});
