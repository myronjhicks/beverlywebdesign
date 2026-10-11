import { HeroMap } from "@/components/hero-map";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { WorkGrid } from "@/components/work-grid";
import { BeforeAfter } from "@/components/before-after";
import { FAQ, PAIN_POINTS, PRICING, PROCESS_STEPS, SERVICES, SITE, WORKFLOW_AUDIT } from "@/lib/site";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      {/* 2. Hero: one CTA, one trust line */}
      <section className="page-wrap pb-16 pt-12 desk:pb-24 desk:pt-20" aria-labelledby="hero-heading">
        <div className="grid items-center gap-10 desk:grid-cols-[1.1fr_0.9fr] desk:gap-14">
          <div>
            <h1 id="hero-heading" className="display-h1 hero-in max-w-[15ch]">
              A website that gets Chicago customers to <span className="text-accent">call you.</span>
            </h1>
            <p className="lead hero-in mt-6 max-w-[34rem] desk:text-[19px]" style={delay(120)}>
              Custom sites for local businesses, live in 3–4 weeks.
            </p>
            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={delay(240)}>
              <a href="#contact" className="btn btn-primary">
                Start a project
              </a>
              <a href="/ai-workflows" className="btn btn-secondary">
                See how we take busywork off your plate
              </a>
            </div>
            <p className="hero-in mt-6 max-w-[30rem] text-[15px] text-mute" style={delay(320)}>
              13+ years building production software. Senior fintech engineer.
            </p>
          </div>
          <div className="hero-in" style={delay(180)}>
            <HeroMap />
          </div>
        </div>
      </section>

      {/* 3. Who it's for */}
      <section className="page-wrap pb-16 desk:pb-24" aria-labelledby="who-heading">
        <Reveal className="border-t-2 border-ink pt-8 desk:grid desk:grid-cols-[200px_1fr] desk:gap-10">
          <h2 id="who-heading" className="section-label text-ink">
            Who it’s for
          </h2>
          <div className="mt-3 desk:mt-0">
            <p className="display-h2 max-w-[20ch]">
              Your site looks fine. Your phone isn’t ringing.
            </p>
            <ul className="mt-8 max-w-[40rem]">
              {PAIN_POINTS.map((p) => (
                <li key={p} className="border-t border-line py-4 text-[17px] text-ink">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 4. Services: one lead item, two supporting rows */}
      <section id="services" className="anchor-offset page-wrap pb-20 desk:pb-28" aria-labelledby="services-heading">
        <Reveal variant="left">
          <h2 id="services-heading" className="display-h2 max-w-[18ch]">
            What we build for you.
          </h2>
          <div className="mt-10">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`grid gap-3 border-t border-line py-7 desk:grid-cols-[1fr_1.4fr] desk:gap-12 ${
                  i === 0 ? "desk:py-12" : ""
                }`}
              >
                <h3 className={i === 0 ? "display-h2" : "title-md"}>{s.title}</h3>
                <p className={`text-mute ${i === 0 ? "text-[19px]" : "text-[17px]"}`}>{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3b. AI workflows: second offer, dark band (right after services) */}
      <section id="ai-workflows" className="anchor-offset bg-ink text-paper" aria-labelledby="ai-workflows-heading">
        <div className="page-wrap band-pad">
          <Reveal variant="scale" className="grid gap-12 desk:grid-cols-[1fr_1.05fr] desk:gap-16">
            <div>
              <h2 id="ai-workflows-heading" className="display-h2 max-w-[17ch]">
                You didn&rsquo;t open a shop to do paperwork at 9pm.
              </h2>
              <p className="mt-6 max-w-[34rem] text-[17px] text-paper/85 desk:text-[18px]">
                We set up simple automations that answer, follow up, and keep track, so you&rsquo;re
                not doing it at 9pm. Built by an engineer who builds systems that have to work every
                time.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a href={SITE.aiContactHref} className="btn btn-light">
                  Start a project
                </a>
                <a href="/ai-workflows" className="tap text-[15px] font-semibold text-paper underline-offset-4 hover:underline">
                  How it works &rarr;
                </a>
              </div>
            </div>
            <BeforeAfter dark />
          </Reveal>
        </div>
      </section>

      {/* 5. How it works + timeline */}
      <section className="bg-sand" aria-labelledby="process-heading">
        <div className="page-wrap band-pad">
          <Reveal>
            <div className="desk:flex desk:items-end desk:justify-between desk:gap-10">
              <h2 id="process-heading" className="display-h2 max-w-[16ch]">
                Three steps. No black box.
              </h2>
              <p className="mt-4 font-display text-[28px] font-semibold tracking-[-0.03em] desk:mt-0">
                Live in 3–4 weeks.
              </p>
            </div>
            <ol className="mt-12 grid gap-10 desk:grid-cols-3 desk:gap-8">
              {PROCESS_STEPS.map((step) => (
                <li key={step.label} className="border-t-2 border-ink pt-6">
                  <p className="text-[15px] font-semibold text-accent-deep">{step.when}</p>
                  <p className="mt-3 text-[16px] font-semibold tracking-[-0.01em]">
                    {step.num}. {step.label}
                  </p>
                  <h3 className="title-md mt-3">{step.title}</h3>
                  <p className="mt-3 text-[16px] text-ink/80">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 6. Portfolio */}
      <section id="work" className="anchor-offset section-pad page-wrap" aria-labelledby="work-heading">
        <Reveal variant="scale">
          <h2 id="work-heading" className="display-h2 max-w-[16ch]">
            Built, live, and in use.
          </h2>
          <p className="lead mt-5 max-w-[36rem]">
            Real sites for real Chicago organizations. Open any of them.
          </p>
          <WorkGrid />
        </Reveal>
      </section>

      {/* 8. Pricing: website primary, busywork audit secondary */}
      <section id="pricing" className="anchor-offset page-wrap py-20 desk:py-28" aria-labelledby="pricing-heading">
        <Reveal variant="left" className="grid gap-6 desk:grid-cols-[3fr_2fr] desk:items-start">
          <div className="rounded-[20px] border border-line bg-elevated p-6 sm:p-10 desk:grid desk:grid-cols-2 desk:gap-10">
            <div>
              <h2 id="pricing-heading" className="display-h2 max-w-[14ch]">
                {PRICING.name}
              </h2>
              <p className="mt-8 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-accent-deep">
                {PRICING.price}
              </p>
              <p className="mt-3 text-[16px] text-mute">{PRICING.note}</p>
              <a href="#contact" className="btn btn-primary mt-8">
                Start a project
              </a>
            </div>
            <div className="mt-10 desk:mt-0">
              <h3 className="title-md">What&rsquo;s included</h3>
              <ul className="mt-4">
                {PRICING.includes.map((item) => (
                  <li key={item} className="border-t border-line py-3 text-[16px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-[20px] border border-line p-6 sm:p-8">
            <h3 className="title-md">{WORKFLOW_AUDIT.name}</h3>
            <p className="mt-5 font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-accent-deep">
              {WORKFLOW_AUDIT.price}
            </p>
            <p className="mt-3 text-[15px] text-mute">{WORKFLOW_AUDIT.note}</p>
            <ul className="mt-5">
              {WORKFLOW_AUDIT.includes.map((item) => (
                <li key={item} className="border-t border-line py-3 text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
            <a href={SITE.aiContactHref} className="btn btn-secondary mt-6">
              Start a project
            </a>
          </div>
        </Reveal>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="anchor-offset page-wrap pb-20 desk:pb-28" aria-labelledby="faq-heading">
        <Reveal className="desk:grid desk:grid-cols-[1fr_1.6fr] desk:gap-16">
          <h2 id="faq-heading" className="display-h2 max-w-[12ch]">
            Questions we hear first.
          </h2>
          <div className="mt-8 desk:mt-0">
            {FAQ.map((item) => (
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

      {/* 9. About */}
      <section id="about" className="anchor-offset bg-ink text-paper" aria-labelledby="about-heading">
        <div className="page-wrap band-pad">
          <Reveal variant="left">
            <h2 id="about-heading" className="display-h2 max-w-[18ch]">
              You talk to the person who writes the code.
            </h2>
            <p className="mt-6 max-w-[40rem] text-[17px] text-paper/85 desk:text-[18px]">
              Beverly Web Design is one senior engineer with 13+ years of building production
              software, and a senior fintech engineer by trade. That is work where the site has to
              stay up and the numbers have to be right. Your website gets the same habits.
            </p>
            <p className="mt-5 max-w-[36rem] text-[17px] text-paper/85 desk:text-[18px]">
              No account managers, no hand-offs. If you want a template and a long chain of
              people, wrong shop.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact form: the single CTA destination */}
      <section id="contact" className="anchor-offset section-pad page-wrap" aria-labelledby="contact-heading">
        <Reveal className="grid items-start gap-12 desk:grid-cols-2 desk:gap-16">
          <div>
            <h2 id="contact-heading" className="display-h2 max-w-[14ch]">
              Tell us what you need built.
            </h2>
            <p className="lead mt-6 max-w-[28rem]">
              A site, a redesign, or a store. We’ll tell you straight if we’re the right people for
              it.
            </p>
            <div className="mt-8 space-y-2">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="block text-[28px] font-semibold tracking-[-0.02em] text-ink"
              >
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="block text-[16px] text-ink">
                {SITE.email}
              </a>
            </div>
          </div>

          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
