import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { loadProgress, saveProgress } from '../hooks/useProgress'
import { awardXp, updateStreak } from '../utils/xp'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => loadProgress())

  const updateProgress = useCallback((updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveProgress(next)
      return next
    })
  }, [])

  const completeLesson = useCallback((moduleId, lessonId, lesson, isPerfect = false) => {
    updateProgress((prev) => {
      const moduleProgress = prev.modules[moduleId] || {
        unlocked: true,
        lessonsCompleted: [],
        completedAt: null,
      }

      if (moduleProgress.lessonsCompleted.includes(lessonId)) {
        return prev
      }

      const updatedLessons = [...moduleProgress.lessonsCompleted, lessonId]
      const today = new Date().toISOString().split('T')[0]

      let next = awardXp(prev, lesson, isPerfect)
      const updatedStreak = updateStreak(
        prev.streak.lastDate ? prev.streak : { ...prev.streak, lastDate: today, current: 0 },
        today
      )

      next = {
        ...next,
        streak: updatedStreak,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...moduleProgress,
            lessonsCompleted: updatedLessons,
            completedAt: null,
          },
        },
      }

      return next
    })
  }, [updateProgress])

  const completeModule = useCallback((moduleId) => {
    updateProgress((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          completedAt: new Date().toISOString().split('T')[0],
        },
      },
    }))
  }, [updateProgress])

  const saveQuizScore = useCallback((lessonId, score, total) => {
    updateProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [lessonId]: {
          score,
          total,
          bonus: score === total,
          attempts: (prev.quizScores[lessonId]?.attempts || 0) + 1,
        },
      },
    }))
  }, [updateProgress])

  const resetProgress = useCallback(() => {
    localStorage.removeItem('claude-codex-progress')
    setProgress(loadProgress())
  }, [])

  const value = useMemo(
    () => ({
      progress,
      completeLesson,
      completeModule,
      saveQuizScore,
      resetProgress,
      updateProgress,
    }),
    [progress, completeLesson, completeModule, saveQuizScore, resetProgress, updateProgress]
  )

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgressContext must be used within ProgressProvider')
  return context
}
