"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createParamsFromClient: null,
    createPrerenderParamsForClientSegment: null,
    createServerParamsForMetadata: null,
    createServerParamsForRoute: null,
    createServerParamsForServerSegment: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createParamsFromClient: function() {
        return createParamsFromClient;
    },
    createPrerenderParamsForClientSegment: function() {
        return createPrerenderParamsForClientSegment;
    },
    createServerParamsForMetadata: function() {
        return createServerParamsForMetadata;
    },
    createServerParamsForRoute: function() {
        return createServerParamsForRoute;
    },
    createServerParamsForServerSegment: function() {
        return createServerParamsForServerSegment;
    }
});
const _workasyncstorageexternal = require("../app-render/work-async-storage.external");
const _varyparams = require("../app-render/vary-params");
const _reflect = require("../web/spec-extension/adapters/reflect");
const _dynamicrendering = require("../app-render/dynamic-rendering");
const _workunitasyncstorageexternal = require("../app-render/work-unit-async-storage.external");
const _invarianterror = require("../../shared/lib/invariant-error");
const _reflectutils = require("../../shared/lib/utils/reflect-utils");
const _dynamicrenderingutils = require("../dynamic-rendering-utils");
const _creatededupedbycallsiteservererrorlogger = require("../create-deduped-by-callsite-server-error-logger");
const _dynamicaccessasyncstorageexternal = require("../app-render/dynamic-access-async-storage.external");
const _stagedrendering = require("../app-render/staged-rendering");
function createParamsFromClient(underlyingParams) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                // Client params don't need additional vary tracking because by the
                // time they reach the client, the access would have already been
                // tracked by the server.
                const varyParamsAccumulator = null;
                return createStaticPrerenderParams(underlyingParams, null, workStore, workUnitStore, varyParamsAccumulator);
            case 'validation-client':
                return createClientParamsInInstantValidation(underlyingParams, workStore, workUnitStore.validationSamples);
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError('createParamsFromClient should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E736",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                throw Object.defineProperty(new _invarianterror.InvariantError('createParamsFromClient should not be called in a runtime prerender.'), "__NEXT_ERROR_CODE", {
                    value: "E770",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new _invarianterror.InvariantError('createParamsFromClient should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1122",
                    enumerable: false,
                    configurable: true
                });
            case 'request':
                if (process.env.NODE_ENV === 'development') {
                    // Semantically we only need the dev tracking when running in `next dev`
                    // but since you would never use next dev with production NODE_ENV we use this
                    // as a proxy so we can statically exclude this code from production builds.
                    const fallbackParams = workUnitStore.fallbackParams;
                    // Client params are not runtime prefetchable
                    const isRuntimePrefetchable = false;
                    return createRenderParamsInDev(underlyingParams, fallbackParams, workStore, workUnitStore, isRuntimePrefetchable);
                } else if (workUnitStore.validationSamples) {
                    return createClientParamsInInstantValidation(underlyingParams, workStore, workUnitStore.validationSamples);
                } else {
                    return createRenderParamsInProd(underlyingParams);
                }
            default:
                workUnitStore;
        }
    }
    (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
}
function createServerParamsForMetadata(underlyingParams, optionalCatchAllParamName, isRuntimePrefetchable) {
    const metadataVaryParamsAccumulator = (0, _varyparams.getMetadataVaryParamsAccumulator)();
    return createServerParamsForServerSegment(underlyingParams, optionalCatchAllParamName, metadataVaryParamsAccumulator, isRuntimePrefetchable);
}
function createServerParamsForRoute(underlyingParams, varyParamsAccumulator = null) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createStaticPrerenderParams(underlyingParams, null, workStore, workUnitStore, varyParamsAccumulator);
            case 'prerender-client':
            case 'validation-client':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerParamsForRoute should not be called in client contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1064",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerParamsForRoute should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E738",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerParamsForRoute should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1131",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                {
                    // Route params are not runtime prefetchable
                    const isRuntimePrefetchable = false;
                    return createRuntimePrerenderParams(underlyingParams, null, workUnitStore, varyParamsAccumulator, isRuntimePrefetchable);
                }
            case 'request':
                if (process.env.NODE_ENV === 'development') {
                    // Semantically we only need the dev tracking when running in `next dev`
                    // but since you would never use next dev with production NODE_ENV we use this
                    // as a proxy so we can statically exclude this code from production builds.
                    const fallbackParams = workUnitStore.fallbackParams;
                    // Route params are not runtime prefetchable
                    const isRuntimePrefetchable = false;
                    return createRenderParamsInDev(underlyingParams, fallbackParams, workStore, workUnitStore, isRuntimePrefetchable);
                } else {
                    return createRenderParamsInProd(underlyingParams);
                }
            default:
                workUnitStore;
        }
    }
    (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
}
function createServerParamsForServerSegment(underlyingParams, optionalCatchAllParamName, varyParamsAccumulator, isRuntimePrefetchable) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
            case 'prerender-ppr':
            case 'prerender-legacy':
                return createStaticPrerenderParams(underlyingParams, optionalCatchAllParamName, workStore, workUnitStore, varyParamsAccumulator);
            case 'validation-client':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerParamsForServerSegment should not be called in client contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1101",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerParamsForServerSegment should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E743",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerParamsForServerSegment should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1120",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                return createRuntimePrerenderParams(underlyingParams, optionalCatchAllParamName, workUnitStore, varyParamsAccumulator, isRuntimePrefetchable);
            case 'request':
                if (process.env.NODE_ENV === 'development') {
                    // Semantically we only need the dev tracking when running in `next dev`
                    // but since you would never use next dev with production NODE_ENV we use this
                    // as a proxy so we can statically exclude this code from production builds.
                    const fallbackParams = workUnitStore.fallbackParams;
                    return createRenderParamsInDev(underlyingParams, fallbackParams, workStore, workUnitStore, isRuntimePrefetchable);
                } else if (workUnitStore.asyncApiPromises && workUnitStore.validationSamples) {
                    return createServerParamsInInstantValidation(underlyingParams, workStore, workUnitStore.validationSamples, workUnitStore.asyncApiPromises, isRuntimePrefetchable);
                } else if (workUnitStore.asyncApiPromises && hasFallbackRouteParams(underlyingParams, workUnitStore.fallbackParams)) {
                    return (isRuntimePrefetchable ? workUnitStore.asyncApiPromises.earlySharedParamsParent : workUnitStore.asyncApiPromises.sharedParamsParent).then(()=>underlyingParams);
                } else {
                    return createRenderParamsInProd(underlyingParams);
                }
            default:
                workUnitStore;
        }
    }
    (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
}
function createPrerenderParamsForClientSegment(underlyingParams) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Missing workStore in createPrerenderParamsForClientSegment'), "__NEXT_ERROR_CODE", {
            value: "E773",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender':
            case 'prerender-client':
                const fallbackParams = workUnitStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(let key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            // This params object has one or more fallback params, so we need
                            // to consider the awaiting of this params object "dynamic". Since
                            // we are in cacheComponents mode we encode this as a promise that never
                            // resolves.
                            return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, '`params`');
                        }
                    }
                }
                break;
            case 'validation-client':
                throw Object.defineProperty(new _invarianterror.InvariantError('createPrerenderParamsForClientSegment should not be called in validation contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1099",
                    enumerable: false,
                    configurable: true
                });
                break;
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError('createPrerenderParamsForClientSegment should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E734",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new _invarianterror.InvariantError('createPrerenderParamsForClientSegment should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1126",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
            case 'prerender-legacy':
            case 'prerender-runtime':
            case 'request':
                break;
            default:
                workUnitStore;
        }
    }
    // We're prerendering in a mode that does not abort. We resolve the promise without
    // any tracking because we're just transporting a value from server to client where the tracking
    // will be applied.
    return Promise.resolve(underlyingParams);
}
function createStaticPrerenderParams(underlyingParams, optionalCatchAllParamName, workStore, prerenderStore, varyParamsAccumulator) {
    const underlyingParamsWithVarying = varyParamsAccumulator !== null ? (0, _varyparams.createVaryingParams)(varyParamsAccumulator, underlyingParams, optionalCatchAllParamName) : underlyingParams;
    switch(prerenderStore.type){
        case 'prerender':
        case 'prerender-client':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(const key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            // This params object has one or more fallback params, so we need
                            // to consider the awaiting of this params object "dynamic". Since
                            // we are in cacheComponents mode we encode this as a promise that never
                            // resolves.
                            return makeHangingParams(underlyingParamsWithVarying, workStore, prerenderStore);
                        }
                    }
                }
                break;
            }
        case 'prerender-ppr':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams) {
                    for(const key in underlyingParams){
                        if (fallbackParams.has(key)) {
                            return makeErroringParams(underlyingParamsWithVarying, fallbackParams, workStore, prerenderStore);
                        }
                    }
                }
                break;
            }
        case 'prerender-legacy':
            break;
        default:
            prerenderStore;
    }
    return makeUntrackedParams(underlyingParamsWithVarying);
}
function createRuntimePrerenderParams(underlyingParams, optionalCatchAllParamName, workUnitStore, varyParamsAccumulator, isRuntimePrefetchable) {
    const underlyingParamsWithVarying = varyParamsAccumulator !== null ? (0, _varyparams.createVaryingParams)(varyParamsAccumulator, underlyingParams, optionalCatchAllParamName) : underlyingParams;
    const result = makeUntrackedParams(underlyingParamsWithVarying);
    const { stagedRendering } = workUnitStore;
    if (!stagedRendering) {
        return result;
    }
    const stage = isRuntimePrefetchable ? _stagedrendering.RenderStage.EarlyRuntime : _stagedrendering.RenderStage.Runtime;
    return stagedRendering.waitForStage(stage).then(()=>result);
}
function hasFallbackRouteParams(underlyingParams, fallbackParams) {
    if (fallbackParams) {
        for(let key in underlyingParams){
            if (fallbackParams.has(key)) {
                return true;
            }
        }
    }
    return false;
}
function createServerParamsInInstantValidation(underlyingParams, workStore, validationSamples, asyncApiPromises, isRuntimePrefetchable) {
    const { createExhaustiveParamsProxy } = require('../app-render/instant-validation/instant-samples');
    const declaredParams = new Set(Object.keys(validationSamples.params ?? {}));
    const proxiedUnderlying = createExhaustiveParamsProxy(underlyingParams, declaredParams, workStore.route);
    return (isRuntimePrefetchable ? asyncApiPromises.earlySharedParamsParent : asyncApiPromises.sharedParamsParent).then(()=>proxiedUnderlying);
}
function createClientParamsInInstantValidation(underlyingParams, workStore, validationSamples) {
    const { createExhaustiveParamsProxy } = require('../app-render/instant-validation/instant-samples');
    const declaredParams = new Set(Object.keys((validationSamples == null ? void 0 : validationSamples.params) ?? {}));
    const proxiedUnderlying = createExhaustiveParamsProxy(underlyingParams, declaredParams, workStore.route);
    return Promise.resolve(proxiedUnderlying);
}
function createRenderParamsInProd(underlyingParams) {
    return makeUntrackedParams(underlyingParams);
}
function createRenderParamsInDev(underlyingParams, fallbackParams, workStore, requestStore, isRuntimePrefetchable) {
    return makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams, hasFallbackRouteParams(underlyingParams, fallbackParams), workStore, requestStore, isRuntimePrefetchable);
}
const CachedParams = new WeakMap();
const fallbackParamsProxyHandler = {
    get: function get(target, prop, receiver) {
        if (prop === 'then' || prop === 'catch' || prop === 'finally') {
            const originalMethod = _reflect.ReflectAdapter.get(target, prop, receiver);
            return ({
                [prop]: (...args)=>{
                    const store = _dynamicaccessasyncstorageexternal.dynamicAccessAsyncStorage.getStore();
                    if (store) {
                        store.abortController.abort(Object.defineProperty(new Error(`Accessed fallback \`params\` during prerendering.`), "__NEXT_ERROR_CODE", {
                            value: "E691",
                            enumerable: false,
                            configurable: true
                        }));
                    }
                    return new Proxy(originalMethod.apply(target, args), fallbackParamsProxyHandler);
                }
            })[prop];
        }
        return _reflect.ReflectAdapter.get(target, prop, receiver);
    }
};
function makeHangingParams(underlyingParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = new Proxy((0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`params`'), fallbackParamsProxyHandler);
    CachedParams.set(underlyingParams, promise);
    return promise;
}
function makeErroringParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const augmentedUnderlying = {
        ...underlyingParams
    };
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = Promise.resolve(augmentedUnderlying);
    CachedParams.set(underlyingParams, promise);
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            if (fallbackParams.has(prop)) {
                Object.defineProperty(augmentedUnderlying, prop, {
                    get () {
                        const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                        // In most dynamic APIs we also throw if `dynamic = "error"` however
                        // for params is only dynamic when we're generating a fallback shell
                        // and even when `dynamic = "error"` we still support generating dynamic
                        // fallback shells
                        // TODO remove this comment when cacheComponents is the default since there
                        // will be no `dynamic = "error"`
                        if (prerenderStore.type === 'prerender-ppr') {
                            // PPR Prerender (no cacheComponents)
                            (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
                        } else {
                            // Legacy Prerender
                            (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
                        }
                    },
                    enumerable: true
                });
            }
        }
    });
    return promise;
}
function makeUntrackedParams(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = Promise.resolve(underlyingParams);
    CachedParams.set(underlyingParams, promise);
    return promise;
}
function makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams, hasFallbackParams, workStore, requestStore, isRuntimePrefetchable) {
    if (requestStore.asyncApiPromises && hasFallbackParams) {
        // We wrap each instance of params in a `new Promise()`, because deduping
        // them across requests doesn't work anyway and this let us show each
        // await a different set of values. This is important when all awaits
        // are in third party which would otherwise track all the way to the
        // internal params.
        const sharedParamsParent = isRuntimePrefetchable ? requestStore.asyncApiPromises.earlySharedParamsParent : requestStore.asyncApiPromises.sharedParamsParent;
        const promise = new Promise((resolve, reject)=>{
            sharedParamsParent.then(()=>resolve(underlyingParams), reject);
        });
        // @ts-expect-error
        promise.displayName = 'params';
        return instrumentParamsPromiseWithDevWarnings(underlyingParams, promise, workStore);
    }
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    // We don't use makeResolvedReactPromise here because params
    // supports copying with spread and we don't want to unnecessarily
    // instrument the promise with spreadable properties of ReactPromise.
    const promise = hasFallbackParams ? (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingParams, requestStore, _stagedrendering.RenderStage.Runtime) : Promise.resolve(underlyingParams);
    const proxiedPromise = instrumentParamsPromiseWithDevWarnings(underlyingParams, promise, workStore);
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function instrumentParamsPromiseWithDevWarnings(underlyingParams, promise, workStore) {
    // Track which properties we should warn for.
    const proxiedProperties = new Set();
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    return new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (// We are accessing a property that was proxied to the promise instance
                proxiedProperties.has(prop)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    warnForSyncAccess(workStore.route, expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys (target) {
            const expression = '`...params` or similar expression';
            warnForSyncAccess(workStore.route, expression);
            return Reflect.ownKeys(target);
        }
    });
}
const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createParamsAccessError);
function createParamsAccessError(route, expression) {
    const prefix = route ? `Route "${route}" ` : 'This route ';
    return Object.defineProperty(new Error(`${prefix}used ${expression}. ` + `\`params\` is a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
        value: "E834",
        enumerable: false,
        configurable: true
    });
}

//# sourceMappingURL=params.js.map