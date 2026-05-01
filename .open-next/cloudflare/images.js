// <define:__IMAGES_DEVICE_SIZES__>
var define_IMAGES_DEVICE_SIZES_default = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

// <define:__IMAGES_FORMATS__>
var define_IMAGES_FORMATS_default = ["image/webp"];

// <define:__IMAGES_IMAGE_SIZES__>
var define_IMAGES_IMAGE_SIZES_default = [32, 48, 64, 96, 128, 256, 384];

// <define:__IMAGES_LOCAL_PATTERNS__>
var define_IMAGES_LOCAL_PATTERNS_default = [{ pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$", search: "" }];

// <define:__IMAGES_QUALITIES__>
var define_IMAGES_QUALITIES_default = [75];

// <define:__IMAGES_REMOTE_PATTERNS__>
var define_IMAGES_REMOTE_PATTERNS_default = [{ protocol: "https", hostname: "^(?:^(?:pub\\-5f7cbdfd9ffa4c838e386788f395f0c4\\.r2\\.dev)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { protocol: "https", hostname: "^(?:^(?:cms\\.retroui\\.dev)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { protocol: "https", hostname: "^(?:^(?:avatars\\.githubusercontent\\.com)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }];

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

// node_modules/.pnpm/@opennextjs+cloudflare@1.19.5_next@16.2.2_@babel+core@7.29.0_@opentelemetry+api@1.9.0_babel-p_mqdr3ceixyfqll27yz55r7ykza/node_modules/@opennextjs/cloudflare/dist/cli/templates/images.js
async function handleImageRequest(requestURL, requestHeaders, env) {
  const parseResult = parseImageRequest(requestURL, requestHeaders);
  if (!parseResult.ok) {
    return new Response(parseResult.message, {
      status: 400
    });
  }
  let imageResponse;
  if (parseResult.url.startsWith("/")) {
    if (env.ASSETS === void 0) {
      error("env.ASSETS binding is not defined");
      return new Response('"url" parameter is valid but upstream response is invalid', {
        status: 404
      });
    }
    const absoluteURL = new URL(parseResult.url, requestURL);
    imageResponse = await env.ASSETS.fetch(absoluteURL);
  } else {
    let fetchImageResult;
    try {
      fetchImageResult = await fetchWithRedirects(parseResult.url, 7e3, 3);
    } catch (e) {
      throw new Error("Failed to fetch image", { cause: e });
    }
    if (!fetchImageResult.ok) {
      if (fetchImageResult.error === "timed_out") {
        return new Response('"url" parameter is valid but upstream response timed out', {
          status: 504
        });
      }
      if (fetchImageResult.error === "too_many_redirects") {
        return new Response('"url" parameter is valid but upstream response is invalid', {
          status: 508
        });
      }
      throw new Error("Failed to fetch image");
    }
    imageResponse = fetchImageResult.response;
  }
  if (!imageResponse.ok || imageResponse.body === null) {
    return new Response('"url" parameter is valid but upstream response is invalid', {
      status: imageResponse.status
    });
  }
  let immutable = false;
  if (parseResult.static) {
    immutable = true;
  } else {
    const cacheControlHeader = imageResponse.headers.get("Cache-Control");
    if (cacheControlHeader !== null) {
      immutable = cacheControlHeader.includes("immutable");
    }
  }
  const readHeaderResult = await readImageHeader(imageResponse);
  if (readHeaderResult instanceof Response) {
    return readHeaderResult;
  }
  const { contentType, imageStream } = readHeaderResult;
  if (contentType === null) {
    warn(`Failed to detect content type of "${parseResult.url}"`);
    return new Response('"url" parameter is valid but image type is not allowed', {
      status: 400
    });
  }
  if (contentType === SVG) {
    if (true) {
      return new Response('"url" parameter is valid but image type is not allowed', {
        status: 400
      });
    }
    const response2 = createImageResponse(imageStream, contentType, {
      immutable
    });
    return response2;
  }
  if (contentType === GIF) {
    if (env.IMAGES === void 0) {
      warn("env.IMAGES binding is not defined");
      const response3 = createImageResponse(imageStream, contentType, {
        immutable
      });
      return response3;
    }
    const imageSource = env.IMAGES.input(imageStream);
    const imageTransformationResult = await imageSource.transform({
      width: parseResult.width,
      fit: "scale-down"
    }).output({
      quality: parseResult.quality,
      format: GIF
    });
    const outputImageStream = imageTransformationResult.image();
    const response2 = createImageResponse(outputImageStream, GIF, {
      immutable
    });
    return response2;
  }
  if (contentType === AVIF || contentType === WEBP || contentType === JPEG || contentType === PNG) {
    if (env.IMAGES === void 0) {
      warn("env.IMAGES binding is not defined");
      const response3 = createImageResponse(imageStream, contentType, {
        immutable
      });
      return response3;
    }
    const outputFormat = parseResult.format ?? contentType;
    const imageSource = env.IMAGES.input(imageStream);
    const imageTransformationResult = await imageSource.transform({
      width: parseResult.width,
      fit: "scale-down"
    }).output({
      quality: parseResult.quality,
      format: outputFormat
    });
    const outputImageStream = imageTransformationResult.image();
    const response2 = createImageResponse(outputImageStream, outputFormat, {
      immutable
    });
    return response2;
  }
  warn(`Image content type ${contentType} not supported`);
  const response = createImageResponse(imageStream, contentType, {
    immutable
  });
  return response;
}
async function handleCdnCgiImageRequest(requestURL, env) {
  const parseResult = parseCdnCgiImageRequest(requestURL.pathname);
  if (!parseResult.ok) {
    return new Response(parseResult.message, {
      status: 400
    });
  }
  let imageResponse;
  if (parseResult.url.startsWith("/")) {
    if (env.ASSETS === void 0) {
      return new Response("env.ASSETS binding is not defined", {
        status: 404
      });
    }
    const absoluteURL = new URL(parseResult.url, requestURL);
    imageResponse = await env.ASSETS.fetch(absoluteURL);
  } else {
    imageResponse = await fetch(parseResult.url);
  }
  if (!imageResponse.ok || imageResponse.body === null) {
    return new Response('"url" parameter is valid but upstream response is invalid', {
      status: imageResponse.status
    });
  }
  const readHeaderResult = await readImageHeader(imageResponse);
  if (readHeaderResult instanceof Response) {
    return readHeaderResult;
  }
  const { contentType, imageStream } = readHeaderResult;
  if (contentType === null || !SUPPORTED_CDN_CGI_INPUT_TYPES.has(contentType)) {
    return new Response('"url" parameter is valid but image type is not allowed', {
      status: 400
    });
  }
  if (contentType === SVG && true) {
    return new Response('"url" parameter is valid but image type is not allowed', {
      status: 400
    });
  }
  return new Response(imageStream, {
    headers: { "Content-Type": contentType }
  });
}
function parseCdnCgiImageRequest(pathname) {
  const match = pathname.match(/^\/cdn-cgi\/image\/(?<options>[^/]+)\/(?<url>.+)$/);
  if (match === null || // Valid URLs have at least one option
  !match.groups?.options || !match.groups?.url) {
    return { ok: false, message: "Invalid /cdn-cgi/image/ URL format" };
  }
  const imageUrl = match.groups.url;
  if (imageUrl.startsWith("/")) {
    return { ok: false, message: '"url" parameter cannot be a protocol-relative URL (//)' };
  }
  let resolvedUrl;
  if (imageUrl.match(/^https?:\/\//)) {
    resolvedUrl = imageUrl;
  } else {
    resolvedUrl = `/${imageUrl}`;
  }
  return {
    ok: true,
    url: resolvedUrl,
    static: false
  };
}
async function readImageHeader(imageResponse) {
  const [contentTypeStream, imageStream] = imageResponse.body.tee();
  const headerBytes = new Uint8Array(32);
  const reader = contentTypeStream.getReader({ mode: "byob" });
  const readResult = await reader.readAtLeast(32, headerBytes);
  if (readResult.value === void 0) {
    await imageResponse.body.cancel();
    return new Response('"url" parameter is valid but upstream response is invalid', {
      status: 400
    });
  }
  const contentType = detectImageContentType(readResult.value);
  return { contentType, imageStream };
}
async function fetchWithRedirects(url, timeoutMS, maxRedirectCount) {
  let response;
  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMS),
      redirect: "manual"
    });
  } catch (e) {
    if (e instanceof Error && e.name === "TimeoutError") {
      const result2 = {
        ok: false,
        error: "timed_out"
      };
      return result2;
    }
    throw e;
  }
  if (redirectResponseStatuses.includes(response.status)) {
    const locationHeader = response.headers.get("Location");
    if (locationHeader !== null) {
      if (maxRedirectCount < 1) {
        const result3 = {
          ok: false,
          error: "too_many_redirects"
        };
        return result3;
      }
      let redirectTarget;
      if (locationHeader.startsWith("/")) {
        redirectTarget = new URL(locationHeader, url).href;
      } else {
        redirectTarget = locationHeader;
      }
      const result2 = await fetchWithRedirects(redirectTarget, timeoutMS, maxRedirectCount - 1);
      return result2;
    }
  }
  const result = {
    ok: true,
    response
  };
  return result;
}
var redirectResponseStatuses = [301, 302, 303, 307, 308];
function createImageResponse(image, contentType, imageResponseFlags) {
  const response = new Response(image, {
    headers: {
      Vary: "Accept",
      "Content-Type": contentType,
      "Content-Disposition": "attachment",
      "Content-Security-Policy": "script-src 'none'; frame-src 'none'; sandbox;"
    }
  });
  if (imageResponseFlags.immutable) {
    response.headers.set("Cache-Control", "public, max-age=315360000, immutable");
  }
  return response;
}
function parseImageRequest(requestURL, requestHeaders) {
  const formats = define_IMAGES_FORMATS_default;
  const parsedUrlOrError = validateUrlQueryParameter(requestURL);
  if (!("url" in parsedUrlOrError)) {
    return parsedUrlOrError;
  }
  const widthOrError = validateWidthQueryParameter(requestURL);
  if (typeof widthOrError !== "number") {
    return widthOrError;
  }
  const qualityOrError = validateQualityQueryParameter(requestURL);
  if (typeof qualityOrError !== "number") {
    return qualityOrError;
  }
  const acceptHeader = requestHeaders.get("Accept") ?? "";
  let format = null;
  for (const allowedFormat of formats) {
    if (acceptHeader.includes(allowedFormat)) {
      format = allowedFormat;
      break;
    }
  }
  const result = {
    ok: true,
    url: parsedUrlOrError.url,
    width: widthOrError,
    quality: qualityOrError,
    format,
    static: parsedUrlOrError.static
  };
  return result;
}
function validateUrlQueryParameter(requestURL) {
  const urls = requestURL.searchParams.getAll("url");
  if (urls.length < 1) {
    const result = {
      ok: false,
      message: '"url" parameter is required'
    };
    return result;
  }
  if (urls.length > 1) {
    const result = {
      ok: false,
      message: '"url" parameter cannot be an array'
    };
    return result;
  }
  const url = urls[0];
  if (url.length > 3072) {
    const result = {
      ok: false,
      message: '"url" parameter is too long'
    };
    return result;
  }
  if (url.startsWith("//")) {
    const result = {
      ok: false,
      message: '"url" parameter cannot be a protocol-relative URL (//)'
    };
    return result;
  }
  if (url.startsWith("/")) {
    const staticAsset = url.startsWith(`${__NEXT_BASE_PATH__ || ""}/_next/static/media`);
    const pathname = getPathnameFromRelativeURL(url);
    if (/\/_next\/image($|\/)/.test(decodeURIComponent(pathname))) {
      const result = {
        ok: false,
        message: '"url" parameter cannot be recursive'
      };
      return result;
    }
    if (!staticAsset) {
      if (!hasLocalMatch(define_IMAGES_LOCAL_PATTERNS_default, url)) {
        const result = { ok: false, message: '"url" parameter is not allowed' };
        return result;
      }
    }
    return { url, static: staticAsset };
  }
  let parsedURL;
  try {
    parsedURL = new URL(url);
  } catch {
    const result = { ok: false, message: '"url" parameter is invalid' };
    return result;
  }
  const validProtocols = ["http:", "https:"];
  if (!validProtocols.includes(parsedURL.protocol)) {
    const result = {
      ok: false,
      message: '"url" parameter is invalid'
    };
    return result;
  }
  if (!hasRemoteMatch(define_IMAGES_REMOTE_PATTERNS_default, parsedURL)) {
    const result = {
      ok: false,
      message: '"url" parameter is not allowed'
    };
    return result;
  }
  return { url: parsedURL.href, static: false };
}
function validateWidthQueryParameter(requestURL) {
  const widthQueryValues = requestURL.searchParams.getAll("w");
  if (widthQueryValues.length < 1) {
    const result = {
      ok: false,
      message: '"w" parameter (width) is required'
    };
    return result;
  }
  if (widthQueryValues.length > 1) {
    const result = {
      ok: false,
      message: '"w" parameter (width) cannot be an array'
    };
    return result;
  }
  const widthQueryValue = widthQueryValues[0];
  if (!/^[0-9]+$/.test(widthQueryValue)) {
    const result = {
      ok: false,
      message: '"w" parameter (width) must be an integer greater than 0'
    };
    return result;
  }
  const width = parseInt(widthQueryValue, 10);
  if (width <= 0 || isNaN(width)) {
    const result = {
      ok: false,
      message: '"w" parameter (width) must be an integer greater than 0'
    };
    return result;
  }
  const sizeValid = define_IMAGES_DEVICE_SIZES_default.includes(width) || define_IMAGES_IMAGE_SIZES_default.includes(width);
  if (!sizeValid) {
    const result = {
      ok: false,
      message: `"w" parameter (width) of ${width} is not allowed`
    };
    return result;
  }
  return width;
}
function validateQualityQueryParameter(requestURL) {
  const qualityQueryValues = requestURL.searchParams.getAll("q");
  if (qualityQueryValues.length < 1) {
    const result = {
      ok: false,
      message: '"q" parameter (quality) is required'
    };
    return result;
  }
  if (qualityQueryValues.length > 1) {
    const result = {
      ok: false,
      message: '"q" parameter (quality) cannot be an array'
    };
    return result;
  }
  const qualityQueryValue = qualityQueryValues[0];
  if (!/^[0-9]+$/.test(qualityQueryValue)) {
    const result = {
      ok: false,
      message: '"q" parameter (quality) must be an integer between 1 and 100'
    };
    return result;
  }
  const quality = parseInt(qualityQueryValue, 10);
  if (isNaN(quality) || quality < 1 || quality > 100) {
    const result = {
      ok: false,
      message: '"q" parameter (quality) must be an integer between 1 and 100'
    };
    return result;
  }
  if (!define_IMAGES_QUALITIES_default.includes(quality)) {
    const result = {
      ok: false,
      message: `"q" parameter (quality) of ${quality} is not allowed`
    };
    return result;
  }
  return quality;
}
function getPathnameFromRelativeURL(relativeURL) {
  return relativeURL.split("?")[0];
}
function hasLocalMatch(localPatterns, relativeURL) {
  const parseRelativeURLResult = parseRelativeURL(relativeURL);
  for (const localPattern of localPatterns) {
    const matched = matchLocalPattern(localPattern, parseRelativeURLResult);
    if (matched) {
      return true;
    }
  }
  return false;
}
function parseRelativeURL(relativeURL) {
  if (!relativeURL.includes("?")) {
    const result2 = {
      pathname: relativeURL,
      search: ""
    };
    return result2;
  }
  const parts = relativeURL.split("?");
  const pathname = parts[0];
  const search = "?" + parts.slice(1).join("?");
  const result = {
    pathname,
    search
  };
  return result;
}
function matchLocalPattern(pattern, url) {
  if (pattern.search !== void 0 && pattern.search !== url.search) {
    return false;
  }
  return new RegExp(pattern.pathname).test(url.pathname);
}
function hasRemoteMatch(remotePatterns, url) {
  for (const remotePattern of remotePatterns) {
    const matched = matchRemotePattern(remotePattern, url);
    if (matched) {
      return true;
    }
  }
  return false;
}
function matchRemotePattern(pattern, url) {
  if (pattern.protocol !== void 0 && pattern.protocol.replace(/:$/, "") !== url.protocol.replace(/:$/, "")) {
    return false;
  }
  if (pattern.port !== void 0 && pattern.port !== url.port) {
    return false;
  }
  if (pattern.hostname === void 0 || !new RegExp(pattern.hostname).test(url.hostname)) {
    return false;
  }
  if (pattern.search !== void 0 && pattern.search !== url.search) {
    return false;
  }
  return new RegExp(pattern.pathname).test(url.pathname);
}
var AVIF = "image/avif";
var WEBP = "image/webp";
var PNG = "image/png";
var JPEG = "image/jpeg";
var JXL = "image/jxl";
var JP2 = "image/jp2";
var HEIC = "image/heic";
var GIF = "image/gif";
var SVG = "image/svg+xml";
var ICO = "image/x-icon";
var ICNS = "image/x-icns";
var TIFF = "image/tiff";
var BMP = "image/bmp";
var SUPPORTED_CDN_CGI_INPUT_TYPES = /* @__PURE__ */ new Set([JPEG, PNG, GIF, WEBP, SVG, HEIC]);
function detectImageContentType(buffer) {
  if ([255, 216, 255].every((b, i) => buffer[i] === b)) {
    return JPEG;
  }
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => buffer[i] === b)) {
    return PNG;
  }
  if ([71, 73, 70, 56].every((b, i) => buffer[i] === b)) {
    return GIF;
  }
  if ([82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80].every((b, i) => !b || buffer[i] === b)) {
    return WEBP;
  }
  if ([60, 63, 120, 109, 108].every((b, i) => buffer[i] === b)) {
    return SVG;
  }
  if ([60, 115, 118, 103].every((b, i) => buffer[i] === b)) {
    return SVG;
  }
  if ([0, 0, 0, 0, 102, 116, 121, 112, 97, 118, 105, 102].every((b, i) => !b || buffer[i] === b)) {
    return AVIF;
  }
  if ([0, 0, 1, 0].every((b, i) => buffer[i] === b)) {
    return ICO;
  }
  if ([105, 99, 110, 115].every((b, i) => buffer[i] === b)) {
    return ICNS;
  }
  if ([73, 73, 42, 0].every((b, i) => buffer[i] === b)) {
    return TIFF;
  }
  if ([66, 77].every((b, i) => buffer[i] === b)) {
    return BMP;
  }
  if ([255, 10].every((b, i) => buffer[i] === b)) {
    return JXL;
  }
  if ([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10].every((b, i) => buffer[i] === b)) {
    return JXL;
  }
  if ([0, 0, 0, 0, 102, 116, 121, 112, 104, 101, 105, 99].every((b, i) => !b || buffer[i] === b)) {
    return HEIC;
  }
  if ([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10].every((b, i) => buffer[i] === b)) {
    return JP2;
  }
  return null;
}
export {
  detectImageContentType,
  handleCdnCgiImageRequest,
  handleImageRequest,
  matchLocalPattern,
  matchRemotePattern,
  parseCdnCgiImageRequest
};
