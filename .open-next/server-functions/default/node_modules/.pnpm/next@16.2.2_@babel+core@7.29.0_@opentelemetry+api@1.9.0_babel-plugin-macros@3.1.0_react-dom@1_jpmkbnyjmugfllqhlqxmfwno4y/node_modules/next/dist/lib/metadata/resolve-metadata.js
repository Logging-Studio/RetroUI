"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    accumulateMetadata: null,
    accumulateViewport: null,
    resolveMetadata: null,
    resolveViewport: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    accumulateMetadata: function() {
        return accumulateMetadata;
    },
    accumulateViewport: function() {
        return accumulateViewport;
    },
    resolveMetadata: function() {
        return resolveMetadata;
    },
    resolveViewport: function() {
        return resolveViewport;
    }
});
const _getsegmentparam = require("../../shared/lib/router/utils/get-segment-param");
const _workasyncstorageexternal = require("../../server/app-render/work-async-storage.external");
const _invarianterror = require("../../shared/lib/invariant-error");
require("server-only");
const _react = require("react");
const _defaultmetadata = require("./default-metadata");
const _resolveopengraph = require("./resolvers/resolve-opengraph");
const _resolvetitle = require("./resolvers/resolve-title");
const _utils = require("./generate/utils");
const _appdirmodule = require("../../server/lib/app-dir-module");
const _resolvebasics = require("./resolvers/resolve-basics");
const _resolveicons = require("./resolvers/resolve-icons");
const _tracer = require("../../server/lib/trace/tracer");
const _constants = require("../../server/lib/trace/constants");
const _segment = require("../../shared/lib/segment");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../build/output/log"));
const _params = require("../../server/request/params");
const _clientandserverreferences = require("../client-and-server-references");
const _lazyresult = require("../../server/lib/lazy-result");
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
function isFavicon(icon) {
    if (!icon) {
        return false;
    }
    // turbopack appends a hash to all images
    return (icon.url === '/favicon.ico' || icon.url.toString().startsWith('/favicon.ico?')) && icon.type === 'image/x-icon';
}
function convertUrlsToStrings(input) {
    if (input instanceof URL) {
        return input.toString();
    } else if (Array.isArray(input)) {
        return input.map((item)=>convertUrlsToStrings(item));
    } else if (input && typeof input === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(input)){
            result[key] = convertUrlsToStrings(value);
        }
        return result;
    }
    return input;
}
function normalizeMetadataBase(metadataBase) {
    if (typeof metadataBase === 'string') {
        try {
            metadataBase = new URL(metadataBase);
        } catch  {
            throw Object.defineProperty(new Error(`metadataBase is not a valid URL: ${metadataBase}`), "__NEXT_ERROR_CODE", {
                value: "E850",
                enumerable: false,
                configurable: true
            });
        }
    }
    return metadataBase;
}
async function mergeStaticMetadata(metadataBase, source, target, staticFilesMetadata, metadataContext, titleTemplates, leafSegmentStaticIcons, pathname) {
    var _source_twitter, _source_openGraph;
    if (!staticFilesMetadata) return target;
    const { icon, apple, openGraph, twitter, manifest } = staticFilesMetadata;
    // Keep updating the static icons in the most leaf node
    if (icon) {
        leafSegmentStaticIcons.icon = icon;
    }
    if (apple) {
        leafSegmentStaticIcons.apple = apple;
    }
    // file based metadata is specified and current level metadata twitter.images is not specified
    if (twitter && !(source == null ? void 0 : (_source_twitter = source.twitter) == null ? void 0 : _source_twitter.hasOwnProperty('images'))) {
        const resolvedTwitter = (0, _resolveopengraph.resolveTwitter)({
            ...target.twitter,
            images: twitter
        }, metadataBase, {
            ...metadataContext,
            isStaticMetadataRouteFile: true
        }, titleTemplates.twitter);
        target.twitter = convertUrlsToStrings(resolvedTwitter);
    }
    // file based metadata is specified and current level metadata openGraph.images is not specified
    if (openGraph && !(source == null ? void 0 : (_source_openGraph = source.openGraph) == null ? void 0 : _source_openGraph.hasOwnProperty('images'))) {
        const resolvedOpenGraph = await (0, _resolveopengraph.resolveOpenGraph)({
            ...target.openGraph,
            images: openGraph
        }, metadataBase, pathname, {
            ...metadataContext,
            isStaticMetadataRouteFile: true
        }, titleTemplates.openGraph);
        target.openGraph = convertUrlsToStrings(resolvedOpenGraph);
    }
    if (manifest) {
        target.manifest = manifest;
    }
    return target;
}
/**
 * Merges the given metadata with the resolved metadata. Returns a new object.
 */ async function mergeMetadata(route, pathname, { metadata, resolvedMetadata, staticFilesMetadata, titleTemplates, metadataContext, buildState, leafSegmentStaticIcons }) {
    const newResolvedMetadata = structuredClone(resolvedMetadata);
    const metadataBase = normalizeMetadataBase((metadata == null ? void 0 : metadata.metadataBase) !== undefined ? metadata.metadataBase : resolvedMetadata.metadataBase);
    for(const key_ in metadata){
        const key = key_;
        switch(key){
            case 'title':
                {
                    newResolvedMetadata.title = (0, _resolvetitle.resolveTitle)(metadata.title, titleTemplates.title);
                    break;
                }
            case 'alternates':
                {
                    newResolvedMetadata.alternates = convertUrlsToStrings(await (0, _resolvebasics.resolveAlternates)(metadata.alternates, metadataBase, pathname, metadataContext));
                    break;
                }
            case 'openGraph':
                {
                    newResolvedMetadata.openGraph = convertUrlsToStrings(await (0, _resolveopengraph.resolveOpenGraph)(metadata.openGraph, metadataBase, pathname, metadataContext, titleTemplates.openGraph));
                    break;
                }
            case 'twitter':
                {
                    newResolvedMetadata.twitter = convertUrlsToStrings((0, _resolveopengraph.resolveTwitter)(metadata.twitter, metadataBase, metadataContext, titleTemplates.twitter));
                    break;
                }
            case 'facebook':
                newResolvedMetadata.facebook = (0, _resolvebasics.resolveFacebook)(metadata.facebook);
                break;
            case 'verification':
                newResolvedMetadata.verification = (0, _resolvebasics.resolveVerification)(metadata.verification);
                break;
            case 'icons':
                {
                    newResolvedMetadata.icons = convertUrlsToStrings((0, _resolveicons.resolveIcons)(metadata.icons));
                    break;
                }
            case 'appleWebApp':
                newResolvedMetadata.appleWebApp = (0, _resolvebasics.resolveAppleWebApp)(metadata.appleWebApp);
                break;
            case 'appLinks':
                newResolvedMetadata.appLinks = convertUrlsToStrings((0, _resolvebasics.resolveAppLinks)(metadata.appLinks));
                break;
            case 'robots':
                {
                    newResolvedMetadata.robots = (0, _resolvebasics.resolveRobots)(metadata.robots);
                    break;
                }
            case 'archives':
            case 'assets':
            case 'bookmarks':
            case 'keywords':
                {
                    newResolvedMetadata[key] = (0, _utils.resolveAsArrayOrUndefined)(metadata[key]);
                    break;
                }
            case 'authors':
                {
                    newResolvedMetadata[key] = convertUrlsToStrings((0, _utils.resolveAsArrayOrUndefined)(metadata.authors));
                    break;
                }
            case 'itunes':
                {
                    newResolvedMetadata[key] = await (0, _resolvebasics.resolveItunes)(metadata.itunes, metadataBase, pathname, metadataContext);
                    break;
                }
            case 'pagination':
                {
                    newResolvedMetadata.pagination = await (0, _resolvebasics.resolvePagination)(metadata.pagination, metadataBase, pathname, metadataContext);
                    break;
                }
            // directly assign fields that fallback to null
            case 'abstract':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'applicationName':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'description':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'generator':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'creator':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'publisher':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'category':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'classification':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'referrer':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'formatDetection':
                newResolvedMetadata[key] = metadata[key] ?? null;
                break;
            case 'manifest':
                newResolvedMetadata[key] = convertUrlsToStrings(metadata[key]) ?? null;
                break;
            case 'pinterest':
                newResolvedMetadata[key] = convertUrlsToStrings(metadata[key]) ?? null;
                break;
            case 'other':
                newResolvedMetadata.other = Object.assign({}, newResolvedMetadata.other, metadata.other);
                if (metadata.other) {
                    if ('apple-touch-fullscreen' in metadata.other) {
                        buildState.warnings.add(`Use appleWebApp instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    }
                    if ('apple-touch-icon-precomposed' in metadata.other) {
                        buildState.warnings.add(`Use icons.apple instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    }
                }
                break;
            case 'metadataBase':
                newResolvedMetadata.metadataBase = metadataBase ? metadataBase.toString() : null;
                break;
            case 'apple-touch-fullscreen':
                {
                    buildState.warnings.add(`Use appleWebApp instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    break;
                }
            case 'apple-touch-icon-precomposed':
                {
                    buildState.warnings.add(`Use icons.apple instead\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata`);
                    break;
                }
            case 'themeColor':
            case 'colorScheme':
            case 'viewport':
                if (metadata[key] != null) {
                    buildState.warnings.add(`Unsupported metadata ${key} is configured in metadata export in ${route}. Please move it to viewport export instead.\nRead more: https://nextjs.org/docs/app/api-reference/functions/generate-viewport`);
                }
                break;
            default:
                {
                    key;
                }
        }
    }
    return mergeStaticMetadata(metadataBase, metadata, newResolvedMetadata, staticFilesMetadata, metadataContext, titleTemplates, leafSegmentStaticIcons, pathname);
}
/**
 * Merges the given viewport with the resolved viewport. Returns a new object.
 */ function mergeViewport({ resolvedViewport, viewport }) {
    const newResolvedViewport = structuredClone(resolvedViewport);
    if (viewport) {
        for(const key_ in viewport){
            const key = key_;
            switch(key){
                case 'themeColor':
                    {
                        newResolvedViewport.themeColor = (0, _resolvebasics.resolveThemeColor)(viewport.themeColor);
                        break;
                    }
                case 'colorScheme':
                    newResolvedViewport.colorScheme = viewport.colorScheme || null;
                    break;
                case 'width':
                case 'height':
                case 'initialScale':
                case 'minimumScale':
                case 'maximumScale':
                case 'userScalable':
                case 'viewportFit':
                case 'interactiveWidget':
                    // always override the target with the source
                    // @ts-ignore viewport properties
                    newResolvedViewport[key] = viewport[key];
                    break;
                default:
                    key;
            }
        }
    }
    return newResolvedViewport;
}
function getDefinedViewport(mod, props, tracingProps) {
    if (typeof mod.generateViewport === 'function') {
        const { route } = tracingProps;
        const segmentProps = createSegmentProps(mod.generateViewport, props);
        return Object.assign((parent)=>(0, _tracer.getTracer)().trace(_constants.ResolveMetadataSpan.generateViewport, {
                spanName: `generateViewport ${route}`,
                attributes: {
                    'next.page': route
                }
            }, ()=>mod.generateViewport(segmentProps, parent)), {
            $$original: mod.generateViewport
        });
    }
    return mod.viewport || null;
}
function getDefinedMetadata(mod, props, tracingProps) {
    if (typeof mod.generateMetadata === 'function') {
        const { route } = tracingProps;
        const segmentProps = createSegmentProps(mod.generateMetadata, props);
        return Object.assign((parent)=>(0, _tracer.getTracer)().trace(_constants.ResolveMetadataSpan.generateMetadata, {
                spanName: `generateMetadata ${route}`,
                attributes: {
                    'next.page': route
                }
            }, ()=>mod.generateMetadata(segmentProps, parent)), {
            $$original: mod.generateMetadata
        });
    }
    return mod.metadata || null;
}
/**
 * If `fn` is a `'use cache'` function, we add special markers to the props,
 * that the cache wrapper reads and removes, before passing the props to the
 * user function.
 */ function createSegmentProps(fn, props) {
    return (0, _clientandserverreferences.isUseCacheFunction)(fn) ? 'searchParams' in props ? {
        ...props,
        $$isPage: true
    } : {
        ...props,
        $$isLayout: true
    } : props;
}
async function collectStaticImagesFiles(metadata, props, type) {
    if (!(metadata == null ? void 0 : metadata[type])) return undefined;
    const iconPromises = metadata[type].map(async (imageModule)=>await imageModule(props));
    return (iconPromises == null ? void 0 : iconPromises.length) > 0 ? (await Promise.all(iconPromises)).flat() : undefined;
}
async function resolveStaticMetadata(modules, props) {
    const { metadata } = modules;
    if (!metadata) return null;
    const [icon, apple, openGraph, twitter] = await Promise.all([
        collectStaticImagesFiles(metadata, props, 'icon'),
        collectStaticImagesFiles(metadata, props, 'apple'),
        collectStaticImagesFiles(metadata, props, 'openGraph'),
        collectStaticImagesFiles(metadata, props, 'twitter')
    ]);
    const staticMetadata = {
        icon,
        apple,
        openGraph,
        twitter,
        manifest: metadata.manifest
    };
    return staticMetadata;
}
// [layout.metadata, static files metadata] -> ... -> [page.metadata, static files metadata]
async function collectMetadata({ tree, metadataItems, errorMetadataItem, props, route, errorConvention }) {
    let mod;
    let modType;
    const hasErrorConventionComponent = Boolean(errorConvention && tree[2][errorConvention]);
    if (errorConvention) {
        mod = await (0, _appdirmodule.getComponentTypeModule)(tree, 'layout');
        modType = errorConvention;
    } else {
        const { mod: layoutOrPageMod, modType: layoutOrPageModType } = await (0, _appdirmodule.getLayoutOrPageModule)(tree);
        mod = layoutOrPageMod;
        modType = layoutOrPageModType;
    }
    if (modType) {
        route += `/${modType}`;
    }
    const staticFilesMetadata = await resolveStaticMetadata(tree[2], props);
    const metadataExport = mod ? getDefinedMetadata(mod, props, {
        route
    }) : null;
    metadataItems.push([
        metadataExport,
        staticFilesMetadata
    ]);
    if (hasErrorConventionComponent && errorConvention) {
        const errorMod = await (0, _appdirmodule.getComponentTypeModule)(tree, errorConvention);
        const errorMetadataExport = errorMod ? getDefinedMetadata(errorMod, props, {
            route
        }) : null;
        errorMetadataItem[0] = errorMetadataExport;
        errorMetadataItem[1] = staticFilesMetadata;
    }
}
// [layout.metadata, static files metadata] -> ... -> [page.metadata, static files metadata]
async function collectViewport({ tree, viewportItems, errorViewportItemRef, props, route, errorConvention }) {
    let mod;
    let modType;
    const hasErrorConventionComponent = Boolean(errorConvention && tree[2][errorConvention]);
    if (errorConvention) {
        mod = await (0, _appdirmodule.getComponentTypeModule)(tree, 'layout');
        modType = errorConvention;
    } else {
        const { mod: layoutOrPageMod, modType: layoutOrPageModType } = await (0, _appdirmodule.getLayoutOrPageModule)(tree);
        mod = layoutOrPageMod;
        modType = layoutOrPageModType;
    }
    if (modType) {
        route += `/${modType}`;
    }
    const viewportExport = mod ? getDefinedViewport(mod, props, {
        route
    }) : null;
    viewportItems.push(viewportExport);
    if (hasErrorConventionComponent && errorConvention) {
        const errorMod = await (0, _appdirmodule.getComponentTypeModule)(tree, errorConvention);
        const errorViewportExport = errorMod ? getDefinedViewport(errorMod, props, {
            route
        }) : null;
        errorViewportItemRef.current = errorViewportExport;
    }
}
const resolveMetadataItems = (0, _react.cache)(async function(tree, searchParams, errorConvention, interpolatedParams, isRuntimePrefetchable) {
    const parentParams = {};
    const metadataItems = [];
    const errorMetadataItem = [
        null,
        null
    ];
    const treePrefix = undefined;
    return resolveMetadataItemsImpl(metadataItems, tree, treePrefix, parentParams, null, searchParams, errorConvention, errorMetadataItem, interpolatedParams, isRuntimePrefetchable);
});
async function resolveMetadataItemsImpl(metadataItems, tree, /** Provided tree can be nested subtree, this argument says what is the path of such subtree */ treePrefix, parentParams, parentOptionalCatchAllParamName, searchParams, errorConvention, errorMetadataItem, interpolatedParams, isRuntimePrefetchable) {
    const [segment, parallelRoutes, { page }] = tree;
    const currentTreePrefix = treePrefix && treePrefix.length ? [
        ...treePrefix,
        segment
    ] : [
        segment
    ];
    const isPage = typeof page !== 'undefined';
    // Handle dynamic segment params.
    let currentParams = parentParams;
    const segmentParam = (0, _getsegmentparam.getSegmentParam)(segment);
    if (segmentParam) {
        const value = interpolatedParams[segmentParam.paramName];
        if (value !== null && value !== undefined) {
            currentParams = {
                ...parentParams,
                [segmentParam.paramName]: value
            };
        }
    }
    // Track optional catch-all params with no value (see comment in
    // create-component-tree.tsx for full explanation).
    const optionalCatchAllParamName = (segmentParam == null ? void 0 : segmentParam.paramType) === 'optional-catchall' && (interpolatedParams[segmentParam.paramName] === null || interpolatedParams[segmentParam.paramName] === undefined) ? segmentParam.paramName : parentOptionalCatchAllParamName;
    const params = (0, _params.createServerParamsForMetadata)(currentParams, optionalCatchAllParamName, isRuntimePrefetchable);
    const props = isPage ? {
        params,
        searchParams
    } : {
        params
    };
    await collectMetadata({
        tree,
        metadataItems,
        errorMetadataItem,
        errorConvention,
        props,
        route: currentTreePrefix// __PAGE__ shouldn't be shown in a route
        .filter((s)=>s !== _segment.PAGE_SEGMENT_KEY).join('/')
    });
    for(const key in parallelRoutes){
        const childTree = parallelRoutes[key];
        await resolveMetadataItemsImpl(metadataItems, childTree, currentTreePrefix, currentParams, optionalCatchAllParamName, searchParams, errorConvention, errorMetadataItem, interpolatedParams, isRuntimePrefetchable);
    }
    if (Object.keys(parallelRoutes).length === 0 && errorConvention) {
        // If there are no parallel routes, place error metadata as the last item.
        // e.g. layout -> layout -> not-found
        metadataItems.push(errorMetadataItem);
    }
    return metadataItems;
}
const resolveViewportItems = (0, _react.cache)(async function(tree, searchParams, errorConvention, interpolatedParams, isRuntimePrefetchable) {
    const parentParams = {};
    const viewportItems = [];
    const errorViewportItemRef = {
        current: null
    };
    const treePrefix = undefined;
    return resolveViewportItemsImpl(viewportItems, tree, treePrefix, parentParams, null, searchParams, errorConvention, errorViewportItemRef, interpolatedParams, isRuntimePrefetchable);
});
async function resolveViewportItemsImpl(viewportItems, tree, /** Provided tree can be nested subtree, this argument says what is the path of such subtree */ treePrefix, parentParams, parentOptionalCatchAllParamName, searchParams, errorConvention, errorViewportItemRef, interpolatedParams, isRuntimePrefetchable) {
    const [segment, parallelRoutes, { page }] = tree;
    const currentTreePrefix = treePrefix && treePrefix.length ? [
        ...treePrefix,
        segment
    ] : [
        segment
    ];
    const isPage = typeof page !== 'undefined';
    // Handle dynamic segment params.
    let currentParams = parentParams;
    const segmentParam = (0, _getsegmentparam.getSegmentParam)(segment);
    if (segmentParam) {
        const value = interpolatedParams[segmentParam.paramName];
        if (value !== null && value !== undefined) {
            currentParams = {
                ...parentParams,
                [segmentParam.paramName]: value
            };
        }
    }
    // Track optional catch-all params with no value (see comment in
    // create-component-tree.tsx for full explanation).
    const optionalCatchAllParamName = (segmentParam == null ? void 0 : segmentParam.paramType) === 'optional-catchall' && (interpolatedParams[segmentParam.paramName] === null || interpolatedParams[segmentParam.paramName] === undefined) ? segmentParam.paramName : parentOptionalCatchAllParamName;
    const params = (0, _params.createServerParamsForMetadata)(currentParams, optionalCatchAllParamName, isRuntimePrefetchable);
    let layerProps;
    if (isPage) {
        layerProps = {
            params,
            searchParams
        };
    } else {
        layerProps = {
            params
        };
    }
    await collectViewport({
        tree,
        viewportItems,
        errorViewportItemRef,
        errorConvention,
        props: layerProps,
        route: currentTreePrefix// __PAGE__ shouldn't be shown in a route
        .filter((s)=>s !== _segment.PAGE_SEGMENT_KEY).join('/')
    });
    for(const key in parallelRoutes){
        const childTree = parallelRoutes[key];
        await resolveViewportItemsImpl(viewportItems, childTree, currentTreePrefix, currentParams, optionalCatchAllParamName, searchParams, errorConvention, errorViewportItemRef, interpolatedParams, isRuntimePrefetchable);
    }
    if (Object.keys(parallelRoutes).length === 0 && errorConvention) {
        // If there are no parallel routes, place error metadata as the last item.
        // e.g. layout -> layout -> not-found
        viewportItems.push(errorViewportItemRef.current);
    }
    return viewportItems;
}
const isTitleTruthy = (title)=>!!(title == null ? void 0 : title.absolute);
const hasTitle = (metadata)=>isTitleTruthy(metadata == null ? void 0 : metadata.title);
function inheritFromMetadata(target, metadata) {
    if (target) {
        if (!hasTitle(target) && hasTitle(metadata)) {
            target.title = metadata.title;
        }
        if (!target.description && metadata.description) {
            target.description = metadata.description;
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonOgKeys = [
    'title',
    'description',
    'images'
];
function postProcessMetadata(metadata, favicon, titleTemplates, metadataContext) {
    const { openGraph, twitter } = metadata;
    if (openGraph) {
        // If there's openGraph information but not configured in twitter,
        // inherit them from openGraph metadata.
        let autoFillProps = {};
        const hasTwTitle = hasTitle(twitter);
        const hasTwDescription = twitter == null ? void 0 : twitter.description;
        const hasTwImages = Boolean((twitter == null ? void 0 : twitter.hasOwnProperty('images')) && twitter.images);
        if (!hasTwTitle) {
            if (isTitleTruthy(openGraph.title)) {
                autoFillProps.title = openGraph.title;
            } else if (metadata.title && isTitleTruthy(metadata.title)) {
                autoFillProps.title = metadata.title;
            }
        }
        if (!hasTwDescription) autoFillProps.description = openGraph.description || metadata.description || undefined;
        if (!hasTwImages) autoFillProps.images = openGraph.images;
        if (Object.keys(autoFillProps).length > 0) {
            const partialTwitter = (0, _resolveopengraph.resolveTwitter)(autoFillProps, normalizeMetadataBase(metadata.metadataBase), metadataContext, titleTemplates.twitter);
            if (metadata.twitter) {
                metadata.twitter = Object.assign({}, metadata.twitter, {
                    ...!hasTwTitle && {
                        title: partialTwitter == null ? void 0 : partialTwitter.title
                    },
                    ...!hasTwDescription && {
                        description: partialTwitter == null ? void 0 : partialTwitter.description
                    },
                    ...!hasTwImages && {
                        images: partialTwitter == null ? void 0 : partialTwitter.images
                    }
                });
            } else {
                metadata.twitter = convertUrlsToStrings(partialTwitter);
            }
        }
    }
    // If there's no title and description configured in openGraph or twitter,
    // use the title and description from metadata.
    inheritFromMetadata(openGraph, metadata);
    inheritFromMetadata(twitter, metadata);
    if (favicon) {
        if (!metadata.icons) {
            metadata.icons = {
                icon: [],
                apple: []
            };
        }
        metadata.icons.icon.unshift(favicon);
    }
    return metadata;
}
function prerenderMetadata(metadataItems) {
    // If the index is a function then it is a resolver and the next slot
    // is the corresponding result. If the index is not a function it is the result
    // itself.
    const resolversAndResults = [];
    for(let i = 0; i < metadataItems.length; i++){
        const metadataExport = metadataItems[i][0];
        getResult(resolversAndResults, metadataExport);
    }
    return resolversAndResults;
}
function prerenderViewport(viewportItems) {
    // If the index is a function then it is a resolver and the next slot
    // is the corresponding result. If the index is not a function it is the result
    // itself.
    const resolversAndResults = [];
    for(let i = 0; i < viewportItems.length; i++){
        const viewportExport = viewportItems[i];
        getResult(resolversAndResults, viewportExport);
    }
    return resolversAndResults;
}
const noop = ()=>{};
function getResult(resolversAndResults, exportForResult) {
    if (typeof exportForResult === 'function') {
        // If the function is a 'use cache' function that uses the parent data as
        // the second argument, we don't want to eagerly execute it during
        // metadata/viewport pre-rendering, as the parent data might also be
        // computed from another 'use cache' function. To ensure that the hanging
        // input abort signal handling works in this case (i.e. the depending
        // function waits for the cached input to resolve while encoding its args),
        // they must be called sequentially. This can be accomplished by wrapping
        // the call in a lazy promise, so that the original function is only called
        // when the result is actually awaited.
        const useCacheFunctionInfo = (0, _clientandserverreferences.getUseCacheFunctionInfo)(exportForResult.$$original);
        if (useCacheFunctionInfo && useCacheFunctionInfo.usedArgs[1]) {
            const promise = new Promise((resolve)=>resolversAndResults.push(resolve));
            resolversAndResults.push((0, _lazyresult.createLazyResult)(async ()=>exportForResult(promise)));
        } else {
            let result;
            if (useCacheFunctionInfo) {
                resolversAndResults.push(noop);
                // @ts-expect-error We intentionally omit the parent argument, because
                // we know from the check above that the 'use cache' function does not
                // use it.
                result = exportForResult();
            } else {
                result = exportForResult(new Promise((resolve)=>resolversAndResults.push(resolve)));
            }
            resolversAndResults.push(result);
            if (result instanceof Promise) {
                // since we eager execute generateMetadata and
                // they can reject at anytime we need to ensure
                // we attach the catch handler right away to
                // prevent unhandled rejections crashing the process
                result.catch((err)=>{
                    return {
                        __nextError: err
                    };
                });
            }
        }
    } else if (typeof exportForResult === 'object') {
        resolversAndResults.push(exportForResult);
    } else {
        resolversAndResults.push(null);
    }
}
function freezeInDev(obj) {
    if (process.env.NODE_ENV === 'development') {
        return require('../../shared/lib/deep-freeze').deepFreeze(obj);
    }
    return obj;
}
async function accumulateMetadata(route, metadataItems, pathname, metadataContext) {
    let resolvedMetadata = (0, _defaultmetadata.createDefaultMetadata)();
    let titleTemplates = {
        title: null,
        twitter: null,
        openGraph: null
    };
    const buildState = {
        warnings: new Set()
    };
    let favicon;
    // Collect the static icons in the most leaf node,
    // since we don't collect all the static metadata icons in the parent segments.
    const leafSegmentStaticIcons = {
        icon: [],
        apple: []
    };
    const resolversAndResults = prerenderMetadata(metadataItems);
    let resultIndex = 0;
    for(let i = 0; i < metadataItems.length; i++){
        var _staticFilesMetadata_icon;
        const staticFilesMetadata = metadataItems[i][1];
        // Treat favicon as special case, it should be the first icon in the list
        // i <= 1 represents root layout, and if current page is also at root
        if (i <= 1 && isFavicon(staticFilesMetadata == null ? void 0 : (_staticFilesMetadata_icon = staticFilesMetadata.icon) == null ? void 0 : _staticFilesMetadata_icon[0])) {
            var _staticFilesMetadata_icon1;
            const iconMod = staticFilesMetadata == null ? void 0 : (_staticFilesMetadata_icon1 = staticFilesMetadata.icon) == null ? void 0 : _staticFilesMetadata_icon1.shift();
            if (i === 0) favicon = iconMod;
        }
        let pendingMetadata = resolversAndResults[resultIndex++];
        if (typeof pendingMetadata === 'function') {
            // This metadata item had a `generateMetadata` and
            // we need to provide the currently resolved metadata
            // to it before we continue;
            const resolveParentMetadata = pendingMetadata;
            // we know that the next item is a result if this item
            // was a resolver
            pendingMetadata = resolversAndResults[resultIndex++];
            resolveParentMetadata(freezeInDev(resolvedMetadata));
        }
        // Otherwise the item was either null or a static export
        let metadata;
        if (isPromiseLike(pendingMetadata)) {
            metadata = await pendingMetadata;
        } else {
            metadata = pendingMetadata;
        }
        resolvedMetadata = await mergeMetadata(route, pathname, {
            resolvedMetadata,
            metadata,
            metadataContext,
            staticFilesMetadata,
            titleTemplates,
            buildState,
            leafSegmentStaticIcons
        });
        // If the layout is the same layer with page, skip the leaf layout and leaf page
        // The leaf layout and page are the last two items
        if (i < metadataItems.length - 2) {
            var _resolvedMetadata_title, _resolvedMetadata_openGraph, _resolvedMetadata_twitter;
            titleTemplates = {
                title: ((_resolvedMetadata_title = resolvedMetadata.title) == null ? void 0 : _resolvedMetadata_title.template) || null,
                openGraph: ((_resolvedMetadata_openGraph = resolvedMetadata.openGraph) == null ? void 0 : _resolvedMetadata_openGraph.title.template) || null,
                twitter: ((_resolvedMetadata_twitter = resolvedMetadata.twitter) == null ? void 0 : _resolvedMetadata_twitter.title.template) || null
            };
        }
    }
    if (leafSegmentStaticIcons.icon.length > 0 || leafSegmentStaticIcons.apple.length > 0) {
        if (!resolvedMetadata.icons) {
            resolvedMetadata.icons = {
                icon: [],
                apple: []
            };
            if (leafSegmentStaticIcons.icon.length > 0) {
                resolvedMetadata.icons.icon.unshift(...leafSegmentStaticIcons.icon);
            }
            if (leafSegmentStaticIcons.apple.length > 0) {
                resolvedMetadata.icons.apple.unshift(...leafSegmentStaticIcons.apple);
            }
        }
    }
    // Only log warnings if there are any, and only once after the metadata resolving process is finished
    if (buildState.warnings.size > 0) {
        for (const warning of buildState.warnings){
            _log.warn(warning);
        }
    }
    return postProcessMetadata(resolvedMetadata, favicon, titleTemplates, metadataContext);
}
async function accumulateViewport(viewportItems) {
    let resolvedViewport = (0, _defaultmetadata.createDefaultViewport)();
    const resolversAndResults = prerenderViewport(viewportItems);
    let i = 0;
    while(i < resolversAndResults.length){
        let pendingViewport = resolversAndResults[i++];
        if (typeof pendingViewport === 'function') {
            // this viewport item had a `generateViewport` and
            // we need to provide the currently resolved viewport
            // to it before we continue;
            const resolveParentViewport = pendingViewport;
            // we know that the next item is a result if this item
            // was a resolver
            pendingViewport = resolversAndResults[i++];
            resolveParentViewport(freezeInDev(resolvedViewport));
        }
        // Otherwise the item was either null or a static export
        let viewport;
        if (isPromiseLike(pendingViewport)) {
            viewport = await pendingViewport;
        } else {
            viewport = pendingViewport;
        }
        resolvedViewport = mergeViewport({
            resolvedViewport,
            viewport
        });
    }
    return resolvedViewport;
}
async function resolveMetadata(tree, pathname, searchParams, errorConvention, interpolatedParams, metadataContext, isRuntimePrefetchable) {
    const metadataItems = await resolveMetadataItems(tree, searchParams, errorConvention, interpolatedParams, isRuntimePrefetchable);
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!workStore) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Expected workStore to be initialized'), "__NEXT_ERROR_CODE", {
            value: "E1068",
            enumerable: false,
            configurable: true
        });
    }
    return accumulateMetadata(workStore.route, metadataItems, pathname, metadataContext);
}
async function resolveViewport(tree, searchParams, errorConvention, interpolatedParams, isRuntimePrefetchable) {
    const viewportItems = await resolveViewportItems(tree, searchParams, errorConvention, interpolatedParams, isRuntimePrefetchable);
    return accumulateViewport(viewportItems);
}
function isPromiseLike(value) {
    return typeof value === 'object' && value !== null && typeof value.then === 'function';
}

//# sourceMappingURL=resolve-metadata.js.map