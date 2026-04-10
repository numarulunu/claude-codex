import TermTooltip from '../TermTooltip/TermTooltip'
import styles from './cards.module.css'

export default function ConceptCard({ lesson, onComplete }) {
  // Validate explanation is a string
  if (typeof lesson.content.explanation !== 'string') {
    console.error('ConceptCard: explanation is not a string', lesson.id, typeof lesson.content.explanation)
    return (
      <div style={{padding: '2rem', color: 'red'}}>
        Error: Lesson "{lesson.id}" has invalid explanation type.
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Concept</span>
      <h2 className={styles.title}>{lesson.title}</h2>
      <div className={styles.explanation}>{lesson.content.explanation}</div>
      <TermTooltip terminology={lesson.content.terminology} />
      <button className={styles.continueButton} onClick={onComplete}>
        Got it
      </button>
    </div>
  )
}
