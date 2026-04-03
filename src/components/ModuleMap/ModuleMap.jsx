import { useState, useEffect } from 'react'
import { useProgressContext } from '../../context/ProgressContext'
import { loadModules } from '../../utils/curriculum'
import { isModuleUnlocked, getModuleProgress } from '../../utils/xp'
import ProgressRing from '../ProgressRing/ProgressRing'
import styles from './ModuleMap.module.css'

const MODULE_ICONS = {
  '01-cli-fundamentals': '\u2328\uFE0F',
  '02-prompt-engineering': '\uD83C\uDFAF',
  '03-hooks-automation': '\u2699\uFE0F',
  '04-skills-plugins': '\uD83E\uDDE9',
  '05-mcp-servers': '\uD83D\uDD0C',
  '06-subagents': '\uD83E\uDD16',
  '07-scripts-pipelines': '\uD83D\uDCDC',
  '08-n8n-integration': '\uD83D\uDD04',
  '09-business-automation': '\uD83D\uDCBC',
  '10-content-pipelines': '\uD83C\uDFA5',
}

export default function ModuleMap({ onModuleClick }) {
  const [modules, setModules] = useState([])
  const { progress } = useProgressContext()

  useEffect(() => {
    loadModules().then(setModules)
  }, [])

  if (!modules.length) return null

  return (
    <div className={styles.map}>
      <h1 className={styles.title}>Claude Codex</h1>
      <p className={styles.subtitle}>Master Claude Code CLI, one lesson at a time</p>

      <div className={styles.path}>
        {modules.map((mod, i) => {
          const unlocked = isModuleUnlocked(mod.id, modules, progress)
          const percent = getModuleProgress(mod.id, mod.lessonCount, progress)
          const isComplete = percent >= 100
          const isCurrent = unlocked && !isComplete

          return (
            <div key={mod.id}>
              {i > 0 && (
                <div className={`${styles.connector} ${isComplete || (isCurrent && percent > 0) ? styles.completed : ''}`} />
              )}
              <div
                className={`${styles.node} ${isComplete ? styles.completed : ''} ${isCurrent ? styles.current : ''} ${!unlocked ? styles.locked : ''}`}
                onClick={() => unlocked && onModuleClick(mod.id)}
              >
                <div className={styles.nodeCircle}>
                  {isComplete ? (
                    <span className={styles.checkmark}>{'\u2713'}</span>
                  ) : !unlocked ? (
                    <span className={styles.lockIcon}>{'\uD83D\uDD12'}</span>
                  ) : (
                    <span>{MODULE_ICONS[mod.id] || '\uD83D\uDCD6'}</span>
                  )}
                  {isCurrent && percent > 0 && (
                    <div className={styles.ringOverlay}>
                      <ProgressRing size={80} strokeWidth={3} percent={percent} />
                    </div>
                  )}
                </div>
                <div className={styles.nodeInfo}>
                  <div className={styles.nodeNumber}>Module {i + 1}</div>
                  <div className={styles.nodeTitle}>{mod.title}</div>
                  {isCurrent && percent > 0 && (
                    <div className={styles.nodeProgress}>{Math.round(percent)}% complete</div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
