"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createServerPathnameForMetadata", {
    enumerable: true,
    get: function() {
        return createServerPathnameForMetadata;
    }
});
const _workasyncstorageexternal = require("../app-render/work-async-storage.external");
const _dynamicrendering = require("../app-render/dynamic-rendering");
const _workunitasyncstorageexternal = require("../app-render/work-unit-async-storage.external");
const _dynamicrenderingutils = require("../dynamic-rendering-utils");
const _invarianterror = require("../../shared/lib/invariant-error");
function createServerPathnameForMetadata(underlyingPathname) {
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
                {
                    return createPrerenderPathname(underlyingPathname, workStore, workUnitStore);
                }
            case 'prerender-client':
            case 'validation-client':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerPathnameForMetadata should not be called in client contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E1065",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerPathnameForMetadata should not be called in cache contexts.'), "__NEXT_ERROR_CODE", {
                    value: "E740",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new _invarianterror.InvariantError('createServerPathnameForMetadata should not be called inside generateStaticParams.'), "__NEXT_ERROR_CODE", {
                    value: "E1129",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-runtime':
                return (0, _dynamicrenderingutils.delayUntilRuntimeStage)(workUnitStore, createRenderPathname(underlyingPathname));
            case 'request':
                return createRenderPathname(underlyingPathname);
            default:
                workUnitStore;
        }
    }
    (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
}
function createPrerenderPathname(underlyingPathname, workStore, prerenderStore) {
    switch(prerenderStore.type){
        case 'prerender':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams && fallbackParams.size > 0) {
                    return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, '`pathname`');
                }
                break;
            }
        case 'prerender-ppr':
            {
                const fallbackParams = prerenderStore.fallbackRouteParams;
                if (fallbackParams && fallbackParams.size > 0) {
                    return makeErroringPathname(workStore, prerenderStore.dynamicTracking);
                }
                break;
            }
        case 'prerender-legacy':
            break;
        default:
            prerenderStore;
    }
    // We don't have any fallback params so we have an entirely static safe params object
    return Promise.resolve(underlyingPathname);
}
function makeErroringPathname(workStore, dynamicTracking) {
    let reject = null;
    const promise = new Promise((_, re)=>{
        reject = re;
    });
    const originalThen = promise.then.bind(promise);
    // We instrument .then so that we can generate a tracking event only if you actually
    // await this promise, not just that it is created.
    promise.then = (onfulfilled, onrejected)=>{
        if (reject) {
            try {
                (0, _dynamicrendering.postponeWithTracking)(workStore.route, 'metadata relative url resolving', dynamicTracking);
            } catch (error) {
                reject(error);
                reject = null;
            }
        }
        return originalThen(onfulfilled, onrejected);
    };
    // We wrap in a noop proxy to trick the runtime into thinking it
    // isn't a native promise (it's not really). This is so that awaiting
    // the promise will call the `then` property triggering the lazy postpone
    return new Proxy(promise, {});
}
function createRenderPathname(underlyingPathname) {
    return Promise.resolve(underlyingPathname);
}

//# sourceMappingURL=pathname.js.map