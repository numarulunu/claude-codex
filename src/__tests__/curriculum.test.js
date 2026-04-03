import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadModules, loadModuleLessons, clearCache } from '../utils/curriculum'

describe('loadModules', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    clearCache()
  })

  it('fetches and returns modules.json', async () => {
    const mockModules = [
      { id: '01-cli-fundamentals', title: 'CLI Fundamentals', lessonCount: 14 },
    ]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockModules),
    })

    const result = await loadModules()
    expect(result).toEqual(mockModules)
    expect(fetch).toHaveBeenCalledWith('/curriculum/modules.json')
  })

  it('caches after first fetch', async () => {
    const mockModules = [{ id: '01', title: 'Test' }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockModules),
    })

    await loadModules()
    await loadModules()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})

describe('loadModuleLessons', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    clearCache()
  })

  it('fetches lessons for a module', async () => {
    const mockLessons = [{ id: 'cli-01-01', title: 'What is Claude Code' }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockLessons),
    })

    const result = await loadModuleLessons('01-cli-fundamentals')
    expect(result).toEqual(mockLessons)
    expect(fetch).toHaveBeenCalledWith('/curriculum/01-cli-fundamentals.json')
  })
})
