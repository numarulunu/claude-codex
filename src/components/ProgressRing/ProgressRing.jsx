import styles from './ProgressRing.module.css'

export default function ProgressRing({ size = 64, strokeWidth = 4, percent = 0 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  const isComplete = percent >= 100

  return (
    <svg
      className={`${styles.ring} ${isComplete ? styles.completed : ''}`}
      width={size}
      height={size}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${Math.round(percent)}%`}
    >
      <circle
        className={styles.trackCircle}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className={styles.progressCircle}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  )
}
