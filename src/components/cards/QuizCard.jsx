import { useState } from 'react'
import TermTooltip from '../TermTooltip/TermTooltip'
import styles from './cards.module.css'

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuizCard({ lesson, onComplete, onQuizScore }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const choices = lesson.content.exercise?.choices || []
  const correctIndex = choices.findIndex((c) => c.correct)

  const handleSelect = (index) => {
    if (submitted) return
    setSelected(index)
  }

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    const isCorrect = selected === correctIndex
    if (onQuizScore) {
      onQuizScore(lesson.id, isCorrect ? 1 : 0, 1)
    }
  }

  const getChoiceClass = (index) => {
    if (!submitted) {
      return index === selected ? styles.selected : ''
    }
    if (index === correctIndex) return styles.correct
    if (index === selected && index !== correctIndex) return styles.wrong
    return ''
  }

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Quiz</span>
      <h2 className={styles.title}>{lesson.title}</h2>
      <div className={styles.explanation}>{lesson.content.explanation}</div>
      <TermTooltip terminology={lesson.content.terminology} />

      <div className={styles.choices} role="radiogroup" aria-label="Answer choices">
        {choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={selected === i}
            disabled={submitted}
            className={`${styles.choice} ${getChoiceClass(i)}`}
            onClick={() => handleSelect(i)}
          >
            <span className={styles.choiceLetter}>{LETTERS[i]}</span>
            <span>{choice.text}</span>
          </button>
        ))}
      </div>

      {submitted && selected !== null && (
        <div
          role="alert"
          className={`${styles.feedbackBox} ${
            selected === correctIndex ? styles.feedbackCorrect : styles.feedbackWrong
          }`}
        >
          {selected === correctIndex
            ? 'Correct!'
            : choices[selected]?.explanation || `The correct answer is ${LETTERS[correctIndex]}.`}
        </div>
      )}

      {!submitted ? (
        <button
          className={styles.continueButton}
          disabled={selected === null}
          onClick={handleSubmit}
        >
          Check Answer
        </button>
      ) : (
        <button className={styles.continueButton} onClick={() => onComplete(selected === correctIndex)}>
          Continue
        </button>
      )}
    </div>
  )
}
