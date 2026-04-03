const cache = {}

export async function loadModules() {
  if (cache.modules) return cache.modules

  const res = await fetch('/curriculum/modules.json')
  const data = await res.json()
  cache.modules = data
  return data
}

export async function loadModuleLessons(moduleId) {
  if (cache[moduleId]) return cache[moduleId]

  const res = await fetch(`/curriculum/${moduleId}.json`)
  const data = await res.json()
  cache[moduleId] = data
  return data
}

export function clearCache() {
  Object.keys(cache).forEach((key) => delete cache[key])
}
