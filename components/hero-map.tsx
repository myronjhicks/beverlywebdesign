"use client";

import { useEffect, useRef } from "react";

/**
 * Abstract Chicago street grid. Customers (dots) travel along the streets to
 * the pin in Beverly (south-west). Transform + opacity only. Pauses offscreen
 * and when the tab is hidden. Static composition under reduced motion / no JS.
 */

const XS = [40, 100, 160, 220, 280, 340, 400];
const YS = [25, 75, 125, 175, 225, 275];
const PIN = { x: 100, y: 225 };
const ARTERIAL_X = 220;
const ARTERIAL_Y = 125;

type Pt = [number, number];

// Each route follows grid lines only (horizontal or vertical legs).
const ROUTES: Pt[][] = [
  [[400, 75], [100, 75], [100, 225]],
  [[340, 275], [100, 275], [100, 225]],
  [[220, 25], [220, 225], [100, 225]],
  [[400, 175], [160, 175], [160, 225], [100, 225]],
  [[40, 75], [40, 225], [100, 225]],
];

const PERIOD = 8.4; // seconds per dot cycle
const STAGGER = 1.7;
const FADE_IN = 0.5;
const TRAVEL = 4.6;
const FADE_OUT = 0.35;
const RING = 1.4;
const START_DELAY = 0.9;
const STATIC_PROGRESS = [0.55, 0.4, 0.62, 0.3, 0.7];

const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

const LENGTHS = ROUTES.map((r) => {
  const segs = r.slice(1).map((p, i) => Math.abs(p[0] - r[i][0]) + Math.abs(p[1] - r[i][1]));
  return { segs, total: segs.reduce((a, b) => a + b, 0) };
});

function pointAt(route: number, progress: number): Pt {
  const r = ROUTES[route];
  const { segs, total } = LENGTHS[route];
  let d = progress * total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const f = segs[i] === 0 ? 1 : Math.min(d / segs[i], 1);
      return [r[i][0] + (r[i + 1][0] - r[i][0]) * f, r[i][1] + (r[i + 1][1] - r[i][1]) * f];
    }
    d -= segs[i];
  }
  return r[r.length - 1];
}

export function HeroMap() {
  const rootRef = useRef<SVGSVGElement>(null);
  const pinRef = useRef<SVGGElement>(null);
  const dotRefs = useRef<(SVGGElement | null)[]>([]);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const svg = rootRef.current;
    if (!svg) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // keep static composition

    let raf = 0;
    let visible = true;
    let last = 0;
    let elapsed = 0;

    const render = (t: number) => {
      // Pin drop (0 to 0.8s)
      const pp = Math.min(Math.max(t / 0.8, 0), 1);
      const drop = 1 - Math.pow(1 - pp, 3);
      pinRef.current?.setAttribute("transform", `translate(${PIN.x} ${PIN.y - (1 - drop) * 36})`);
      if (pinRef.current) pinRef.current.style.opacity = String(Math.min(pp * 2.5, 1));

      const ct = t - START_DELAY;
      ROUTES.forEach((_, i) => {
        const dot = dotRefs.current[i];
        const ring = ringRefs.current[i];
        if (!dot || !ring) return;
        if (ct < 0) {
          dot.style.opacity = "0";
          ring.style.opacity = "0";
          return;
        }
        const local = (((ct - i * STAGGER) % PERIOD) + PERIOD) % PERIOD;
        const started = ct - i * STAGGER >= 0;
        const travelEnd = FADE_IN + TRAVEL;
        let op = 0;
        let prog = 0;
        if (started) {
          if (local < FADE_IN) {
            op = local / FADE_IN;
          } else if (local < travelEnd) {
            op = 1;
            prog = ease((local - FADE_IN) / TRAVEL);
          } else if (local < travelEnd + FADE_OUT) {
            op = 1 - (local - travelEnd) / FADE_OUT;
            prog = 1;
          }
        }
        const [x, y] = pointAt(i, prog);
        dot.setAttribute("transform", `translate(${x} ${y})`);
        dot.style.opacity = String(op);

        let rop = 0;
        let rs = 0.6;
        if (started && local >= travelEnd && local < travelEnd + RING) {
          const q = (local - travelEnd) / RING;
          rs = 0.6 + 1.9 * (1 - Math.pow(1 - q, 3));
          rop = 0.55 * (1 - q);
        }
        ring.style.opacity = String(rop);
        ring.setAttribute("transform", `translate(${PIN.x} ${PIN.y}) scale(${rs})`);
      });
    };

    const tick = (now: number) => {
      if (!last) last = now;
      elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      render(elapsed);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    render(0);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(svg);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    const onMotion = () => {
      if (mq.matches) stop();
    };
    mq.addEventListener("change", onMotion);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMotion);
    };
  }, []);

  const line = "var(--color-mute)";
  const accent = "var(--color-accent)";

  return (
    <div role="img" aria-label="Map of Chicago streets with customers heading to your shop" className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-line bg-elevated shadow-[0_24px_50px_-28px_rgb(23_33_28/0.5)]">
      <svg
        ref={rootRef}
        viewBox="0 0 480 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {/* Lakefront (east) */}
        <path
          d="M434 0 C426 50 442 110 431 170 S438 250 430 300 L480 300 L480 0 Z"
          fill="var(--color-moss)"
          opacity="0.12"
        />
        <path
          d="M446 20 C452 24 458 24 464 20 M452 120 C458 124 464 124 470 120 M446 220 C452 224 458 224 464 220"
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Local streets */}
        <g stroke={line} strokeWidth="1.5" fill="none" opacity="0.38">
          {XS.filter((x) => x !== ARTERIAL_X).map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" />
          ))}
          {YS.filter((y) => y !== ARTERIAL_Y).map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="432" y2={y} />
          ))}
        </g>

        {/* Arterials and diagonal */}
        <g stroke={line} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.62">
          <line x1={ARTERIAL_X} y1="0" x2={ARTERIAL_X} y2="300" />
          <line x1="0" y1={ARTERIAL_Y} x2="432" y2={ARTERIAL_Y} />
          <line x1="0" y1="300" x2="262" y2="0" strokeWidth="3" />
        </g>

        {/* Pulse rings at the pin */}
        {ROUTES.map((_, i) => (
          <circle
            key={`r${i}`}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
            r="18"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            opacity="0"
            transform={`translate(${PIN.x} ${PIN.y}) scale(0.6)`}
          />
        ))}

        {/* Customers */}
        {ROUTES.map((_, i) => {
          const [x, y] = pointAt(i, STATIC_PROGRESS[i]);
          return (
            <g
              key={`d${i}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              transform={`translate(${x} ${y})`}
            >
              <circle r="14" fill={accent} opacity="0.2" />
              <circle r="7.5" fill={accent} />
            </g>
          );
        })}

        {/* Pin (tip sits on the intersection) */}
        <g ref={pinRef} transform={`translate(${PIN.x} ${PIN.y})`}>
          <ellipse cx="0" cy="0" rx="7" ry="2.5" fill="var(--color-ink)" opacity="0.2" />
          <path
            d="M0 0 C-4 -9 -12 -15 -12 -24 A12 12 0 1 1 12 -24 C12 -15 4 -9 0 0 Z"
            fill="var(--color-ink)"
          />
          <circle cx="0" cy="-24" r="5" fill="var(--color-paper)" />
        </g>

        <text
          x={PIN.x + 18}
          y={PIN.y - 20}
          fontSize="15"
          fontWeight="600"
          fill="var(--color-ink)"
          stroke="var(--color-elevated)"
          strokeWidth="4"
          strokeLinejoin="round"
          paintOrder="stroke"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          Your shop
        </text>
      </svg>
    </div>
  );
}
