import type { Metadata } from "next";
import { BeforeAfter } from "@/components/before-after";
import { Reveal } from "@/components/reveal";
import { AI_EXAMPLES, AI_FAQ, AI_STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI workflows for Chicago businesses",
  description:
    "Simple automations that answer missed calls, follow up on leads, and send reminders, so Chicago business owners spend less time on busywork.",
  alternates: { canonical: "/ai-workflows" },
};

export default function AiWorkflowsPage() {
  return (
    <>
      <section className="page-wrap pb-16 pt-12 desk:pb-24 desk:pt-20" aria-labelledby="aiw-heading">
        <h1 id="aiw-heading" className="display-h1 hero-in max-w-[16ch]">
          Less busywork. Fewer missed customers.
        </h1>
        <p className="lead hero-in mt-6 max-w-[34rem] desk:text-[19px]" style={{ "--d": "120ms" } as React.CSSProperties}>
          Simple automations for the follow-up you never have time for.
        </p>
        <div className="hero-in mt-8" style={{ "--d": "240ms" } as React.CSSProperties}>
          <a href="/?type=ai#contact" className="btn btn-primary">
            Start a project
          </a>
        </div>
      </section>

      <section className="page-wrap pb-20 desk:pb-28" aria-labelledby="aiw-ba-heading">
        <h2 id="aiw-ba-heading" className="display-h2 max-w-[18ch]">
          What changes day to day.
        </h2>
        <div className="mt-10 max-w-[760px]">
          <BeforeAfter />
        </div>
      </section>

      <section className="bg-sand" aria-labelledby="aiw-how-heading">
        <div className="page-wrap band-pad">
          <Reveal>
            <h2 id="aiw-how-heading" className="display-h2 max-w-[16ch]">
              How it works
            </h2>
            <ol className="mt-12 grid gap-10 desk:grid-cols-3 desk:gap-8">
              {AI_STEPS.map((step) => (
                <li key={step.label} className="border-t-2 border-ink pt-6">
                  <p className="text-[15px] font-semibold text-accent-deep">{step.when}</p>
                  <h3 className="title-md mt-3">
                    {step.num}. {step.label}
                  </h3>
                  <p className="mt-3 text-[16px] text-ink/80">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="page-wrap section-pad" aria-labelledby="aiw-more-heading">
        <Reveal variant="left" className="desk:grid desk:grid-cols-[1fr_1.4fr] desk:gap-16">
          <h2 id="aiw-more-heading" className="display-h2 max-w-[12ch]">
            More things we can set up.
          </h2>
          <ul className="mt-8 desk:mt-0">
            {AI_EXAMPLES.map((item) => (
              <li key={item} className="border-t border-line py-4 text-[18px] last:border-b">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="page-wrap pb-20 desk:pb-28" aria-labelledby="aiw-faq-heading">
        <Reveal variant="scale" className="desk:grid desk:grid-cols-[1fr_1.6fr] desk:gap-16">
          <h2 id="aiw-faq-heading" className="display-h2 max-w-[12ch]">
            Questions we hear first.
          </h2>
          <div className="mt-8 desk:mt-0">
            {AI_FAQ.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  {item.q}
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p className="max-w-[40rem] pb-6 text-[17px] text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-ink text-paper" aria-labelledby="aiw-cta-heading">
        <div className="page-wrap py-16 desk:py-20">
          <h2 id="aiw-cta-heading" className="display-h2 max-w-[20ch]">
            Tell us where the busywork is.
          </h2>
          <a href="/?type=ai#contact" className="btn btn-light mt-8">
            Start a project
          </a>
        </div>
      </section>
    </>
  );
}
