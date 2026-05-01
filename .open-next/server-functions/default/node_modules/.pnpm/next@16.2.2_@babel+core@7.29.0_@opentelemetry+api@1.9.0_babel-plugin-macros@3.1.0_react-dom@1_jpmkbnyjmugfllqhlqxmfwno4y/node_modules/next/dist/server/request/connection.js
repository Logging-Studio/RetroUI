"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connection", {
    enumerable: true,
    get: function() {
        return connection;
    }
});
const _workasyncstorageexternal = require("../app-render/work-async-storage.external");
const _workunitasyncstorageexternal = require("../app-render/work-unit-async-storage.external");
const _dynamicrendering = require("../app-render/dynamic-rendering");
const _staticgenerationbailout = require("../../client/components/static-generation-bailout");
const _dynamicrenderingutils = require("../dynamic-rendering-utils");
const _utils = require("./utils");
const _stagedrendering = require("../app-render/staged-rendering");
const _invarianterror = require("../../shared/lib/invariant-error");
function connection() {
    const callingExpression = 'connection';
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore) {
        if (workUnitStore && workUnitStore.phase === 'after' && !(0, _utils.isRequestAPICallableInsideAfter)()) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside \`after()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but \`after()\` executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E827",
                enumerable: false,
                configurable: true
            });
        }
        if (workStore.forceStatic) {
            // When using forceStatic, we override all other logic and always just
            // return a resolving promise without tracking.
            return Promise.resolve(undefined);
        }
        if (workStore.dynamicShouldError) {
            throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection()\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E847",
                enumerable: false,
                configurable: true
            });
        }
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'cache':
                    {
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E841",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, connection);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'private-cache':
                    {
                        // It might not be intuitive to throw for private caches as well, but
                        // we don't consider runtime prefetches as "actual requests" (in the
                        // navigation sense), despite allowing them to read cookies.
                        const error = Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
                            value: "E837",
                            enumerable: false,
                            configurable: true
                        });
                        Error.captureStackTrace(error, connection);
                        workStore.invalidDynamicUsageError ??= error;
                        throw error;
                    }
                case 'unstable-cache':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside a function cached with \`unstable_cache()\`. The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
                        value: "E840",
                        enumerable: false,
                        configurable: true
                    });
                case 'generate-static-params':
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used \`connection()\` inside \`generateStaticParams\`. This is not supported because \`generateStaticParams\` runs at build time without an HTTP request. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
                        value: "E1125",
                        enumerable: false,
                        configurable: true
                    });
                case 'prerender':
                case 'prerender-client':
                case 'prerender-runtime':
                    // We return a promise that never resolves to allow the prerender to
                    // stall at this point.
                    return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, '`connection()`');
                case 'validation-client':
                    {
                        // TODO(NAR-789): make this consistent with the actual browser behavior when we change it.
                        // Until then, erroring is fine.
                        const exportName = '`connection`';
                        throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a Client Component. Next.js should be preventing ${exportName} from being included in Client Components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                            value: "E1063",
                            enumerable: false,
                            configurable: true
                        });
                    }
                case 'prerender-ppr':
                    // We use React's postpone API to interrupt rendering here to create a
                    // dynamic hole
                    return (0, _dynamicrendering.postponeWithTracking)(workStore.route, 'connection', workUnitStore.dynamicTracking);
                case 'prerender-legacy':
                    // We throw an error here to interrupt prerendering to mark the route
                    // as dynamic
                    return (0, _dynamicrendering.throwToInterruptStaticGeneration)('connection', workStore, workUnitStore);
                case 'request':
                    (0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
                    if (process.env.NODE_ENV === 'development') {
                        // Semantically we only need the dev tracking when running in `next dev`
                        // but since you would never use next dev with production NODE_ENV we use this
                        // as a proxy so we can statically exclude this code from production builds.
                        if (workUnitStore.asyncApiPromises) {
                            return workUnitStore.asyncApiPromises.connection;
                        }
                        return (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(undefined, workUnitStore, _stagedrendering.RenderStage.Dynamic);
                    } else if (workUnitStore.asyncApiPromises) {
                        return workUnitStore.asyncApiPromises.connection;
                    } else {
                        return Promise.resolve(undefined);
                    }
                default:
                    workUnitStore;
            }
        }
    }
    // If we end up here, there was no work store or work unit store present.
    // TODO(NAR-789): connection() is not currently statically prevented from being imported in client components,
    // so we always error about a missing work unit store.
    (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
}

//# sourceMappingURL=connection.js.map