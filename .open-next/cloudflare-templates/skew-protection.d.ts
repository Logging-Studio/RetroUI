/** Name of the env var containing the mapping */
export declare const DEPLOYMENT_MAPPING_ENV_NAME = "CF_DEPLOYMENT_MAPPING";
/** Version used for the latest worker */
export declare const CURRENT_VERSION_ID = "current";
/**
 * Routes the request to the requested deployment.
 *
 * A specific deployment can be requested via:
 * - the `dpl` search parameter for assets
 * - the `x-deployment-id` for other requests
 *
 * When a specific deployment is requested, we route to that deployment via the preview URLs.
 * See https://developers.cloudflare.com/workers/configuration/previews/
 *
 * When the requested deployment is not supported a 400 response is returned.
 *
 * Notes:
 * - The re-routing is only active for the deployed version of the app (on a custom domain)
 * - Assets are also handled when `run_worker_first` is enabled.
 *   See https://developers.cloudflare.com/workers/static-assets/binding/#run_worker_first
 *
 * @param request
 * @returns
 */
export declare function maybeGetSkewProtectionResponse(request: Request): Promise<Response> | Response | undefined;
declare global {
    var __SKEW_PROTECTION_ENABLED__: boolean;
}
