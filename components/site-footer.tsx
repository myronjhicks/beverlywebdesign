import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-[14px] text-paper/85">
      <div className="page-wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-[20px] font-bold tracking-[-0.03em] text-paper">
            {SITE.name}
          </p>
          <p className="mt-1">
            {SITE.neighborhood}, {SITE.city}, {SITE.region}
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a href={`tel:${SITE.phoneTel}`} className="tap underline-offset-4 hover:text-paper hover:underline">
            {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} className="tap underline-offset-4 hover:text-paper hover:underline">
            {SITE.email}
          </a>
          <p className="mt-2">
            Built by{" "}
            <a
              href="https://beverlywebdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-paper underline underline-offset-4"
            >
              Beverly Web Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
