import { price } from "./pricing.js";

export const guides = [
  {
    slug: "linear-notion-slack-alternative",
    label: "Linear, Notion and Slack alternative",
    question: "Is there one open-source app that replaces Linear, Notion and Slack?",
    answer: `Yes. Orbit puts tasks like Linear, docs like Notion and chat like Slack in one workspace. It is one binary with SQLite or Postgres, Apache 2.0, free to self-host, or $${price.monthly} per workspace each month on Orbit Cloud.`,
    faq: [
      { q: "Can I bring my existing work?", a: "Orbit imports docs from Notion and tasks from Linear, Asana and Trello." },
      { q: "Can I run it on my own server?", a: "Yes. Orbit is a Rust binary with an embedded web app, using SQLite or Postgres. It is free to self-host under Apache 2.0." },
    ],
  },
  {
    slug: "flat-price-team-workspace",
    label: "Flat-price team workspace",
    question: "Is there a team workspace with a flat price, not per user?",
    answer: `Orbit Cloud costs $${price.monthly} per workspace each month, or $${price.annual} a year, with unlimited members. Self-hosting is free with every feature.`,
    faq: [
      { q: "Does adding a member change the price?", a: "No. Each Orbit Cloud workspace has a flat subscription price and unlimited members. Sales tax or VAT is added at checkout where it applies." },
      { q: "Is self-hosting free?", a: "Yes. You get every feature with no limits and pay only for your own server." },
    ],
  },
  {
    slug: "self-hosted-workspace-mcp",
    label: "Self-hosted workspace with MCP",
    question: "Which self-hosted workspace lets Claude read our tasks and docs?",
    answer: "Orbit has an MCP server with built-in OAuth. You pick the workspace and projects, and your AI client (Claude, Codex or Grok) reads the tasks it needs.",
    faq: [
      { q: "Does MCP need a separate server?", a: "No. Orbit serves its MCP endpoint from the existing server over Streamable HTTP." },
      { q: "How do I control access?", a: "Sign in to Orbit, select a workspace and projects, and approve access. You can revoke the connection in Account settings under Agentic." },
    ],
  },
  {
    slug: "huly-alternative",
    label: "Huly alternative",
    question: "What is a lighter alternative to Huly?",
    answer: `Consider Orbit if you want tasks, docs and chat in one Rust binary with SQLite or Postgres. It is Apache 2.0 and free to self-host, with an MCP server for AI clients. Orbit Cloud costs $${price.monthly} per workspace each month with unlimited members.`,
    faq: [
      { q: "What does self-hosting Orbit require?", a: "Orbit serves its API and embedded web app from one binary. Choose SQLite or Postgres and put a reverse proxy in front for HTTPS." },
      { q: "Can I connect an AI client?", a: "Yes. Orbit has an MCP endpoint with built-in OAuth for Claude, Codex and Grok." },
    ],
  },
];
