// eslint-disable-next-line import/no-extraneous-dependencies
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ClientPageRoot: null,
    ClientSegmentRoot: null,
    Fragment: null,
    HTTPAccessFallbackBoundary: null,
    InstantValidation: null,
    LayoutRouter: null,
    LoadingBoundaryProvider: null,
    Postpone: null,
    RenderFromTemplateContext: null,
    RootLayoutBoundary: null,
    SegmentViewNode: null,
    SegmentViewStateNode: null,
    actionAsyncStorage: null,
    captureOwnerStack: null,
    collectPrefetchHints: null,
    collectSegmentData: null,
    createElement: null,
    createMetadataComponents: null,
    createPrerenderParamsForClientSegment: null,
    createPrerenderSearchParamsForClientPage: null,
    createServerParamsForServerSegment: null,
    createServerSearchParamsForServerPage: null,
    createTemporaryReferenceSet: null,
    decodeAction: null,
    decodeFormState: null,
    decodeReply: null,
    patchFetch: null,
    preconnect: null,
    preloadFont: null,
    preloadStyle: null,
    prerender: null,
    renderToReadableStream: null,
    serverHooks: null,
    taintObjectReference: null,
    workAsyncStorage: null,
    workUnitAsyncStorage: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ClientPageRoot: function() {
        return _clientpage.ClientPageRoot;
    },
    ClientSegmentRoot: function() {
        return _clientsegment.ClientSegmentRoot;
    },
    Fragment: function() {
        return _react.Fragment;
    },
    HTTPAccessFallbackBoundary: function() {
        return _errorboundary.HTTPAccessFallbackBoundary;
    },
    InstantValidation: function() {
        return InstantValidation;
    },
    LayoutRouter: function() {
        return _layoutrouter.default;
    },
    LoadingBoundaryProvider: function() {
        return _layoutrouter.LoadingBoundaryProvider;
    },
    Postpone: function() {
        return _postpone.Postpone;
    },
    RenderFromTemplateContext: function() {
        return _renderfromtemplatecontext.default;
    },
    RootLayoutBoundary: function() {
        return _boundarycomponents.RootLayoutBoundary;
    },
    SegmentViewNode: function() {
        return SegmentViewNode;
    },
    SegmentViewStateNode: function() {
        return SegmentViewStateNode;
    },
    actionAsyncStorage: function() {
        return _actionasyncstorageexternal.actionAsyncStorage;
    },
    captureOwnerStack: function() {
        return _react.captureOwnerStack;
    },
    collectPrefetchHints: function() {
        return _collectsegmentdata.collectPrefetchHints;
    },
    collectSegmentData: function() {
        return _collectsegmentdata.collectSegmentData;
    },
    createElement: function() {
        return _react.createElement;
    },
    createMetadataComponents: function() {
        return _metadata.createMetadataComponents;
    },
    createPrerenderParamsForClientSegment: function() {
        return _params.createPrerenderParamsForClientSegment;
    },
    createPrerenderSearchParamsForClientPage: function() {
        return _searchparams.createPrerenderSearchParamsForClientPage;
    },
    createServerParamsForServerSegment: function() {
        return _params.createServerParamsForServerSegment;
    },
    createServerSearchParamsForServerPage: function() {
        return _searchparams.createServerSearchParamsForServerPage;
    },
    createTemporaryReferenceSet: function() {
        return _server.createTemporaryReferenceSet;
    },
    decodeAction: function() {
        return _server.decodeAction;
    },
    decodeFormState: function() {
        return _server.decodeFormState;
    },
    decodeReply: function() {
        return _server.decodeReply;
    },
    patchFetch: function() {
        return patchFetch;
    },
    preconnect: function() {
        return _preloads.preconnect;
    },
    preloadFont: function() {
        return _preloads.preloadFont;
    },
    preloadStyle: function() {
        return _preloads.preloadStyle;
    },
    prerender: function() {
        return _static.prerender;
    },
    renderToReadableStream: function() {
        return _server.renderToReadableStream;
    },
    serverHooks: function() {
        return _hooksservercontext;
    },
    taintObjectReference: function() {
        return _taint.taintObjectReference;
    },
    workAsyncStorage: function() {
        return _workasyncstorageexternal.workAsyncStorage;
    },
    workUnitAsyncStorage: function() {
        return _workunitasyncstorageexternal.workUnitAsyncStorage;
    }
});
const _server = require("react-server-dom-webpack/server");
const _static = require("react-server-dom-webpack/static");
const _react = require("react");
const _layoutrouter = /*#__PURE__*/ _interop_require_wildcard(require("../../client/components/layout-router"));
const _renderfromtemplatecontext = /*#__PURE__*/ _interop_require_default(require("../../client/components/render-from-template-context"));
const _workasyncstorageexternal = require("../app-render/work-async-storage.external");
const _workunitasyncstorageexternal = require("./work-unit-async-storage.external");
const _actionasyncstorageexternal = require("../app-render/action-async-storage.external");
const _clientpage = require("../../client/components/client-page");
const _clientsegment = require("../../client/components/client-segment");
const _searchparams = require("../request/search-params");
const _params = require("../request/params");
const _hooksservercontext = /*#__PURE__*/ _interop_require_wildcard(require("../../client/components/hooks-server-context"));
const _errorboundary = require("../../client/components/http-access-fallback/error-boundary");
const _metadata = require("../../lib/metadata/metadata");
const _boundarycomponents = require("../../lib/framework/boundary-components");
const _preloads = require("./rsc/preloads");
const _postpone = require("./rsc/postpone");
const _taint = require("./rsc/taint");
const _collectsegmentdata = require("./collect-segment-data");
const _patchfetch = require("../lib/patch-fetch");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const InstantValidation = ()=>{
    if (process.env.NEXT_RUNTIME !== 'edge' && process.env.__NEXT_CACHE_COMPONENTS) {
        return require('./instant-validation/instant-validation');
    } else {
        return undefined;
    }
};
let SegmentViewNode = ()=>null;
let SegmentViewStateNode = ()=>null;
if (process.env.NODE_ENV === 'development') {
    const mod = require('../../next-devtools/userspace/app/segment-explorer-node');
    SegmentViewNode = mod.SegmentViewNode;
    SegmentViewStateNode = mod.SegmentViewStateNode;
}
// hot-reloader modules are not bundled so we need to inject `__next__clear_chunk_cache__`
// into globalThis from this file which is bundled.
if (process.env.TURBOPACK) {
    globalThis.__next__clear_chunk_cache__ = __turbopack_clear_chunk_cache__;
} else {
    // Webpack does not have chunks on the server
    globalThis.__next__clear_chunk_cache__ = null;
}
function patchFetch() {
    return (0, _patchfetch.patchFetch)({
        workAsyncStorage: _workasyncstorageexternal.workAsyncStorage,
        workUnitAsyncStorage: _workunitasyncstorageexternal.workUnitAsyncStorage
    });
}

//# sourceMappingURL=entry-base.js.map