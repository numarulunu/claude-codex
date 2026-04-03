import styles from './TermTooltip.module.css'

export default function TermTooltip({ terminology }) {
  if (!terminology || !terminology.length) return null

  return (
    <div className={styles.termList}>
      {terminology.map((item) => (
        <div key={item.term} className={styles.termBox}>
          <span className={styles.term}>{item.term}</span>
          {' \u2014 '}
          <span className={styles.definition}>{item.definition}</span>
        </div>
      ))}
    </div>
  )
}
