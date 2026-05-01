globalThis.disableIncrementalCache = false;globalThis.disableDynamoDBCache = false;globalThis.openNextDebug = false;globalThis.openNextVersion = "3.10.4";globalThis.nextVersion = "16.2.2";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/adapters/composable-cache.js
var composable_cache_exports = {};
__export(composable_cache_exports, {
  default: () => composable_cache_default
});
module.exports = __toCommonJS(composable_cache_exports);

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
function getTagKey(tag) {
  if (typeof tag === "string") {
    return tag;
  }
  if ("path" in tag) {
    return JSON.stringify({
      tag: tag.tag,
      path: tag.path
    });
  }
  return tag.tag;
}
async function writeTags(tags) {
  const store = globalThis.__openNextAls.getStore();
  debug("Writing tags", tags, store);
  if (!store || globalThis.openNextConfig.dangerous?.disableTagCache) {
    return;
  }
  const tagsToWrite = tags.filter((t) => {
    const tagKey = getTagKey(t);
    const shouldWrite = !store.writtenTags.has(tagKey);
    if (shouldWrite) {
      store.writtenTags.add(tagKey);
    }
    return shouldWrite;
  });
  if (tagsToWrite.length === 0) {
    return;
  }
  await globalThis.tagCache.writeTags(tagsToWrite);
}

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/utils/stream.js
var import_web = require("node:stream/web");
async function fromReadableStream(stream, base64) {
  const chunks = [];
  let totalLength = 0;
  for await (const chunk of stream) {
    chunks.push(chunk);
    totalLength += chunk.length;
  }
  if (chunks.length === 0) {
    return "";
  }
  if (chunks.length === 1) {
    return Buffer.from(chunks[0]).toString(base64 ? "base64" : "utf8");
  }
  const buffer = Buffer.alloc(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  return buffer.toString(base64 ? "base64" : "utf8");
}
function toReadableStream(value, isBase64) {
  return new import_web.ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/adapters/composable-cache.js
var pendingWritePromiseMap = /* @__PURE__ */ new Map();
var composable_cache_default = {
  async get(cacheKey) {
    try {
      if (pendingWritePromiseMap.has(cacheKey)) {
        const stored = pendingWritePromiseMap.get(cacheKey);
        if (stored) {
          return stored.then((entry) => ({
            ...entry,
            value: toReadableStream(entry.value)
          }));
        }
      }
      const result = await globalThis.incrementalCache.get(cacheKey, "composable");
      if (!result?.value?.value) {
        return void 0;
      }
      debug("composable cache result", result);
      let revalidate = result.value.revalidate;
      if (globalThis.tagCache.mode === "nextMode" && result.value.tags.length > 0) {
        const hasBeenRevalidated = result.shouldBypassTagCache ? false : await globalThis.tagCache.hasBeenRevalidated(result.value.tags, result.lastModified);
        if (hasBeenRevalidated)
          return void 0;
        const isCacheStale = result.shouldBypassTagCache ? false : await isStale(cacheKey, result.value.tags, result.lastModified);
        if (isCacheStale) {
          revalidate = -1;
        }
      } else if (globalThis.tagCache.mode === "original" || globalThis.tagCache.mode === void 0) {
        const hasBeenRevalidated = result.shouldBypassTagCache ? false : await globalThis.tagCache.getLastModified(cacheKey, result.lastModified) === -1;
        if (hasBeenRevalidated)
          return void 0;
        const isCacheStale = result.shouldBypassTagCache ? false : await isStale(cacheKey, result.value.tags, result.lastModified);
        if (isCacheStale) {
          revalidate = -1;
        }
      }
      return {
        ...result.value,
        revalidate,
        value: toReadableStream(result.value.value)
      };
    } catch (e) {
      debug("Cannot read composable cache entry");
      return void 0;
    }
  },
  async set(cacheKey, pendingEntry) {
    const promiseEntry = pendingEntry.then(async (entry2) => ({
      ...entry2,
      value: await fromReadableStream(entry2.value)
    }));
    pendingWritePromiseMap.set(cacheKey, promiseEntry);
    const entry = await promiseEntry.finally(() => {
      pendingWritePromiseMap.delete(cacheKey);
    });
    await globalThis.incrementalCache.set(cacheKey, {
      ...entry,
      value: entry.value
    }, "composable");
    if (globalThis.tagCache.mode === "original") {
      const storedTags = await globalThis.tagCache.getByPath(cacheKey);
      const tagsToWrite = entry.tags.filter((tag) => !storedTags.includes(tag));
      if (tagsToWrite.length > 0) {
        await writeTags(tagsToWrite.map((tag) => ({ tag, path: cacheKey })));
      }
    }
  },
  async refreshTags() {
    return;
  },
  /**
   * The signature has changed in Next.js 16
   * - Before Next.js 16, the method takes `...tags: string[]`
   * - From Next.js 16, the method takes `tags: string[]`
   */
  async getExpiration(...tags) {
    if (globalThis.tagCache.mode === "nextMode") {
      return globalThis.tagCache.getLastRevalidated(tags.flat());
    }
    return 0;
  },
  /**
   * This method is only used before Next.js 16
   */
  async expireTags(...tags) {
    if (globalThis.tagCache.mode === "nextMode") {
      return writeTags(tags);
    }
    const tagCache = globalThis.tagCache;
    const revalidatedAt = Date.now();
    const pathsToUpdate = await Promise.all(tags.map(async (tag) => {
      const paths = await tagCache.getByTag(tag);
      return paths.map((path) => ({
        path,
        tag,
        revalidatedAt
      }));
    }));
    const setToWrite = /* @__PURE__ */ new Set();
    for (const entry of pathsToUpdate.flat()) {
      setToWrite.add(entry);
    }
    await writeTags(Array.from(setToWrite));
  },
  // This one is necessary for older versions of next
  async receiveExpiredTags(...tags) {
    return;
  },
  /**
   * Added in Next.js 16. Updates tags with optional stale/expire durations.
   * Mirrors the logic in `Cache.revalidateTag` but without CDN invalidation
   * since composable cache keys are not URL paths.
   *
   * When `durations` is provided, marks tags as stale immediately and optionally
   * sets an expiry timestamp. When omitted, immediately expires tags (no grace period).
   * durations.expire is in seconds, but we convert it to milliseconds for storage and comparison.
   */
  async updateTags(tags, durations) {
    const config = globalThis.openNextConfig.dangerous;
    if (config?.disableTagCache || config?.disableIncrementalCache) {
      return;
    }
    if (tags.length === 0) {
      return;
    }
    try {
      const now = Date.now();
      if (globalThis.tagCache.mode === "nextMode") {
        const tagsToWrite = tags.map((tag) => {
          if (durations) {
            return {
              tag,
              stale: now,
              expire: durations.expire !== void 0 ? now + durations.expire * 1e3 : void 0
            };
          }
          return { tag, expire: now };
        });
        await writeTags(tagsToWrite);
      } else {
        const originalTagCache = globalThis.tagCache;
        const pathsPerTag = await Promise.all(tags.map(async (tag) => {
          const paths = await originalTagCache.getByTag(tag);
          return paths.map((path) => {
            if (durations) {
              return {
                path,
                tag,
                stale: now,
                expire: durations.expire !== void 0 ? now + durations.expire * 1e3 : void 0
              };
            }
            return { path, tag, expire: now };
          });
        }));
        const toWrite = pathsPerTag.flat();
        if (toWrite.length > 0) {
          await writeTags(toWrite);
        }
      }
    } catch (e) {
      debug("Failed to update tags", e);
    }
  }
};
