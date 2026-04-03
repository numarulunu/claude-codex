// src/utils/xp.js

export function awardXp(progress, lesson, isPerfect = false) {
  let earned = lesson.xp || 10
  if (isPerfect && lesson.bonusXp) {
    earned += lesson.bonusXp
  }
  return { ...progress, xp: progress.xp + earned }
}

export function updateStreak(streak, todayStr) {
  if (streak.lastDate === todayStr) {
    return streak
  }

  const lastDate = new Date(streak.lastDate + 'T00:00:00')
  const today = new Date(todayStr + 'T00:00:00')
  const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    const newCurrent = streak.current + 1
    return {
      current: newCurrent,
      lastDate: todayStr,
      longest: Math.max(streak.longest, newCurrent),
    }
  }

  return {
    current: 1,
    lastDate: todayStr,
    longest: streak.longest,
  }
}

export function isModuleUnlocked(moduleId, modulesMetadata, progress) {
  const index = modulesMetadata.findIndex((m) => m.id === moduleId)
  if (index === 0) return true

  const prevModule = modulesMetadata[index - 1]
  const prevProgress = progress.modules?.[prevModule.id]
  if (!prevProgress || !prevProgress.completedAt) return false

  return true
}

export function getModuleProgress(moduleId, totalLessons, progress) {
  const moduleProgress = progress.modules?.[moduleId]
  if (!moduleProgress || !moduleProgress.lessonsCompleted?.length) return 0
  return (moduleProgress.lessonsCompleted.length / totalLessons) * 100
}
