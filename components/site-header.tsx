import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-[68px] border-b border-line bg-paper/95 backdrop-blur">
      <div className="page-wrap flex h-full items-center justify-between gap-3">
        <Link
          href="/"
          className="tap shrink-0 font-display text-[17px] font-bold tracking-[-0.03em] text-ink"
        >
          {SITE.name}
        </Link>

        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/ai-workflows"
            className="tap hidden text-[15px] font-medium text-ink underline-offset-4 hover:underline sm:inline-flex"
          >
            AI workflows
          </Link>

          <a
            href={`tel:${SITE.phoneTel}`}
            className="tap justify-center gap-2 rounded-full text-[15px] font-medium text-ink hover:underline max-sm:w-11 max-sm:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
            aria-label={`Call ${SITE.phoneDisplay}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
            <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
          </a>

          <a href="/#contact" className="btn btn-primary btn-header whitespace-nowrap">
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
