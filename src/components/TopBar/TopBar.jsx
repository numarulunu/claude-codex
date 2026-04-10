import { useTheme } from '../../context/ThemeContext'
import { useProgressContext } from '../../context/ProgressContext'
import styles from './TopBar.module.css'

export default function TopBar({ onLogoClick }) {
  const { theme, toggleTheme } = useTheme()
  const { progress } = useProgressContext()

  return (
    <header className={styles.topBar}>
      <button
        type="button"
        className={styles.logo}
        onClick={onLogoClick}
        aria-label="Go to home"
      >
        <div className={styles.logoMark}>C</div>
        <span className={styles.logoText}>Claude Codex</span>
      </button>

      <div className={styles.stats}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '\u263E' : '\u2600'}
        </button>

        <div className={styles.stat}>
          <span className={styles.streakIcon}>{'\uD83D\uDD25'}</span>
          <span>{progress.streak.current}</span>
        </div>

        <div className={styles.xpBadge}>
          {progress.xp} XP
        </div>
      </div>
    </header>
  )
}
