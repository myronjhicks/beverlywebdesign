"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { PROJECT_TYPES } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  defaultProjectType = "New website",
}: {
  defaultProjectType?: (typeof PROJECT_TYPES)[number];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const typeRef = useRef<HTMLSelectElement>(null);

  // Back-compat: ?type=ai still preselects "AI workflow" (read client-side, no Suspense needed).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("type") === "ai" && typeRef.current) {
      typeRef.current.value = "AI workflow";
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks. We’ve got the details and will follow up shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send right now.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      action="/api/contact"
      method="POST"
      className="relative rounded-[12px] border border-line bg-elevated p-6 sm:p-8"
      noValidate
    >
      <p className="text-[16px] font-semibold tracking-[-0.01em]">Send a message</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">
            Name <span aria-hidden="true">*</span>
          </span>
          <input
            className="field-input"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
          />
        </label>
        <label className="block">
          <span className="field-label">
            Email <span aria-hidden="true">*</span>
          </span>
          <input
            className="field-input"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
          />
        </label>
        <label className="block">
          <span className="field-label">Phone</span>
          <input className="field-input" name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="block">
          <span className="field-label">Company</span>
          <input className="field-input" name="company" type="text" autoComplete="organization" />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="field-label">Project type</span>
        <select ref={typeRef} className="field-input" name="projectType" defaultValue={defaultProjectType}>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="field-label">Project details</span>
        <textarea className="field-input" name="details" rows={5} />
      </label>

      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-mute">
        We use your phone and email only to reply about this project. No newsletters, no list
        selling.
      </p>

      <button
        type="submit"
        className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-[15px] ${status === "error" ? "text-ink" : "text-mute"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
