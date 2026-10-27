import { NextResponse } from "next/server";
import { PROJECT_TYPES, SITE } from "@/lib/site";

const GITHUB_REPO = "myronjhicks/beverlywebdesign";
const LEAD_LABEL = "bwd-lead";
const GITHUB_ISSUES_URL = `https://api.github.com/repos/${GITHUB_REPO}/issues`;
const GITHUB_LABELS_URL = `https://api.github.com/repos/${GITHUB_REPO}/labels`;

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  details: string;
  company_website: string;
};

type LeadPayload = {
  source: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  details: string;
  submittedAt: string;
};

function readString(value: FormDataEntryValue | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

async function parseBody(request: Request): Promise<ContactPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Partial<ContactPayload>;
    return {
      name: (json.name ?? "").trim(),
      email: (json.email ?? "").trim(),
      phone: (json.phone ?? "").trim(),
      company: (json.company ?? "").trim(),
      projectType: (json.projectType ?? "").trim(),
      details: (json.details ?? "").trim(),
      company_website: (json.company_website ?? "").trim(),
    };
  }

  const form = await request.formData();
  return {
    name: readString(form.get("name")),
    email: readString(form.get("email")),
    phone: readString(form.get("phone")),
    company: readString(form.get("company")),
    projectType: readString(form.get("projectType")),
    details: readString(form.get("details")),
    company_website: readString(form.get("company_website")),
  };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function wantsJson(request: Request) {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

function errorResponse(request: Request, error: string, status = 400) {
  if (wantsJson(request)) {
    return NextResponse.json({ ok: false, error }, { status });
  }

  const url = new URL("/#contact", request.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function mdCell(value: string) {
  return oneLine(value).replace(/\|/g, "\\|") || "—";
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "beverlywebdesign-contact",
  };
}

function leadIssueBody(lead: LeadPayload) {
  const mailto = `mailto:${lead.email}`;
  const details = lead.details || "_(No project details)_";

  return [
    `New contact form lead from [beverlywebdesign.com](${SITE.url}).`,
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| Name | ${mdCell(lead.name)} |`,
    `| Email | [${mdCell(lead.email)}](${mailto}) |`,
    `| Phone | ${mdCell(lead.phone)} |`,
    `| Company | ${mdCell(lead.company)} |`,
    `| Project type | ${mdCell(lead.projectType)} |`,
    `| Submitted | ${mdCell(lead.submittedAt)} |`,
    "",
    "### Details",
    "",
    details,
  ].join("\n");
}

async function ensureLeadLabel(token: string) {
  const response = await fetch(GITHUB_LABELS_URL, {
    method: "POST",
    headers: githubHeaders(token),
    body: JSON.stringify({
      name: LEAD_LABEL,
      color: "1A3AFF",
      description: "Website contact form lead",
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok && response.status !== 422) {
    console.warn("Could not ensure bwd-lead label", response.status, await response.text());
  }
}

async function createLeadIssue(token: string, lead: LeadPayload) {
  await ensureLeadLabel(token);

  const issue = {
    title: `Lead: ${oneLine(lead.name)} — ${oneLine(lead.projectType)}`,
    body: leadIssueBody(lead),
    labels: [LEAD_LABEL],
  };

  const response = await fetch(GITHUB_ISSUES_URL, {
    method: "POST",
    headers: githubHeaders(token),
    body: JSON.stringify(issue),
    signal: AbortSignal.timeout(8_000),
  });

  if (response.ok) {
    return;
  }

  const detail = await response.text();
  if (response.status === 422) {
    const retry = await fetch(GITHUB_ISSUES_URL, {
      method: "POST",
      headers: githubHeaders(token),
      body: JSON.stringify({ title: issue.title, body: issue.body }),
      signal: AbortSignal.timeout(8_000),
    });

    if (retry.ok) {
      console.warn("Created lead issue without bwd-lead label", detail);
      return;
    }

    throw new Error(`GitHub issue ${retry.status}: ${await retry.text()}`);
  }

  throw new Error(`GitHub issue ${response.status}: ${detail}`);
}

async function postLeadWebhook(url: string, authorization: string | undefined, lead: LeadPayload) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authorization) {
    headers.Authorization = authorization;
  } else {
    console.warn(
      "CONTACT_WEBHOOK_URL is set but CONTACT_WEBHOOK_AUTHORIZATION is missing; posting without Authorization",
    );
  }

  const webhook = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8_000),
  });

  if (!webhook.ok) {
    throw new Error(`Webhook ${webhook.status}: ${await webhook.text()}`);
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await parseBody(request);
  } catch {
    return errorResponse(request, "Could not read the form.");
  }

  if (payload.company_website) {
    return wantsJson(request)
      ? NextResponse.json({ ok: true })
      : NextResponse.redirect(new URL("/#contact?sent=1", request.url), 303);
  }

  if (!payload.name || !isEmail(payload.email)) {
    return errorResponse(request, "Please add your name and a valid email.");
  }

  const projectType = PROJECT_TYPES.includes(
    payload.projectType as (typeof PROJECT_TYPES)[number],
  )
    ? payload.projectType
    : "Something else";

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Company: ${payload.company || "—"}`,
    `Project type: ${projectType}`,
    "",
    payload.details || "(No project details)",
  ].join("\n");

  const lead: LeadPayload = {
    source: "beverlywebdesign.com",
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    company: payload.company,
    projectType,
    details: payload.details,
    submittedAt: new Date().toISOString(),
  };

  const githubToken =
    process.env.GITHUB_LEADS_TOKEN?.trim() || process.env.GITHUB_TOKEN?.trim() || "";
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  const webhookAuthorization = process.env.CONTACT_WEBHOOK_AUTHORIZATION?.trim();
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Beverly Web Design <onboarding@resend.dev>";

  if (githubToken) {
    try {
      await createLeadIssue(githubToken, lead);
    } catch (error) {
      console.error("GitHub lead issue error", error);
      return errorResponse(
        request,
        "The message could not be delivered. Call or email us instead.",
        502,
      );
    }
  } else {
    console.log("Contact inquiry (no GITHUB_LEADS_TOKEN or GITHUB_TOKEN configured)\n", text);
  }

  if (webhookUrl) {
    try {
      await postLeadWebhook(webhookUrl, webhookAuthorization, lead);
    } catch (error) {
      console.warn("Contact webhook error (best-effort)", error);
    }
  }

  if (apiKey) {
    try {
      const resend = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: payload.email,
          subject: `New inquiry from ${payload.name}`,
          text,
        }),
      });

      if (!resend.ok) {
        console.warn("Resend error (optional)", await resend.text());
      }
    } catch (error) {
      console.warn("Resend error (optional)", error);
    }
  }

  if (wantsJson(request)) {
    return NextResponse.json({ ok: true, delivered: Boolean(githubToken || webhookUrl || apiKey) });
  }

  return NextResponse.redirect(new URL("/#contact?sent=1", request.url), 303);
}
