/* eslint-disable @next/internal/no-ambiguous-jsx -- Bundled in entry-base so it gets the right JSX runtime. */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    collectPrefetchHints: null,
    collectSegmentData: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    collectPrefetchHints: function() {
        return collectPrefetchHints;
    },
    collectSegmentData: function() {
        return collectSegmentData;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _approutertypes = require("../../shared/lib/app-router-types");
const _varyparamsdecoding = require("../../shared/lib/segment-cache/vary-params-decoding");
const _segment = require("../../shared/lib/segment");
const _client = require("react-server-dom-webpack/client");
const _static = require("react-server-dom-webpack/static");
const _nodewebstreamshelper = require("../stream-utils/node-web-streams-helper");
const _scheduler = require("../../lib/scheduler");
const _segmentvalueencoding = require("../../shared/lib/segment-cache/segment-value-encoding");
const _createerrorhandler = require("./create-error-handler");
const _prospectiverenderutils = require("./prospective-render-utils");
const _workasyncstorageexternal = require("./work-async-storage.external");
const filterStackFrame = process.env.NODE_ENV !== 'production' ? require('../lib/source-maps').filterStackFrameDEV : undefined;
const findSourceMapURL = process.env.NODE_ENV !== 'production' ? require('../lib/source-maps').findSourceMapURLDEV : undefined;
function onSegmentPrerenderError(error) {
    const digest = (0, _createerrorhandler.getDigestForWellKnownError)(error);
    if (digest) {
        return digest;
    }
    // We don't need to log the errors because we would have already done that
    // when generating the original Flight stream for the whole page.
    if (process.env.NEXT_DEBUG_BUILD || process.env.__NEXT_VERBOSE_LOGGING) {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        (0, _prospectiverenderutils.printDebugThrownValueForProspectiveRender)(error, (workStore == null ? void 0 : workStore.route) ?? 'unknown route', _prospectiverenderutils.Phase.SegmentCollection);
    }
}
/**
 * Extract the FlightRouterState, seed data, and head from a prerendered
 * InitialRSCPayload. Returns null if the payload doesn't match the expected
 * shape (single path with 3 elements).
 */ function extractFlightData(initialRSCPayload) {
    const flightDataPaths = initialRSCPayload.f;
    // FlightDataPath is an unsound type, hence the additional checks.
    if (flightDataPaths.length !== 1 && flightDataPaths[0].length !== 3) {
        console.error('Internal Next.js error: InitialRSCPayload does not match the expected ' + 'shape for a prerendered page during segment prefetch generation.');
        return null;
    }
    return {
        buildId: initialRSCPayload.b,
        flightRouterState: flightDataPaths[0][0],
        seedData: flightDataPaths[0][1],
        head: flightDataPaths[0][2]
    };
}
async function collectSegmentData(isCacheComponentsEnabled, fullPageDataBuffer, staleTime, clientModules, serverConsumerManifest, prefetchInlining, hints) {
    // Traverse the router tree and generate a prefetch response for each segment.
    // A mutable map to collect the results as we traverse the route tree.
    const resultMap = new Map();
    // Before we start, warm up the module cache by decoding the page data once.
    // Then we can assume that any remaining async tasks that occur the next time
    // are due to hanging promises caused by dynamic data access. Note we only
    // have to do this once per page, not per individual segment.
    //
    try {
        await (0, _client.createFromReadableStream)((0, _nodewebstreamshelper.streamFromBuffer)(fullPageDataBuffer), {
            findSourceMapURL,
            serverConsumerManifest
        });
        await (0, _scheduler.waitAtLeastOneReactRenderTask)();
    } catch  {}
    // Create an abort controller that we'll use to stop the stream.
    const abortController = new AbortController();
    const onCompletedProcessingRouteTree = async ()=>{
        // Since all we're doing is decoding and re-encoding a cached prerender, if
        // serializing the stream takes longer than a microtask, it must because of
        // hanging promises caused by dynamic data.
        await (0, _scheduler.waitAtLeastOneReactRenderTask)();
        abortController.abort();
    };
    // Generate a stream for the route tree prefetch. While we're walking the
    // tree, we'll also spawn additional tasks to generate the segment prefetches.
    // The promises for these tasks are pushed to a mutable array that we will
    // await once the route tree is fully rendered.
    const segmentTasks = [];
    const { prelude: treeStream } = await (0, _static.prerender)(// RootTreePrefetch is not a valid return type for a React component, but
    // we need to use a component so that when we decode the original stream
    // inside of it, the side effects are transferred to the new stream.
    // @ts-expect-error
    /*#__PURE__*/ (0, _jsxruntime.jsx)(PrefetchTreeData, {
        isClientParamParsingEnabled: isCacheComponentsEnabled,
        fullPageDataBuffer: fullPageDataBuffer,
        serverConsumerManifest: serverConsumerManifest,
        clientModules: clientModules,
        staleTime: staleTime,
        segmentTasks: segmentTasks,
        onCompletedProcessingRouteTree: onCompletedProcessingRouteTree,
        prefetchInlining: prefetchInlining,
        hints: hints
    }), clientModules, {
        filterStackFrame,
        signal: abortController.signal,
        onError: onSegmentPrerenderError
    });
    // Write the route tree to a special `/_tree` segment.
    const treeBuffer = await (0, _nodewebstreamshelper.streamToBuffer)(treeStream);
    resultMap.set('/_tree', treeBuffer);
    // Also output the entire full page data response
    resultMap.set('/_full', fullPageDataBuffer);
    // Now that we've finished rendering the route tree, all the segment tasks
    // should have been spawned. Await them in parallel and write the segment
    // prefetches to the result map.
    for (const [segmentPath, buffer] of (await Promise.all(segmentTasks))){
        resultMap.set(segmentPath, buffer);
    }
    return resultMap;
}
async function collectPrefetchHints(fullPageDataBuffer, staleTime, clientModules, serverConsumerManifest, maxSize, maxBundleSize) {
    // Warm up the module cache, same as collectSegmentData.
    try {
        await (0, _client.createFromReadableStream)((0, _nodewebstreamshelper.streamFromBuffer)(fullPageDataBuffer), {
            findSourceMapURL,
            serverConsumerManifest
        });
        await (0, _scheduler.waitAtLeastOneReactRenderTask)();
    } catch  {}
    // Decode the Flight data to walk the route tree.
    const initialRSCPayload = await (0, _client.createFromReadableStream)(createUnclosingPrefetchStream((0, _nodewebstreamshelper.streamFromBuffer)(fullPageDataBuffer)), {
        findSourceMapURL,
        serverConsumerManifest
    });
    const flightData = extractFlightData(initialRSCPayload);
    if (flightData === null) {
        return {
            hints: 0,
            slots: null
        };
    }
    const { buildId, flightRouterState, seedData, head } = flightData;
    // Measure the head (metadata/viewport) gzip size so the main traversal
    // can decide whether to inline it into a page's bundle.
    const headVaryParamsThenable = initialRSCPayload.h;
    const headVaryParams = headVaryParamsThenable !== null ? (0, _varyparamsdecoding.readVaryParams)(headVaryParamsThenable) : null;
    const [, headBuffer] = await renderSegmentPrefetch(buildId, staleTime, head, _segmentvalueencoding.HEAD_REQUEST_KEY, headVaryParams, clientModules);
    const headGzipSize = await getGzipSize(headBuffer);
    // Mutable accumulator: the first page leaf that can fit the head sets
    // this to true. Once set, subsequent leaves skip the check.
    const headInlineState = {
        inlined: false
    };
    // Walk the tree with the parent-first, child-decides algorithm.
    const { node } = await collectPrefetchHintsImpl(flightRouterState, buildId, staleTime, seedData, clientModules, _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY, null, maxSize, maxBundleSize, headGzipSize, headInlineState);
    if (!headInlineState.inlined) {
        // No page could accept the head. Set HeadOutlined on the root so the
        // client knows to fetch the head separately.
        node.hints |= _approutertypes.PrefetchHint.HeadOutlined;
    }
    return node;
}
// Measure a segment's gzip size and decide whether it should be inlined.
//
// These hints are computed once during build and never change for the
// lifetime of that deployment. The client can assume that hints delivered as
// part of one request will be the same during a subsequent request, given
// the same build ID. There's no skew to worry about as long as the build
// itself is consistent.
//
// In the Segment Cache, we split page prefetches into multiple requests so
// that each one can be cached and deduped independently. However, some
// segments are small enough that the potential caching benefits are not worth
// the additional network overhead. For these, we inline a parent's data into
// one of its children's responses, avoiding a separate request. The parent
// is inlined into the child (not the other way around) because the parent's
// response is more likely to be shared across multiple pages. The child's
// response is already page-specific, so adding the parent's data there
// doesn't meaningfully reduce deduplication. It's similar to how JS bundlers
// decide whether to inline a module into a chunk.
//
// The algorithm is parent-first, child-decides: the parent measures itself
// and passes its gzip size down. Each child decides whether to accept. A
// child rejects if the parent exceeds maxSize or if accepting would push
// the cumulative inlined bytes past maxBundleSize. This produces
// both ParentInlinedIntoSelf (on the child) and InlinedIntoChild (on the
// parent) in a single pass.
async function collectPrefetchHintsImpl(route, buildId, staleTime, seedData, clientModules, // TODO: Consider persisting the computed requestKey into the hints output
// so it doesn't need to be recomputed during the build. This might also
// suggest renaming prefetch-hints.json to something like
// segment-manifest.json, since it would contain more than just hints.
requestKey, parentGzipSize, maxSize, maxBundleSize, headGzipSize, headInlineState) {
    // Render current segment and measure its gzip size.
    let currentGzipSize = null;
    if (seedData !== null) {
        const varyParamsThenable = seedData[4];
        const varyParams = varyParamsThenable !== null ? (0, _varyparamsdecoding.readVaryParams)(varyParamsThenable) : null;
        const [, buffer] = await renderSegmentPrefetch(buildId, staleTime, seedData[0], requestKey, varyParams, clientModules);
        currentGzipSize = await getGzipSize(buffer);
    }
    // Only offer this segment to its children for inlining if its gzip size
    // is below maxSize. Segments above this get their own response.
    const sizeToInline = currentGzipSize !== null && currentGzipSize < maxSize ? currentGzipSize : null;
    // Process children serially (not in parallel) to ensure deterministic
    // results. Since this only runs at build time and the rendering is just
    // re-encoding cached prerenders, this won't impact build times. Each child
    // receives our gzip size and decides whether to inline us. Once a child
    // accepts, we stop offering to remaining siblings — the parent is only
    // inlined into one child. In parallel routes, this avoids duplicating the
    // parent's data across multiple sibling responses.
    const children = route[1];
    const seedDataChildren = seedData !== null ? seedData[1] : null;
    let slots = null;
    let didInlineIntoChild = false;
    let acceptingChildInlinedBytes = 0;
    // Track the smallest inlinedBytes across all children so we know how much
    // budget remains along the best path. When our own parent asks whether we
    // can accept its data, the parent's bytes would flow through to the child
    // with the most remaining headroom.
    let smallestChildInlinedBytes = Infinity;
    let hasChildren = false;
    for(const parallelRouteKey in children){
        hasChildren = true;
        const childRoute = children[parallelRouteKey];
        const childSegment = childRoute[0];
        const childSeedData = seedDataChildren !== null ? seedDataChildren[parallelRouteKey] : null;
        const childRequestKey = (0, _segmentvalueencoding.appendSegmentRequestKeyPart)(requestKey, parallelRouteKey, (0, _segmentvalueencoding.createSegmentRequestKeyPart)(childSegment));
        const childResult = await collectPrefetchHintsImpl(childRoute, buildId, staleTime, childSeedData, clientModules, childRequestKey, // Once a child has accepted us, stop offering to remaining siblings.
        didInlineIntoChild ? null : sizeToInline, maxSize, maxBundleSize, headGzipSize, headInlineState);
        if (slots === null) {
            slots = {};
        }
        slots[parallelRouteKey] = childResult.node;
        if (childResult.node.hints & _approutertypes.PrefetchHint.ParentInlinedIntoSelf) {
            // This child accepted our data — it will include our segment's
            // response in its own. No need to track headroom anymore since
            // we already know which child we're inlined into.
            didInlineIntoChild = true;
            acceptingChildInlinedBytes = childResult.inlinedBytes;
        } else if (!didInlineIntoChild) {
            // Track the child with the most remaining headroom. Used below
            // when deciding whether to accept our own parent's data.
            if (childResult.inlinedBytes < smallestChildInlinedBytes) {
                smallestChildInlinedBytes = childResult.inlinedBytes;
            }
        }
    }
    // Leaf segment: no children have consumed any budget yet.
    if (!hasChildren) {
        smallestChildInlinedBytes = 0;
    }
    // Mark this segment as InlinedIntoChild if one of its children accepted.
    // This means this segment doesn't need its own prefetch response — its
    // data is included in the accepting child's response instead.
    let hints = 0;
    if (didInlineIntoChild) {
        hints |= _approutertypes.PrefetchHint.InlinedIntoChild;
    }
    // inlinedBytes represents the total gzipped bytes of parent data inlined
    // into the deepest "inlining target" along this branch. It starts at 0 at
    // the leaves and grows as parents are inlined going back up the tree. If a
    // child accepted us, our size is already counted in that child's value.
    let inlinedBytes = didInlineIntoChild ? acceptingChildInlinedBytes : smallestChildInlinedBytes;
    // At leaf nodes (pages), try to inline the head (metadata/viewport) into
    // this page's response. The head is treated like an additional inlined
    // entry — it counts against the same total budget. Only the first page
    // that has room gets the head; subsequent pages skip via the shared
    // headInlineState accumulator.
    if (!hasChildren && !headInlineState.inlined) {
        if (inlinedBytes + headGzipSize < maxBundleSize) {
            hints |= _approutertypes.PrefetchHint.HeadInlinedIntoSelf;
            inlinedBytes += headGzipSize;
            headInlineState.inlined = true;
        }
    }
    // Decide whether to accept our own parent's data. Two conditions:
    //
    // 1. The parent offered us a size (parentGzipSize is not null). It's null
    //    when the parent is too large to inline or when this is the root.
    //
    // 2. The total inlined bytes along this branch wouldn't exceed the budget.
    //    Even if each segment is individually small, at some point it no
    //    longer makes sense to keep adding bytes because the combined response
    //    is unique per URL and can't be deduped.
    //
    // A node can be both InlinedIntoChild and ParentInlinedIntoSelf. This
    // happens in multi-level chains: GP → P → C where all are small. C
    // accepts P (P is InlinedIntoChild), then P also accepts GP (P is
    // ParentInlinedIntoSelf). The result: C's response includes both P's
    // and GP's data. The parent's data flows through to the deepest
    // accepting descendant.
    if (parentGzipSize !== null) {
        if (inlinedBytes + parentGzipSize < maxBundleSize) {
            hints |= _approutertypes.PrefetchHint.ParentInlinedIntoSelf;
            inlinedBytes += parentGzipSize;
        }
    }
    return {
        node: {
            hints,
            slots
        },
        inlinedBytes
    };
}
// We use gzip size rather than raw size because it better reflects the actual
// transfer cost. The inlining trade-off is about whether the overhead of an
// additional HTTP request (connection setup, headers, round trip) is worth
// the deduplication benefit of keeping a segment separate. Below some
// compressed size, the request overhead dominates and inlining is better.
// Above it, the deduplication benefit of a cacheable standalone response
// wins out.
async function getGzipSize(buffer) {
    const stream = new Blob([
        new Uint8Array(buffer)
    ]).stream().pipeThrough(new CompressionStream('gzip'));
    const compressedBlob = await new Response(stream).blob();
    return compressedBlob.size;
}
async function PrefetchTreeData({ isClientParamParsingEnabled, fullPageDataBuffer, serverConsumerManifest, clientModules, staleTime, segmentTasks, onCompletedProcessingRouteTree, prefetchInlining, hints }) {
    // We're currently rendering a Flight response for the route tree prefetch.
    // Inside this component, decode the Flight stream for the whole page. This is
    // a hack to transfer the side effects from the original Flight stream (e.g.
    // Float preloads) onto the Flight stream for the tree prefetch.
    // TODO: React needs a better way to do this. Needed for Server Actions, too.
    const initialRSCPayload = await (0, _client.createFromReadableStream)(createUnclosingPrefetchStream((0, _nodewebstreamshelper.streamFromBuffer)(fullPageDataBuffer)), {
        findSourceMapURL,
        serverConsumerManifest
    });
    const flightData = extractFlightData(initialRSCPayload);
    if (flightData === null) {
        return null;
    }
    const { buildId, flightRouterState, seedData, head } = flightData;
    // Extract the head vary params from the decoded response.
    // The head vary params thenable should be fulfilled by now; if not, treat
    // as unknown (null).
    const headVaryParamsThenable = initialRSCPayload.h;
    const headVaryParams = headVaryParamsThenable !== null ? (0, _varyparamsdecoding.readVaryParams)(headVaryParamsThenable) : null;
    // Compute the route metadata tree by traversing the FlightRouterState. As we
    // walk the tree, we will also spawn a task to produce a prefetch response for
    // each segment (unless prefetch inlining is enabled, in which case all
    // segments are bundled into a single /_inlined response).
    const tree = collectSegmentDataImpl(isClientParamParsingEnabled, flightRouterState, buildId, staleTime, seedData, clientModules, _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY, segmentTasks, prefetchInlining, hints);
    if (prefetchInlining) {
        // When prefetch inlining is enabled, bundle all segment data into a single
        // /_inlined response instead of individual per-segment responses. The head
        // is also included in the inlined response.
        segmentTasks.push((0, _scheduler.waitAtLeastOneReactRenderTask)().then(()=>renderInlinedPrefetchResponse(flightRouterState, buildId, staleTime, seedData, head, headVaryParams, clientModules)));
    } else {
        // Also spawn a task to produce a prefetch response for the "head" segment.
        // The head contains metadata, like the title; it's not really a route
        // segment, but it contains RSC data, so it's treated like a segment by
        // the client cache.
        segmentTasks.push((0, _scheduler.waitAtLeastOneReactRenderTask)().then(()=>renderSegmentPrefetch(buildId, staleTime, head, _segmentvalueencoding.HEAD_REQUEST_KEY, headVaryParams, clientModules)));
    }
    // Notify the abort controller that we're done processing the route tree.
    // Anything async that happens after this point must be due to hanging
    // promises in the original stream.
    onCompletedProcessingRouteTree();
    // Render the route tree to a special `/_tree` segment.
    const treePrefetch = {
        tree,
        staleTime
    };
    if (buildId) {
        treePrefetch.buildId = buildId;
    }
    return treePrefetch;
}
function collectSegmentDataImpl(isClientParamParsingEnabled, route, buildId, staleTime, seedData, clientModules, requestKey, segmentTasks, prefetchInlining, hintTree) {
    // Metadata about the segment. Sent as part of the tree prefetch. Null if
    // there are no children.
    let slotMetadata = null;
    const children = route[1];
    const seedDataChildren = seedData !== null ? seedData[1] : null;
    for(const parallelRouteKey in children){
        const childRoute = children[parallelRouteKey];
        const childSegment = childRoute[0];
        const childSeedData = seedDataChildren !== null ? seedDataChildren[parallelRouteKey] : null;
        const childRequestKey = (0, _segmentvalueencoding.appendSegmentRequestKeyPart)(requestKey, parallelRouteKey, (0, _segmentvalueencoding.createSegmentRequestKeyPart)(childSegment));
        const childHintTree = hintTree !== null && hintTree.slots !== null ? hintTree.slots[parallelRouteKey] ?? null : null;
        const childTree = collectSegmentDataImpl(isClientParamParsingEnabled, childRoute, buildId, staleTime, childSeedData, clientModules, childRequestKey, segmentTasks, prefetchInlining, childHintTree);
        if (slotMetadata === null) {
            slotMetadata = {};
        }
        slotMetadata[parallelRouteKey] = childTree;
    }
    // Union the hints already embedded in the FlightRouterState with the
    // separately-computed build-time hints. During the initial build, the
    // FlightRouterState was produced before collectPrefetchHints ran, so
    // inlining hints (ParentInlinedIntoSelf, InlinedIntoChild) won't be in
    // route[4] yet. On subsequent renders the hints are already in the
    // FlightRouterState, so the union is idempotent.
    const prefetchHints = (route[4] ?? 0) | (hintTree !== null ? hintTree.hints : 0);
    // Determine which params this segment varies on.
    // Read the vary params thenable directly from the seed data. By the time
    // collectSegmentData runs, the thenable should be fulfilled. If it's not
    // fulfilled or null, treat as unknown (null means we can't share cache
    // entries across param values).
    const varyParamsThenable = seedData !== null ? seedData[4] : null;
    const varyParams = varyParamsThenable !== null ? (0, _varyparamsdecoding.readVaryParams)(varyParamsThenable) : null;
    if (!prefetchInlining) {
        // When prefetch inlining is disabled, spawn individual segment tasks.
        // When enabled, segment data is bundled into the /_inlined response
        // instead, so we skip per-segment tasks here.
        if (seedData !== null) {
            // Spawn a task to write the segment data to a new Flight stream.
            segmentTasks.push(// Since we're already in the middle of a render, wait until after the
            // current task to escape the current rendering context.
            (0, _scheduler.waitAtLeastOneReactRenderTask)().then(()=>renderSegmentPrefetch(buildId, staleTime, seedData[0], requestKey, varyParams, clientModules)));
        } else {
        // This segment does not have any seed data. Skip generating a prefetch
        // response for it. We'll still include it in the route tree, though.
        // TODO: We should encode in the route tree whether a segment is missing
        // so we don't attempt to fetch it for no reason. As of now this shouldn't
        // ever happen in practice, though.
        }
    }
    const segment = route[0];
    let name;
    let param;
    if (typeof segment === 'string') {
        name = segment;
        param = null;
    } else {
        name = segment[0];
        param = {
            type: segment[2],
            // This value is omitted from the prefetch response when cacheComponents
            // is enabled.
            key: isClientParamParsingEnabled ? null : segment[1],
            siblings: segment[3]
        };
    }
    // Metadata about the segment. Sent to the client as part of the
    // tree prefetch.
    return {
        name,
        param,
        prefetchHints,
        slots: slotMetadata
    };
}
async function renderSegmentPrefetch(buildId, staleTime, rsc, requestKey, varyParams, clientModules) {
    // Render the segment data to a stream.
    const segmentPrefetch = {
        rsc,
        isPartial: await isPartialRSCData(rsc, clientModules),
        staleTime,
        varyParams
    };
    if (buildId) {
        segmentPrefetch.buildId = buildId;
    }
    // Since all we're doing is decoding and re-encoding a cached prerender, if
    // it takes longer than a microtask, it must because of hanging promises
    // caused by dynamic data. Abort the stream at the end of the current task.
    const abortController = new AbortController();
    (0, _scheduler.waitAtLeastOneReactRenderTask)().then(()=>abortController.abort());
    const { prelude: segmentStream } = await (0, _static.prerender)(segmentPrefetch, clientModules, {
        filterStackFrame,
        signal: abortController.signal,
        onError: onSegmentPrerenderError
    });
    const segmentBuffer = await (0, _nodewebstreamshelper.streamToBuffer)(segmentStream);
    if (requestKey === _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY) {
        return [
            '/_index',
            segmentBuffer
        ];
    } else {
        return [
            requestKey,
            segmentBuffer
        ];
    }
}
async function renderInlinedPrefetchResponse(route, buildId, staleTime, seedData, head, headVaryParams, clientModules) {
    // Build the inlined tree by walking the route and collecting all segments.
    const inlinedTree = await buildInlinedSegmentPrefetch(route, buildId, staleTime, seedData, clientModules);
    // Build the head segment.
    const headPrefetch = {
        rsc: head,
        isPartial: await isPartialRSCData(head, clientModules),
        staleTime,
        varyParams: headVaryParams
    };
    if (buildId) {
        headPrefetch.buildId = buildId;
    }
    const response = {
        tree: inlinedTree,
        head: headPrefetch
    };
    // Render as a single Flight response.
    const abortController = new AbortController();
    (0, _scheduler.waitAtLeastOneReactRenderTask)().then(()=>abortController.abort());
    const { prelude } = await (0, _static.prerender)(response, clientModules, {
        filterStackFrame,
        signal: abortController.signal,
        onError: onSegmentPrerenderError
    });
    const buffer = await (0, _nodewebstreamshelper.streamToBuffer)(prelude);
    return [
        '/' + _segment.PAGE_SEGMENT_KEY,
        buffer
    ];
}
async function buildInlinedSegmentPrefetch(route, buildId, staleTime, seedData, clientModules) {
    let slots = null;
    const children = route[1];
    const seedDataChildren = seedData !== null ? seedData[1] : null;
    for(const parallelRouteKey in children){
        const childRoute = children[parallelRouteKey];
        const childSeedData = seedDataChildren !== null ? seedDataChildren[parallelRouteKey] : null;
        const childPrefetch = await buildInlinedSegmentPrefetch(childRoute, buildId, staleTime, childSeedData, clientModules);
        if (slots === null) {
            slots = {};
        }
        slots[parallelRouteKey] = childPrefetch;
    }
    const rsc = seedData !== null ? seedData[0] : null;
    const varyParamsThenable = seedData !== null ? seedData[4] : null;
    const varyParams = varyParamsThenable !== null ? (0, _varyparamsdecoding.readVaryParams)(varyParamsThenable) : null;
    const segment = {
        rsc,
        isPartial: rsc !== null ? await isPartialRSCData(rsc, clientModules) : true,
        staleTime,
        varyParams
    };
    if (buildId) {
        segment.buildId = buildId;
    }
    return {
        segment,
        slots
    };
}
async function isPartialRSCData(rsc, clientModules) {
    // We can determine if a segment contains only partial data if it takes longer
    // than a task to encode, because dynamic data is encoded as an infinite
    // promise. We must do this in a separate Flight prerender from the one that
    // actually generates the prefetch stream because we need to include
    // `isPartial` in the stream itself.
    let isPartial = false;
    const abortController = new AbortController();
    (0, _scheduler.waitAtLeastOneReactRenderTask)().then(()=>{
        // If we haven't yet finished the outer task, then it must be because we
        // accessed dynamic data.
        isPartial = true;
        abortController.abort();
    });
    await (0, _static.prerender)(rsc, clientModules, {
        filterStackFrame,
        signal: abortController.signal,
        onError () {}
    });
    return isPartial;
}
function createUnclosingPrefetchStream(originalFlightStream) {
    // When PPR is enabled, prefetch streams may contain references that never
    // resolve, because that's how we encode dynamic data access. In the decoded
    // object returned by the Flight client, these are reified into hanging
    // promises that suspend during render, which is effectively what we want.
    // The UI resolves when it switches to the dynamic data stream
    // (via useDeferredValue(dynamic, static)).
    //
    // However, the Flight implementation currently errors if the server closes
    // the response before all the references are resolved. As a cheat to work
    // around this, we wrap the original stream in a new stream that never closes,
    // and therefore doesn't error.
    const reader = originalFlightStream.getReader();
    return new ReadableStream({
        async pull (controller) {
            while(true){
                const { done, value } = await reader.read();
                if (!done) {
                    // Pass to the target stream and keep consuming the Flight response
                    // from the server.
                    controller.enqueue(value);
                    continue;
                }
                // The server stream has closed. Exit, but intentionally do not close
                // the target stream.
                return;
            }
        }
    });
}

//# sourceMappingURL=collect-segment-data.js.map