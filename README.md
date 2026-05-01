# Awesome Onchain Data Providers [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated, machine-readable directory of onchain data providers —
> RPCs, indexers, oracles, analytics, and subgraphs — for builders of
> AI agents, dApps, and infrastructure.

Maintained by [ChainLens](https://chainlens.pelicanlab.dev/).
Data is structured as JSON under `/providers` for programmatic access;
this README is auto-generated.

**56 providers · 12 contributors · last updated 2026-06-15**

## Contents

- [RPC Nodes](#rpc-nodes)
- [Indexers](#indexers)
- [Oracles](#oracles)
- [Analytics](#analytics)
- [Subgraphs](#subgraphs)
- [Specialized Data](#specialized-data)

## RPC Nodes

| Provider | Chains | Pricing | Self-hostable |
|----------|--------|---------|---------------|
| [Alchemy](./providers/alchemy.json)   | EVM, Solana | Freemium | No  |
| [Infura](./providers/infura.json)     | EVM, IPFS   | Freemium | No  |
| [Ankr](./providers/ankr.json)         | 75+ chains  | Freemium | Yes |
| ...

## Indexers

| Provider | Type | Pricing | Self-hostable |
|----------|------|---------|---------------|
| [The Graph](./providers/the-graph.json)   | Subgraph network | Pay-per-query | Yes |
| [Goldsky](./providers/goldsky.json)       | Managed indexer  | Paid          | No  |
| [Subsquid](./providers/subsquid.json)     | SQD network      | Freemium      | Yes |
| ...

## Contributing

Two ways:

1. **PR with a JSON file** under `/providers` — fastest, see [CONTRIBUTING.md](./CONTRIBUTING.md)
2. **Open an issue** with provider info — we'll convert it to a PR

All entries pass CI validation: JSON schema, URL reachability, duplicate detection.

## What this is not

Not a ranking, recommendation, or endorsement.
Inclusion does not imply ChainLens has verified operational quality.
Pricing and SLA data are point-in-time — see each entry's `last_verified`.

## License

[MIT](./LICENSE). Logos and trademarks belong to their respective owners.
