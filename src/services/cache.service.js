const TS_PREFIX = "TS";
const CACHE_TIME = 1 * 1000; // one hour
export const saveInCache = (entryName, data) => {
  removeFromCache(entryName);
  localStorage.setItem(entryName, JSON.stringify(data));
  localStorage.setItem(`${TS_PREFIX}${entryName}`, Date.now());
};

export const hasValidCacheEntry = (entryName) => {
  return (
    parseInt(Date.now()) -
      parseInt(localStorage.getItem(`${TS_PREFIX}${entryName}`)) <
    CACHE_TIME
  );
};

export const getFromCache = (entryName) => {
  return JSON.parse(localStorage.getItem(entryName));
};

export const removeFromCache = (entryName) => {
  localStorage.removeItem(entryName);
  localStorage.removeItem(`${TS_PREFIX}${entryName}`);
};
