"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    collectStagedSegmentData: null,
    createCombinedPayloadAtDepth: null,
    createCombinedPayloadStream: null,
    discoverValidationDepths: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    collectStagedSegmentData: function() {
        return collectStagedSegmentData;
    },
    createCombinedPayloadAtDepth: function() {
        return createCombinedPayloadAtDepth;
    },
    createCombinedPayloadStream: function() {
        return createCombinedPayloadStream;
    },
    discoverValidationDepths: function() {
        return discoverValidationDepths;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _invarianterror = require("../../../shared/lib/invariant-error");
const _stagedrendering = require("../staged-rendering");
const _manifestssingleton = require("../manifests-singleton");
const _apprenderrenderutils = require("../app-render-render-utils");
const _workasyncstorageexternal = require("../work-async-storage.external");
const _prospectiverenderutils = require("../prospective-render-utils");
const _createerrorhandler = require("../create-error-handler");
const _boundary = require("../../../client/components/instant-validation/boundary");
const _appdirmodule = require("../../lib/app-dir-module");
const _parseloadertree = require("../../../shared/lib/router/utils/parse-loader-tree");
const _nodestream = require("node:stream");
const _streamutils = require("./stream-utils");
const _debugchannelserver = require("../debug-channel-server");
const _client = require("react-server-dom-webpack/client");
const _server = require("react-server-dom-webpack/server");
const _segment = require("../../../shared/lib/segment");
const filterStackFrame = process.env.NODE_ENV !== 'production' ? require('../../lib/source-maps').filterStackFrameDEV : undefined;
const findSourceMapURL = process.env.NODE_ENV !== 'production' ? require('../../lib/source-maps').findSourceMapURLDEV : undefined;
const debug = process.env.NEXT_PRIVATE_DEBUG_VALIDATION === '1' ? console.log : undefined;
function traverseRootSeedDataSegments(initialRSCPayload, processSegment) {
    const { flightRouterState, seedData } = getRootDataFromPayload(initialRSCPayload);
    const [rootSegment] = flightRouterState;
    const rootPath = stringifySegment(rootSegment);
    return traverseCacheNodeSegments(rootPath, flightRouterState, seedData, processSegment);
}
function traverseCacheNodeSegments(path, route, seedData, processSegment) {
    processSegment(path, seedData);
    const [_segment, childRoutes] = route;
    const [_node, parallelRoutesData, _loading, _isPartial] = seedData;
    for(const parallelRouteKey in childRoutes){
        const childSeedData = parallelRoutesData[parallelRouteKey];
        if (!childSeedData) {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Got unexpected empty seed data during instant validation`), "__NEXT_ERROR_CODE", {
                value: "E992",
                enumerable: false,
                configurable: true
            });
        }
        const childRoute = childRoutes[parallelRouteKey];
        // NOTE: if this is a __PAGE__ segment, it might have search params appended.
        // Whoever reads from the cache needs to append them as well.
        const [childSegment] = childRoute;
        const childPath = createChildSegmentPath(path, parallelRouteKey, childSegment);
        traverseCacheNodeSegments(childPath, childRoute, childSeedData, processSegment);
    }
}
function createChildSegmentPath(parentPath, parallelRouteKey, segment) {
    const parallelRoutePrefix = parallelRouteKey === 'children' ? '' : `@${encodeURIComponent(parallelRouteKey)}/`;
    return `${parentPath}/${parallelRoutePrefix}${stringifySegment(segment)}`;
}
function stringifySegment(segment) {
    return typeof segment === 'string' ? encodeURIComponent(segment) : encodeURIComponent(segment[0]) + '|' + segment[1] + '|' + segment[2];
}
async function collectStagedSegmentData(fullPageChunks, fullPageDebugChunks, startTime, hasRuntimePrefetch, clientReferenceManifest) {
    const debugChannelAbortController = new AbortController();
    const debugStream = fullPageDebugChunks ? (0, _streamutils.createNodeStreamFromChunks)(fullPageDebugChunks, debugChannelAbortController.signal) : null;
    const { stream, controller } = createStagedStreamFromChunks(fullPageChunks);
    stream.on('end', ()=>{
        // When the stream finishes, we have to close the debug stream too,
        // but delay it to avoid "Connection closed." errors.
        setImmediate(()=>debugChannelAbortController.abort());
    });
    // Technically we're just re-encoding, so nothing new should be emitted,
    // but we add an environment name just in case.
    const environmentName = ()=>{
        const currentStage = controller.currentStage;
        switch(currentStage){
            case _stagedrendering.RenderStage.Static:
                return 'Prerender';
            case _stagedrendering.RenderStage.Runtime:
                return hasRuntimePrefetch ? 'Prefetch' : 'Prefetchable';
            case _stagedrendering.RenderStage.Dynamic:
                return 'Server';
            default:
                currentStage;
                throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${currentStage}`), "__NEXT_ERROR_CODE", {
                    value: "E881",
                    enumerable: false,
                    configurable: true
                });
        }
    };
    // Deserialize the payload.
    // NOTE: the stream will initially be in the static stage, so that's as far as we get here.
    // We still expect the outer structure of the payload to be readable in this state.
    const serverConsumerManifest = {
        moduleLoading: null,
        moduleMap: clientReferenceManifest.rscModuleMapping,
        serverModuleMap: (0, _manifestssingleton.getServerModuleMap)()
    };
    const payload = await (0, _client.createFromNodeStream)(stream, serverConsumerManifest, {
        findSourceMapURL,
        debugChannel: debugStream ?? undefined,
        // Do not pass start/end timings - we do not want to omit any debug info.
        startTime: undefined,
        endTime: undefined
    });
    // Deconstruct the payload into separate streams per segment.
    // We have to preserve the stage information for each of them,
    // so that we can later render each segment in any stage we need.
    const { head } = getRootDataFromPayload(payload);
    const segments = new Map();
    traverseRootSeedDataSegments(payload, (segmentPath, seedData)=>{
        segments.set(segmentPath, createSegmentData(seedData));
    });
    const cache = createSegmentCache();
    const pendingTasks = [];
    /** Track when we advance stages so we can pass them as `endTime` later. */ const stageEndTimes = {
        [_stagedrendering.RenderStage.Static]: -1,
        [_stagedrendering.RenderStage.Runtime]: -1
    };
    const renderIntoCacheItem = async (data, cacheEntry)=>{
        const segmentDebugChannel = cacheEntry.debugChunks ? (0, _debugchannelserver.createDebugChannel)() : undefined;
        const itemStream = (0, _server.renderToReadableStream)(data, clientReferenceManifest.clientModules, {
            filterStackFrame,
            debugChannel: segmentDebugChannel == null ? void 0 : segmentDebugChannel.serverSide,
            environmentName,
            startTime,
            onError (error) {
                const digest = (0, _createerrorhandler.getDigestForWellKnownError)(error);
                if (digest) {
                    return digest;
                }
                // Forward existing digests
                if (error && typeof error === 'object' && 'digest' in error && typeof error.digest === 'string') {
                    return error.digest;
                }
                // We don't need to log the errors because we would have already done that
                // when generating the original Flight stream for the whole page.
                if (process.env.NEXT_DEBUG_BUILD || process.env.__NEXT_VERBOSE_LOGGING) {
                    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
                    (0, _prospectiverenderutils.printDebugThrownValueForProspectiveRender)(error, (workStore == null ? void 0 : workStore.route) ?? 'unknown route', _prospectiverenderutils.Phase.InstantValidation);
                }
            }
        });
        await Promise.all([
            // accumulate Flight chunks
            (async ()=>{
                for await (const chunk of itemStream.values()){
                    writeChunk(cacheEntry.chunks, controller.currentStage, chunk);
                }
            })(),
            // accumulate Debug chunks
            segmentDebugChannel && (async ()=>{
                for await (const chunk of segmentDebugChannel.clientSide.readable.values()){
                    cacheEntry.debugChunks.push(chunk);
                }
            })()
        ]);
    };
    await (0, _apprenderrenderutils.runInSequentialTasks)(()=>{
        {
            const headCacheItem = createSegmentCacheItem(!!fullPageDebugChunks);
            cache.head = headCacheItem;
            pendingTasks.push(renderIntoCacheItem(head, headCacheItem));
        }
        for (const [segmentPath, segmentData] of segments){
            const segmentCacheItem = createSegmentCacheItem(!!fullPageDebugChunks);
            cache.segments.set(segmentPath, segmentCacheItem);
            pendingTasks.push(renderIntoCacheItem(segmentData, segmentCacheItem));
        }
    }, ()=>{
        stageEndTimes[_stagedrendering.RenderStage.Static] = performance.now() + performance.timeOrigin;
        controller.advanceStage(_stagedrendering.RenderStage.Runtime);
    }, ()=>{
        stageEndTimes[_stagedrendering.RenderStage.Runtime] = performance.now() + performance.timeOrigin;
        controller.advanceStage(_stagedrendering.RenderStage.Dynamic);
    });
    await Promise.all(pendingTasks);
    return {
        cache,
        payload,
        stageEndTimes
    };
}
/**
 * Turns accumulated stage chunks into a stream.
 * The stream starts out in Static stage, and can be advanced further
 * using the returned controller object.
 * Conceptually, this is similar to how we unblock more content
 * by advancing stages in a regular staged render.
 * */ function createStagedStreamFromChunks(stageChunks) {
    // The successive stages are supersets of one another,
    // so we can index into the dynamic chunks everywhere
    // and just look at the lengths of the Static/Runtime arrays
    const allChunks = stageChunks[_stagedrendering.RenderStage.Dynamic];
    const numStaticChunks = stageChunks[_stagedrendering.RenderStage.Static].length;
    const numRuntimeChunks = stageChunks[_stagedrendering.RenderStage.Runtime].length;
    const numDynamicChunks = stageChunks[_stagedrendering.RenderStage.Dynamic].length;
    let chunkIx = 0;
    let currentStage = _stagedrendering.RenderStage.Static;
    let closed = false;
    function push(chunk) {
        stream.push(chunk);
    }
    function close() {
        closed = true;
        stream.push(null);
    }
    const stream = new _nodestream.Readable({
        read () {
            // Emit static chunks
            for(; chunkIx < numStaticChunks; chunkIx++){
                push(allChunks[chunkIx]);
            }
            // If there's no more chunks after this stage, finish the stream.
            if (chunkIx >= allChunks.length) {
                close();
                return;
            }
        }
    });
    function advanceStage(stage) {
        if (closed) return true;
        switch(stage){
            case _stagedrendering.RenderStage.Runtime:
                {
                    currentStage = _stagedrendering.RenderStage.Runtime;
                    for(; chunkIx < numRuntimeChunks; chunkIx++){
                        push(allChunks[chunkIx]);
                    }
                    break;
                }
            case _stagedrendering.RenderStage.Dynamic:
                {
                    currentStage = _stagedrendering.RenderStage.Dynamic;
                    for(; chunkIx < numDynamicChunks; chunkIx++){
                        push(allChunks[chunkIx]);
                    }
                    break;
                }
            default:
                {
                    stage;
                }
        }
        // If there's no more chunks after this stage, finish the stream.
        if (chunkIx >= allChunks.length) {
            close();
            return true;
        } else {
            return false;
        }
    }
    return {
        stream,
        controller: {
            get currentStage () {
                return currentStage;
            },
            advanceStage
        }
    };
}
function writeChunk(stageChunks, stage, chunk) {
    switch(stage){
        case _stagedrendering.RenderStage.Static:
            {
                stageChunks[_stagedrendering.RenderStage.Static].push(chunk);
            // fallthrough
            }
        case _stagedrendering.RenderStage.Runtime:
            {
                stageChunks[_stagedrendering.RenderStage.Runtime].push(chunk);
            // fallthrough
            }
        case _stagedrendering.RenderStage.Dynamic:
            {
                stageChunks[_stagedrendering.RenderStage.Dynamic].push(chunk);
                break;
            }
        default:
            {
                stage;
            }
    }
}
async function createCombinedPayloadStream(payload, extraChunksAbortController, renderSignal, clientReferenceManifest, startTime, isDebugChannelEnabled) {
    // Collect all the chunks so that we're not dependent on timing of the render.
    let isRenderable = true;
    const renderableChunks = [];
    const allChunks = [];
    const debugChunks = isDebugChannelEnabled ? [] : null;
    const debugChannel = isDebugChannelEnabled ? (0, _debugchannelserver.createDebugChannel)() : null;
    let streamFinished;
    await (0, _apprenderrenderutils.runInSequentialTasks)(()=>{
        const stream = (0, _server.renderToReadableStream)(payload, clientReferenceManifest.clientModules, {
            filterStackFrame,
            debugChannel: debugChannel == null ? void 0 : debugChannel.serverSide,
            startTime,
            onError (error) {
                const digest = (0, _createerrorhandler.getDigestForWellKnownError)(error);
                if (digest) {
                    return digest;
                }
                // Forward existing digests
                if (error && typeof error === 'object' && 'digest' in error && typeof error.digest === 'string') {
                    return error.digest;
                }
                // We don't need to log the errors because we would have already done that
                // when generating the original Flight stream for the whole page.
                if (process.env.NEXT_DEBUG_BUILD || process.env.__NEXT_VERBOSE_LOGGING) {
                    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
                    (0, _prospectiverenderutils.printDebugThrownValueForProspectiveRender)(error, (workStore == null ? void 0 : workStore.route) ?? 'unknown route', _prospectiverenderutils.Phase.InstantValidation);
                }
            }
        });
        streamFinished = Promise.all([
            // Accumulate Flight chunks
            (async ()=>{
                for await (const chunk of stream.values()){
                    allChunks.push(chunk);
                    if (isRenderable) {
                        renderableChunks.push(chunk);
                    }
                }
            })(),
            // Accumulate debug chunks
            debugChannel && (async ()=>{
                for await (const chunk of debugChannel.clientSide.readable.values()){
                    debugChunks.push(chunk);
                }
            })()
        ]);
    }, ()=>{
        isRenderable = false;
        extraChunksAbortController.abort();
    });
    await streamFinished;
    return {
        stream: (0, _streamutils.createNodeStreamWithLateRelease)(renderableChunks, allChunks, renderSignal),
        debugStream: debugChunks ? (0, _streamutils.createNodeStreamFromChunks)(debugChunks, renderSignal) : null
    };
}
function getRootDataFromPayload(initialRSCPayload) {
    // FlightDataPath is an unsound type, hence the additional checks.
    const flightDataPaths = initialRSCPayload.f;
    if (flightDataPaths.length !== 1 && flightDataPaths[0].length !== 3) {
        throw Object.defineProperty(new _invarianterror.InvariantError('InitialRSCPayload does not match the expected shape during instant validation.'), "__NEXT_ERROR_CODE", {
            value: "E994",
            enumerable: false,
            configurable: true
        });
    }
    const flightRouterState = flightDataPaths[0][0];
    const seedData = flightDataPaths[0][1];
    // TODO: handle head
    const head = flightDataPaths[0][2];
    return {
        flightRouterState,
        seedData,
        head
    };
}
async function createValidationHead(cache, releaseSignal, clientReferenceManifest, stageEndTimes, stage) {
    const segmentCacheItem = cache.head;
    if (!segmentCacheItem) {
        throw Object.defineProperty(new _invarianterror.InvariantError(`Missing segment data: <head>`), "__NEXT_ERROR_CODE", {
            value: "E1072",
            enumerable: false,
            configurable: true
        });
    }
    return await deserializeFromChunks(segmentCacheItem.chunks[stage], segmentCacheItem.chunks[_stagedrendering.RenderStage.Dynamic], segmentCacheItem.debugChunks, releaseSignal, clientReferenceManifest, {
        startTime: undefined,
        endTime: stageEndTimes[stage]
    });
}
/**
 * Deserializes a (partial possibly partial) RSC stream, given as a chunk-array.
 * If the stream is partial, we'll wait for `releaseSignal` to fire
 * and then complete the deserialization using `allChunks`.
 *
 * This is used to obtain a partially-complete model (that might contain unresolved holes)
 * and then release any late debug info from chunks that came later before we abort the render.
 * */ function deserializeFromChunks(partialChunks, allChunks, debugChunks, releaseSignal, clientReferenceManifest, timings) {
    const debugChannelAbortController = new AbortController();
    const debugStream = debugChunks ? (0, _streamutils.createNodeStreamFromChunks)(debugChunks, debugChannelAbortController.signal) : null;
    const serverConsumerManifest = {
        moduleLoading: null,
        moduleMap: clientReferenceManifest.rscModuleMapping,
        serverModuleMap: (0, _manifestssingleton.getServerModuleMap)()
    };
    const segmentStream = partialChunks.length < allChunks.length ? (0, _streamutils.createNodeStreamWithLateRelease)(partialChunks, allChunks, releaseSignal) : (0, _streamutils.createNodeStreamFromChunks)(partialChunks);
    segmentStream.on('end', ()=>{
        // When the stream finishes, we have to close the debug stream too,
        // but delay it to avoid "Connection closed." errors.
        setImmediate(()=>debugChannelAbortController.abort());
    });
    return (0, _client.createFromNodeStream)(segmentStream, serverConsumerManifest, {
        findSourceMapURL,
        debugChannel: debugStream ?? undefined,
        startTime: timings == null ? void 0 : timings.startTime,
        endTime: timings == null ? void 0 : timings.endTime
    });
}
function createSegmentData(seedData) {
    const [node, _parallelRoutesData, _unused, isPartial, varyParams] = seedData;
    return {
        node,
        isPartial,
        varyParams
    };
}
function getCacheNodeSeedDataFromSegment(data, slots) {
    return [
        data.node,
        slots,
        /* unused (previously `loading`) */ null,
        data.isPartial,
        data.varyParams
    ];
}
function createSegmentCache() {
    return {
        head: null,
        segments: new Map()
    };
}
function createSegmentCacheItem(withDebugChunks) {
    return {
        chunks: {
            [_stagedrendering.RenderStage.Static]: [],
            [_stagedrendering.RenderStage.Runtime]: [],
            [_stagedrendering.RenderStage.Dynamic]: []
        },
        debugChunks: withDebugChunks ? [] : null
    };
}
/**
 * Whether this segment consumes a URL depth level. Each URL depth
 * represents a potential navigation boundary.
 *
 * The root segment ('') consumes depth 0. Regular segments like
 * 'dashboard' consume the next depth — whether or not they have a
 * layout. Route groups, __PAGE__, __DEFAULT__, and /_not-found don't
 * consume a depth — they share the boundary of their parent.
 */ function segmentConsumesURLDepth(segment) {
    // Dynamic segments (tuples) always consume a URL depth.
    if (typeof segment !== 'string') return true;
    // Route groups, pages, defaults, and not-found don't consume a depth.
    if (segment.startsWith(_segment.PAGE_SEGMENT_KEY) || (0, _segment.isGroupSegment)(segment) || segment === _segment.DEFAULT_SEGMENT_KEY || segment === _segment.NOT_FOUND_SEGMENT_KEY) {
        return false;
    }
    // Everything else consumes a depth, including the root segment ''.
    return true;
}
function discoverValidationDepths(loaderTree) {
    const groupDepthsByUrlDepth = [];
    function recordGroupDepth(urlDepth, groupDepth) {
        while(groupDepthsByUrlDepth.length <= urlDepth){
            groupDepthsByUrlDepth.push(0);
        }
        if (groupDepth > groupDepthsByUrlDepth[urlDepth]) {
            groupDepthsByUrlDepth[urlDepth] = groupDepth;
        }
    }
    // urlDepth tracks the index of the current URL-consuming segment.
    // Groups accumulate at the same index. When the next URL segment
    // is reached, it increments the index and resets the group counter.
    // We start at -1 so the root segment '' increments to 0.
    function walk(tree, urlDepth, groupDepth) {
        const segment = tree[0];
        const { parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(tree);
        const consumesDepth = segmentConsumesURLDepth(segment);
        let nextUrlDepth = urlDepth;
        let nextGroupDepth = groupDepth;
        if (consumesDepth) {
            nextUrlDepth = urlDepth + 1;
            nextGroupDepth = 0;
            recordGroupDepth(nextUrlDepth, 0);
        } else if (typeof segment === 'string' && (0, _segment.isGroupSegment)(segment) && segment !== '(__SLOT__)') {
            // Count real route groups but not the synthetic '(__SLOT__)' segment
            // that Next.js inserts for parallel slots. The synthetic group
            // can't be a real navigation boundary.
            nextGroupDepth++;
            recordGroupDepth(urlDepth, nextGroupDepth);
        }
        for(const key in parallelRoutes){
            walk(parallelRoutes[key], nextUrlDepth, nextGroupDepth);
        }
    }
    walk(loaderTree, -1, 0);
    return groupDepthsByUrlDepth;
}
async function createCombinedPayloadAtDepth(initialRSCPayload, cache, initialLoaderTree, getDynamicParamFromSegment, query, depth, groupDepth, releaseSignal, boundaryState, clientReferenceManifest, stageEndTimes, useRuntimeStageForPartialSegments) {
    let hasStaticSegments = false;
    let hasRuntimeSegments = false;
    function getSegment(loaderTree) {
        const dynamicParam = getDynamicParamFromSegment(loaderTree);
        if (dynamicParam) {
            return dynamicParam.treeSegment;
        }
        const segment = loaderTree[0];
        return query ? (0, _segment.addSearchParamsIfPageSegment)(segment, query) : segment;
    }
    async function buildSharedTreeSeedData(loaderTree, parentPath, key, urlDepthConsumed, groupDepthConsumed) {
        const { parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(loaderTree);
        const segment = getSegment(loaderTree);
        const path = parentPath === null ? stringifySegment(segment) : createChildSegmentPath(parentPath, key, segment);
        debug == null ? void 0 : debug(`    ${path || '/'} - Dynamic`);
        const segmentCacheItem = cache.segments.get(path);
        if (!segmentCacheItem) {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Missing segment data: ${path}`), "__NEXT_ERROR_CODE", {
                value: "E995",
                enumerable: false,
                configurable: true
            });
        }
        const segmentData = await deserializeFromChunks(segmentCacheItem.chunks[_stagedrendering.RenderStage.Dynamic], segmentCacheItem.chunks[_stagedrendering.RenderStage.Dynamic], segmentCacheItem.debugChunks, releaseSignal, clientReferenceManifest, null);
        const consumesUrlDepth = segmentConsumesURLDepth(segment);
        const isGroup = typeof segment === 'string' && (0, _segment.isGroupSegment)(segment) && segment !== '(__SLOT__)';
        // Advance counters for this segment before the boundary check,
        // mirroring how discoverValidationDepths counts. URL segments
        // increment urlDepthConsumed, groups increment groupDepthConsumed.
        // The synthetic '(__SLOT__)' segment is excluded — it can't be a
        // real navigation boundary.
        let nextUrlDepth = urlDepthConsumed;
        let currentGroupDepth = groupDepthConsumed;
        if (consumesUrlDepth) {
            nextUrlDepth++;
            currentGroupDepth = 0;
        } else if (isGroup) {
            currentGroupDepth++;
        }
        const pastUrlBoundary = nextUrlDepth > depth;
        const isBoundary = pastUrlBoundary && currentGroupDepth >= groupDepth;
        if (isBoundary) {
            debug == null ? void 0 : debug(`    ['${path}' is the boundary (url=${nextUrlDepth}, group=${currentGroupDepth})]`);
            boundaryState.expectedIds.add(path);
            const finalSegmentData = {
                ...segmentData,
                node: // eslint-disable-next-line @next/internal/no-ambiguous-jsx -- bundled in the server layer
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_boundary.PlaceValidationBoundaryBelowThisLevel, {
                    id: path,
                    children: segmentData.node
                }, "c")
            };
            const slots = {};
            let requiresInstantUI = false;
            let createInstantStack = null;
            for(const parallelRouteKey in parallelRoutes){
                const result = await buildNewTreeSeedData(parallelRoutes[parallelRouteKey], path, parallelRouteKey, false);
                slots[parallelRouteKey] = result.seedData;
                if (result.requiresInstantUI) {
                    requiresInstantUI = true;
                    if (createInstantStack === null) {
                        createInstantStack = result.createInstantStack;
                    }
                }
            }
            return {
                seedData: getCacheNodeSeedDataFromSegment(finalSegmentData, slots),
                requiresInstantUI,
                createInstantStack
            };
        }
        // Not at the boundary yet — keep walking as shared.
        const slots = {};
        let requiresInstantUI = false;
        let createInstantStack = null;
        for(const parallelRouteKey in parallelRoutes){
            const result = await buildSharedTreeSeedData(parallelRoutes[parallelRouteKey], path, parallelRouteKey, nextUrlDepth, currentGroupDepth);
            slots[parallelRouteKey] = result.seedData;
            if (result.requiresInstantUI) {
                requiresInstantUI = true;
                if (createInstantStack === null) {
                    createInstantStack = result.createInstantStack;
                }
            }
        }
        return {
            seedData: getCacheNodeSeedDataFromSegment(segmentData, slots),
            requiresInstantUI,
            createInstantStack
        };
    }
    async function buildNewTreeSeedData(lt, parentPath, key, isInsideRuntimePrefetch) {
        const { parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(lt);
        const { mod: layoutOrPageMod } = await (0, _appdirmodule.getLayoutOrPageModule)(lt);
        const segment = getSegment(lt);
        const path = parentPath === null ? stringifySegment(segment) : createChildSegmentPath(parentPath, key, segment);
        let instantConfig = null;
        let localCreateInstantStack = null;
        if (layoutOrPageMod !== undefined) {
            instantConfig = layoutOrPageMod.unstable_instant ?? null;
            if (instantConfig && typeof instantConfig === 'object') {
                const rawFactory = layoutOrPageMod.__debugCreateInstantConfigStack;
                localCreateInstantStack = typeof rawFactory === 'function' ? rawFactory : null;
            }
        }
        let childIsInsideRuntimePrefetch = isInsideRuntimePrefetch;
        let stage;
        if (!isInsideRuntimePrefetch) {
            if (instantConfig && typeof instantConfig === 'object' && instantConfig.prefetch === 'runtime') {
                stage = _stagedrendering.RenderStage.Runtime;
                childIsInsideRuntimePrefetch = true;
                hasRuntimeSegments = true;
            } else {
                if (useRuntimeStageForPartialSegments) {
                    stage = _stagedrendering.RenderStage.Runtime;
                    hasRuntimeSegments = true;
                } else {
                    stage = _stagedrendering.RenderStage.Static;
                    hasStaticSegments = true;
                }
            }
        } else {
            stage = _stagedrendering.RenderStage.Runtime;
            hasRuntimeSegments = true;
        }
        debug == null ? void 0 : debug(`    ${path || '/'} - ${_stagedrendering.RenderStage[stage]}`);
        const segmentCacheItem = cache.segments.get(path);
        if (!segmentCacheItem) {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Missing segment data: ${path}`), "__NEXT_ERROR_CODE", {
                value: "E995",
                enumerable: false,
                configurable: true
            });
        }
        const segmentData = await deserializeFromChunks(segmentCacheItem.chunks[stage], segmentCacheItem.chunks[_stagedrendering.RenderStage.Dynamic], segmentCacheItem.debugChunks, releaseSignal, clientReferenceManifest, {
            startTime: undefined,
            endTime: stageEndTimes[stage]
        });
        // Build children first, then determine requiresInstantUI.
        const slots = {};
        let childrenRequireInstantUI = false;
        let childCreateInstantStack = null;
        for(const parallelRouteKey in parallelRoutes){
            const result = await buildNewTreeSeedData(parallelRoutes[parallelRouteKey], path, parallelRouteKey, childIsInsideRuntimePrefetch);
            slots[parallelRouteKey] = result.seedData;
            if (result.requiresInstantUI) {
                childrenRequireInstantUI = true;
                if (childCreateInstantStack === null) {
                    childCreateInstantStack = result.createInstantStack;
                }
            }
        }
        // Local config takes precedence over children.
        let requiresInstantUI;
        let createInstantStack;
        if (instantConfig === false) {
            requiresInstantUI = false;
            createInstantStack = null;
        } else if (instantConfig && typeof instantConfig === 'object') {
            requiresInstantUI = true;
            createInstantStack = localCreateInstantStack;
        } else {
            requiresInstantUI = childrenRequireInstantUI;
            createInstantStack = childCreateInstantStack;
        }
        return {
            seedData: getCacheNodeSeedDataFromSegment(segmentData, slots),
            requiresInstantUI,
            createInstantStack
        };
    }
    const { seedData, requiresInstantUI, createInstantStack } = await buildSharedTreeSeedData(initialLoaderTree, null, null, 0 /* urlDepthConsumed */ , 0 /* groupDepthConsumed */ );
    if (!requiresInstantUI) {
        return null;
    }
    const { flightRouterState } = getRootDataFromPayload(initialRSCPayload);
    const headStage = hasRuntimeSegments ? _stagedrendering.RenderStage.Runtime : _stagedrendering.RenderStage.Static;
    const head = await createValidationHead(cache, releaseSignal, clientReferenceManifest, stageEndTimes, headStage);
    const payload = {
        ...initialRSCPayload,
        f: [
            [
                flightRouterState,
                seedData,
                head
            ]
        ]
    };
    return {
        payload,
        hasAmbiguousErrors: hasStaticSegments,
        createInstantStack
    };
}

//# sourceMappingURL=instant-validation.js.map