/* eslint-disable @next/internal/no-ambiguous-jsx -- React Client */ // Do not put a "use client" directive here. Import this module via the shim in
// `packages/next/src/client/components/instant-validation/boundary.tsx` instead.
// 'use client'
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return RenderValidationBoundaryAtThisLevel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _boundaryconstants = require("./boundary-constants");
const _invarianterror = require("../../../shared/lib/invariant-error");
const _workunitasyncstorageexternal = require("../work-unit-async-storage.external");
if (typeof window !== 'undefined') {
    throw Object.defineProperty(new _invarianterror.InvariantError('Instant validation boundaries should never appear in browser bundles.'), "__NEXT_ERROR_CODE", {
        value: "E1117",
        enumerable: false,
        configurable: true
    });
}
function getValidationBoundaryTracking() {
    const store = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!store) return null;
    switch(store.type){
        case 'validation-client':
            return store.boundaryState;
        case 'prerender':
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'prerender-runtime':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            break;
        default:
            store;
    }
    return null;
}
// We use a namespace object to allow us to recover the name of the function
// at runtime even when production bundling/minification is used.
const NameSpace = {
    [_boundaryconstants.INSTANT_VALIDATION_BOUNDARY_NAME]: function({ id, children }) {
        // Track which boundaries we actually managed to render.
        const state = getValidationBoundaryTracking();
        if (state === null) {
            throw Object.defineProperty(new _invarianterror.InvariantError('Missing boundary tracking state'), "__NEXT_ERROR_CODE", {
                value: "E1060",
                enumerable: false,
                configurable: true
            });
        }
        state.renderedIds.add(id);
        return children;
    }
};
const InstantValidationBoundaryContext = /*#__PURE__*/ (0, _react.createContext)(null);
function PlaceValidationBoundaryBelowThisLevel({ id, children }) {
    return(// OuterLayoutRouter will see this and render a `RenderValidationBoundaryAtThisLevel`.
    /*#__PURE__*/ (0, _jsxruntime.jsx)(InstantValidationBoundaryContext, {
        value: id,
        children: children
    }));
}
function RenderValidationBoundaryAtThisLevel({ id, children }) {
    // We got a boundaryId from the context. Clear the context so that the children don't render another boundary.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(InstantValidationBoundary, {
        id: id,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(InstantValidationBoundaryContext, {
            value: null,
            children: children
        })
    });
}
const InstantValidationBoundary = // We use slice(0) to trick the bundler into not inlining/minifying the function
// so it retains the name inferred from the namespace object
NameSpace[_boundaryconstants.INSTANT_VALIDATION_BOUNDARY_NAME.slice(0)];

//# sourceMappingURL=boundary-impl.js.map