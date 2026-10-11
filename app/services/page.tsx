import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom websites, redesigns, online stores, and AI workflow consulting for Chicago businesses.",
};

export default function ServicesPage() {
  return (
    <div className="page-wrap section-pad">
      <div className="grid gap-10 desk:grid-cols-2">
        <article className="rounded-[12px] border border-line bg-elevated p-8">
          <h1 className="display-h2 max-w-[16ch]">Sites built to get you found and chosen.</h1>
          <p className="lead mt-4">
            Fast, clear sites set up so Chicago customers can actually reach you.
          </p>
          <a href="/#contact" className="tap mt-6 text-ink">
            Start a project
          </a>
        </article>
        <article className="rounded-[12px] bg-ink p-8 text-paper">
          <h2 className="display-h2">Automation, after launch.</h2>
          <p className="mt-4 text-[16px] text-paper/85">
            Once the site is working, we can set up simple workflows for follow-up, intake, and
            scheduling, so fewer customers slip through.
          </p>
          <a href="/ai-workflows" className="tap mt-4 font-semibold text-paper underline-offset-4 hover:underline">
            How AI workflows work &rarr;
          </a>
        </article>
      </div>
    </div>
  );
}
