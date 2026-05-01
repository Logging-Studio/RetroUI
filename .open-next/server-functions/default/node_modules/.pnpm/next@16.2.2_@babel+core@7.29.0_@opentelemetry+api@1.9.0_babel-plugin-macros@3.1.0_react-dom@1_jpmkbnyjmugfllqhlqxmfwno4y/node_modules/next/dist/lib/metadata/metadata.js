"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createMetadataComponents", {
    enumerable: true,
    get: function() {
        return createMetadataComponents;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _resolvemetadata = require("./resolve-metadata");
const _httpaccessfallback = require("../../client/components/http-access-fallback/http-access-fallback");
const _searchparams = require("../../server/request/search-params");
const _pathname = require("../../server/request/pathname");
const _ispostpone = require("../../server/lib/router-utils/is-postpone");
const _workunitasyncstorageexternal = require("../../server/app-render/work-unit-async-storage.external");
const _stagedrendering = require("../../server/app-render/staged-rendering");
const _boundarycomponents = require("../framework/boundary-components");
const _utils = require("./generate/utils");
const _iconmark = require("./generate/icon-mark");
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
function createMetadataComponents({ tree, pathname, parsedQuery, metadataContext, interpolatedParams, errorType, serveStreamingMetadata, isRuntimePrefetchable }) {
    const searchParams = (0, _searchparams.createServerSearchParamsForMetadata)(parsedQuery, isRuntimePrefetchable);
    const pathnameForMetadata = (0, _pathname.createServerPathnameForMetadata)(pathname);
    async function Viewport() {
        // Gate metadata to the correct render stage. If the page is not
        // runtime-prefetchable, defer until the Static stage so that
        // prefetchable segments get a head start.
        if (!isRuntimePrefetchable) {
            const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
            if (workUnitStore) {
                const stagedRendering = (0, _workunitasyncstorageexternal.getStagedRenderingController)(workUnitStore);
                if (stagedRendering) {
                    await stagedRendering.waitForStage(_stagedrendering.RenderStage.Static);
                }
            }
        }
        const tags = await getResolvedViewport(tree, searchParams, interpolatedParams, isRuntimePrefetchable, errorType).catch((viewportErr)=>{
            // When Legacy PPR is enabled viewport can reject with a Postpone type
            // This will go away once Legacy PPR is removed and dynamic metadata will
            // stay pending until after the prerender is complete when it is dynamic
            if ((0, _ispostpone.isPostpone)(viewportErr)) {
                throw viewportErr;
            }
            if (!errorType && (0, _httpaccessfallback.isHTTPAccessFallbackError)(viewportErr)) {
                return getNotFoundViewport(tree, searchParams, interpolatedParams, isRuntimePrefetchable).catch(()=>null);
            }
            // We're going to throw the error from the metadata outlet so we just render null here instead
            return null;
        });
        return tags;
    }
    Viewport.displayName = 'Next.Viewport';
    function ViewportWrapper() {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundarycomponents.ViewportBoundary, {
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Viewport, {})
        });
    }
    async function Metadata() {
        // Gate metadata to the correct render stage. If the page is not
        // runtime-prefetchable, defer until the Static stage so that
        // prefetchable segments get a head start.
        if (!isRuntimePrefetchable) {
            const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
            if (workUnitStore) {
                const stagedRendering = (0, _workunitasyncstorageexternal.getStagedRenderingController)(workUnitStore);
                if (stagedRendering) {
                    await stagedRendering.waitForStage(_stagedrendering.RenderStage.Static);
                }
            }
        }
        const tags = await getResolvedMetadata(tree, pathnameForMetadata, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable, errorType).catch((metadataErr)=>{
            // When Legacy PPR is enabled metadata can reject with a Postpone type
            // This will go away once Legacy PPR is removed and dynamic metadata will
            // stay pending until after the prerender is complete when it is dynamic
            if ((0, _ispostpone.isPostpone)(metadataErr)) {
                throw metadataErr;
            }
            if (!errorType && (0, _httpaccessfallback.isHTTPAccessFallbackError)(metadataErr)) {
                return getNotFoundMetadata(tree, pathnameForMetadata, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable).catch(()=>null);
            }
            // We're going to throw the error from the metadata outlet so we just render null here instead
            return null;
        });
        return tags;
    }
    Metadata.displayName = 'Next.Metadata';
    function MetadataWrapper() {
        // TODO: We shouldn't change what we render based on whether we are streaming or not.
        // If we aren't streaming we should just block the response until we have resolved the
        // metadata.
        if (!serveStreamingMetadata) {
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundarycomponents.MetadataBoundary, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Metadata, {})
            });
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
            hidden: true,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundarycomponents.MetadataBoundary, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
                    name: "Next.Metadata",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Metadata, {})
                })
            })
        });
    }
    function MetadataOutlet() {
        const pendingOutlet = Promise.all([
            getResolvedMetadata(tree, pathnameForMetadata, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable, errorType),
            getResolvedViewport(tree, searchParams, interpolatedParams, isRuntimePrefetchable, errorType)
        ]).then(()=>null);
        // TODO: We shouldn't change what we render based on whether we are streaming or not.
        // If we aren't streaming we should just block the response until we have resolved the
        // metadata.
        if (!serveStreamingMetadata) {
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundarycomponents.OutletBoundary, {
                children: pendingOutlet
            });
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundarycomponents.OutletBoundary, {
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
                name: "Next.MetadataOutlet",
                children: pendingOutlet
            })
        });
    }
    MetadataOutlet.displayName = 'Next.MetadataOutlet';
    return {
        Viewport: ViewportWrapper,
        Metadata: MetadataWrapper,
        MetadataOutlet
    };
}
const getResolvedMetadata = (0, _react.cache)(getResolvedMetadataImpl);
async function getResolvedMetadataImpl(tree, pathname, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable, errorType) {
    const errorConvention = errorType === 'redirect' ? undefined : errorType;
    return renderMetadata(tree, pathname, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable, errorConvention);
}
const getNotFoundMetadata = (0, _react.cache)(getNotFoundMetadataImpl);
async function getNotFoundMetadataImpl(tree, pathname, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable) {
    const notFoundErrorConvention = 'not-found';
    return renderMetadata(tree, pathname, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable, notFoundErrorConvention);
}
const getResolvedViewport = (0, _react.cache)(getResolvedViewportImpl);
async function getResolvedViewportImpl(tree, searchParams, interpolatedParams, isRuntimePrefetchable, errorType) {
    const errorConvention = errorType === 'redirect' ? undefined : errorType;
    return renderViewport(tree, searchParams, interpolatedParams, isRuntimePrefetchable, errorConvention);
}
const getNotFoundViewport = (0, _react.cache)(getNotFoundViewportImpl);
async function getNotFoundViewportImpl(tree, searchParams, interpolatedParams, isRuntimePrefetchable) {
    const notFoundErrorConvention = 'not-found';
    return renderViewport(tree, searchParams, interpolatedParams, isRuntimePrefetchable, notFoundErrorConvention);
}
async function renderMetadata(tree, pathname, searchParams, interpolatedParams, metadataContext, isRuntimePrefetchable, errorConvention) {
    const resolvedMetadata = await (0, _resolvemetadata.resolveMetadata)(tree, pathname, searchParams, errorConvention, interpolatedParams, metadataContext, isRuntimePrefetchable);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: createMetadataElements(resolvedMetadata)
    });
}
async function renderViewport(tree, searchParams, interpolatedParams, isRuntimePrefetchable, errorConvention) {
    const resolvedViewport = await (0, _resolvemetadata.resolveViewport)(tree, searchParams, errorConvention, interpolatedParams, isRuntimePrefetchable);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: createViewportElements(resolvedViewport)
    });
}
// ---------------------------------------------------------------------------
// Viewport tag rendering
// ---------------------------------------------------------------------------
function createViewportElements(viewport) {
    const tags = [];
    let i = 0;
    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
        charSet: "utf-8"
    }, i++));
    // Build viewport content string from layout properties
    const viewportParts = [];
    if (viewport.width != null) {
        viewportParts.push(`width=${viewport.width}`);
    }
    if (viewport.height != null) {
        viewportParts.push(`height=${viewport.height}`);
    }
    if (viewport.initialScale != null) {
        viewportParts.push(`initial-scale=${viewport.initialScale}`);
    }
    if (viewport.minimumScale != null) {
        viewportParts.push(`minimum-scale=${viewport.minimumScale}`);
    }
    if (viewport.maximumScale != null) {
        viewportParts.push(`maximum-scale=${viewport.maximumScale}`);
    }
    if (viewport.userScalable != null) {
        viewportParts.push(`user-scalable=${viewport.userScalable ? 'yes' : 'no'}`);
    }
    if (viewport.viewportFit) {
        viewportParts.push(`viewport-fit=${viewport.viewportFit}`);
    }
    if (viewport.interactiveWidget) {
        viewportParts.push(`interactive-widget=${viewport.interactiveWidget}`);
    }
    if (viewportParts.length) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: viewportParts.join(', ')
        }, i++));
    }
    if (viewport.themeColor) {
        for (const themeColor of viewport.themeColor){
            if (themeColor.media) {
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "theme-color",
                    content: themeColor.color,
                    media: themeColor.media
                }, i++));
            } else {
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "theme-color",
                    content: themeColor.color
                }, i++));
            }
        }
    }
    if (viewport.colorScheme) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "color-scheme",
            content: viewport.colorScheme
        }, i++));
    }
    return tags;
}
// ---------------------------------------------------------------------------
// Metadata tag rendering
// ---------------------------------------------------------------------------
function createMetadataElements(metadata) {
    var _metadata_robots, _metadata_robots1;
    const tags = [];
    let i = 0;
    // --- Title ---
    if (metadata.title !== null && metadata.title.absolute) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("title", {
            children: metadata.title.absolute
        }, i++));
    }
    // --- Basic meta tags ---
    if (metadata.description) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "description",
            content: metadata.description
        }, i++));
    }
    if (metadata.applicationName) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "application-name",
            content: metadata.applicationName
        }, i++));
    }
    // --- Authors ---
    if (metadata.authors) {
        for (const author of metadata.authors){
            if (author.url) {
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    rel: "author",
                    href: author.url.toString()
                }, i++));
            }
            if (author.name) {
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "author",
                    content: author.name
                }, i++));
            }
        }
    }
    // --- Manifest ---
    if (metadata.manifest) {
        const manifestOrigin = (0, _utils.getOrigin)(metadata.manifest);
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            rel: "manifest",
            href: metadata.manifest.toString(),
            crossOrigin: !manifestOrigin && process.env.VERCEL_ENV === 'preview' ? 'use-credentials' : undefined
        }, i++));
    }
    if (metadata.generator) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "generator",
            content: metadata.generator
        }, i++));
    }
    if (metadata.keywords && metadata.keywords.length) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "keywords",
            content: metadata.keywords.join(',')
        }, i++));
    }
    if (metadata.referrer) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "referrer",
            content: metadata.referrer
        }, i++));
    }
    if (metadata.creator) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "creator",
            content: metadata.creator
        }, i++));
    }
    if (metadata.publisher) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "publisher",
            content: metadata.publisher
        }, i++));
    }
    if ((_metadata_robots = metadata.robots) == null ? void 0 : _metadata_robots.basic) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "robots",
            content: metadata.robots.basic
        }, i++));
    }
    if ((_metadata_robots1 = metadata.robots) == null ? void 0 : _metadata_robots1.googleBot) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "googlebot",
            content: metadata.robots.googleBot
        }, i++));
    }
    if (metadata.abstract) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "abstract",
            content: metadata.abstract
        }, i++));
    }
    // --- Link rel arrays ---
    if (metadata.archives) {
        for (const archive of metadata.archives){
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "archives",
                href: archive
            }, i++));
        }
    }
    if (metadata.assets) {
        for (const asset of metadata.assets){
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "assets",
                href: asset
            }, i++));
        }
    }
    if (metadata.bookmarks) {
        for (const bookmark of metadata.bookmarks){
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "bookmarks",
                href: bookmark
            }, i++));
        }
    }
    // --- Pagination ---
    if (metadata.pagination) {
        if (metadata.pagination.previous) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "prev",
                href: metadata.pagination.previous
            }, i++));
        }
        if (metadata.pagination.next) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "next",
                href: metadata.pagination.next
            }, i++));
        }
    }
    if (metadata.category) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "category",
            content: metadata.category
        }, i++));
    }
    if (metadata.classification) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "classification",
            content: metadata.classification
        }, i++));
    }
    // --- Other (arbitrary name/value pairs) ---
    if (metadata.other) {
        for (const [name, content] of Object.entries(metadata.other)){
            if (Array.isArray(content)) {
                for (const contentItem of content){
                    if (contentItem != null && contentItem !== '') {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: name,
                            content: String(contentItem)
                        }, i++));
                    }
                }
            } else if (content != null && content !== '') {
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: name,
                    content: String(content)
                }, i++));
            }
        }
    }
    // --- Alternates ---
    if (metadata.alternates) {
        const { canonical, languages, media, types } = metadata.alternates;
        if (canonical && canonical.url) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "canonical",
                href: canonical.url.toString(),
                ...canonical.title ? {
                    title: canonical.title
                } : undefined
            }, i++));
        }
        if (languages) {
            for (const [locale, descriptors] of Object.entries(languages)){
                if (descriptors) {
                    for (const descriptor of descriptors){
                        if (descriptor.url) {
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                                rel: "alternate",
                                hrefLang: locale,
                                href: descriptor.url.toString(),
                                ...descriptor.title ? {
                                    title: descriptor.title
                                } : undefined
                            }, i++));
                        }
                    }
                }
            }
        }
        if (media) {
            for (const [mediaName, descriptors] of Object.entries(media)){
                if (descriptors) {
                    for (const descriptor of descriptors){
                        if (descriptor.url) {
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                                rel: "alternate",
                                media: mediaName,
                                href: descriptor.url.toString(),
                                ...descriptor.title ? {
                                    title: descriptor.title
                                } : undefined
                            }, i++));
                        }
                    }
                }
            }
        }
        if (types) {
            for (const [type, descriptors] of Object.entries(types)){
                if (descriptors) {
                    for (const descriptor of descriptors){
                        if (descriptor.url) {
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                                rel: "alternate",
                                type: type,
                                href: descriptor.url.toString(),
                                ...descriptor.title ? {
                                    title: descriptor.title
                                } : undefined
                            }, i++));
                        }
                    }
                }
            }
        }
    }
    // --- iTunes ---
    if (metadata.itunes) {
        const { appId, appArgument } = metadata.itunes;
        let itunesContent = `app-id=${appId}`;
        if (appArgument) {
            itunesContent += `, app-argument=${appArgument}`;
        }
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "apple-itunes-app",
            content: itunesContent
        }, i++));
    }
    // --- Facebook ---
    if (metadata.facebook) {
        if (metadata.facebook.appId) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "fb:app_id",
                content: metadata.facebook.appId
            }, i++));
        }
        if (metadata.facebook.admins) {
            for (const admin of metadata.facebook.admins){
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    property: "fb:admins",
                    content: admin
                }, i++));
            }
        }
    }
    // --- Pinterest ---
    if (metadata.pinterest && metadata.pinterest.richPin !== undefined) {
        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            property: "pinterest-rich-pin",
            content: metadata.pinterest.richPin.toString()
        }, i++));
    }
    // --- Format Detection ---
    if (metadata.formatDetection) {
        const formatDetectionKeys = [
            'telephone',
            'date',
            'address',
            'email',
            'url'
        ];
        let formatContent = '';
        for (const key of formatDetectionKeys){
            if (metadata.formatDetection[key] === false) {
                if (formatContent) formatContent += ', ';
                formatContent += `${key}=no`;
            }
        }
        if (formatContent) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "format-detection",
                content: formatContent
            }, i++));
        }
    }
    // --- Verification ---
    if (metadata.verification) {
        const verification = metadata.verification;
        if (verification.google) {
            for (const value of verification.google){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: "google-site-verification",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.yahoo) {
            for (const value of verification.yahoo){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: "y_key",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.yandex) {
            for (const value of verification.yandex){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: "yandex-verification",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.me) {
            for (const value of verification.me){
                if (value != null && value !== '') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: "me",
                        content: String(value)
                    }, i++));
                }
            }
        }
        if (verification.other) {
            for (const [name, values] of Object.entries(verification.other)){
                for (const value of values){
                    if (value != null && value !== '') {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: name,
                            content: String(value)
                        }, i++));
                    }
                }
            }
        }
    }
    // --- Apple Web App ---
    if (metadata.appleWebApp) {
        const { capable, title, startupImage, statusBarStyle } = metadata.appleWebApp;
        if (capable) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "mobile-web-app-capable",
                content: "yes"
            }, i++));
        }
        if (title) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "apple-mobile-web-app-title",
                content: title
            }, i++));
        }
        if (startupImage) {
            for (const image of startupImage){
                if (image.media) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                        href: image.url,
                        media: image.media,
                        rel: "apple-touch-startup-image"
                    }, i++));
                } else {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                        href: image.url,
                        rel: "apple-touch-startup-image"
                    }, i++));
                }
            }
        }
        if (statusBarStyle) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "apple-mobile-web-app-status-bar-style",
                content: statusBarStyle
            }, i++));
        }
    }
    // --- Open Graph ---
    if (metadata.openGraph) {
        var _og_title;
        const og = metadata.openGraph;
        if (og.determiner) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:determiner",
                content: og.determiner
            }, i++));
        }
        if ((_og_title = og.title) == null ? void 0 : _og_title.absolute) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:title",
                content: og.title.absolute
            }, i++));
        }
        if (og.description) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:description",
                content: og.description
            }, i++));
        }
        if (og.url) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:url",
                content: og.url.toString()
            }, i++));
        }
        if (og.siteName) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:site_name",
                content: og.siteName
            }, i++));
        }
        if (og.locale) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:locale",
                content: og.locale
            }, i++));
        }
        if (og.countryName) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:country_name",
                content: og.countryName
            }, i++));
        }
        if (og.ttl != null) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                property: "og:ttl",
                content: og.ttl.toString()
            }, i++));
        }
        // OG images
        if (og.images) {
            for (const image of og.images){
                if (typeof image === 'string') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:image",
                        content: image
                    }, i++));
                } else {
                    if (image.url) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:image",
                            content: String(image.url)
                        }, i++));
                    }
                    if (image.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:image:secure_url",
                            content: String(image.secureUrl)
                        }, i++));
                    }
                    if (image.type) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:image:type",
                            content: image.type
                        }, i++));
                    }
                    if (image.width) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:image:width",
                            content: String(image.width)
                        }, i++));
                    }
                    if (image.height) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:image:height",
                            content: String(image.height)
                        }, i++));
                    }
                    if (image.alt) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:image:alt",
                            content: image.alt
                        }, i++));
                    }
                }
            }
        }
        // OG videos
        if (og.videos) {
            for (const video of og.videos){
                if (typeof video === 'string') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:video",
                        content: video
                    }, i++));
                } else {
                    if (video.url) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:video",
                            content: String(video.url)
                        }, i++));
                    }
                    if (video.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:video:secure_url",
                            content: String(video.secureUrl)
                        }, i++));
                    }
                    if (video.type) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:video:type",
                            content: video.type
                        }, i++));
                    }
                    if (video.width) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:video:width",
                            content: String(video.width)
                        }, i++));
                    }
                    if (video.height) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:video:height",
                            content: String(video.height)
                        }, i++));
                    }
                }
            }
        }
        // OG audio
        if (og.audio) {
            for (const audio of og.audio){
                if (typeof audio === 'string') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:audio",
                        content: audio
                    }, i++));
                } else {
                    if (audio.url) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:audio",
                            content: String(audio.url)
                        }, i++));
                    }
                    if (audio.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:audio:secure_url",
                            content: String(audio.secureUrl)
                        }, i++));
                    }
                    if (audio.type) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "og:audio:type",
                            content: audio.type
                        }, i++));
                    }
                }
            }
        }
        // OG simple array properties
        if (og.emails) {
            for (const email of og.emails){
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    property: "og:email",
                    content: email
                }, i++));
            }
        }
        if (og.phoneNumbers) {
            for (const phone of og.phoneNumbers){
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    property: "og:phone_number",
                    content: phone
                }, i++));
            }
        }
        if (og.faxNumbers) {
            for (const fax of og.faxNumbers){
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    property: "og:fax_number",
                    content: fax
                }, i++));
            }
        }
        if (og.alternateLocale) {
            for (const locale of og.alternateLocale){
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    property: "og:locale:alternate",
                    content: locale
                }, i++));
            }
        }
        // OG type-specific tags
        if ('type' in og) {
            const ogType = og.type;
            switch(ogType){
                case 'website':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "website"
                    }, i++));
                    break;
                case 'article':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "article"
                    }, i++));
                    if (og.publishedTime) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "article:published_time",
                            content: og.publishedTime.toString()
                        }, i++));
                    }
                    if (og.modifiedTime) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "article:modified_time",
                            content: og.modifiedTime.toString()
                        }, i++));
                    }
                    if (og.expirationTime) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "article:expiration_time",
                            content: og.expirationTime.toString()
                        }, i++));
                    }
                    if (og.authors) {
                        for (const author of og.authors){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "article:author",
                                content: String(author)
                            }, i++));
                        }
                    }
                    if (og.section) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "article:section",
                            content: og.section
                        }, i++));
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "article:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    break;
                case 'book':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "book"
                    }, i++));
                    if (og.isbn) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "book:isbn",
                            content: og.isbn
                        }, i++));
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "book:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    if (og.authors) {
                        for (const author of og.authors){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "book:author",
                                content: String(author)
                            }, i++));
                        }
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "book:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    break;
                case 'profile':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "profile"
                    }, i++));
                    if (og.firstName) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "profile:first_name",
                            content: og.firstName
                        }, i++));
                    }
                    if (og.lastName) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "profile:last_name",
                            content: og.lastName
                        }, i++));
                    }
                    if (og.username) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "profile:username",
                            content: og.username
                        }, i++));
                    }
                    if (og.gender) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "profile:gender",
                            content: og.gender
                        }, i++));
                    }
                    break;
                case 'music.song':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "music.song"
                    }, i++));
                    if (og.duration != null) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "music:duration",
                            content: og.duration.toString()
                        }, i++));
                    }
                    if (og.albums) {
                        for (const album of og.albums){
                            if (typeof album === 'string') {
                                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                    property: "music:album",
                                    content: album
                                }, i++));
                            } else {
                                if (album.url) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:album",
                                        content: String(album.url)
                                    }, i++));
                                }
                                if (album.disc != null) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:album:disc",
                                        content: String(album.disc)
                                    }, i++));
                                }
                                if (album.track != null) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:album:track",
                                        content: String(album.track)
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.musicians) {
                        for (const musician of og.musicians){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "music:musician",
                                content: String(musician)
                            }, i++));
                        }
                    }
                    break;
                case 'music.album':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "music.album"
                    }, i++));
                    if (og.songs) {
                        for (const song of og.songs){
                            if (typeof song === 'string') {
                                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                    property: "music:song",
                                    content: song
                                }, i++));
                            } else {
                                if (song.url) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:song",
                                        content: String(song.url)
                                    }, i++));
                                }
                                if (song.disc != null) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:song:disc",
                                        content: String(song.disc)
                                    }, i++));
                                }
                                if (song.track != null) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:song:track",
                                        content: String(song.track)
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.musicians) {
                        for (const musician of og.musicians){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "music:musician",
                                content: String(musician)
                            }, i++));
                        }
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "music:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    break;
                case 'music.playlist':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "music.playlist"
                    }, i++));
                    if (og.songs) {
                        for (const song of og.songs){
                            if (typeof song === 'string') {
                                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                    property: "music:song",
                                    content: song
                                }, i++));
                            } else {
                                if (song.url) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:song",
                                        content: String(song.url)
                                    }, i++));
                                }
                                if (song.disc != null) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:song:disc",
                                        content: String(song.disc)
                                    }, i++));
                                }
                                if (song.track != null) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "music:song:track",
                                        content: String(song.track)
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.creators) {
                        for (const creator of og.creators){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "music:creator",
                                content: String(creator)
                            }, i++));
                        }
                    }
                    break;
                case 'music.radio_station':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "music.radio_station"
                    }, i++));
                    if (og.creators) {
                        for (const creator of og.creators){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "music:creator",
                                content: String(creator)
                            }, i++));
                        }
                    }
                    break;
                case 'video.movie':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "video.movie"
                    }, i++));
                    if (og.actors) {
                        for (const actor of og.actors){
                            if (typeof actor === 'string') {
                                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                    property: "video:actor",
                                    content: actor
                                }, i++));
                            } else {
                                if (actor.url) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "video:actor",
                                        content: String(actor.url)
                                    }, i++));
                                }
                                if (actor.role) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "video:actor:role",
                                        content: actor.role
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.directors) {
                        for (const director of og.directors){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "video:director",
                                content: String(director)
                            }, i++));
                        }
                    }
                    if (og.writers) {
                        for (const writer of og.writers){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "video:writer",
                                content: String(writer)
                            }, i++));
                        }
                    }
                    if (og.duration != null) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "video:duration",
                            content: String(og.duration)
                        }, i++));
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "video:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "video:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    break;
                case 'video.episode':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "video.episode"
                    }, i++));
                    if (og.actors) {
                        for (const actor of og.actors){
                            if (typeof actor === 'string') {
                                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                    property: "video:actor",
                                    content: actor
                                }, i++));
                            } else {
                                if (actor.url) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "video:actor",
                                        content: String(actor.url)
                                    }, i++));
                                }
                                if (actor.role) {
                                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                        property: "video:actor:role",
                                        content: actor.role
                                    }, i++));
                                }
                            }
                        }
                    }
                    if (og.directors) {
                        for (const director of og.directors){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "video:director",
                                content: String(director)
                            }, i++));
                        }
                    }
                    if (og.writers) {
                        for (const writer of og.writers){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "video:writer",
                                content: String(writer)
                            }, i++));
                        }
                    }
                    if (og.duration != null) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "video:duration",
                            content: String(og.duration)
                        }, i++));
                    }
                    if (og.releaseDate) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "video:release_date",
                            content: og.releaseDate
                        }, i++));
                    }
                    if (og.tags) {
                        for (const tag of og.tags){
                            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                                property: "video:tag",
                                content: tag
                            }, i++));
                        }
                    }
                    if (og.series) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            property: "video:series",
                            content: String(og.series)
                        }, i++));
                    }
                    break;
                case 'video.tv_show':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "video.tv_show"
                    }, i++));
                    break;
                case 'video.other':
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "og:type",
                        content: "video.other"
                    }, i++));
                    break;
                default:
                    const _exhaustiveCheck = ogType;
                    throw Object.defineProperty(new Error(`Invalid OpenGraph type: ${_exhaustiveCheck}`), "__NEXT_ERROR_CODE", {
                        value: "E237",
                        enumerable: false,
                        configurable: true
                    });
            }
        }
    }
    // --- Twitter ---
    if (metadata.twitter) {
        var _tw_title;
        const tw = metadata.twitter;
        const { card } = tw;
        if (card) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:card",
                content: card
            }, i++));
        }
        if (tw.site) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:site",
                content: tw.site
            }, i++));
        }
        if (tw.siteId) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:site:id",
                content: tw.siteId
            }, i++));
        }
        if (tw.creator) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:creator",
                content: tw.creator
            }, i++));
        }
        if (tw.creatorId) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:creator:id",
                content: tw.creatorId
            }, i++));
        }
        if ((_tw_title = tw.title) == null ? void 0 : _tw_title.absolute) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:title",
                content: tw.title.absolute
            }, i++));
        }
        if (tw.description) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: "twitter:description",
                content: tw.description
            }, i++));
        }
        // Twitter images
        if (tw.images) {
            for (const image of tw.images){
                if (typeof image === 'string') {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: "twitter:image",
                        content: image
                    }, i++));
                } else {
                    if (image.url) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: "twitter:image",
                            content: String(image.url)
                        }, i++));
                    }
                    if (image.alt) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: "twitter:image:alt",
                            content: image.alt
                        }, i++));
                    }
                    if (image.secureUrl) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: "twitter:image:secure_url",
                            content: String(image.secureUrl)
                        }, i++));
                    }
                    if (image.type) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: "twitter:image:type",
                            content: image.type
                        }, i++));
                    }
                    if (image.width) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: "twitter:image:width",
                            content: String(image.width)
                        }, i++));
                    }
                    if (image.height) {
                        tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                            name: "twitter:image:height",
                            content: String(image.height)
                        }, i++));
                    }
                }
            }
        }
        // Twitter player cards
        if (card === 'player') {
            for (const player of tw.players){
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "twitter:player",
                    content: player.playerUrl.toString()
                }, i++));
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "twitter:player:stream",
                    content: player.streamUrl.toString()
                }, i++));
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "twitter:player:width",
                    content: String(player.width)
                }, i++));
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                    name: "twitter:player:height",
                    content: String(player.height)
                }, i++));
            }
        }
        // Twitter app cards
        if (card === 'app') {
            const { app } = tw;
            for (const platform of [
                'iphone',
                'ipad',
                'googleplay'
            ]){
                var _app_url;
                if (app.name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: `twitter:app:name:${platform}`,
                        content: app.name
                    }, i++));
                }
                if (app.id[platform]) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: `twitter:app:id:${platform}`,
                        content: String(app.id[platform])
                    }, i++));
                }
                if ((_app_url = app.url) == null ? void 0 : _app_url[platform]) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        name: `twitter:app:url:${platform}`,
                        content: app.url[platform].toString()
                    }, i++));
                }
            }
        }
    }
    // --- App Links ---
    if (metadata.appLinks) {
        const appLinks = metadata.appLinks;
        // iOS / iPhone / iPad (AppLinksApple: url, app_store_id, app_name)
        if (appLinks.ios) {
            for (const item of appLinks.ios){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:ios:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_store_id) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:ios:app_store_id",
                        content: String(item.app_store_id)
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:ios:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        if (appLinks.iphone) {
            for (const item of appLinks.iphone){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:iphone:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_store_id) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:iphone:app_store_id",
                        content: String(item.app_store_id)
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:iphone:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        if (appLinks.ipad) {
            for (const item of appLinks.ipad){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:ipad:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_store_id) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:ipad:app_store_id",
                        content: String(item.app_store_id)
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:ipad:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Android (AppLinksAndroid: package, url, class, app_name)
        if (appLinks.android) {
            for (const item of appLinks.android){
                if (item.package) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:android:package",
                        content: item.package
                    }, i++));
                }
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:android:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.class) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:android:class",
                        content: item.class
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:android:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Windows Phone (AppLinksWindows: url, app_id, app_name)
        if (appLinks.windows_phone) {
            for (const item of appLinks.windows_phone){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows_phone:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_id) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows_phone:app_id",
                        content: item.app_id
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows_phone:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Windows (AppLinksWindows: url, app_id, app_name)
        if (appLinks.windows) {
            for (const item of appLinks.windows){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_id) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows:app_id",
                        content: item.app_id
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Windows Universal (AppLinksWindows: url, app_id, app_name)
        if (appLinks.windows_universal) {
            for (const item of appLinks.windows_universal){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows_universal:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.app_id) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows_universal:app_id",
                        content: item.app_id
                    }, i++));
                }
                if (item.app_name) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:windows_universal:app_name",
                        content: item.app_name
                    }, i++));
                }
            }
        }
        // Web (AppLinksWeb: url, should_fallback)
        if (appLinks.web) {
            for (const item of appLinks.web){
                if (item.url) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:web:url",
                        content: String(item.url)
                    }, i++));
                }
                if (item.should_fallback != null) {
                    tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                        property: "al:web:should_fallback",
                        content: String(item.should_fallback)
                    }, i++));
                }
            }
        }
    }
    // --- Icons ---
    if (metadata.icons) {
        const { shortcut, icon, apple, other } = metadata.icons;
        const hasIcon = Boolean((shortcut == null ? void 0 : shortcut.length) || (icon == null ? void 0 : icon.length) || (apple == null ? void 0 : apple.length) || (other == null ? void 0 : other.length));
        if (shortcut) {
            for (const ic of shortcut){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    rel: rel || 'shortcut icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (icon) {
            for (const ic of icon){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    rel: rel || 'icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (apple) {
            for (const ic of apple){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    rel: rel || 'apple-touch-icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (other) {
            for (const ic of other){
                const { url, rel, ...props } = ic;
                tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    rel: rel || 'icon',
                    href: url.toString(),
                    ...props
                }, i++));
            }
        }
        if (hasIcon) {
            tags.push(/*#__PURE__*/ (0, _jsxruntime.jsx)(_iconmark.IconMark, {}, i++));
        }
    }
    return tags;
}

//# sourceMappingURL=metadata.js.map