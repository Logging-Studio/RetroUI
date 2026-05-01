"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "trackDynamicImport", {
    enumerable: true,
    get: function() {
        return trackDynamicImport;
    }
});
const _invarianterror = require("../../../shared/lib/invariant-error");
const _isthenable = require("../../../shared/lib/is-thenable");
const _trackmoduleloadingexternal = require("./track-module-loading.external");
function trackDynamicImport(modulePromise) {
    if (process.env.NEXT_RUNTIME === 'edge') {
        throw Object.defineProperty(new _invarianterror.InvariantError("Dynamic imports should not be instrumented in the edge runtime, because `cacheComponents` doesn't support it"), "__NEXT_ERROR_CODE", {
            value: "E687",
            enumerable: false,
            configurable: true
        });
    }
    if (!(0, _isthenable.isThenable)(modulePromise)) {
        // We're expecting `import()` to always return a promise. If it's not, something's very wrong.
        throw Object.defineProperty(new _invarianterror.InvariantError('`trackDynamicImport` should always receive a promise. Something went wrong in the dynamic imports transform.'), "__NEXT_ERROR_CODE", {
            value: "E677",
            enumerable: false,
            configurable: true
        });
    }
    // Even if we're inside a prerender and have `workUnitStore.cacheSignal`, we always track the promise globally.
    // (i.e. via the global `moduleLoadingSignal` that `trackPendingImport` uses internally).
    //
    // We do this because the `import()` promise might be cached in userspace:
    // (which is quite common for e.g. lazy initialization in libraries)
    //
    //   let promise;
    //   function doDynamicImportOnce() {
    //     if (!promise) {
    //       promise = import("...");
    //       // transformed into:
    //       // promise = trackDynamicImport(import("..."));
    //     }
    //     return promise;
    //   }
    //
    // If multiple prerenders (e.g. multiple pages) depend on `doDynamicImportOnce`,
    // we have to wait for the import *in all of them*.
    // If we only tracked it using `workUnitStore.cacheSignal.trackRead()`,
    // then only the first prerender to call `doDynamicImportOnce` would wait --
    // Subsequent prerenders would re-use the existing `promise`,
    // and `trackDynamicImport` wouldn't be called again in their scope,
    // so their respective CacheSignals wouldn't wait for the promise.
    (0, _trackmoduleloadingexternal.trackPendingImport)(modulePromise);
    return modulePromise;
}

//# sourceMappingURL=track-dynamic-import.js.map