import { useState, useEffect, useMemo } from 'react'
import { useProgressContext } from '../../context/ProgressContext'
import { loadModules, loadModuleLessons } from '../../utils/curriculum'
import { getModuleProgress } from '../../utils/xp'
import styles from './LessonList.module.css'

const TYPE_LABELS = {
  concept: 'Concept',
  example: 'Example',
  quiz: 'Quiz',
  'hands-on': 'Hands-on',
  build: 'Build',
}

export default function LessonList({ moduleId, onBack, onLessonClick }) {
  const [modules, setModules] = useState([])
  const [lessons, setLessons] = useState([])
  const { progress } = useProgressContext()

  useEffect(() => {
    loadModules().then(setModules)
    loadModuleLessons(moduleId).then(setLessons)
  }, [moduleId])

  const moduleMeta = modules.find((m) => m.id === moduleId)
  const completedLessons = progress.modules[moduleId]?.lessonsCompleted || []
  const percent = moduleMeta ? getModuleProgress(moduleId, moduleMeta.lessonCount, progress) : 0

  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons])
  const firstIncompleteIndex = useMemo(
    () => lessons.findIndex((l) => !completedSet.has(l.id)),
    [lessons, completedSet]
  )

  function getLessonState(lesson, index) {
    if (completedSet.has(lesson.id)) return 'completed'
    if (index === firstIncompleteIndex) return 'current'
    return 'available'
  }

  if (!moduleMeta) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          {'\u2190'} Back to modules
        </button>
        <h2 className={styles.moduleTitle}>{moduleMeta.title}</h2>
        <p className={styles.moduleDescription}>{moduleMeta.description}</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className={styles.lessons}>
        {lessons.map((lesson, i) => {
          const state = getLessonState(lesson, i)

          return (
            <div
              key={lesson.id}
              className={`${styles.lessonItem} ${styles[state]}`}
              onClick={() => onLessonClick(lesson.id)}
            >
              <div className={styles.lessonNumber}>
                {state === 'completed' ? '\u2713' : i + 1}
              </div>
              <div className={styles.lessonInfo}>
                <div className={styles.lessonTitle}>{lesson.title}</div>
                <div className={styles.lessonType}>{TYPE_LABELS[lesson.type] || lesson.type}</div>
              </div>
              {state === 'completed' && (
                <span className={styles.lessonCheck}>{'\u2713'}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
