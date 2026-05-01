import process from "node:process";
const DEPLOYMENT_MAPPING_ENV_NAME = "CF_DEPLOYMENT_MAPPING";
const CURRENT_VERSION_ID = "current";
let deploymentMapping;
function maybeGetSkewProtectionResponse(request) {
  if (false) {
    const url = new URL(request.url);
    if (url.hostname === "localhost" || url.hostname.endsWith(".workers.dev")) {
      return void 0;
    }
    const requestDeploymentId = request.headers.get("x-deployment-id") ?? url.searchParams.get("dpl");
    if (!requestDeploymentId || requestDeploymentId === process.env.DEPLOYMENT_ID) {
      return void 0;
    }
    deploymentMapping ??= process.env[DEPLOYMENT_MAPPING_ENV_NAME] ? JSON.parse(process.env[DEPLOYMENT_MAPPING_ENV_NAME]) : {};
    if (!(requestDeploymentId in deploymentMapping)) {
      return void 0;
    }
    const version = deploymentMapping[requestDeploymentId];
    if (!version || version === CURRENT_VERSION_ID) {
      return void 0;
    }
    const versionDomain = version.split("-")[0];
    const hostname = `${versionDomain}-${process.env.CF_WORKER_NAME}.${process.env.CF_PREVIEW_DOMAIN}.workers.dev`;
    url.hostname = hostname;
    const requestToOlderDeployment = new Request(url, request);
    const headers = new Headers(request.headers);
    headers.delete("origin");
    return fetch(requestToOlderDeployment, { headers });
  }
}
export {
  CURRENT_VERSION_ID,
  DEPLOYMENT_MAPPING_ENV_NAME,
  maybeGetSkewProtectionResponse
};
