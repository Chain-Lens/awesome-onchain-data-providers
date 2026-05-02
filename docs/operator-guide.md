# Operator Guide

This guide is for maintainers and operators of the directory.

## Operating Model

The repository has two jobs:

- Public directory: accept factual provider metadata through GitHub PRs.
- ChainLens handoff: route providers that want executable paid APIs to the ChainLens registration flow.

Do not activate a paid API listing from GitHub alone. Paid listings require wallet ownership, endpoint details, output schema, price, payout address, and ChainLens-side checks.

## PR Review Checklist

Before merging a provider PR, check:

- The JSON file is under `providers/` and named after its `slug`.
- `npm run validate` passes.
- `npm run build` was run if README or `dist/` outputs changed.
- Required fields are present and factual.
- `source_attestation` points to an official source.
- `description` is short and not promotional.
- Category and task types are reasonable.
- No private API keys, secret endpoints, or copied third-party text are included.

## Source Attestation Rules

Prefer sources in this order:

1. Official provider docs.
2. Official provider product or pricing page.
3. Official provider blog post.
4. Official provider social post.

Avoid using third-party awesome lists as factual sources. They can be useful for discovery, but facts should be re-collected from primary sources.

## ChainLens Intent Review

If a PR includes:

```json
{
  "chainlens": {
    "wants_listing": true
  }
}
```

Check:

- `chainlens.contact` is present and is an official or plausible contact URL.
- `preferred_task_types` are short, machine-friendly names.
- `listing_status` is one of `not_listed`, `requested`, `draft`, `pending_claim`, or `listed`.
- `listing_url` is `null` unless there is already a real ChainLens listing URL.

Intent does not prove ownership. Treat it as a routing signal only.

## Handoff Flow

For providers that want ChainLens paid execution:

1. Merge the directory PR once metadata is valid.
2. Point the seller to:

```text
https://chainlens.pelicanlab.dev/register?provider=<slug>
```

3. Tell the seller they will need endpoint, method, price, output schema, payout address, and wallet claim.
4. After the ChainLens listing is live, accept a follow-up PR updating `chainlens.listing_status` and `chainlens.listing_url`.

## Generated Files

Run this before merging metadata changes:

```bash
npm run build
```

Generated outputs:

- `README.md`: human-readable directory.
- `dist/providers.json`: aggregate machine-readable provider list.
- `dist/chainlens-intents.json`: providers that requested ChainLens listing.

The CI workflow checks that generated files are up to date.

## Stale Metadata

Run:

```bash
npm run report:stale
```

Default threshold is 90 days. To use another threshold:

```bash
STALE_DAYS=30 npm run report:stale
```

When a provider becomes stale, open a correction PR or issue with a current official source.

## Rejection Reasons

Common reasons to request changes:

- The source is not official.
- The description is marketing copy.
- The category is inaccurate.
- The file name does not match `slug`.
- The provider entry duplicates an existing provider.
- The `chainlens` block implies execution is already live when it is not.
- The listing URL is not a ChainLens URL or cannot be verified.

## Launch Operations

When publishing a batch:

1. Run `npm run validate`.
2. Run `npm run build`.
3. Review `README.md` and `dist/`.
4. Use `docs/launch-blurb.md` for social posts and provider outreach.
5. Tag provider accounts only when the entry is factual and sourced.
