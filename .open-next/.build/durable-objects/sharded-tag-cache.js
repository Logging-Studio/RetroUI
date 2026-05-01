globalThis.openNextDebug = false;globalThis.openNextVersion = "3.10.4";globalThis.nextVersion = "16.2.2";

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/durable-objects/sharded-tag-cache.js
import { DurableObject } from "cloudflare:workers";

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/cloudflare-context.js
var cloudflareContextSymbol = Symbol.for("__cloudflare-context__");

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/overrides/internal.js
var debugCache = (name, ...args) => {
  if (process.env.NEXT_PRIVATE_DEBUG_CACHE) {
    console.log(`[${name}] `, ...args);
  }
};

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/durable-objects/sharded-tag-cache.js
var DOShardedTagCache = class extends DurableObject {
  sql;
  constructor(state, env) {
    super(state, env);
    this.sql = state.storage.sql;
    state.blockConcurrencyWhile(async () => {
      this.sql.exec(`CREATE TABLE IF NOT EXISTS revalidations (tag TEXT PRIMARY KEY, revalidatedAt INTEGER, stale INTEGER, expire INTEGER DEFAULT NULL)`);
      try {
        this.sql.exec(`ALTER TABLE revalidations ADD COLUMN stale INTEGER; ALTER TABLE revalidations ADD COLUMN expire INTEGER DEFAULT NULL`);
      } catch {
      }
    });
  }
  async getTagData(tags) {
    if (tags.length === 0)
      return {};
    try {
      const result = this.sql.exec(`SELECT tag, revalidatedAt, stale, expire FROM revalidations WHERE tag IN (${tags.map(() => "?").join(", ")})`, ...tags).toArray();
      debugCache("DOShardedTagCache", `getTagData tags=${tags} -> ${result.length} results`);
      return Object.fromEntries(result.map((row) => [
        row.tag,
        {
          revalidatedAt: row.revalidatedAt ?? 0,
          stale: row.stale ?? null,
          expire: row.expire ?? null
        }
      ]));
    } catch (e) {
      console.error(e);
      return {};
    }
  }
  /**
   * @deprecated since v1.19.
   *
   * Use `getTagData` instead - no processing should be done in the DO ao allow using the regional cache to cache all the values
   * for a given tag using a single key.
   *
   * Kept for backward compatibility during rolling deploys.
   */
  async getLastRevalidated(tags) {
    const data = await this.getTagData(tags);
    const values = Object.values(data);
    const timeMs = values.length === 0 ? 0 : Math.max(...values.map(({ revalidatedAt }) => revalidatedAt));
    debugCache("DOShardedTagCache", `getLastRevalidated tags=${tags} -> time=${timeMs}`);
    return timeMs;
  }
  /**
   * @deprecated since v1.19.
   *
   * Use `getTagData` instead - no processing should be done in the DO ao allow using the regional cache to cache all the values
   * for a given tag using a single key.
   *
   * Kept for backward compatibility during rolling deploys.
   */
  async hasBeenRevalidated(tags, lastModified) {
    const data = await this.getTagData(tags);
    const lastModifiedOrNowMs = lastModified ?? Date.now();
    const revalidated = Object.values(data).some(({ revalidatedAt }) => revalidatedAt > lastModifiedOrNowMs);
    debugCache("DOShardedTagCache", `hasBeenRevalidated tags=${tags} -> revalidated=${revalidated}`);
    return revalidated;
  }
  /**
   * @deprecated since v1.19.
   *
   * Use `getTagData` instead - no processing should be done in the DO ao allow using the regional cache to cache all the values
   * for a given tag using a single key.
   *
   * Kept for backward compatibility during rolling deploys.
   */
  async getRevalidationTimes(tags) {
    const data = await this.getTagData(tags);
    return Object.fromEntries(Object.entries(data).map(([tag, { revalidatedAt }]) => [tag, revalidatedAt]));
  }
  async writeTags(tags, lastModified) {
    if (tags.length === 0)
      return;
    const nowMs = lastModified ?? Date.now();
    debugCache("DOShardedTagCache", `writeTags tags=${JSON.stringify(tags)} time=${nowMs}`);
    if (typeof tags[0] === "string") {
      for (const tag of tags) {
        this.sql.exec(`INSERT OR REPLACE INTO revalidations (tag, revalidatedAt, stale) VALUES (?, ?, ?)`, tag, nowMs, nowMs);
      }
    } else {
      for (const entry of tags) {
        const staleValue = entry.stale ?? nowMs;
        this.sql.exec(`INSERT OR REPLACE INTO revalidations (tag, revalidatedAt, stale, expire) VALUES (?, ?, ?, ?)`, entry.tag, staleValue, staleValue, entry.expire ?? null);
      }
    }
  }
};
export {
  DOShardedTagCache
};
