import { useState } from 'react'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ language, code, annotation }) {
  const [copied, setCopied] = useState(false)

  // Validate props are strings
  if (code && typeof code !== 'string') {
    console.error('CodeBlock: code is not a string', typeof code, code)
    return <div style={{color: 'red'}}>Error: CodeBlock code is not a string</div>
  }
  if (annotation && typeof annotation !== 'string') {
    console.error('CodeBlock: annotation is not a string', typeof annotation, annotation)
    return <div style={{color: 'red'}}>Error: CodeBlock annotation is not a string</div>
  }
  if (language && typeof language !== 'string') {
    console.error('CodeBlock: language is not a string', typeof language, language)
    return <div style={{color: 'red'}}>Error: CodeBlock language is not a string</div>
  }

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
