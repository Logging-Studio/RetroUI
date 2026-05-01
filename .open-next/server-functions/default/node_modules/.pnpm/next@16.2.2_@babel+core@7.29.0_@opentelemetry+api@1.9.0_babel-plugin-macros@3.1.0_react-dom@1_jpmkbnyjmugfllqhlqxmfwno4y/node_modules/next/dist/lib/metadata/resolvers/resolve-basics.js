"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    resolveAlternates: null,
    resolveAppLinks: null,
    resolveAppleWebApp: null,
    resolveFacebook: null,
    resolveItunes: null,
    resolvePagination: null,
    resolveRobots: null,
    resolveThemeColor: null,
    resolveVerification: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    resolveAlternates: function() {
        return resolveAlternates;
    },
    resolveAppLinks: function() {
        return resolveAppLinks;
    },
    resolveAppleWebApp: function() {
        return resolveAppleWebApp;
    },
    resolveFacebook: function() {
        return resolveFacebook;
    },
    resolveItunes: function() {
        return resolveItunes;
    },
    resolvePagination: function() {
        return resolvePagination;
    },
    resolveRobots: function() {
        return resolveRobots;
    },
    resolveThemeColor: function() {
        return resolveThemeColor;
    },
    resolveVerification: function() {
        return resolveVerification;
    }
});
const _utils = require("../generate/utils");
const _resolveurl = require("./resolve-url");
function resolveAlternateUrl(url, metadataBase, pathname, metadataContext) {
    // If alter native url is an URL instance,
    // we treat it as a URL base and resolve with current pathname
    if (url instanceof URL) {
        const newUrl = new URL(pathname, url);
        url.searchParams.forEach((value, key)=>newUrl.searchParams.set(key, value));
        url = newUrl;
    }
    return (0, _resolveurl.resolveAbsoluteUrlWithPathname)(url, metadataBase, pathname, metadataContext);
}
const resolveThemeColor = (themeColor)=>{
    var _resolveAsArrayOrUndefined;
    if (!themeColor) return null;
    const themeColorDescriptors = [];
    (_resolveAsArrayOrUndefined = (0, _utils.resolveAsArrayOrUndefined)(themeColor)) == null ? void 0 : _resolveAsArrayOrUndefined.forEach((descriptor)=>{
        if (typeof descriptor === 'string') themeColorDescriptors.push({
            color: descriptor
        });
        else if (typeof descriptor === 'object') themeColorDescriptors.push({
            color: descriptor.color,
            media: descriptor.media
        });
    });
    return themeColorDescriptors;
};
async function resolveUrlValuesOfObject(obj, metadataBase, pathname, metadataContext) {
    if (!obj) return null;
    const result = {};
    for (const [key, value] of Object.entries(obj)){
        if (typeof value === 'string' || value instanceof URL) {
            const pathnameForUrl = await pathname;
            result[key] = [
                {
                    url: resolveAlternateUrl(value, metadataBase, pathnameForUrl, metadataContext)
                }
            ];
        } else if (value && value.length) {
            result[key] = [];
            const pathnameForUrl = await pathname;
            value.forEach((item, index)=>{
                const url = resolveAlternateUrl(item.url, metadataBase, pathnameForUrl, metadataContext);
                result[key][index] = {
                    url,
                    title: item.title
                };
            });
        }
    }
    return result;
}
async function resolveCanonicalUrl(urlOrDescriptor, metadataBase, pathname, metadataContext) {
    if (!urlOrDescriptor) return null;
    const url = typeof urlOrDescriptor === 'string' || urlOrDescriptor instanceof URL ? urlOrDescriptor : urlOrDescriptor.url;
    const pathnameForUrl = await pathname;
    // Return string url because structureClone can't handle URL instance
    return {
        url: resolveAlternateUrl(url, metadataBase, pathnameForUrl, metadataContext)
    };
}
const resolveAlternates = async (alternates, metadataBase, pathname, context)=>{
    if (!alternates) return null;
    const canonical = await resolveCanonicalUrl(alternates.canonical, metadataBase, pathname, context);
    const languages = await resolveUrlValuesOfObject(alternates.languages, metadataBase, pathname, context);
    const media = await resolveUrlValuesOfObject(alternates.media, metadataBase, pathname, context);
    const types = await resolveUrlValuesOfObject(alternates.types, metadataBase, pathname, context);
    return {
        canonical,
        languages,
        media,
        types
    };
};
const robotsKeys = [
    'noarchive',
    'nosnippet',
    'noimageindex',
    'nocache',
    'notranslate',
    'indexifembedded',
    'nositelinkssearchbox',
    'unavailable_after',
    'max-video-preview',
    'max-image-preview',
    'max-snippet'
];
const resolveRobotsValue = (robots)=>{
    if (!robots) return null;
    if (typeof robots === 'string') return robots;
    const values = [];
    if (robots.index) values.push('index');
    else if (typeof robots.index === 'boolean') values.push('noindex');
    if (robots.follow) values.push('follow');
    else if (typeof robots.follow === 'boolean') values.push('nofollow');
    for (const key of robotsKeys){
        const value = robots[key];
        if (typeof value !== 'undefined' && value !== false) {
            values.push(typeof value === 'boolean' ? key : `${key}:${value}`);
        }
    }
    return values.join(', ');
};
const resolveRobots = (robots)=>{
    if (!robots) return null;
    return {
        basic: resolveRobotsValue(robots),
        googleBot: typeof robots !== 'string' ? resolveRobotsValue(robots.googleBot) : null
    };
};
const VerificationKeys = [
    'google',
    'yahoo',
    'yandex',
    'me',
    'other'
];
const resolveVerification = (verification)=>{
    if (!verification) return null;
    const res = {};
    for (const key of VerificationKeys){
        const value = verification[key];
        if (value) {
            if (key === 'other') {
                res.other = {};
                for(const otherKey in verification.other){
                    const otherValue = (0, _utils.resolveAsArrayOrUndefined)(verification.other[otherKey]);
                    if (otherValue) res.other[otherKey] = otherValue;
                }
            } else res[key] = (0, _utils.resolveAsArrayOrUndefined)(value);
        }
    }
    return res;
};
const resolveAppleWebApp = (appWebApp)=>{
    var _resolveAsArrayOrUndefined;
    if (!appWebApp) return null;
    if (appWebApp === true) {
        return {
            capable: true
        };
    }
    const startupImages = appWebApp.startupImage ? (_resolveAsArrayOrUndefined = (0, _utils.resolveAsArrayOrUndefined)(appWebApp.startupImage)) == null ? void 0 : _resolveAsArrayOrUndefined.map((item)=>typeof item === 'string' ? {
            url: item
        } : item) : null;
    return {
        capable: 'capable' in appWebApp ? !!appWebApp.capable : true,
        title: appWebApp.title || null,
        startupImage: startupImages,
        statusBarStyle: appWebApp.statusBarStyle || 'default'
    };
};
const resolveAppLinks = (appLinks)=>{
    if (!appLinks) return null;
    for(const key in appLinks){
        // @ts-ignore // TODO: type infer
        appLinks[key] = (0, _utils.resolveAsArrayOrUndefined)(appLinks[key]);
    }
    return appLinks;
};
const resolveItunes = async (itunes, metadataBase, pathname, context)=>{
    if (!itunes) return null;
    return {
        appId: itunes.appId,
        appArgument: itunes.appArgument ? resolveAlternateUrl(itunes.appArgument, metadataBase, await pathname, context) : undefined
    };
};
const resolveFacebook = (facebook)=>{
    if (!facebook) return null;
    return {
        appId: facebook.appId,
        admins: (0, _utils.resolveAsArrayOrUndefined)(facebook.admins)
    };
};
const resolvePagination = async (pagination, metadataBase, pathname, context)=>{
    return {
        previous: (pagination == null ? void 0 : pagination.previous) ? resolveAlternateUrl(pagination.previous, metadataBase, await pathname, context) : null,
        next: (pagination == null ? void 0 : pagination.next) ? resolveAlternateUrl(pagination.next, metadataBase, await pathname, context) : null
    };
};

//# sourceMappingURL=resolve-basics.js.map