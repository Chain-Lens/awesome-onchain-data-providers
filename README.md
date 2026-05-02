# Awesome Onchain Data Providers [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![Validate](https://github.com/pelican-lab/awesome-onchain-data-providers/actions/workflows/validate.yml/badge.svg)](https://github.com/pelican-lab/awesome-onchain-data-providers/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> A curated, machine-readable directory of onchain data providers:
> RPCs, indexers, oracles, analytics, and subgraphs for builders of
> AI agents, dApps, and infrastructure.

Maintained by [ChainLens](https://chainlens.pelicanlab.dev/).
Data is structured as JSON under [`/providers`](./providers) for programmatic access;
this README is auto-generated.

**10 providers · 10 listed contacts · last updated 2026-05-02**

Want your API to be executable by agents? Add provider metadata here with a PR,
then use [ChainLens registration](https://chainlens.pelicanlab.dev/register) for
endpoint, price, output schema, payout address, and wallet claim.

## Contents

- [Guides](#guides)
- [RPC Nodes](#rpc-nodes)
- [Indexers](#indexers)
- [Oracles](#oracles)
- [Analytics](#analytics)
- [Subgraphs](#subgraphs)
- [Specialized Data](#specialized-data)

## Guides

- [Seller Guide](./docs/seller-guide.md): add your provider, signal ChainLens intent, and complete paid API registration.
- [Operator Guide](./docs/operator-guide.md): review PRs, validate sources, manage generated outputs, and route ChainLens handoffs.

## RPC Nodes

| Provider | Chains | Pricing | Self-hostable | ChainLens |
|----------|--------|---------|---------------|-----------|
| [Alchemy](./providers/alchemy.json) | EVM, Solana, Bitcoin | freemium | No | [List](https://chainlens.pelicanlab.dev/register?provider=alchemy) |
| [QuickNode](./providers/quicknode.json) | EVM, Solana, Bitcoin, Hyperliquid | freemium | No | [List](https://chainlens.pelicanlab.dev/register?provider=quicknode) |

## Indexers

| Provider | Chains | Pricing | Self-hostable | ChainLens |
|----------|--------|---------|---------------|-----------|
| [Goldsky](./providers/goldsky.json) | EVM, SVM, Arweave | paid | No | [List](https://chainlens.pelicanlab.dev/register?provider=goldsky) |

## Oracles

| Provider | Chains | Pricing | Self-hostable | ChainLens |
|----------|--------|---------|---------------|-----------|
| [API3](./providers/api3.json) | EVM | paid | No | [List](https://chainlens.pelicanlab.dev/register?provider=api3) |
| [Chainlink](./providers/chainlink.json) | EVM, Solana | paid | No | [List](https://chainlens.pelicanlab.dev/register?provider=chainlink) |
| [Pyth](./providers/pyth.json) | EVM, SVM, Move | freemium | No | [List](https://chainlens.pelicanlab.dev/register?provider=pyth) |

## Analytics

| Provider | Chains | Pricing | Self-hostable | ChainLens |
|----------|--------|---------|---------------|-----------|
| [Bitquery](./providers/bitquery.json) | EVM, Solana, Bitcoin, Tron, TON | freemium | No | [List](https://chainlens.pelicanlab.dev/register?provider=bitquery) |
| [Dune](./providers/dune.json) | EVM, Solana, Bitcoin | freemium | No | [List](https://chainlens.pelicanlab.dev/register?provider=dune) |

## Subgraphs

| Provider | Chains | Pricing | Self-hostable | ChainLens |
|----------|--------|---------|---------------|-----------|
| [The Graph](./providers/the-graph.json) | EVM, SVM | open-source | Yes | [List](https://chainlens.pelicanlab.dev/register?provider=the-graph) |

## Specialized Data

| Provider | Chains | Pricing | Self-hostable | ChainLens |
|----------|--------|---------|---------------|-----------|
| [Moralis](./providers/moralis.json) | EVM, Solana | freemium | No | [List](https://chainlens.pelicanlab.dev/register?provider=moralis) |

## Contributing

Two ways:

1. **PR with a JSON file** under [`/providers`](./providers) using [CONTRIBUTING.md](./CONTRIBUTING.md)
2. **Open an issue** with provider info and an official source URL

All entries pass CI validation: schema checks, duplicate detection, and optional URL reachability.

GitHub directory inclusion is separate from ChainLens paid API execution.
Use the optional `chainlens` block to signal listing intent, then complete the
wallet, endpoint, price, and output schema flow in ChainLens:

```text
https://chainlens.pelicanlab.dev/register?provider=<slug>
```

## What This Is Not

This is not a ranking, recommendation, or endorsement.
Inclusion does not imply ChainLens has verified operational quality.
Pricing and SLA data are point-in-time; see each entry's `last_verified`.

## License

[MIT](./LICENSE). Logos and trademarks belong to their respective owners.
