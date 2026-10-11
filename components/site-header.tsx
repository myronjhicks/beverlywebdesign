"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

const MENU_ITEMS = [
  { href: "/#services", label: "Websites" },
  { href: "/ai-workflows", label: "AI workflows" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

const PHONE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export function SiteHeader() {
  // On the AI page, the CTA stays on that page's form (preselected to "AI workflow").
  const ctaHref = usePathname() === "/ai-workflows" ? SITE.aiContactHref : "/#contact";
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 40rem)");
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 h-[68px] border-b border-line bg-paper/95 backdrop-blur"
    >
      <div className="page-wrap flex h-full items-center justify-between gap-2 sm:gap-3">
        <Link
          href="/"
          className="tap shrink-0 font-display text-[16px] font-bold tracking-[-0.03em] text-ink sm:text-[17px]"
        >
          {SITE.name}
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-5">
          <Link
            href="/ai-workflows"
            className="tap hidden text-[15px] font-medium text-ink underline-offset-4 hover:underline sm:inline-flex"
          >
            AI workflows
          </Link>

          <a
            href={`tel:${SITE.phoneTel}`}
            className="tap hidden gap-2 text-[15px] font-medium text-ink hover:underline sm:inline-flex"
            aria-label={`Call ${SITE.phoneDisplay}`}
          >
            {PHONE_ICON}
            <span>{SITE.phoneDisplay}</span>
          </a>

          <a href={ctaHref} className="btn btn-primary btn-header whitespace-nowrap">
            Start a project
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Site"
          className="menu-panel absolute inset-x-0 top-full border-b border-line bg-paper sm:hidden"
        >
          <ul className="page-wrap py-2">
            {MENU_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  className="tap w-full text-[17px] font-medium text-ink"
                  onClick={() => close(true)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="tap w-full gap-2 text-[17px] font-semibold text-ink"
                onClick={() => close(true)}
              >
                {PHONE_ICON}
                Call {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
