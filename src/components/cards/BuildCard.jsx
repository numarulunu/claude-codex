import { useState } from 'react'
import TermTooltip from '../TermTooltip/TermTooltip'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './cards.module.css'

export default function BuildCard({ lesson, onComplete }) {
  const steps = lesson.content.exercise?.steps || []
  const [checked, setChecked] = useState(new Set())

  const toggleStep = (index) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const allDone = steps.length > 0 && checked.size === steps.length

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Build</span>
      <h2 className={styles.title}>{lesson.title}</h2>
      <div className={styles.explanation}>{lesson.content.explanation}</div>
      <TermTooltip terminology={lesson.content.terminology} />

      {lesson.content.codeExample && (
        <CodeBlock
          language={lesson.content.codeExample.language}
          code={lesson.content.codeExample.code}
          annotation={lesson.content.codeExample.annotation}
        />
      )}

      {steps.length > 0 && (
        <div className={styles.exerciseBox}>
          <div className={styles.exerciseLabel}>Project Checklist</div>
          <ul className={styles.checklist}>
            {steps.map((step, i) => (
              <li
                key={i}
                className={`${styles.checklistItem} ${checked.has(i) ? styles.checked : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked.has(i)}
                  onChange={() => toggleStep(i)}
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className={styles.continueButton}
        disabled={steps.length > 0 && !allDone}
        onClick={onComplete}
      >
        Complete Module
      </button>
    </div>
  )
}
