import TermTooltip from '../TermTooltip/TermTooltip'
import styles from './cards.module.css'

export default function ConceptCard({ lesson, onComplete }) {
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
