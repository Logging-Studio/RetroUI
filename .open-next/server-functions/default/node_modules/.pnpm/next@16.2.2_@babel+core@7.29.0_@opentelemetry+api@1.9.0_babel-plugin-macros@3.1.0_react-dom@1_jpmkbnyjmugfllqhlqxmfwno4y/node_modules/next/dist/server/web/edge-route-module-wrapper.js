"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EdgeRouteModuleWrapper", {
    enumerable: true,
    get: function() {
        return EdgeRouteModuleWrapper;
    }
});
require("./globals");
const _adapter = require("./adapter");
const _incrementalcache = require("../lib/incremental-cache");
const _handlers = require("../use-cache/handlers");
const _routematcher = require("../route-matchers/route-matcher");
const _internaledgewaituntil = require("./internal-edge-wait-until");
const _serverutils = require("../server-utils");
const _querystring = require("../../shared/lib/router/utils/querystring");
const _webonclose = require("./web-on-close");
const _getedgepreviewprops = require("./get-edge-preview-props");
const _web = require("../../server/base-http/web");
class EdgeRouteModuleWrapper {
    /**
   * The constructor is wrapped with private to ensure that it can only be
   * constructed by the static wrap method.
   *
   * @param routeModule the route module to wrap
   */ constructor(routeModule, cacheHandlers){
        this.routeModule = routeModule;
        this.cacheHandlers = cacheHandlers;
        // TODO: (wyattjoh) possibly allow the module to define it's own matcher
        this.matcher = new _routematcher.RouteMatcher(routeModule.definition);
    }
    /**
   * This will wrap a module with the EdgeModuleWrapper and return a function
   * that can be used as a handler for the edge runtime.
   *
   * @param module the module to wrap
   * @param options any options that should be passed to the adapter and
   *                override the ones passed from the runtime
   * @returns a function that can be used as a handler for the edge runtime
   */ static wrap(routeModule, options) {
        // Create the module wrapper.
        const wrapper = new EdgeRouteModuleWrapper(routeModule, options.cacheHandlers ?? {});
        // Return the wrapping function.
        return (opts)=>{
            return (0, _adapter.adapter)({
                ...opts,
                IncrementalCache: _incrementalcache.IncrementalCache,
                incrementalCacheHandler: options.incrementalCacheHandler,
                // Bind the handler method to the wrapper so it still has context.
                handler: wrapper.handler.bind(wrapper),
                page: options.page
            });
        };
    }
    async handler(request, evt) {
        const utils = (0, _serverutils.getServerUtils)({
            pageIsDynamic: this.matcher.isDynamic,
            page: this.matcher.definition.pathname,
            basePath: request.nextUrl.basePath,
            // We don't need the `handleRewrite` util, so can just pass an empty object
            rewrites: {},
            // only used for rewrites, so setting an arbitrary default value here
            caseSensitive: false
        });
        const { nextConfig } = this.routeModule.getNextConfigEdge(new _web.WebNextRequest(request));
        (0, _handlers.initializeCacheHandlers)(nextConfig.cacheMaxMemorySize);
        for (const [kind, cacheHandler] of Object.entries(this.cacheHandlers)){
            (0, _handlers.setCacheHandler)(kind, cacheHandler);
        }
        const { params } = utils.normalizeDynamicRouteParams((0, _querystring.searchParamsToUrlQuery)(request.nextUrl.searchParams), false);
        const waitUntil = evt.waitUntil.bind(evt);
        const closeController = new _webonclose.CloseController();
        const previewProps = (0, _getedgepreviewprops.getEdgePreviewProps)();
        // Create the context for the handler. This contains the params from the
        // match (if any).
        const context = {
            params,
            previewProps,
            renderOpts: {
                supportsDynamicResponse: true,
                waitUntil,
                onClose: closeController.onClose.bind(closeController),
                onAfterTaskError: undefined,
                cacheComponents: !!process.env.__NEXT_CACHE_COMPONENTS,
                experimental: {
                    authInterrupts: !!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS
                },
                cacheLifeProfiles: nextConfig.cacheLife
            },
            sharedContext: {
                buildId: ''
            }
        };
        // Get the response from the handler.
        let res = await this.routeModule.handle(request, context);
        const waitUntilPromises = [
            (0, _internaledgewaituntil.internal_getCurrentFunctionWaitUntil)()
        ];
        if (context.renderOpts.pendingWaitUntil) {
            waitUntilPromises.push(context.renderOpts.pendingWaitUntil);
        }
        evt.waitUntil(Promise.all(waitUntilPromises));
        if (!res.body) {
            // we can delay running it until a bit later --
            // if it's needed, we'll have a `waitUntil` lock anyway.
            setTimeout(()=>closeController.dispatchClose(), 0);
        } else {
            // NOTE: if this is a streaming response, onClose may be called later,
            // so we can't rely on `closeController.listeners` -- it might be 0 at this point.
            const trackedBody = (0, _webonclose.trackStreamConsumed)(res.body, ()=>closeController.dispatchClose());
            res = new Response(trackedBody, {
                status: res.status,
                statusText: res.statusText,
                headers: res.headers
            });
        }
        return res;
    }
}

//# sourceMappingURL=edge-route-module-wrapper.js.map