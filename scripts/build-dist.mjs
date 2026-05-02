import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const providersDir = path.join(root, "providers");
const distDir = path.join(root, "dist");
const generatedAt = new Date().toISOString();

const files = (await readdir(providersDir))
  .filter((file) => file.endsWith(".json"))
  .sort();

const providers = [];

for (const file of files) {
  const provider = JSON.parse(await readFile(path.join(providersDir, file), "utf8"));
  providers.push({ ...provider, file: `providers/${file}` });
}

providers.sort((a, b) => a.name.localeCompare(b.name));

const chainlensIntents = providers
  .filter((provider) => provider.chainlens?.wants_listing === true)
  .map((provider) => ({
    slug: provider.slug,
    name: provider.name,
    category: provider.category,
    website: provider.website,
    contact: provider.chainlens.contact,
    preferred_task_types: provider.chainlens.preferred_task_types ?? [],
    listing_status: provider.chainlens.listing_status ?? "requested",
    listing_url: provider.chainlens.listing_url ?? null,
    register_url: `https://chainlens.pelicanlab.dev/register?provider=${encodeURIComponent(provider.slug)}`,
    source_attestation: provider.source_attestation
  }));

await mkdir(distDir, { recursive: true });

await writeJson("providers.json", {
  generated_at: generatedAt,
  provider_count: providers.length,
  providers
});

await writeJson("chainlens-intents.json", {
  generated_at: generatedAt,
  intent_count: chainlensIntents.length,
  intents: chainlensIntents
});

console.log(`Wrote ${providers.length} providers and ${chainlensIntents.length} ChainLens intents.`);

async function writeJson(filename, data) {
  await writeFile(
    path.join(distDir, filename),
    `${JSON.stringify(data, null, 2)}\n`
  );
}
