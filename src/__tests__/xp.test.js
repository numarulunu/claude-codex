// src/__tests__/xp.test.js
import { describe, it, expect } from 'vitest'
import { awardXp, updateStreak, isModuleUnlocked, getModuleProgress } from '../utils/xp'

describe('awardXp', () => {
  it('adds base XP for a concept lesson', () => {
    const progress = { xp: 100 }
    const result = awardXp(progress, { type: 'concept', xp: 10 })
    expect(result.xp).toBe(110)
  })

  it('adds bonus XP for perfect quiz', () => {
    const progress = { xp: 100 }
    const result = awardXp(progress, { type: 'quiz', xp: 10, bonusXp: 5 }, true)
    expect(result.xp).toBe(115)
  })

  it('does not add bonus XP for imperfect quiz', () => {
    const progress = { xp: 100 }
    const result = awardXp(progress, { type: 'quiz', xp: 10, bonusXp: 5 }, false)
    expect(result.xp).toBe(110)
  })
})

describe('updateStreak', () => {
  it('increments streak on new day', () => {
    const streak = { current: 3, lastDate: '2026-04-02', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.current).toBe(4)
    expect(result.lastDate).toBe('2026-04-03')
  })

  it('does not change streak on same day', () => {
    const streak = { current: 3, lastDate: '2026-04-03', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.current).toBe(3)
  })

  it('resets streak if more than 1 day gap', () => {
    const streak = { current: 3, lastDate: '2026-04-01', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.current).toBe(1)
    expect(result.lastDate).toBe('2026-04-03')
  })

  it('updates longest when current exceeds it', () => {
    const streak = { current: 5, lastDate: '2026-04-02', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.longest).toBe(6)
  })
})

describe('isModuleUnlocked', () => {
  const modules = [
    { id: '01-cli-fundamentals', lessonCount: 3 },
    { id: '02-prompt-engineering', lessonCount: 3 },
    { id: '03-hooks-automation', lessonCount: 3 },
  ]

  it('first module is always unlocked', () => {
    const progress = { modules: {} }
    expect(isModuleUnlocked('01-cli-fundamentals', modules, progress)).toBe(true)
  })

  it('second module unlocked when first is complete', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': {
          lessonsCompleted: ['a', 'b', 'c'],
          completedAt: '2026-04-03',
        },
      },
    }
    expect(isModuleUnlocked('02-prompt-engineering', modules, progress)).toBe(true)
  })

  it('second module locked when first is incomplete', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': {
          lessonsCompleted: ['a', 'b'],
          completedAt: null,
        },
      },
    }
    expect(isModuleUnlocked('02-prompt-engineering', modules, progress)).toBe(false)
  })
})

describe('getModuleProgress', () => {
  it('returns 0 for unstarted module', () => {
    const progress = { modules: {} }
    expect(getModuleProgress('01-cli-fundamentals', 14, progress)).toBe(0)
  })

  it('returns correct percentage', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': { lessonsCompleted: ['a', 'b', 'c'] },
      },
    }
    expect(getModuleProgress('01-cli-fundamentals', 12, progress)).toBeCloseTo(25)
  })

  it('returns 100 for completed module', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': {
          lessonsCompleted: ['a', 'b', 'c', 'd', 'e'],
        },
      },
    }
    expect(getModuleProgress('01-cli-fundamentals', 5, progress)).toBe(100)
  })
})
