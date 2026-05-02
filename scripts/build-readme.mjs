import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const providersDir = path.join(root, "providers");
const readmePath = path.join(root, "README.md");
const categories = [
  ["rpc", "RPC Nodes"],
  ["indexer", "Indexers"],
  ["oracle", "Oracles"],
  ["analytics", "Analytics"],
  ["subgraph", "Subgraphs"],
  ["specialized", "Specialized Data"]
];

const files = (await readdir(providersDir))
  .filter((file) => file.endsWith(".json"))
  .sort();

const providers = [];

for (const file of files) {
  const provider = JSON.parse(await readFile(path.join(providersDir, file), "utf8"));
  providers.push({ ...provider, file });
}

providers.sort((a, b) => a.name.localeCompare(b.name));

const contributors = new Set(providers.map((provider) => provider.official_contact).filter(Boolean));
const today = new Date().toISOString().slice(0, 10);
const contents = categories.map(([, title]) => `- [${title}](#${slugify(title)})`).join("\n");

let body = `# Awesome Onchain Data Providers [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![Validate](https://github.com/pelican-lab/awesome-onchain-data-providers/actions/workflows/validate.yml/badge.svg)](https://github.com/pelican-lab/awesome-onchain-data-providers/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> A curated, machine-readable directory of onchain data providers:
> RPCs, indexers, oracles, analytics, and subgraphs for builders of
> AI agents, dApps, and infrastructure.

Maintained by [ChainLens](https://chainlens.pelicanlab.dev/).
Data is structured as JSON under [\`/providers\`](./providers) for programmatic access;
this README is auto-generated.

**${providers.length} providers · ${contributors.size} listed contacts · last updated ${today}**

Want your API to be executable by agents? Add provider metadata here with a PR,
then use [ChainLens registration](https://chainlens.pelicanlab.dev/register) for
endpoint, price, output schema, payout address, and wallet claim.

## Contents

- [Guides](#guides)
${contents}

## Guides

- [Seller Guide](./docs/seller-guide.md): add your provider, signal ChainLens intent, and complete paid API registration.
- [Operator Guide](./docs/operator-guide.md): review PRs, validate sources, manage generated outputs, and route ChainLens handoffs.

`;

for (const [category, title] of categories) {
  const entries = providers.filter((provider) => provider.category === category);
  body += `## ${title}\n\n`;

  if (entries.length === 0) {
    body += "_No providers listed yet._\n\n";
    continue;
  }

  body += "| Provider | Chains | Pricing | Self-hostable | ChainLens |\n";
  body += "|----------|--------|---------|---------------|-----------|\n";

  for (const provider of entries) {
    const chains = formatArray(provider.supported_chains);
    const pricing = provider.pricing_model ?? "Unknown";
    const selfHostable = typeof provider.self_hostable === "boolean" ? (provider.self_hostable ? "Yes" : "No") : "Unknown";
    const chainlens = formatChainLens(provider);
    body += `| [${escapeTable(provider.name)}](./providers/${provider.file}) | ${escapeTable(chains)} | ${escapeTable(pricing)} | ${selfHostable} | ${chainlens} |\n`;
  }

  body += "\n";
}

body += `## Contributing

Two ways:

1. **PR with a JSON file** under [\`/providers\`](./providers) using [CONTRIBUTING.md](./CONTRIBUTING.md)
2. **Open an issue** with provider info and an official source URL

All entries pass CI validation: schema checks, duplicate detection, and optional URL reachability.

GitHub directory inclusion is separate from ChainLens paid API execution.
Use the optional \`chainlens\` block to signal listing intent, then complete the
wallet, endpoint, price, and output schema flow in ChainLens:

\`\`\`text
https://chainlens.pelicanlab.dev/register?provider=<slug>
\`\`\`

## What This Is Not

This is not a ranking, recommendation, or endorsement.
Inclusion does not imply ChainLens has verified operational quality.
Pricing and SLA data are point-in-time; see each entry's \`last_verified\`.

## License

[MIT](./LICENSE). Logos and trademarks belong to their respective owners.
`;

await writeFile(readmePath, body);

function formatArray(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return "Unknown";
  }
  return value.join(", ");
}

function escapeTable(value) {
  return String(value).replaceAll("|", "\\|");
}

function formatChainLens(provider) {
  const info = provider.chainlens;
  if (!info) {
    return `[List](https://chainlens.pelicanlab.dev/register?provider=${encodeURIComponent(provider.slug)})`;
  }

  if (info.listing_url) {
    return `[${escapeTable(formatStatus(info.listing_status ?? "listed"))}](${info.listing_url})`;
  }

  if (info.wants_listing) {
    return `[${escapeTable(formatStatus(info.listing_status ?? "requested"))}](https://chainlens.pelicanlab.dev/register?provider=${encodeURIComponent(provider.slug)})`;
  }

  return `[List](https://chainlens.pelicanlab.dev/register?provider=${encodeURIComponent(provider.slug)})`;
}

function formatStatus(status) {
  return String(status)
    .split("_")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
