let cacheData = null;
let cacheTime = null;

// cache expires in 10 minutes (600,000 ms)
const CACHE_DURATION = 10 * 60 * 1000;

function setCache(data) {
  cacheData = data;
  cacheTime = Date.now();
}

function getCache() {
  if (!cacheData || !cacheTime) return null;

  const isExpired = (Date.now() - cacheTime) > CACHE_DURATION;
  if (isExpired) return null;

  return cacheData;
}

module.exports = { setCache, getCache };
