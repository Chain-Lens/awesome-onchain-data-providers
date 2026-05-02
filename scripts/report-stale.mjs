import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const providersDir = path.join(root, "providers");
const maxAgeDays = Number.parseInt(process.env.STALE_DAYS ?? "90", 10);
const now = new Date();
const files = (await readdir(providersDir))
  .filter((file) => file.endsWith(".json"))
  .sort();

const stale = [];

for (const file of files) {
  const provider = JSON.parse(await readFile(path.join(providersDir, file), "utf8"));
  const verifiedAt = new Date(`${provider.last_verified}T00:00:00.000Z`);

  if (Number.isNaN(verifiedAt.valueOf())) {
    stale.push({
      file,
      name: provider.name ?? file,
      last_verified: provider.last_verified ?? null,
      age_days: null,
      reason: "invalid_last_verified"
    });
    continue;
  }

  const ageDays = Math.floor((now.getTime() - verifiedAt.getTime()) / 86_400_000);
  if (ageDays > maxAgeDays) {
    stale.push({
      file,
      name: provider.name,
      last_verified: provider.last_verified,
      age_days: ageDays,
      reason: "stale"
    });
  }
}

if (stale.length === 0) {
  console.log(`No stale providers. Threshold: ${maxAgeDays} days.`);
  process.exit(0);
}

console.log(`Found ${stale.length} stale provider${stale.length === 1 ? "" : "s"} over ${maxAgeDays} days:`);
for (const item of stale) {
  const age = item.age_days === null ? "unknown age" : `${item.age_days} days`;
  console.log(`- ${item.file}: ${item.name} (${item.last_verified}, ${age})`);
}
