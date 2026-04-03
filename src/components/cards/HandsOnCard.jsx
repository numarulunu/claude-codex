import { useState } from 'react'
import TermTooltip from '../TermTooltip/TermTooltip'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './cards.module.css'

export default function HandsOnCard({ lesson, onComplete }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const { exercise, codeExample } = lesson.content
  const inputType = exercise?.inputType || 'confirm'

  const handleSubmit = () => {
    if (inputType === 'confirm') {
      onComplete()
      return
    }

    const validation = exercise?.validation
    if (validation) {
      if (validation.type === 'length' && input.length < (validation.min || 0)) {
        setError(validation.errorMessage || 'Response is too short.')
        return
      }
      if (validation.type === 'keyword') {
        const keywords = validation.keywords || []
        const missing = keywords.filter(
          (kw) => !input.toLowerCase().includes(kw.toLowerCase())
        )
        if (missing.length) {
          setError(validation.errorMessage || `Missing: ${missing.join(', ')}`)
          return
        }
      }
    }

    setError('')
    onComplete()
  }

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Hands-on</span>
      <h2 className={styles.title}>{lesson.title}</h2>
      <div className={styles.explanation}>{lesson.content.explanation}</div>
      <TermTooltip terminology={lesson.content.terminology} />

      {codeExample && (
        <CodeBlock
          language={codeExample.language}
          code={codeExample.code}
          annotation={codeExample.annotation}
        />
      )}

      <div className={styles.exerciseBox}>
        <div className={styles.exerciseLabel}>Try it yourself</div>
        <div className={styles.exerciseInstruction}>{exercise?.instruction}</div>

        {inputType === 'textarea' || inputType === 'paste' ? (
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputType === 'paste' ? 'Paste your output here...' : 'Type your answer...'}
          />
        ) : null}

        {error && <div className={styles.validationError}>{error}</div>}
      </div>

      <button className={styles.continueButton} onClick={handleSubmit}>
        {inputType === 'confirm' ? 'I did it' : 'Submit'}
      </button>
    </div>
  )
}
