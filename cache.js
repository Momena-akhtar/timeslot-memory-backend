// cache.js
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let cachedData = null;
let lastFetched = null;

function isCacheValid() {
  if (!cachedData || !lastFetched) return false;
  return (Date.now() - lastFetched) < CACHE_TTL_MS;
}

function getCachedData() {
  return cachedData;
}

function updateCache(data) {
  cachedData = data;
  lastFetched = Date.now();
}

function clearCache() {
  cachedData = null;
  lastFetched = null;
}

module.exports = { isCacheValid, getCachedData, updateCache, clearCache };
