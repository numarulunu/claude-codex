const cache = {};
const base = "/claude-codex/";
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return res.json();
}
async function loadModules() {
  if (cache.modules) return cache.modules;
  const data = await fetchJson(`${base}curriculum/modules.json`);
  cache.modules = data;
  return data;
}
async function loadModuleLessons(moduleId) {
  if (cache[moduleId]) return cache[moduleId];
  const data = await fetchJson(`${base}curriculum/${moduleId}.json`);
  cache[moduleId] = data;
  return data;
}
export {
  loadModuleLessons as a,
  loadModules as l
};
//# sourceMappingURL=curriculum-DNetKi3g.js.map
