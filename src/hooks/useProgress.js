const STORAGE_KEY = 'claude-codex-progress'

const DEFAULT_PROGRESS = {
  version: 1,
  xp: 0,
  streak: { current: 0, lastDate: null, longest: 0 },
  modules: {},
  quizScores: {},
}

function mergeProgress(parsed) {
  return {
    ...DEFAULT_PROGRESS,
    ...parsed,
    streak: { ...DEFAULT_PROGRESS.streak, ...(parsed?.streak || {}) },
    modules: { ...(parsed?.modules || {}) },
    quizScores: { ...(parsed?.quizScores || {}) },
  }
}

export function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return mergeProgress(JSON.parse(stored))
    }
  } catch (e) {
    console.warn('Failed to load progress:', e)
  }
  return { ...DEFAULT_PROGRESS, streak: { ...DEFAULT_PROGRESS.streak } }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.warn('Failed to save progress:', e)
  }
}

export function exportProgress(progress) {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'claude-codex-progress.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function importProgress(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (typeof data?.version === 'number' && data.version >= 1) {
          resolve(mergeProgress(data))
        } else {
          reject(new Error('Invalid progress file'))
        }
      } catch {
        reject(new Error('Failed to parse progress file'))
      }
    }
    reader.readAsText(file)
  })
}
