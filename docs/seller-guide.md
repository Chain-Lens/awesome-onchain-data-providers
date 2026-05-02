# Seller Guide

This guide is for provider teams that want to be discoverable in this directory and, optionally, become executable paid APIs on ChainLens.

## Two Paths

There are two related but separate flows:

- GitHub directory listing: public metadata, SEO, discovery, and community visibility.
- ChainLens paid API listing: wallet-owned executable API listing with endpoint, price, output schema, payout address, and settlement.

Adding a provider JSON file here does not activate paid API execution.

## Path A: Add Your Provider To The Directory

Use this path if you want your provider listed in the public GitHub directory.

1. Copy `examples/provider.example.json` to `providers/<slug>.json`.
2. Fill in factual metadata from official sources.
3. Set `source_attestation` to an official URL such as docs, a blog post, a pricing page, or an official social post.
4. Keep `description` short and factual.
5. Run `npm run validate`.
6. Run `npm run build`.
7. Open a PR.

Minimum required fields:

```json
{
  "name": "Example Data",
  "slug": "example-data",
  "category": "analytics",
  "description": "Provides example onchain data through documented API endpoints.",
  "website": "https://example.com/",
  "added_date": "2026-05-02",
  "last_verified": "2026-05-02",
  "source_attestation": "https://example.com/docs"
}
```

## Path B: Signal ChainLens Listing Intent

Use this path if you want agents to call and pay for your API through ChainLens.

Add the optional `chainlens` block:

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

This is only an intent signal. It does not prove ownership and does not activate a paid listing.

## Path C: Complete Paid API Registration

After your directory entry is ready, use ChainLens registration:

```text
https://chainlens.pelicanlab.dev/register?provider=<slug>
```

You will need:

- Wallet that owns or represents the seller account.
- Endpoint URL.
- HTTP method: `GET` or `POST`.
- Price in USDC per call.
- Output schema for the response.
- Payout address.
- Example request and response, if available.

## Endpoint Requirements

ChainLens calls your endpoint through its gateway. The endpoint must return JSON and should be stable enough for automated checks.

For `GET`, buyer inputs are forwarded as query parameters:

```text
GET https://api.example.com/price?symbol=ETH
```

For `POST`, buyer inputs are forwarded as a JSON body:

```http
POST https://api.example.com/price
Content-Type: application/json

{
  "symbol": "ETH"
}
```

The response must match the output schema you register in ChainLens.

## What To Avoid

- Do not copy descriptions from third-party directories.
- Do not submit marketing claims as factual metadata.
- Do not add raw private or authenticated endpoints to public GitHub metadata.
- Do not assume GitHub PR approval means ChainLens execution approval.
- Do not use a payout address you cannot control.

## After Listing

Once your ChainLens paid listing is live, update your provider JSON with:

```json
{
  "chainlens": {
    "wants_listing": true,
    "contact": "https://x.com/example",
    "preferred_task_types": ["price_quote"],
    "listing_status": "listed",
    "listing_url": "https://chainlens.pelicanlab.dev/discover/123"
  }
}
```

Then open a PR so the README can show the listing status instead of a generic `List` link.
