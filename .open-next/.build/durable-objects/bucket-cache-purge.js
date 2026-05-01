globalThis.openNextDebug = false;globalThis.openNextVersion = "3.10.4";globalThis.nextVersion = "16.2.2";

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/durable-objects/bucket-cache-purge.js
import { DurableObject } from "cloudflare:workers";

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}

// node_modules/.pnpm/@opennextjs+aws@3.10.4_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-plugin-m_sinvcevylogdxwgjhtfixk6kim/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
var DOWNPLAYED_ERROR_LOGS = [
  {
    clientName: "S3Client",
    commandName: "GetObjectCommand",
    errorName: "NoSuchKey"
  }
];
var isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/cloudflare-context.js
var cloudflareContextSymbol = Symbol.for("__cloudflare-context__");

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/overrides/internal.js
var debugCache = (name, ...args) => {
  if (process.env.NEXT_PRIVATE_DEBUG_CACHE) {
    console.log(`[${name}] `, ...args);
  }
};
async function internalPurgeCacheByTags(env, tags) {
  if (!env.CACHE_PURGE_ZONE_ID || !env.CACHE_PURGE_API_TOKEN) {
    error("No cache zone ID or API token provided. Skipping cache purge.");
    return "missing-credentials";
  }
  let response;
  try {
    response = await fetch(`https://api.cloudflare.com/client/v4/zones/${env.CACHE_PURGE_ZONE_ID}/purge_cache`, {
      headers: {
        Authorization: `Bearer ${env.CACHE_PURGE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        tags
      })
    });
    if (response.status === 429) {
      error("purgeCacheByTags: Rate limit exceeded. Skipping cache purge.");
      return "rate-limit-exceeded";
    }
    const bodyResponse = await response.json();
    if (!bodyResponse.success) {
      error("purgeCacheByTags: Cache purge failed. Errors:", bodyResponse.errors.map((error2) => `${error2.code}: ${error2.message}`));
      return "purge-failed";
    }
    debugCache("purgeCacheByTags", "Cache purged successfully for tags:", tags);
    return "purge-success";
  } catch (error2) {
    console.error("Error purging cache by tags:", error2);
    return "purge-failed";
  } finally {
    try {
      await response?.body?.cancel();
    } catch {
    }
  }
}

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/api/durable-objects/bucket-cache-purge.js
var DEFAULT_BUFFER_TIME_IN_SECONDS = 5;
var MAX_NUMBER_OF_TAGS_PER_PURGE = 100;
var BucketCachePurge = class extends DurableObject {
  bufferTimeInSeconds;
  constructor(state, env) {
    super(state, env);
    this.bufferTimeInSeconds = env.NEXT_CACHE_DO_PURGE_BUFFER_TIME_IN_SECONDS ? parseInt(env.NEXT_CACHE_DO_PURGE_BUFFER_TIME_IN_SECONDS) : DEFAULT_BUFFER_TIME_IN_SECONDS;
    state.blockConcurrencyWhile(async () => {
      state.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS cache_purge (
        tag TEXT NOT NULL
      );
      CREATE UNIQUE INDEX IF NOT EXISTS tag_index ON cache_purge (tag);
      `);
    });
  }
  async purgeCacheByTags(tags) {
    for (const tag of tags) {
      this.ctx.storage.sql.exec(`
        INSERT OR REPLACE INTO cache_purge (tag)
        VALUES (?)`, [tag]);
    }
    const nextAlarm = await this.ctx.storage.getAlarm();
    if (!nextAlarm) {
      this.ctx.storage.setAlarm(Date.now() + this.bufferTimeInSeconds * 1e3);
    }
  }
  async alarm() {
    let tags = this.ctx.storage.sql.exec(`
      SELECT * FROM cache_purge LIMIT ${MAX_NUMBER_OF_TAGS_PER_PURGE}
    `).toArray();
    do {
      if (tags.length === 0) {
        return;
      }
      const result = await internalPurgeCacheByTags(this.env, tags.map((row) => row.tag));
      if (result === "rate-limit-exceeded") {
        throw new Error("Rate limit exceeded");
      }
      this.ctx.storage.sql.exec(`
        DELETE FROM cache_purge
        WHERE tag IN (${tags.map(() => "?").join(",")})
      `, tags.map((row) => row.tag));
      if (tags.length < MAX_NUMBER_OF_TAGS_PER_PURGE) {
        tags = [];
      } else {
        tags = this.ctx.storage.sql.exec(`
          SELECT * FROM cache_purge LIMIT ${MAX_NUMBER_OF_TAGS_PER_PURGE}
        `).toArray();
      }
    } while (tags.length >= 0);
  }
};
export {
  BucketCachePurge
};
