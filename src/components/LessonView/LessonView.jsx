import { useState, useEffect, useRef } from 'react'
import { useProgressContext } from '../../context/ProgressContext'
import { loadModuleLessons, loadModules } from '../../utils/curriculum'
import ConceptCard from '../cards/ConceptCard'
import ExampleCard from '../cards/ExampleCard'
import QuizCard from '../cards/QuizCard'
import HandsOnCard from '../cards/HandsOnCard'
import BuildCard from '../cards/BuildCard'
import CelebrationOverlay from '../CelebrationOverlay/CelebrationOverlay'
import styles from './LessonView.module.css'

const CARD_COMPONENTS = {
  concept: ConceptCard,
  example: ExampleCard,
  quiz: QuizCard,
  'hands-on': HandsOnCard,
  build: BuildCard,
}

export default function LessonView({ moduleId, lessonId, onBack, onNavigate }) {
  const [lessons, setLessons] = useState([])
  const [modules, setModules] = useState([])
  const [xpPopup, setXpPopup] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const pendingNavRef = useRef(false)
  const { progress, completeLesson, completeModule, saveQuizScore } = useProgressContext()

  useEffect(() => {
    loadModuleLessons(moduleId).then(setLessons)
    loadModules().then(setModules)
  }, [moduleId])

  const lesson = lessons.find((l) => l.id === lessonId)
  const lessonIndex = lessons.findIndex((l) => l.id === lessonId)
  const completedLessons = progress.modules[moduleId]?.lessonsCompleted || []

  if (!lesson) return null

  // Debug: log full lesson data
  console.log('LessonView rendering:', lessonId, JSON.stringify(lesson, null, 2).slice(0, 500))

  // Debug: log lesson data to find issues
  if (!lesson.content || typeof lesson.content !== 'object') {
    console.error('LessonView: Invalid lesson content', lessonId, lesson)
    return (
      <div style={{padding: '2rem', color: 'red'}}>
        Error: Lesson "{lessonId}" has invalid content structure.
      </div>
    )
  }

  const handleComplete = (isPerfect = false) => {
    if (completedLessons.includes(lessonId)) return

    completeLesson(moduleId, lessonId, lesson, isPerfect)

    // Show XP popup
    const earned = lesson.xp || 10
    const bonus = isPerfect && lesson.bonusXp ? lesson.bonusXp : 0
    setXpPopup(earned + bonus)
    setTimeout(() => setXpPopup(null), 2200)

    // Mark that navigation/completion should be decided by the effect below,
    // which reads the *updated* progress state — avoiding the stale-snapshot bug.
    pendingNavRef.current = true
  }

  // Post-completion effect: runs after progress state actually updates.
  useEffect(() => {
    if (!pendingNavRef.current) return
    if (!completedLessons.includes(lessonId)) return
    pendingNavRef.current = false

    const moduleMeta = modules.find((m) => m.id === moduleId)
    if (moduleMeta && completedLessons.length >= moduleMeta.lessonCount) {
      completeModule(moduleId)
      setShowCelebration(true)
      return
    }

    const t = setTimeout(() => {
      if (lessonIndex < lessons.length - 1) {
        const nextLesson = lessons[lessonIndex + 1]
        onNavigate(`/module/${moduleId}/lesson/${nextLesson.id}`)
      } else {
        onBack()
      }
    }, 800)
    return () => clearTimeout(t)
  }, [completedLessons, lessonId, lessonIndex, lessons, modules, moduleId, completeModule, onBack, onNavigate])

  const handleQuizScore = (qLessonId, score, total) => {
    saveQuizScore(qLessonId, score, total)
  }

  const CardComponent = CARD_COMPONENTS[lesson.type]
  if (!CardComponent) return <div>Unknown lesson type: {lesson.type}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          {'\u2190'} Back
        </button>
        <div className={styles.progressDots}>
          {lessons.map((l) => (
            <div
              key={l.id}
              className={`${styles.dot} ${
                completedLessons.includes(l.id) ? styles.completed : ''
              } ${l.id === lessonId ? styles.current : ''}`}
            />
          ))}
        </div>
      </div>

      <CardComponent
        lesson={lesson}
        onComplete={handleComplete}
        onQuizScore={handleQuizScore}
      />

      <div className={styles.xpLive} role="status" aria-live="polite" aria-atomic="true">
        {xpPopup !== null && (
          <div className={styles.xpEarned}>+{xpPopup} XP</div>
        )}
      </div>

      {showCelebration && (
        <CelebrationOverlay
          moduleName={modules.find((m) => m.id === moduleId)?.title}
          onContinue={() => {
            setShowCelebration(false)
            onBack()
          }}
        />
      )}
    </div>
  )
}
