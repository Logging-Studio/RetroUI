"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRootParam", {
    enumerable: true,
    get: function() {
        return getRootParam;
    }
});
const _invarianterror = require("../../shared/lib/invariant-error");
const _dynamicrendering = require("../app-render/dynamic-rendering");
const _workasyncstorageexternal = require("../app-render/work-async-storage.external");
const _workunitasyncstorageexternal = require("../app-render/work-unit-async-storage.external");
const _dynamicrenderingutils = require("../dynamic-rendering-utils");
const _reflectutils = require("../../shared/lib/utils/reflect-utils");
const _actionasyncstorageexternal = require("../app-render/action-async-storage.external");
const _varyparams = require("../app-render/vary-params");
function getRootParam(paramName) {
    const apiName = `\`import('next/root-params').${paramName}()\``;
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError(`Missing workStore in ${apiName}`), "__NEXT_ERROR_CODE", {
            value: "E1032",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workUnitStore) {
        throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} outside of a Server Component. This is not allowed.`), "__NEXT_ERROR_CODE", {
            value: "E1006",
            enumerable: false,
            configurable: true
        });
    }
    const actionStore = _actionasyncstorageexternal.actionAsyncStorage.getStore();
    if (actionStore) {
        if (actionStore.isAppRoute) {
            // TODO(root-params): add support for route handlers
            throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} inside a Route Handler. Support for this API in Route Handlers is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
                value: "E1043",
                enumerable: false,
                configurable: true
            });
        }
        if (actionStore.isAction && workUnitStore.phase === 'action') {
            // Actions are not fundamentally tied to a route (even if they're always submitted from some page),
            // so root params would be inconsistent if an action is called from multiple roots.
            // Make sure we check if the phase is "action" - we should not error in the rerender
            // after an action revalidates or updates cookies (which will still have `actionStore.isAction === true`)
            throw Object.defineProperty(new Error(`${apiName} was used inside a Server Action. This is not supported. Functions from 'next/root-params' can only be called in the context of a route.`), "__NEXT_ERROR_CODE", {
                value: "E1014",
                enumerable: false,
                configurable: true
            });
        }
    }
    switch(workUnitStore.type){
        case 'unstable-cache':
            {
                throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} inside \`unstable_cache\`. This is not supported. Use \`"use cache"\` instead.`), "__NEXT_ERROR_CODE", {
                    value: "E1141",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'cache':
            {
                if (!workUnitStore.rootParams) {
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} inside \`"use cache"\` nested within \`unstable_cache\`. Root params are not available in this context.`), "__NEXT_ERROR_CODE", {
                        value: "E1140",
                        enumerable: false,
                        configurable: true
                    });
                }
                workUnitStore.readRootParamNames.add(paramName);
                return Promise.resolve(workUnitStore.rootParams[paramName]);
            }
        case 'prerender':
        case 'prerender-ppr':
        case 'prerender-legacy':
            {
                return createPrerenderRootParamPromise(paramName, workStore, workUnitStore, apiName);
            }
        case 'validation-client':
        case 'prerender-client':
            {
                throw Object.defineProperty(new _invarianterror.InvariantError(`${apiName} must not be used within a client component. Next.js should be preventing ${apiName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E1062",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'request':
            {
                if (process.env.__NEXT_CACHE_COMPONENTS && workUnitStore.validationSamples) {
                    const { assertRootParamInSamples } = require('../app-render/instant-validation/instant-samples');
                    // If we error, make sure we return a rejected promise instead of erroring synchronously.
                    try {
                        assertRootParamInSamples(workStore, workUnitStore.validationSamples.params, paramName);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
                break;
            }
        case 'private-cache':
        case 'prerender-runtime':
            {
                break;
            }
        case 'generate-static-params':
            {
                if (!(paramName in workUnitStore.rootParams)) {
                    throw Object.defineProperty(new Error(`Route ${workStore.route} used ${apiName} inside \`generateStaticParams\`, but the \`${paramName}\` parameter was not provided by a parent \`generateStaticParams\`. In \`generateStaticParams\`, root params are only available for segments nested below the segment that provides them.`), "__NEXT_ERROR_CODE", {
                        value: "E1142",
                        enumerable: false,
                        configurable: true
                    });
                }
                break;
            }
        default:
            {
                workUnitStore;
            }
    }
    (0, _varyparams.accumulateRootVaryParam)(paramName);
    return Promise.resolve(workUnitStore.rootParams[paramName]);
}
function createPrerenderRootParamPromise(paramName, workStore, prerenderStore, apiName) {
    switch(prerenderStore.type){
        case 'prerender':
        case 'prerender-legacy':
        case 'prerender-ppr':
        default:
    }
    const underlyingParams = prerenderStore.rootParams;
    switch(prerenderStore.type){
        case 'prerender':
            {
                // We are in a cacheComponents prerender.
                // The param is a fallback, so it should be treated as dynamic.
                if (prerenderStore.fallbackRouteParams && prerenderStore.fallbackRouteParams.has(paramName)) {
                    return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, apiName);
                }
                break;
            }
        case 'prerender-ppr':
            {
                // We aren't in a cacheComponents prerender, but the param is a fallback,
                // so we need to make an erroring params object which will postpone/error if you access it
                if (prerenderStore.fallbackRouteParams && prerenderStore.fallbackRouteParams.has(paramName)) {
                    return makeErroringRootParamPromise(paramName, workStore, prerenderStore, apiName);
                }
                break;
            }
        case 'prerender-legacy':
            {
                break;
            }
        default:
            {
                prerenderStore;
            }
    }
    // If the param is not a fallback param, we just return the statically available value.
    (0, _varyparams.accumulateRootVaryParam)(paramName);
    return Promise.resolve(underlyingParams[paramName]);
}
/** Deliberately async -- we want to create a rejected promise, not error synchronously. */ async function makeErroringRootParamPromise(paramName, workStore, prerenderStore, apiName) {
    const expression = (0, _reflectutils.describeStringPropertyAccess)(apiName, paramName);
    // In most dynamic APIs, we also throw if `dynamic = "error"`.
    // However, root params are only dynamic when we're generating a fallback shell,
    // and even with `dynamic = "error"` we still support generating dynamic fallback shells.
    // TODO: remove this comment when cacheComponents is the default since there will be no `dynamic = "error"`
    switch(prerenderStore.type){
        case 'prerender-ppr':
            {
                return (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
            }
        case 'prerender-legacy':
            {
                return (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
            }
        default:
            {
                prerenderStore;
            }
    }
}

//# sourceMappingURL=root-params.js.map