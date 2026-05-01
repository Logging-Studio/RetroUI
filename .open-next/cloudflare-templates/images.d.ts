export type RemotePattern = {
    protocol?: "http" | "https";
    hostname: string;
    port?: string;
    pathname: string;
    search?: string;
};
export type LocalPattern = {
    pathname: string;
    search?: string;
};
/**
 * Handles requests to /_next/image(/), including image optimizations.
 *
 * Image optimization is disabled and the original image is returned if `env.IMAGES` is undefined.
 *
 * Throws an exception on unexpected errors.
 *
 * @param requestURL
 * @param requestHeaders
 * @param env
 * @returns A promise that resolves to the resolved request.
 */
export declare function handleImageRequest(requestURL: URL, requestHeaders: Headers, env: CloudflareEnv): Promise<Response>;
/**
 * Handles requests to /cdn-cgi/image/ in development.
 *
 * Extracts the image URL, fetches the image, and checks the content type against
 * Cloudflare's supported input formats.
 *
 * @param requestURL The full request URL.
 * @param env The Cloudflare environment bindings.
 * @returns A promise that resolves to the image response.
 */
export declare function handleCdnCgiImageRequest(requestURL: URL, env: CloudflareEnv): Promise<Response>;
/**
 * Parses a /cdn-cgi/image/ request URL.
 *
 * Extracts the image URL from the `/cdn-cgi/image/<options>/<image-url>` path format.
 * Rejects protocol-relative URLs (`//...`). The cdn-cgi options are not parsed or
 * validated as they are Cloudflare's concern.
 *
 * @param pathname The URL pathname (e.g. `/cdn-cgi/image/width=640,quality=75,format=auto/path/to/image.png`).
 * @returns the parsed URL result or an error.
 */
export declare function parseCdnCgiImageRequest(pathname: string): {
    ok: true;
    url: string;
    static: boolean;
} | ErrorResult;
export type OptimizedImageFormat = "image/avif" | "image/webp";
type ErrorResult = {
    ok: false;
    message: string;
};
export declare function matchLocalPattern(pattern: LocalPattern, url: {
    pathname: string;
    search: string;
}): boolean;
export declare function matchRemotePattern(pattern: RemotePattern, url: URL): boolean;
type ImageContentType = "image/avif" | "image/webp" | "image/png" | "image/jpeg" | "image/jxl" | "image/jp2" | "image/heic" | "image/gif" | "image/svg+xml" | "image/x-icon" | "image/x-icns" | "image/tiff" | "image/bmp";
/**
 * Detects the content type by looking at the first few bytes of a file
 *
 * Based on https://github.com/vercel/next.js/blob/72c9635/packages/next/src/server/image-optimizer.ts#L155
 *
 * @param buffer The image bytes
 * @returns a content type of undefined for unsupported content
 */
export declare function detectImageContentType(buffer: Uint8Array): ImageContentType | null;
declare global {
    var __IMAGES_REMOTE_PATTERNS__: RemotePattern[];
    var __IMAGES_LOCAL_PATTERNS__: LocalPattern[];
    var __IMAGES_DEVICE_SIZES__: number[];
    var __IMAGES_IMAGE_SIZES__: number[];
    var __IMAGES_QUALITIES__: number[];
    var __IMAGES_FORMATS__: NextConfigImageFormat[];
    var __IMAGES_MINIMUM_CACHE_TTL_SEC__: number;
    var __IMAGES_ALLOW_SVG__: boolean;
    var __IMAGES_CONTENT_SECURITY_POLICY__: string;
    var __IMAGES_CONTENT_DISPOSITION__: string;
    var __IMAGES_MAX_REDIRECTS__: number;
    type NextConfigImageFormat = "image/avif" | "image/webp";
}
export {};
