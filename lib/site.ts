export const SITE = {
  name: "Beverly Web Design",
  url: "https://beverlywebdesign.com",
  phoneDisplay: "773-692-1952",
  phoneTel: "+17736921952",
  phoneSchema: "+1-773-692-1952",
  email: "info@beverlywebdesign.com",
  city: "Chicago",
  neighborhood: "Beverly",
  region: "IL",
  country: "US",
  tagline: "Websites for Chicago businesses.",
  ogTitle: "Websites for Chicago businesses | Beverly Web Design",
  aiContactHref: "/ai-workflows#contact",
  ogDescription:
    "Custom websites for Chicago local businesses, live in 3\u20134 weeks. Built by a senior engineer with 13+ years of production software experience.",
} as const;

export const PROJECT_TYPES = [
  "New website",
  "Website redesign",
  "Store",
  "SEO",
  "AI workflow",
  "Something else",
] as const;

export type Client = {
  /** Display name */
  name: string;
  /** Live site URL (opens in a new tab) */
  href: string;
  /** Display domain */
  domain: string;
  /** Short, accurate description */
  description: string;
  /** Featured clients get a full case entry; others are listed smaller. */
  featured?: boolean;
  /** One-line outcome. TODO NEEDS MYRON'S APPROVAL: no measured results are on file yet. */
  outcome?: string;
  /** Optional screenshot in /public. Clients without one get a typographic tile. */
  image?: string;
  imageAlt?: string;
  /** Tile colors used when no screenshot exists (token names from globals.css) */
  tone?: "clay" | "moss" | "sand" | "ink";
};

/** Add new clients here. Order is display order. */
export const CLIENTS: readonly Client[] = [
  {
    name: "Progressive Chicago",
    href: "https://progressivechicago.org",
    domain: "progressivechicago.org",
    description:
      "Full church site for Progressive Baptist Church. Sundays, pastor, ministries, events, kids.",
    featured: true,
    // TODO NEEDS MYRON'S APPROVAL (outcome line is factual, not a metric)
    outcome:
      "Service times, the pastor, ministries, events, and kids programs each have a clear place on the site.",
    image: "/work-pbc.png",
    imageAlt: "Progressive Chicago homepage, progressivechicago.org",
  },
  {
    name: "Black Boy Lit",
    href: "https://blackboylit.com",
    domain: "blackboylit.com",
    description: "Campaign site for the Black Boy Literacy Campaign. Register, mentors, donate, mission.",
    featured: true,
    // TODO NEEDS MYRON'S APPROVAL (outcome line is factual, not a metric)
    outcome:
      "Families can register, mentors can sign up, and supporters can donate, all from one site.",
    image: "/work-bbl.png",
    imageAlt: "Black Boy Lit homepage, blackboylit.com",
  },
  {
    name: "On The 9 Run Crew",
    href: "https://onthe9runcrew.com",
    domain: "onthe9runcrew.com",
    description: "Website for On The 9 Run Crew, a running crew. Visit the site to see the crew and how to connect.",
    tone: "clay",
  },
  {
    name: "Sukey Strategy",
    href: "https://www.sukeystrategy.com/",
    domain: "sukeystrategy.com",
    description: "Website for Sukey Strategy, a strategy consultancy. Visit the site for services and contact details.",
    tone: "moss",
  },
];

export const PAIN_POINTS = [
  "Customers search for what you do and find the shop down the street instead.",
  "Your site is slow, or falls apart on a phone.",
  "You can't change a price or a phone number without calling someone.",
] as const;

export const SERVICES = [
  {
    title: "Custom websites",
    body: "A new site for a business that runs on word of mouth, Facebook, or a DIY template. Clear pages, your phone number one tap away, and built so a neighbor searching for what you do can find you and call.",
  },
  {
    title: "Redesigns",
    body: "Your site is live but it isn't getting calls. We keep what works, rewrite what's confusing, and rebuild it to load fast on a phone.",
  },
  {
    title: "Online stores",
    body: "Sell products or take bookings online. Set up so you can add items and take payments without calling a developer.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    num: "1",
    label: "Call",
    when: "Week 1",
    title: "Thirty minutes on the phone.",
    body: "What you sell, who should find you, and what a good month looks like.",
  },
  {
    num: "2",
    label: "Build",
    when: "Weeks 1\u20133",
    title: "You see the real thing.",
    body: "You look at the actual site while it's being built, so changes are easy and cheap.",
  },
  {
    num: "3",
    label: "Launch",
    when: "Weeks 3\u20134",
    title: "Live, and yours to edit.",
    body: "We put it online, connect your contact form, and show you how to make the next edit.",
  },
] as const;

// TODO NEEDS MYRON'S APPROVAL: package name and inclusions. Price ($4,000 flat) approved.
export const PRICING = {
  name: "The Local Business Site",
  price: "$4,000",
  note: "One flat fee, quoted before any work starts.",
  includes: [
    "Custom design and build, no templates",
    "Works on phones first",
    "Contact form that goes straight to your inbox",
    "Your address, hours, and phone set up for local search",
    "Launch, hosting setup, and a walkthrough of how to edit",
  ],
} as const;

export const FAQ = [
  {
    q: "What does it cost?",
    a: "$4,000 flat for a standard site, shown in the pricing section above and quoted before any work starts. If your project is bigger, like a store, we price it on the first call so there are no surprises.",
  },
  {
    q: "How long does it take?",
    a: "Most sites are live 3\u20134 weeks after our first call. The main thing that slows a launch is waiting on photos and answers, so we keep that list short.",
  },
  {
    q: "Do I have to write the copy?",
    a: "No. On the call we ask about your business, then write the first draft of the words from your answers. You read it, fix anything that sounds off, and approve it.",
  },
  {
    q: "Who owns the site after launch?",
    a: "You do. The domain is registered in your name, and you get the files and logins at launch. Nothing locks you in to us.",
  },
  {
    q: "What if I already have a site?",
    a: "That's a redesign. We look at what you have, keep what's working, and replace what isn't. We also carry over your existing page addresses where we can, so you don't lose the search traffic you already get.",
  },
] as const;

/** Shared by the homepage section and /ai-workflows. TODO NEEDS MYRON'S APPROVAL (all copy). */
export const BEFORE_AFTER = [
  {
    before: "You miss a call during a job and forget to call back.",
    after: "They get a text within a minute, and you get a summary.",
  },
  {
    before: "Contact form leads sit in your inbox for days.",
    after: "Every lead lands in one list with a reply already drafted.",
  },
  {
    before: "You chase customers about appointments and payments.",
    after: "Reminders and follow-ups go out on their own.",
  },
] as const;

/** Price ($1,500 flat) approved. */
export const WORKFLOW_AUDIT = {
  name: "Busywork audit",
  price: "$1,500",
  note: "Flat fee for the audit and a written plan. The build is quoted from the plan.",
  includes: [
    "A look at where your week actually goes",
    "The 1–2 tasks costing you the most time",
    "A written plan with a fixed build quote",
  ],
} as const;

export const AI_STEPS = [
  {
    num: "1",
    label: "Audit",
    when: "Week 1",
    body: "We look at how work comes in today and pick the 1–2 tasks that cost you the most time.",
  },
  {
    num: "2",
    label: "Build",
    when: "Weeks 2–3",
    body: "We set it up with the tools you already use where we can.",
  },
  {
    num: "3",
    label: "Hand-off",
    when: "After launch",
    body: "It runs, you see a simple log of what it did, and you can turn it off anytime.",
  },
] as const;

/**
 * TODO NEEDS MYRON'S APPROVAL: first workflow case study. None exists yet, so nothing
 * is rendered. When approved, fill this in and render it on /ai-workflows and the
 * homepage AI band. Do not invent one.
 */
export const AI_CASE_STUDY: {
  client: string;
  problem: string;
  result: string;
} | null = null;

export const AI_EXAMPLES = [
  "Review requests after a job",
  "Quote and estimate drafts from a form",
  "Appointment reminders",
  "A weekly summary of leads",
] as const;

export const AI_FAQ = [
  {
    q: "What happens to my customers' data?",
    a: "It stays in tools you own and control. We don't sell it or keep copies, and we write down exactly where everything goes.",
  },
  {
    q: "Do I need new software?",
    a: "Usually not. We start with what you already use, like your email, calendar, and phone, and only add a tool if it clearly saves time.",
  },
  {
    q: "What if it breaks?",
    a: "You get a simple log of what ran, and we're a phone call away. Every automation can be switched off, and things go back to how they were.",
  },
  {
    q: "Do I need a new website first?",
    a: "No. Workflows work with the site you have, or with no site at all.",
  },
  {
    q: "How much does it cost?",
    a: "The busywork audit is $1,500 flat. We look at where your week goes, hand you a written plan with a fixed build quote, and you decide from there. No surprises.",
  },
] as const;
