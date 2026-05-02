import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const providersDir = path.join(root, "providers");
const schemaPath = path.join(root, "schema", "provider.schema.json");
const shouldCheckUrls = process.argv.includes("--check-urls");

const schema = JSON.parse(await readFile(schemaPath, "utf8"));
const files = (await readdir(providersDir))
  .filter((file) => file.endsWith(".json"))
  .sort();

const errors = [];
const seenSlugs = new Map();
const seenNames = new Map();

for (const file of files) {
  const filepath = path.join(providersDir, file);
  let provider;

  try {
    provider = JSON.parse(await readFile(filepath, "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    continue;
  }

  validateProvider(file, provider);

  if (provider.slug) {
    const expectedFile = `${provider.slug}.json`;
    if (file !== expectedFile) {
      errors.push(`${file}: filename must match slug (${expectedFile})`);
    }

    const previous = seenSlugs.get(provider.slug);
    if (previous) {
      errors.push(`${file}: duplicate slug "${provider.slug}" also used by ${previous}`);
    }
    seenSlugs.set(provider.slug, file);
  }

  if (provider.name) {
    const normalizedName = provider.name.toLowerCase();
    const previous = seenNames.get(normalizedName);
    if (previous) {
      errors.push(`${file}: duplicate name "${provider.name}" also used by ${previous}`);
    }
    seenNames.set(normalizedName, file);
  }

  if (shouldCheckUrls) {
    await checkUrl(file, "website", provider.website);
    await checkUrl(file, "docs", provider.docs);
    await checkUrl(file, "source_attestation", provider.source_attestation);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} provider file${files.length === 1 ? "" : "s"}.`);

function validateProvider(file, provider) {
  if (!isPlainObject(provider)) {
    errors.push(`${file}: root value must be an object`);
    return;
  }

  for (const key of schema.required) {
    if (!(key in provider)) {
      errors.push(`${file}: missing required field "${key}"`);
    }
  }

  for (const key of Object.keys(provider)) {
    if (!schema.properties[key]) {
      errors.push(`${file}: unknown field "${key}"`);
    }
  }

  for (const [key, rules] of Object.entries(schema.properties)) {
    if (!(key in provider)) {
      continue;
    }

    const value = provider[key];
    const label = `${file}: ${key}`;

    if (rules.type === "string") {
      if (typeof value !== "string") {
        errors.push(`${label} must be a string`);
        continue;
      }
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${label} must not be empty`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${label} must be ${rules.maxLength} characters or fewer`);
      }
      if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
        errors.push(`${label} does not match ${rules.pattern}`);
      }
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push(`${label} must be one of ${rules.enum.join(", ")}`);
      }
      if (rules.format === "uri" && !isHttpUrl(value)) {
        errors.push(`${label} must be an http(s) URL`);
      }
      if (rules.format === "date" && !isDate(value)) {
        errors.push(`${label} must be YYYY-MM-DD`);
      }
    }

    if (rules.type === "boolean" && typeof value !== "boolean") {
      errors.push(`${label} must be a boolean`);
    }

    if (rules.type === "array") {
      if (!Array.isArray(value)) {
        errors.push(`${label} must be an array`);
        continue;
      }

      const unique = new Set(value);
      if (rules.uniqueItems && unique.size !== value.length) {
        errors.push(`${label} must not contain duplicates`);
      }

      for (const item of value) {
        if (rules.items.type === "string" && typeof item !== "string") {
          errors.push(`${label} items must be strings`);
          continue;
        }
        if (rules.items.minLength && item.length < rules.items.minLength) {
          errors.push(`${label} items must not be empty`);
        }
        if (rules.items.enum && !rules.items.enum.includes(item)) {
          errors.push(`${label} item "${item}" must be one of ${rules.items.enum.join(", ")}`);
        }
      }
    }

    if (rules.type === "object") {
      validateObject(file, key, value, rules);
    }
  }
}

function validateObject(file, key, value, rules) {
  const label = `${file}: ${key}`;
  if (!isPlainObject(value)) {
    errors.push(`${label} must be an object`);
    return;
  }

  if (rules.additionalProperties === false) {
    for (const childKey of Object.keys(value)) {
      if (!rules.properties?.[childKey]) {
        errors.push(`${label}.${childKey} is not allowed`);
      }
    }
  }

  for (const [childKey, childRules] of Object.entries(rules.properties ?? {})) {
    if (!(childKey in value)) {
      continue;
    }
    validateNestedValue(file, `${key}.${childKey}`, value[childKey], childRules);
  }
}

function validateNestedValue(file, key, value, rules) {
  const label = `${file}: ${key}`;
  const types = Array.isArray(rules.type) ? rules.type : [rules.type];

  if (types.includes("null") && value === null) {
    return;
  }

  if (types.includes("string")) {
    if (typeof value !== "string") {
      errors.push(`${label} must be a string`);
      return;
    }
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${label} must not be empty`);
    }
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
      errors.push(`${label} does not match ${rules.pattern}`);
    }
    if (rules.enum && !rules.enum.includes(value)) {
      errors.push(`${label} must be one of ${rules.enum.join(", ")}`);
    }
    if (rules.format === "uri" && !isHttpUrl(value)) {
      errors.push(`${label} must be an http(s) URL`);
    }
    return;
  }

  if (types.includes("boolean")) {
    if (typeof value !== "boolean") {
      errors.push(`${label} must be a boolean`);
    }
    return;
  }

  if (types.includes("array")) {
    if (!Array.isArray(value)) {
      errors.push(`${label} must be an array`);
      return;
    }

    const unique = new Set(value);
    if (rules.uniqueItems && unique.size !== value.length) {
      errors.push(`${label} must not contain duplicates`);
    }

    for (const item of value) {
      validateNestedValue(file, `${key}[]`, item, rules.items);
    }
  }
}

async function checkUrl(file, field, url) {
  if (!url) {
    return;
  }

  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (response.status >= 400) {
      errors.push(`${file}: ${field} returned HTTP ${response.status}`);
    }
  } catch (error) {
    errors.push(`${file}: ${field} could not be reached (${error.message})`);
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
