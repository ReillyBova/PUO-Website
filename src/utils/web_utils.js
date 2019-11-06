// Global variable indicating if browser has Intersection Observer support
export const CAN_USE_IO =
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;

// Add video resource to cache
export async function addToVideoCache(url) {
    const cache = await caches.open('gatsby-plugin-cache-video');
    await cache.add(url);
}

// Determine how far down the page the user has scrolled
export const scrollTop = () => {
    if (typeof window !== 'undefined') {
        return (
            window.pageYOffset ||
            (
                document.documentElement ||
                document.body.parentNode ||
                document.body
            ).scrollTop
        );
    }
};

// Determine how tall the browser window is
export const winHeight = () => {
    if (typeof window !== 'undefined') {
        return (
            window.innerHeight ||
            (document.documentElement || document.body).clientHeight
        );
    }
};

// Determine how wide the browser window is
export const winWidth = () => {
    if (typeof window !== 'undefined') {
        return (
            window.innerWidth ||
            (document.documentElement || document.body).clientWidth
        );
    }
};

// Map string to URL
export const urlify = (string) =>
    string
        .replace(/\s+/g, '-')
        .replace(/’/g, '')
        .toLowerCase();
