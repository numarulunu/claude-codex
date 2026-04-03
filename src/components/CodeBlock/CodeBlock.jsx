import { useState } from 'react'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ language, code, annotation }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.header}>
        <span>{language || 'code'}</span>
        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code>{code}</code>
      </pre>
      {annotation && <p className={styles.annotation}>{annotation}</p>}
    </div>
  )
}
