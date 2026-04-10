import TermTooltip from '../TermTooltip/TermTooltip'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './cards.module.css'

export default function ExampleCard({ lesson, onComplete }) {
  const { codeExample } = lesson.content

  if (typeof lesson.content.explanation !== 'string') {
    console.error('ExampleCard: explanation is not a string', lesson.id, typeof lesson.content.explanation)
    return (
      <div style={{padding: '2rem', color: 'red'}}>
        Error: Lesson "{lesson.id}" has invalid explanation type.
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Example</span>
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
      <button className={styles.continueButton} onClick={onComplete}>
        Continue
      </button>
    </div>
  )
}
