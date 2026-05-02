# Contributing

Thanks for helping keep this directory useful. Each provider should be represented by one JSON file under `providers/`.

## Add Or Update A Provider

1. Create or edit `providers/<slug>.json`.
2. Follow `schema/provider.schema.json`. You can start from `examples/provider.example.json`.
3. Set `source_attestation` to an official source such as provider docs, a provider blog post, a pricing page, or an official social post.
4. Run `npm run validate`.
5. Run `npm run build:readme`.
6. Open a PR using the checklist.

## GitHub Directory Vs ChainLens Paid Listing

This GitHub repository is for public discovery, SEO, and structured provider metadata. Adding a JSON file here does not activate a paid API on ChainLens.

Executable paid API listings happen in the ChainLens frontend because they require wallet ownership, endpoint configuration, output schema validation, price, and payout address.

If you want a provider to become executable on ChainLens, add an optional `chainlens` block:

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

After the directory PR is reviewed, use the ChainLens registration flow:

```text
https://chainlens.pelicanlab.dev/register?provider=<slug>
```

The `chainlens` block is an intent signal only. It does not prove ownership and does not turn on execution.

## Category Guide

- `rpc`: RPC nodes, RPC gateways, node APIs, and archive access.
- `indexer`: Managed indexers, custom indexing platforms, and hosted query infrastructure.
- `oracle`: Oracle networks and offchain-to-onchain data feeds.
- `analytics`: Data warehouses, dashboards, query notebooks, and analytics APIs.
- `subgraph`: Subgraph registries, subgraph hosting, and subgraph-specific infrastructure.
- `specialized`: Provider types that do not fit the categories above.

## Task Type Guidance

Use short, machine-friendly task type names in `chainlens.preferred_task_types`. Lowercase words separated by underscores are preferred.

Examples:

- `price_quote`
- `wallet_data`
- `nft_metadata`
- `contract_source`
- `protocol_metrics`
- `risk_signal`

## Entry Rules

- Use factual descriptions, not marketing copy.
- Prefer official sources over third-party directories.
- Do not copy text from other awesome lists.
- Do not claim endorsement, ranking, SLA quality, or production readiness.
- Keep `last_verified` current when changing factual fields.
