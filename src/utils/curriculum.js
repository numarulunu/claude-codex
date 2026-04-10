const cache = {}
const base = import.meta.env.BASE_URL

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`)
  }
  return res.json()
}

export async function loadModules() {
  if (cache.modules) return cache.modules
  const data = await fetchJson(`${base}curriculum/modules.json`)
  cache.modules = data
  return data
}

export async function loadModuleLessons(moduleId) {
  if (cache[moduleId]) return cache[moduleId]
  const data = await fetchJson(`${base}curriculum/${moduleId}.json`)
  cache[moduleId] = data
  return data
}

export function clearCache() {
  Object.keys(cache).forEach((key) => delete cache[key])
}
