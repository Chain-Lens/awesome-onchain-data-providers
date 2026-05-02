# Priority Execution Plan

This repository is intended to grow as a GitHub-first directory for onchain data providers. The immediate goal is to make the repo trustworthy enough that providers can understand the structure, submit PRs, and pass automated checks.

## Phase 0: PR-Ready Repository Foundation

Status: Complete

Goal: Remove broken promises from the README and add the minimum structure needed for external contributors.

Tasks:

- [x] Create `providers/` for one JSON file per provider.
- [x] Create `schema/provider.schema.json` as the canonical provider metadata contract.
- [x] Create `scripts/validate.mjs` for schema, duplicate, and optional URL checks.
- [x] Create `scripts/build-readme.mjs` so `README.md` can be generated from provider JSON files.
- [x] Add `.github/PULL_REQUEST_TEMPLATE.md` with source attestation and anti-marketing checklist.
- [x] Add `.github/CODEOWNERS` so maintainers are automatically requested for review.
- [x] Add `.github/workflows/validate.yml` to run validation in PRs.
- [x] Add `CONTRIBUTING.md`, `LICENSE`, and `package.json`.
- [x] Regenerate `README.md` so it accurately reflects the current provider count.

Success criteria:

- `npm run validate` passes on a clean checkout.
- `npm run build:readme` produces a README without broken local links.
- New contributors can add a provider by following `CONTRIBUTING.md`.

## Phase 1: Seed Providers

Status: Complete

Goal: Add enough real entries that the directory feels alive and useful.

Tasks:

- [x] Add 10 high-confidence providers from official sources only.
- [x] Require `source_attestation` to point to official docs, blog posts, or official social posts.
- [x] Avoid copying descriptions from third-party awesome lists.
- [x] Add `last_verified` dates for every provider.
- [x] Run README generation after every provider batch.

Recommended first batch:

- Alchemy
- QuickNode
- The Graph
- Dune
- Goldsky
- Moralis
- Bitquery
- Chainlink
- Pyth
- API3

## Phase 2: Contributor Funnel And ChainLens Handoff

Status: Complete

Goal: Make it easy for providers and users to submit useful PRs, then hand off executable paid API registration to the ChainLens frontend.

Tasks:

- [x] Add issue templates for provider requests and corrections.
- [x] Add examples under `examples/provider.example.json`.
- [x] Add optional `chainlens` metadata to `schema/provider.schema.json`.
- [x] Add a `chainlens` example to `examples/provider.example.json`.
- [x] Add stricter category guidance to `CONTRIBUTING.md`.
- [x] Explain the difference between GitHub directory registration and ChainLens paid API listing in `CONTRIBUTING.md`.
- [x] Add a "List on ChainLens" CTA to `README.md`.
- [x] Add PR template checkboxes for ChainLens executable listing intent.
- [x] Add optional `chainlens_listing_url` / `listing_status` display to README generation.
- [x] Add badges for validation status and license.
- [x] Add a short launch-ready blurb for social posts.

Recommended `chainlens` block:

```json
{
  "chainlens": {
    "wants_listing": true,
    "contact": "https://x.com/example",
    "preferred_task_types": ["price_quote", "wallet_data"],
    "listing_status": "not_listed",
    "listing_url": null
  }
}
```

Success criteria:

- A provider can submit a GitHub PR without touching wallet or payment flows.
- A provider that wants paid execution can be routed to `/register?provider=<slug>`.
- README makes it obvious that GitHub is for discovery and ChainLens is for executable paid APIs.
- No GitHub PR can silently activate a paid API listing.

## Phase 3: Automation And Site Readiness

Status: Partially complete

Goal: Prepare the repository data to feed a static site, ChainLens draft registry, or future seller-side MCP.

Tasks:

- [x] Add generated machine-readable aggregate output such as `dist/providers.json`.
- [x] Add `dist/chainlens-intents.json` for providers with `chainlens.wants_listing = true`.
- [ ] Add a read-only static site build step if this repo will publish to a domain.
- [x] Add optional URL reachability checks in scheduled CI.
- [x] Add stale verification reporting for entries older than 90 days.
- [ ] Add GitHub Action draft creation only after ChainLens exposes an idempotent draft API.
- [ ] Add draft sync status back to provider JSON or generated `dist/` output.

Deferred until after Phase 2/3:

- [ ] Seller-side MCP for agent-driven provider PR creation.
- [ ] Seller-side MCP for endpoint preflight and schema generation.
- [ ] Seller-side MCP for smart-account or WAIAAS-backed paid listing registration.

## Operating Rules

- Facts come from official provider sources wherever possible.
- Inclusion is not an endorsement, ranking, or SLA claim.
- Provider descriptions should be factual and short, not promotional.
- Logos and trademarks belong to their owners and should not be modified.
- The open directory should remain separate from any paid ChainLens verification, routing, or analytics layer.
