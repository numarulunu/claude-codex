import styles from './TermTooltip.module.css'

export default function TermTooltip({ terminology }) {
  if (!terminology || !terminology.length) return null

  // Validate terminology structure
  for (const item of terminology) {
    if (typeof item.term !== 'string' || typeof item.definition !== 'string') {
      console.error('TermTooltip: Invalid item', item)
      return (
        <div style={{padding: '1rem', color: 'red', fontSize: '0.9rem'}}>
          Error: Invalid terminology format. Term or definition is not a string.
        </div>
      )
    }
  }

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
