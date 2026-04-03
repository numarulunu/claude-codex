import { useMemo } from 'react'
import styles from './CelebrationOverlay.module.css'

const COLORS = ['#d97757', '#4caf50', '#ffd700', '#e74c3c', '#3498db', '#9b59b6']

export default function CelebrationOverlay({ moduleName, onContinue }) {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      color: COLORS[i % COLORS.length],
      size: 4 + Math.random() * 8,
    }))
  }, [])

  return (
    <>
      <div className={styles.particles}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              left: p.left,
              animationDelay: p.delay,
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.trophy}>{'\uD83C\uDFC6'}</div>
          <h2 className={styles.title}>Module Complete!</h2>
          <p className={styles.subtitle}>{moduleName}</p>
          <button className={styles.continueButton} onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </>
  )
}
