"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Entrance on scroll. Content is fully visible without JS and under
 * prefers-reduced-motion; only transform + opacity are animated.
 * Variants differ so neighboring sections never repeat the same entrance.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.style.transitionDelay = `${delay}ms`;
    el.dataset.variant = variant;
    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
