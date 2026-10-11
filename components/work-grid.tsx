import Image from "next/image";
import { CLIENTS, type Client } from "@/lib/site";

const TONES: Record<NonNullable<Client["tone"]>, string> = {
  clay: "bg-clay text-paper",
  moss: "bg-moss text-paper",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-paper",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) || /^\d/.test(w))
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function FeaturedCase({ c, flip }: { c: Client; flip: boolean }) {
  return (
    <li className="grid items-center gap-6 desk:grid-cols-[1.25fr_1fr] desk:gap-12">
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`work-thumb group rounded-[20px] border border-line ${flip ? "desk:order-2" : ""}`}
        aria-label={`${c.name} (${c.domain}), opens in a new tab`}
      >
        {c.image && (
          <Image
            src={c.image}
            alt={c.imageAlt ?? `${c.name} homepage`}
            fill
            sizes="(min-width: 860px) 600px, calc(100vw - 48px)"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </a>
      <div>
        <h3 className="title-md">{c.name}</h3>
        <dl className="mt-4 space-y-4 text-[16px]">
          <div>
            <dt className="font-semibold">What we built</dt>
            <dd className="mt-1 text-mute">{c.description}</dd>
          </div>
          <div>
            <dt className="font-semibold">What it does</dt>
            <dd className="mt-1 text-mute">{c.outcome}</dd>
          </div>
        </dl>
        <a
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="tap mt-3 gap-2 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
        >
          Visit {c.domain}
          <span aria-hidden="true">&rarr;</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}

function SecondaryEntry({ c }: { c: Client }) {
  return (
    <li className="flex items-start gap-4 border-t border-line py-5">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] ${TONES[c.tone ?? "ink"]}`}
        aria-hidden="true"
      >
        <span className="font-display text-[20px] font-semibold tracking-[-0.03em]">
          {initials(c.name)}
        </span>
      </div>
      <div>
        <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em]">{c.name}</h3>
        <p className="mt-1 text-[16px] text-mute">{c.description}</p>
        <a
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="tap gap-2 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
        >
          {c.domain}
          <span aria-hidden="true">&rarr;</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}

export function WorkGrid() {
  const featured = CLIENTS.filter((c) => c.featured);
  const rest = CLIENTS.filter((c) => !c.featured);
  return (
    <>
      <ul className="mt-12 space-y-14 desk:space-y-20" role="list">
        {featured.map((c, i) => (
          <FeaturedCase key={c.domain} c={c} flip={i % 2 === 1} />
        ))}
      </ul>
      <div className="mt-16 desk:mt-20">
        <h3 className="title-md">Also built</h3>
        <ul className="mt-4 desk:grid desk:grid-cols-2 desk:gap-x-12" role="list">
          {rest.map((c) => (
            <SecondaryEntry key={c.domain} c={c} />
          ))}
        </ul>
      </div>
    </>
  );
}
