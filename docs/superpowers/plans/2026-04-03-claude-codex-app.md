# Claude Codex App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Duolingo-style React web app that teaches Claude Code CLI through gamified micro-lessons, with Module 1 (CLI Fundamentals, 14 lessons) as launch content.

**Architecture:** Single-page React app (Vite) with hash-based routing. Curriculum stored as static JSON in `public/curriculum/`. Progress tracked in localStorage via React Context. Five lesson card types: concept, example, quiz, hands-on, build. Visual design follows Claude's brand (cream/terracotta) with dark mode toggle.

**Tech Stack:** React 19, Vite 6, Vitest + React Testing Library, CSS Modules, CSS Custom Properties

**Spec:** `docs/superpowers/specs/2026-04-03-claude-codex-design.md`

---

## File Structure

```
claude-codex/
├── index.html                          ← Vite entry, sets data-theme attribute
├── package.json                        ← Dependencies: react, react-dom, vite, vitest, @testing-library/react
├── vite.config.js                      ← Vite config with test setup
├── public/
│   └── curriculum/
│       ├── modules.json                ← Module metadata (id, title, icon, description, lessonCount)
│       └── 01-cli-fundamentals.json    ← 14 lesson objects for Module 1
├── src/
│   ├── main.jsx                        ← ReactDOM.createRoot, renders <App />
│   ├── App.jsx                         ← ThemeProvider + ProgressProvider + Router
│   ├── App.module.css                  ← App layout (single column, centered)
│   ├── styles/
│   │   ├── theme.css                   ← CSS custom properties (light + dark tokens)
│   │   └── global.css                  ← Reset, base typography, transitions
│   ├── hooks/
│   │   ├── useRouter.js                ← Hash-based router (read/write location)
│   │   └── useProgress.js              ← Read/write localStorage, XP/streak logic
│   ├── context/
│   │   ├── ThemeContext.jsx             ← Dark/light toggle state + persistence
│   │   └── ProgressContext.jsx          ← Global progress state, actions (completeLesson, etc.)
│   ├── utils/
│   │   ├── xp.js                       ← XP award, streak update, module unlock logic
│   │   └── curriculum.js               ← Fetch + cache curriculum JSON
│   ├── components/
│   │   ├── TopBar/
│   │   │   ├── TopBar.jsx              ← Logo, theme toggle, streak flame, XP counter
│   │   │   └── TopBar.module.css
│   │   ├── ModuleMap/
│   │   │   ├── ModuleMap.jsx           ← Vertical skill tree with nodes on winding path
│   │   │   └── ModuleMap.module.css
│   │   ├── LessonList/
│   │   │   ├── LessonList.jsx          ← Lesson cards within a module
│   │   │   └── LessonList.module.css
│   │   ├── LessonView/
│   │   │   ├── LessonView.jsx          ← Dispatches to correct card type
│   │   │   └── LessonView.module.css
│   │   ├── cards/
│   │   │   ├── ConceptCard.jsx         ← Explanation + terminology + diagram + "Got it"
│   │   │   ├── ExampleCard.jsx         ← Code example + annotation + "Continue"
│   │   │   ├── QuizCard.jsx            ← Multiple choice with feedback
│   │   │   ├── HandsOnCard.jsx         ← Instruction + textarea/paste + validation
│   │   │   ├── BuildCard.jsx           ← Multi-step capstone with checklist
│   │   │   └── cards.module.css        ← Shared card styles
│   │   ├── CodeBlock/
│   │   │   ├── CodeBlock.jsx           ← Syntax display with copy button
│   │   │   └── CodeBlock.module.css
│   │   ├── TermTooltip/
│   │   │   ├── TermTooltip.jsx         ← Inline term definition callout
│   │   │   └── TermTooltip.module.css
│   │   ├── ProgressRing/
│   │   │   ├── ProgressRing.jsx        ← SVG circular progress indicator
│   │   │   └── ProgressRing.module.css
│   │   └── CelebrationOverlay/
│   │       ├── CelebrationOverlay.jsx  ← Confetti animation on module complete
│   │       └── CelebrationOverlay.module.css
│   └── __tests__/
│       ├── xp.test.js                  ← XP calculation, streak logic tests
│       ├── useProgress.test.js         ← Progress read/write/unlock tests
│       ├── useRouter.test.js           ← Hash routing tests
│       └── curriculum.test.js          ← JSON loading tests
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-04-03-claude-codex-design.md
        └── plans/
            └── 2026-04-03-claude-codex-app.md  ← This file
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [ ] **Step 1: Initialize the project with npm**

Run:
```bash
cd ~/Claude/Claude\ Codex
npm init -y
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install react@19 react-dom@19
npm install -D vite@6 @vitejs/plugin-react vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Create vite.config.js**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
})
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Claude Codex</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 5: Create src/main.jsx**

```jsx
// src/main.jsx
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
```

- [ ] **Step 6: Create src/App.jsx (placeholder)**

```jsx
// src/App.jsx
export default function App() {
  return <div>Claude Codex</div>
}
```

- [ ] **Step 7: Add scripts to package.json**

Update `package.json` scripts section:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 8: Verify dev server starts**

Run: `npm run dev`
Expected: Vite dev server starts, visiting `http://localhost:5173` shows "Claude Codex" text.
Stop the server after verification.

- [ ] **Step 9: Commit**

```bash
git init
echo "node_modules\ndist\n.superpowers" > .gitignore
git add package.json package-lock.json vite.config.js index.html src/main.jsx src/App.jsx .gitignore
git commit -m "feat: scaffold React + Vite project"
```

---

## Task 2: Theme System

**Files:**
- Create: `src/styles/theme.css`
- Create: `src/styles/global.css`
- Create: `src/context/ThemeContext.jsx`
- Modify: `src/main.jsx` — import global styles
- Modify: `src/App.jsx` — wrap in ThemeProvider
- Modify: `index.html` — add theme.css import

- [ ] **Step 1: Create src/styles/theme.css**

```css
/* src/styles/theme.css */
:root,
[data-theme="light"] {
  --color-bg: #faf6f1;
  --color-card: #ffffff;
  --color-accent: #d97757;
  --color-accent-hover: #c4623f;
  --color-text: #1a1410;
  --color-text-muted: #8b7d6b;
  --color-border: #e8e0d8;
  --color-surface: #f5f0eb;
  --color-success: #4caf50;
  --color-error: #e74c3c;
  --color-term-bg: #fdf2ec;
  --color-code-bg: #f5f0eb;
  --color-streak: #d97757;
  --shadow-card: 0 1px 3px rgba(26, 20, 16, 0.08);
  --shadow-card-hover: 0 4px 12px rgba(26, 20, 16, 0.12);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

[data-theme="dark"] {
  --color-bg: #1a1410;
  --color-card: #2a2420;
  --color-accent: #d97757;
  --color-accent-hover: #e88a6a;
  --color-text: #f5efe8;
  --color-text-muted: #a89888;
  --color-border: #3a3430;
  --color-surface: #221e1a;
  --color-success: #4caf50;
  --color-error: #e74c3c;
  --color-term-bg: #2a2018;
  --color-code-bg: #221e1a;
  --color-streak: #d97757;
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 2: Create src/styles/global.css**

```css
/* src/styles/global.css */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}

code, pre, .mono {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
}

img {
  max-width: 100%;
}
```

- [ ] **Step 3: Create src/context/ThemeContext.jsx**

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('claude-codex-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('claude-codex-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

- [ ] **Step 4: Update src/main.jsx to import styles**

```jsx
// src/main.jsx
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
```

- [ ] **Step 5: Update src/App.jsx to use ThemeProvider**

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <div>Claude Codex</div>
    </ThemeProvider>
  )
}
```

- [ ] **Step 6: Verify theme switching works**

Run: `npm run dev`
Open browser console, run: `document.documentElement.setAttribute('data-theme', 'dark')`
Expected: Background changes to warm charcoal `#1a1410`, text becomes light.

- [ ] **Step 7: Commit**

```bash
git add src/styles/ src/context/ThemeContext.jsx src/main.jsx src/App.jsx
git commit -m "feat: add theme system with light/dark CSS custom properties"
```

---

## Task 3: Hash Router

**Files:**
- Create: `src/hooks/useRouter.js`
- Create: `src/__tests__/useRouter.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/__tests__/useRouter.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRouter } from '../hooks/useRouter'

describe('useRouter', () => {
  beforeEach(() => {
    window.location.hash = ''
  })

  it('returns home route when hash is empty', () => {
    const { result } = renderHook(() => useRouter())
    expect(result.current.route).toBe('home')
    expect(result.current.params).toEqual({})
  })

  it('parses module route', () => {
    window.location.hash = '#/module/01-cli-fundamentals'
    const { result } = renderHook(() => useRouter())
    expect(result.current.route).toBe('module')
    expect(result.current.params.moduleId).toBe('01-cli-fundamentals')
  })

  it('parses lesson route', () => {
    window.location.hash = '#/module/01-cli-fundamentals/lesson/cli-01-03'
    const { result } = renderHook(() => useRouter())
    expect(result.current.route).toBe('lesson')
    expect(result.current.params.moduleId).toBe('01-cli-fundamentals')
    expect(result.current.params.lessonId).toBe('cli-01-03')
  })

  it('navigates by updating hash', () => {
    const { result } = renderHook(() => useRouter())
    act(() => {
      result.current.navigate('/module/01-cli-fundamentals')
    })
    expect(window.location.hash).toBe('#/module/01-cli-fundamentals')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/useRouter.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Implement useRouter**

```js
// src/hooks/useRouter.js
import { useState, useEffect, useCallback } from 'react'

function parseHash(hash) {
  const path = hash.replace(/^#\/?/, '')
  if (!path) return { route: 'home', params: {} }

  const segments = path.split('/')

  if (segments[0] === 'module' && segments[2] === 'lesson') {
    return {
      route: 'lesson',
      params: { moduleId: segments[1], lessonId: segments[3] },
    }
  }

  if (segments[0] === 'module' && segments[1]) {
    return {
      route: 'module',
      params: { moduleId: segments[1] },
    }
  }

  return { route: 'home', params: {} }
}

export function useRouter() {
  const [state, setState] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      setState(parseHash(window.location.hash))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((path) => {
    window.location.hash = '#' + path
  }, [])

  const goHome = useCallback(() => {
    window.location.hash = ''
  }, [])

  return { ...state, navigate, goHome }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/useRouter.test.js`
Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useRouter.js src/__tests__/useRouter.test.js
git commit -m "feat: add hash-based router with home/module/lesson routes"
```

---

## Task 4: XP and Streak Utilities

**Files:**
- Create: `src/utils/xp.js`
- Create: `src/__tests__/xp.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// src/__tests__/xp.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { awardXp, updateStreak, isModuleUnlocked, getModuleProgress } from '../utils/xp'

describe('awardXp', () => {
  it('adds base XP for a concept lesson', () => {
    const progress = { xp: 100 }
    const result = awardXp(progress, { type: 'concept', xp: 10 })
    expect(result.xp).toBe(110)
  })

  it('adds bonus XP for perfect quiz', () => {
    const progress = { xp: 100 }
    const result = awardXp(progress, { type: 'quiz', xp: 10, bonusXp: 5 }, true)
    expect(result.xp).toBe(115)
  })

  it('does not add bonus XP for imperfect quiz', () => {
    const progress = { xp: 100 }
    const result = awardXp(progress, { type: 'quiz', xp: 10, bonusXp: 5 }, false)
    expect(result.xp).toBe(110)
  })
})

describe('updateStreak', () => {
  it('increments streak on new day', () => {
    const streak = { current: 3, lastDate: '2026-04-02', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.current).toBe(4)
    expect(result.lastDate).toBe('2026-04-03')
  })

  it('does not change streak on same day', () => {
    const streak = { current: 3, lastDate: '2026-04-03', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.current).toBe(3)
  })

  it('resets streak if more than 1 day gap', () => {
    const streak = { current: 3, lastDate: '2026-04-01', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.current).toBe(1)
    expect(result.lastDate).toBe('2026-04-03')
  })

  it('updates longest when current exceeds it', () => {
    const streak = { current: 5, lastDate: '2026-04-02', longest: 5 }
    const result = updateStreak(streak, '2026-04-03')
    expect(result.longest).toBe(6)
  })
})

describe('isModuleUnlocked', () => {
  const modules = [
    { id: '01-cli-fundamentals', lessonCount: 3 },
    { id: '02-prompt-engineering', lessonCount: 3 },
    { id: '03-hooks-automation', lessonCount: 3 },
  ]

  it('first module is always unlocked', () => {
    const progress = { modules: {} }
    expect(isModuleUnlocked('01-cli-fundamentals', modules, progress)).toBe(true)
  })

  it('second module unlocked when first is complete', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': {
          lessonsCompleted: ['a', 'b', 'c'],
          completedAt: '2026-04-03',
        },
      },
    }
    expect(isModuleUnlocked('02-prompt-engineering', modules, progress)).toBe(true)
  })

  it('second module locked when first is incomplete', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': {
          lessonsCompleted: ['a', 'b'],
          completedAt: null,
        },
      },
    }
    expect(isModuleUnlocked('02-prompt-engineering', modules, progress)).toBe(false)
  })
})

describe('getModuleProgress', () => {
  it('returns 0 for unstarted module', () => {
    const progress = { modules: {} }
    expect(getModuleProgress('01-cli-fundamentals', 14, progress)).toBe(0)
  })

  it('returns correct percentage', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': { lessonsCompleted: ['a', 'b', 'c'] },
      },
    }
    expect(getModuleProgress('01-cli-fundamentals', 12, progress)).toBeCloseTo(25)
  })

  it('returns 100 for completed module', () => {
    const progress = {
      modules: {
        '01-cli-fundamentals': {
          lessonsCompleted: ['a', 'b', 'c', 'd', 'e'],
        },
      },
    }
    expect(getModuleProgress('01-cli-fundamentals', 5, progress)).toBe(100)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/__tests__/xp.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Implement xp.js**

```js
// src/utils/xp.js

export function awardXp(progress, lesson, isPerfect = false) {
  let earned = lesson.xp || 10
  if (isPerfect && lesson.bonusXp) {
    earned += lesson.bonusXp
  }
  return { ...progress, xp: progress.xp + earned }
}

export function updateStreak(streak, todayStr) {
  if (streak.lastDate === todayStr) {
    return streak
  }

  const lastDate = new Date(streak.lastDate + 'T00:00:00')
  const today = new Date(todayStr + 'T00:00:00')
  const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    const newCurrent = streak.current + 1
    return {
      current: newCurrent,
      lastDate: todayStr,
      longest: Math.max(streak.longest, newCurrent),
    }
  }

  return {
    current: 1,
    lastDate: todayStr,
    longest: streak.longest,
  }
}

export function isModuleUnlocked(moduleId, modulesMetadata, progress) {
  const index = modulesMetadata.findIndex((m) => m.id === moduleId)
  if (index === 0) return true

  const prevModule = modulesMetadata[index - 1]
  const prevProgress = progress.modules?.[prevModule.id]
  if (!prevProgress || !prevProgress.completedAt) return false

  return true
}

export function getModuleProgress(moduleId, totalLessons, progress) {
  const moduleProgress = progress.modules?.[moduleId]
  if (!moduleProgress || !moduleProgress.lessonsCompleted?.length) return 0
  return (moduleProgress.lessonsCompleted.length / totalLessons) * 100
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/xp.test.js`
Expected: All 11 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/xp.js src/__tests__/xp.test.js
git commit -m "feat: add XP award, streak tracking, and module unlock logic"
```

---

## Task 5: Curriculum Loader

**Files:**
- Create: `src/utils/curriculum.js`
- Create: `src/__tests__/curriculum.test.js`

- [ ] **Step 1: Write the failing tests**

```js
// src/__tests__/curriculum.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadModules, loadModuleLessons } from '../utils/curriculum'

describe('loadModules', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches and returns modules.json', async () => {
    const mockModules = [
      { id: '01-cli-fundamentals', title: 'CLI Fundamentals', lessonCount: 14 },
    ]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockModules),
    })

    const result = await loadModules()
    expect(result).toEqual(mockModules)
    expect(fetch).toHaveBeenCalledWith('/curriculum/modules.json')
  })

  it('caches after first fetch', async () => {
    const mockModules = [{ id: '01', title: 'Test' }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockModules),
    })

    await loadModules()
    await loadModules()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})

describe('loadModuleLessons', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches lessons for a module', async () => {
    const mockLessons = [{ id: 'cli-01-01', title: 'What is Claude Code' }]
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockLessons),
    })

    const result = await loadModuleLessons('01-cli-fundamentals')
    expect(result).toEqual(mockLessons)
    expect(fetch).toHaveBeenCalledWith('/curriculum/01-cli-fundamentals.json')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/__tests__/curriculum.test.js`
Expected: FAIL — module not found

- [ ] **Step 3: Implement curriculum.js**

```js
// src/utils/curriculum.js

const cache = {}

export async function loadModules() {
  if (cache.modules) return cache.modules

  const res = await fetch('/curriculum/modules.json')
  const data = await res.json()
  cache.modules = data
  return data
}

export async function loadModuleLessons(moduleId) {
  if (cache[moduleId]) return cache[moduleId]

  const res = await fetch(`/curriculum/${moduleId}.json`)
  const data = await res.json()
  cache[moduleId] = data
  return data
}

export function clearCache() {
  Object.keys(cache).forEach((key) => delete cache[key])
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/curriculum.test.js`
Expected: All 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/curriculum.js src/__tests__/curriculum.test.js
git commit -m "feat: add curriculum JSON loader with caching"
```

---

## Task 6: Progress Context

**Files:**
- Create: `src/context/ProgressContext.jsx`
- Create: `src/hooks/useProgress.js`

- [ ] **Step 1: Create useProgress hook**

```js
// src/hooks/useProgress.js

const STORAGE_KEY = 'claude-codex-progress'

const DEFAULT_PROGRESS = {
  version: 1,
  xp: 0,
  streak: { current: 0, lastDate: null, longest: 0 },
  modules: {},
  quizScores: {},
}

export function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.warn('Failed to load progress:', e)
  }
  return { ...DEFAULT_PROGRESS }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.warn('Failed to save progress:', e)
  }
}

export function exportProgress(progress) {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'claude-codex-progress.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function importProgress(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.version) {
          resolve({ ...DEFAULT_PROGRESS, ...data })
        } else {
          reject(new Error('Invalid progress file'))
        }
      } catch {
        reject(new Error('Failed to parse progress file'))
      }
    }
    reader.readAsText(file)
  })
}
```

- [ ] **Step 2: Create ProgressContext**

```jsx
// src/context/ProgressContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'
import { loadProgress, saveProgress } from '../hooks/useProgress'
import { awardXp, updateStreak } from '../utils/xp'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => loadProgress())

  const updateProgress = useCallback((updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveProgress(next)
      return next
    })
  }, [])

  const completeLesson = useCallback((moduleId, lessonId, lesson, isPerfect = false) => {
    updateProgress((prev) => {
      const moduleProgress = prev.modules[moduleId] || {
        unlocked: true,
        lessonsCompleted: [],
        completedAt: null,
      }

      if (moduleProgress.lessonsCompleted.includes(lessonId)) {
        return prev
      }

      const updatedLessons = [...moduleProgress.lessonsCompleted, lessonId]
      const today = new Date().toISOString().split('T')[0]

      let next = awardXp(prev, lesson, isPerfect)
      const updatedStreak = updateStreak(
        prev.streak.lastDate ? prev.streak : { ...prev.streak, lastDate: today, current: 0 },
        today
      )

      next = {
        ...next,
        streak: updatedStreak,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...moduleProgress,
            lessonsCompleted: updatedLessons,
            completedAt: null, // Set by caller when all lessons done
          },
        },
      }

      return next
    })
  }, [updateProgress])

  const completeModule = useCallback((moduleId) => {
    updateProgress((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          completedAt: new Date().toISOString().split('T')[0],
        },
      },
    }))
  }, [updateProgress])

  const saveQuizScore = useCallback((lessonId, score, total) => {
    updateProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [lessonId]: {
          score,
          total,
          bonus: score === total,
          attempts: (prev.quizScores[lessonId]?.attempts || 0) + 1,
        },
      },
    }))
  }, [updateProgress])

  const resetProgress = useCallback(() => {
    const fresh = loadProgress()
    localStorage.removeItem('claude-codex-progress')
    setProgress(fresh)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeLesson,
        completeModule,
        saveQuizScore,
        resetProgress,
        updateProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgressContext must be used within ProgressProvider')
  return context
}
```

- [ ] **Step 3: Update App.jsx to include ProgressProvider**

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <div>Claude Codex</div>
      </ProgressProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 4: Verify app still loads**

Run: `npm run dev`
Expected: App loads without errors. No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useProgress.js src/context/ProgressContext.jsx src/App.jsx
git commit -m "feat: add progress context with localStorage persistence"
```

---

## Task 7: TopBar Component

**Files:**
- Create: `src/components/TopBar/TopBar.jsx`
- Create: `src/components/TopBar/TopBar.module.css`
- Modify: `src/App.jsx` — render TopBar

- [ ] **Step 1: Create TopBar.module.css**

```css
/* src/components/TopBar/TopBar.module.css */
.topBar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logoMark {
  width: 32px;
  height: 32px;
  background-color: var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}

.logoText {
  font-weight: 600;
  font-size: 18px;
  color: var(--color-text);
}

.stats {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.streakIcon {
  font-size: 18px;
  color: var(--color-streak);
}

.xpBadge {
  background-color: var(--color-surface);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
}

.themeToggle {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  transition: background-color 0.2s;
}

.themeToggle:hover {
  background-color: var(--color-surface);
}
```

- [ ] **Step 2: Create TopBar.jsx**

```jsx
// src/components/TopBar/TopBar.jsx
import { useTheme } from '../../context/ThemeContext'
import { useProgressContext } from '../../context/ProgressContext'
import styles from './TopBar.module.css'

export default function TopBar({ onLogoClick }) {
  const { theme, toggleTheme } = useTheme()
  const { progress } = useProgressContext()

  return (
    <header className={styles.topBar}>
      <div className={styles.logo} onClick={onLogoClick}>
        <div className={styles.logoMark}>C</div>
        <span className={styles.logoText}>Claude Codex</span>
      </div>

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
```

- [ ] **Step 3: Create App.module.css**

```css
/* src/App.module.css */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px;
  width: 100%;
}
```

- [ ] **Step 4: Update App.jsx to render TopBar and router**

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { useRouter } from './hooks/useRouter'
import TopBar from './components/TopBar/TopBar'
import styles from './App.module.css'

function AppContent() {
  const { route, params, navigate, goHome } = useRouter()

  return (
    <div className={styles.app}>
      <TopBar onLogoClick={goHome} />
      <main className={styles.content}>
        {route === 'home' && <div>Module Map (coming next)</div>}
        {route === 'module' && <div>Lessons for {params.moduleId}</div>}
        {route === 'lesson' && <div>Lesson {params.lessonId}</div>}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 5: Verify TopBar renders**

Run: `npm run dev`
Expected: Top bar with "C" logo mark, "Claude Codex" text, theme toggle (moon/sun), streak flame with "0", and "0 XP" badge. Clicking theme toggle switches between light and dark.

- [ ] **Step 6: Commit**

```bash
git add src/components/TopBar/ src/App.jsx src/App.module.css
git commit -m "feat: add TopBar with logo, theme toggle, streak, and XP display"
```

---

## Task 8: ProgressRing Component

**Files:**
- Create: `src/components/ProgressRing/ProgressRing.jsx`
- Create: `src/components/ProgressRing/ProgressRing.module.css`

- [ ] **Step 1: Create ProgressRing.module.css**

```css
/* src/components/ProgressRing/ProgressRing.module.css */
.ring {
  transform: rotate(-90deg);
}

.trackCircle {
  fill: none;
  stroke: var(--color-border);
}

.progressCircle {
  fill: none;
  stroke: var(--color-accent);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.6s ease;
}

.completed .progressCircle {
  stroke: var(--color-success);
}
```

- [ ] **Step 2: Create ProgressRing.jsx**

```jsx
// src/components/ProgressRing/ProgressRing.jsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressRing/
git commit -m "feat: add ProgressRing SVG component"
```

---

## Task 9: ModuleMap (Home Screen)

**Files:**
- Create: `src/components/ModuleMap/ModuleMap.jsx`
- Create: `src/components/ModuleMap/ModuleMap.module.css`
- Modify: `src/App.jsx` — render ModuleMap on home route

- [ ] **Step 1: Create ModuleMap.module.css**

```css
/* src/components/ModuleMap/ModuleMap.module.css */
.map {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 64px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text);
}

.subtitle {
  font-size: 15px;
  color: var(--color-text-muted);
  margin-bottom: 48px;
}

.path {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
}

.connector {
  width: 3px;
  height: 40px;
  background: var(--color-border);
}

.connector.completed {
  background: var(--color-accent);
}

.node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.node:hover:not(.locked) {
  transform: scale(1.05);
}

.nodeCircle {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  border: 3px solid var(--color-border);
  font-size: 28px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.node.current .nodeCircle {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.2);
}

.node.completed .nodeCircle {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.node.locked .nodeCircle {
  opacity: 0.4;
  cursor: not-allowed;
}

.checkmark {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.lockIcon {
  font-size: 20px;
  color: var(--color-text-muted);
  opacity: 0.5;
}

.ringOverlay {
  position: absolute;
  top: -4px;
  left: -4px;
}

.nodeInfo {
  text-align: left;
}

.nodeNumber {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.nodeTitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}

.node.locked .nodeTitle {
  color: var(--color-text-muted);
}

.nodeProgress {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 2px;
}

/* Alternating left/right offset for winding path */
.node:nth-child(4n+1) { /* positions: 1, 5, 9 */
  align-self: center;
}
.node:nth-child(4n+3) { /* positions: 3, 7 */
  align-self: center;
  flex-direction: row-reverse;
}
.node:nth-child(4n+3) .nodeInfo {
  text-align: right;
}
```

- [ ] **Step 2: Create ModuleMap.jsx**

```jsx
// src/components/ModuleMap/ModuleMap.jsx
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
```

- [ ] **Step 3: Update App.jsx to render ModuleMap**

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { useRouter } from './hooks/useRouter'
import TopBar from './components/TopBar/TopBar'
import ModuleMap from './components/ModuleMap/ModuleMap'
import styles from './App.module.css'

function AppContent() {
  const { route, params, navigate, goHome } = useRouter()

  return (
    <div className={styles.app}>
      <TopBar onLogoClick={goHome} />
      <main className={styles.content}>
        {route === 'home' && (
          <ModuleMap onModuleClick={(id) => navigate(`/module/${id}`)} />
        )}
        {route === 'module' && <div>Lessons for {params.moduleId}</div>}
        {route === 'lesson' && <div>Lesson {params.lessonId}</div>}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 4: Create minimal modules.json for testing**

```json
// public/curriculum/modules.json
[
  {
    "id": "01-cli-fundamentals",
    "title": "CLI Fundamentals",
    "description": "Installation, commands, CLAUDE.md, memory, settings, permissions, models, and cost management.",
    "lessonCount": 14
  },
  {
    "id": "02-prompt-engineering",
    "title": "Prompt Engineering for CLI",
    "description": "Structured prompts, context management, multi-turn strategies, and output control.",
    "lessonCount": 12
  },
  {
    "id": "03-hooks-automation",
    "title": "Hooks & Automation Inside Claude",
    "description": "Event hooks, tool matchers, security gates, and automated workflows within Claude Code.",
    "lessonCount": 8
  },
  {
    "id": "04-skills-plugins",
    "title": "Skills & Plugins",
    "description": "Custom skills, YAML frontmatter, plugin manifests, and the plugin ecosystem.",
    "lessonCount": 10
  },
  {
    "id": "05-mcp-servers",
    "title": "MCP Servers",
    "description": "Model Context Protocol — connecting Claude to external tools and services.",
    "lessonCount": 11
  },
  {
    "id": "06-subagents",
    "title": "Subagents",
    "description": "Dispatching workers, parallel execution, orchestration patterns, and agent teams.",
    "lessonCount": 12
  },
  {
    "id": "07-scripts-pipelines",
    "title": "Claude in Scripts & Pipelines",
    "description": "The --print flag, JSON output, shell piping, batch processing, and CI/CD.",
    "lessonCount": 8
  },
  {
    "id": "08-n8n-integration",
    "title": "n8n Integration",
    "description": "Claude as an n8n node, and Claude as the builder of n8n workflows.",
    "lessonCount": 12
  },
  {
    "id": "09-business-automation",
    "title": "Business Automation Templates",
    "description": "Student onboarding, scheduling, invoicing, leads, SOPs, and Skool workflows.",
    "lessonCount": 10
  },
  {
    "id": "10-content-pipelines",
    "title": "Content Production Pipelines",
    "description": "YouTube scripts, social media batching, newsletters, repurposing, and content calendars.",
    "lessonCount": 8
  }
]
```

- [ ] **Step 5: Verify module map renders**

Run: `npm run dev`
Expected: Vertical path of 10 module nodes. Module 1 shows as "current" (unlocked, with accent border). Modules 2-10 show as locked (greyed, lock icon). Clicking Module 1 navigates to `#/module/01-cli-fundamentals`.

- [ ] **Step 6: Commit**

```bash
git add src/components/ModuleMap/ src/components/ProgressRing/ src/App.jsx public/curriculum/modules.json
git commit -m "feat: add ModuleMap home screen with vertical skill tree"
```

---

## Task 10: LessonList Component

**Files:**
- Create: `src/components/LessonList/LessonList.jsx`
- Create: `src/components/LessonList/LessonList.module.css`
- Modify: `src/App.jsx` — render LessonList on module route

- [ ] **Step 1: Create LessonList.module.css**

```css
/* src/components/LessonList/LessonList.module.css */
.container {
  padding: 16px 0;
}

.header {
  margin-bottom: 32px;
}

.backButton {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-muted);
  background: none;
  padding: 8px 0;
  margin-bottom: 16px;
  transition: color 0.2s;
}

.backButton:hover {
  color: var(--color-accent);
}

.moduleTitle {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.moduleDescription {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.progressBar {
  margin-top: 16px;
  background: var(--color-border);
  border-radius: 100px;
  height: 6px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 100px;
  transition: width 0.4s ease;
}

.lessons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lessonItem {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.lessonItem:hover:not(.locked) {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-card-hover);
}

.lessonItem.completed {
  opacity: 0.7;
}

.lessonItem.current {
  border-color: var(--color-accent);
  background: var(--color-surface);
}

.lessonItem.locked {
  opacity: 0.4;
  cursor: not-allowed;
}

.lessonNumber {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.lessonItem.completed .lessonNumber {
  background: var(--color-accent);
  color: #fff;
}

.lessonItem.current .lessonNumber {
  background: var(--color-accent);
  color: #fff;
}

.lessonInfo {
  flex: 1;
}

.lessonTitle {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
}

.lessonType {
  font-size: 12px;
  color: var(--color-text-muted);
  text-transform: capitalize;
}

.lessonCheck {
  color: var(--color-success);
  font-size: 18px;
}
```

- [ ] **Step 2: Create LessonList.jsx**

```jsx
// src/components/LessonList/LessonList.jsx
import { useState, useEffect } from 'react'
import { useProgressContext } from '../../context/ProgressContext'
import { loadModules, loadModuleLessons } from '../../utils/curriculum'
import { getModuleProgress } from '../../utils/xp'
import styles from './LessonList.module.css'

const TYPE_LABELS = {
  concept: 'Concept',
  example: 'Example',
  quiz: 'Quiz',
  'hands-on': 'Hands-on',
  build: 'Build',
}

export default function LessonList({ moduleId, onBack, onLessonClick }) {
  const [modules, setModules] = useState([])
  const [lessons, setLessons] = useState([])
  const { progress } = useProgressContext()

  useEffect(() => {
    loadModules().then(setModules)
    loadModuleLessons(moduleId).then(setLessons)
  }, [moduleId])

  const moduleMeta = modules.find((m) => m.id === moduleId)
  const completedLessons = progress.modules[moduleId]?.lessonsCompleted || []
  const percent = moduleMeta ? getModuleProgress(moduleId, moduleMeta.lessonCount, progress) : 0

  function getLessonState(lesson, index) {
    if (completedLessons.includes(lesson.id)) return 'completed'

    // First incomplete lesson is current
    const firstIncompleteIndex = lessons.findIndex(
      (l) => !completedLessons.includes(l.id)
    )
    if (index === firstIncompleteIndex) return 'current'

    return 'locked'
  }

  if (!moduleMeta) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          {'\u2190'} Back to modules
        </button>
        <h2 className={styles.moduleTitle}>{moduleMeta.title}</h2>
        <p className={styles.moduleDescription}>{moduleMeta.description}</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className={styles.lessons}>
        {lessons.map((lesson, i) => {
          const state = getLessonState(lesson, i)

          return (
            <div
              key={lesson.id}
              className={`${styles.lessonItem} ${styles[state]}`}
              onClick={() => state !== 'locked' && onLessonClick(lesson.id)}
            >
              <div className={styles.lessonNumber}>
                {state === 'completed' ? '\u2713' : i + 1}
              </div>
              <div className={styles.lessonInfo}>
                <div className={styles.lessonTitle}>{lesson.title}</div>
                <div className={styles.lessonType}>{TYPE_LABELS[lesson.type] || lesson.type}</div>
              </div>
              {state === 'completed' && (
                <span className={styles.lessonCheck}>{'\u2713'}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update App.jsx to render LessonList**

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { useRouter } from './hooks/useRouter'
import TopBar from './components/TopBar/TopBar'
import ModuleMap from './components/ModuleMap/ModuleMap'
import LessonList from './components/LessonList/LessonList'
import styles from './App.module.css'

function AppContent() {
  const { route, params, navigate, goHome } = useRouter()

  return (
    <div className={styles.app}>
      <TopBar onLogoClick={goHome} />
      <main className={styles.content}>
        {route === 'home' && (
          <ModuleMap onModuleClick={(id) => navigate(`/module/${id}`)} />
        )}
        {route === 'module' && (
          <LessonList
            moduleId={params.moduleId}
            onBack={goHome}
            onLessonClick={(lessonId) =>
              navigate(`/module/${params.moduleId}/lesson/${lessonId}`)
            }
          />
        )}
        {route === 'lesson' && <div>Lesson {params.lessonId}</div>}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 4: Create a minimal Module 1 JSON for testing (first 3 lessons only)**

```json
// public/curriculum/01-cli-fundamentals.json
[
  {
    "id": "cli-01-01",
    "title": "What is Claude Code (and How It Differs from Chat)",
    "type": "concept",
    "xp": 10,
    "content": {
      "explanation": "Placeholder — full content in Task 15."
    }
  },
  {
    "id": "cli-01-02",
    "title": "Installing and Launching Claude Code",
    "type": "hands-on",
    "xp": 15,
    "content": {
      "explanation": "Placeholder — full content in Task 15."
    }
  },
  {
    "id": "cli-01-03",
    "title": "Your First Conversation in the Terminal",
    "type": "hands-on",
    "xp": 15,
    "content": {
      "explanation": "Placeholder — full content in Task 15."
    }
  }
]
```

- [ ] **Step 5: Verify lesson list renders**

Run: `npm run dev`
Navigate to `#/module/01-cli-fundamentals`.
Expected: Back button, module title, description, progress bar at 0%, list of 3 lesson items. First lesson highlighted as "current", others locked.

- [ ] **Step 6: Commit**

```bash
git add src/components/LessonList/ src/App.jsx public/curriculum/01-cli-fundamentals.json
git commit -m "feat: add LessonList view with lesson states and progress bar"
```

---

## Task 11: CodeBlock and TermTooltip Components

**Files:**
- Create: `src/components/CodeBlock/CodeBlock.jsx`
- Create: `src/components/CodeBlock/CodeBlock.module.css`
- Create: `src/components/TermTooltip/TermTooltip.jsx`
- Create: `src/components/TermTooltip/TermTooltip.module.css`

- [ ] **Step 1: Create CodeBlock.module.css**

```css
/* src/components/CodeBlock/CodeBlock.module.css */
.codeBlock {
  position: relative;
  margin: 16px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  font-size: 12px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.copyButton {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  transition: all 0.2s;
}

.copyButton:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.copied {
  color: var(--color-success);
  border-color: var(--color-success);
}

.pre {
  margin: 0;
  padding: 16px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
}

.annotation {
  margin-top: 8px;
  font-size: 13px;
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.5;
}
```

- [ ] **Step 2: Create CodeBlock.jsx**

```jsx
// src/components/CodeBlock/CodeBlock.jsx
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
```

- [ ] **Step 3: Create TermTooltip.module.css**

```css
/* src/components/TermTooltip/TermTooltip.module.css */
.termBox {
  background: var(--color-term-bg);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 14px 16px;
  margin: 12px 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text);
}

.term {
  font-weight: 600;
  color: var(--color-accent);
}

.definition {
  color: var(--color-text);
}

.termList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

- [ ] **Step 4: Create TermTooltip.jsx**

```jsx
// src/components/TermTooltip/TermTooltip.jsx
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
```

- [ ] **Step 5: Commit**

```bash
git add src/components/CodeBlock/ src/components/TermTooltip/
git commit -m "feat: add CodeBlock with copy button and TermTooltip callouts"
```

---

## Task 12: Lesson Card Components

**Files:**
- Create: `src/components/cards/cards.module.css`
- Create: `src/components/cards/ConceptCard.jsx`
- Create: `src/components/cards/ExampleCard.jsx`
- Create: `src/components/cards/QuizCard.jsx`
- Create: `src/components/cards/HandsOnCard.jsx`
- Create: `src/components/cards/BuildCard.jsx`

- [ ] **Step 1: Create shared cards.module.css**

```css
/* src/components/cards/cards.module.css */
.card {
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 32px 24px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.typeBadge {
  display: inline-block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 20px;
  line-height: 1.3;
}

.explanation {
  font-size: 15px;
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: 20px;
}

.continueButton {
  display: block;
  width: 100%;
  padding: 14px;
  background: var(--color-accent);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--radius-md);
  margin-top: 24px;
  transition: background-color 0.2s;
}

.continueButton:hover {
  background: var(--color-accent-hover);
}

.continueButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Quiz styles */
.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}

.choice {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 15px;
  transition: border-color 0.2s;
  text-align: left;
  color: var(--color-text);
  width: 100%;
}

.choice:hover:not(.selected):not(.correct):not(.wrong) {
  border-color: var(--color-accent);
}

.choice.selected {
  border-color: var(--color-accent);
  background: var(--color-term-bg);
}

.choice.correct {
  border-color: var(--color-success);
  background: rgba(76, 175, 80, 0.1);
}

.choice.wrong {
  border-color: var(--color-error);
  background: rgba(231, 76, 60, 0.1);
}

.choiceLetter {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  background: var(--color-border);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.choice.correct .choiceLetter {
  background: var(--color-success);
  color: #fff;
}

.choice.wrong .choiceLetter {
  background: var(--color-error);
  color: #fff;
}

.feedbackBox {
  padding: 14px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.6;
  margin-top: 12px;
  animation: slideIn 0.2s ease;
}

.feedbackCorrect {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid var(--color-success);
  color: var(--color-success);
}

.feedbackWrong {
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid var(--color-error);
  color: var(--color-error);
}

/* Hands-on / Build styles */
.exerciseBox {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-top: 20px;
}

.exerciseLabel {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-muted);
  margin-bottom: 10px;
}

.exerciseInstruction {
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 16px;
}

.textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text);
  resize: vertical;
  line-height: 1.5;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.validationError {
  font-size: 13px;
  color: var(--color-error);
  margin-top: 8px;
}

/* Build card checklist */
.checklist {
  list-style: none;
  margin: 16px 0;
}

.checklistItem {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text);
}

.checklistItem input[type="checkbox"] {
  margin-top: 3px;
  accent-color: var(--color-accent);
}

.checklistItem.checked {
  color: var(--color-text-muted);
  text-decoration: line-through;
}
```

- [ ] **Step 2: Create ConceptCard.jsx**

```jsx
// src/components/cards/ConceptCard.jsx
import TermTooltip from '../TermTooltip/TermTooltip'
import styles from './cards.module.css'

export default function ConceptCard({ lesson, onComplete }) {
  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Concept</span>
      <h2 className={styles.title}>{lesson.title}</h2>
      <div className={styles.explanation}>{lesson.content.explanation}</div>
      <TermTooltip terminology={lesson.content.terminology} />
      <button className={styles.continueButton} onClick={onComplete}>
        Got it
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Create ExampleCard.jsx**

```jsx
// src/components/cards/ExampleCard.jsx
import TermTooltip from '../TermTooltip/TermTooltip'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './cards.module.css'

export default function ExampleCard({ lesson, onComplete }) {
  const { codeExample } = lesson.content

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
```

- [ ] **Step 4: Create QuizCard.jsx**

```jsx
// src/components/cards/QuizCard.jsx
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

      <div className={styles.choices}>
        {choices.map((choice, i) => (
          <button
            key={i}
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
```

- [ ] **Step 5: Create HandsOnCard.jsx**

```jsx
// src/components/cards/HandsOnCard.jsx
import { useState } from 'react'
import TermTooltip from '../TermTooltip/TermTooltip'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './cards.module.css'

export default function HandsOnCard({ lesson, onComplete }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const { exercise, codeExample } = lesson.content
  const inputType = exercise?.inputType || 'confirm'

  const handleSubmit = () => {
    if (inputType === 'confirm') {
      onComplete()
      return
    }

    const validation = exercise?.validation
    if (validation) {
      if (validation.type === 'length' && input.length < (validation.min || 0)) {
        setError(validation.errorMessage || 'Response is too short.')
        return
      }
      if (validation.type === 'keyword') {
        const keywords = validation.keywords || []
        const missing = keywords.filter(
          (kw) => !input.toLowerCase().includes(kw.toLowerCase())
        )
        if (missing.length) {
          setError(validation.errorMessage || `Missing: ${missing.join(', ')}`)
          return
        }
      }
    }

    setError('')
    onComplete()
  }

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Hands-on</span>
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

      <div className={styles.exerciseBox}>
        <div className={styles.exerciseLabel}>Try it yourself</div>
        <div className={styles.exerciseInstruction}>{exercise?.instruction}</div>

        {inputType === 'textarea' || inputType === 'paste' ? (
          <textarea
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputType === 'paste' ? 'Paste your output here...' : 'Type your answer...'}
          />
        ) : null}

        {error && <div className={styles.validationError}>{error}</div>}
      </div>

      <button className={styles.continueButton} onClick={handleSubmit}>
        {inputType === 'confirm' ? 'I did it' : 'Submit'}
      </button>
    </div>
  )
}
```

- [ ] **Step 6: Create BuildCard.jsx**

```jsx
// src/components/cards/BuildCard.jsx
import { useState } from 'react'
import TermTooltip from '../TermTooltip/TermTooltip'
import CodeBlock from '../CodeBlock/CodeBlock'
import styles from './cards.module.css'

export default function BuildCard({ lesson, onComplete }) {
  const steps = lesson.content.exercise?.steps || []
  const [checked, setChecked] = useState(new Set())

  const toggleStep = (index) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const allDone = steps.length > 0 && checked.size === steps.length

  return (
    <div className={styles.card}>
      <span className={styles.typeBadge}>Build</span>
      <h2 className={styles.title}>{lesson.title}</h2>
      <div className={styles.explanation}>{lesson.content.explanation}</div>
      <TermTooltip terminology={lesson.content.terminology} />

      {lesson.content.codeExample && (
        <CodeBlock
          language={lesson.content.codeExample.language}
          code={lesson.content.codeExample.code}
          annotation={lesson.content.codeExample.annotation}
        />
      )}

      {steps.length > 0 && (
        <div className={styles.exerciseBox}>
          <div className={styles.exerciseLabel}>Project Checklist</div>
          <ul className={styles.checklist}>
            {steps.map((step, i) => (
              <li
                key={i}
                className={`${styles.checklistItem} ${checked.has(i) ? styles.checked : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked.has(i)}
                  onChange={() => toggleStep(i)}
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className={styles.continueButton}
        disabled={steps.length > 0 && !allDone}
        onClick={onComplete}
      >
        Complete Module
      </button>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/cards/
git commit -m "feat: add all lesson card types — concept, example, quiz, hands-on, build"
```

---

## Task 13: LessonView (Card Dispatcher)

**Files:**
- Create: `src/components/LessonView/LessonView.jsx`
- Create: `src/components/LessonView/LessonView.module.css`
- Modify: `src/App.jsx` — render LessonView on lesson route

- [ ] **Step 1: Create LessonView.module.css**

```css
/* src/components/LessonView/LessonView.module.css */
.container {
  padding: 16px 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.backButton {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-muted);
  background: none;
  padding: 8px 0;
  transition: color 0.2s;
}

.backButton:hover {
  color: var(--color-accent);
}

.progressDots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
}

.dot.completed {
  background: var(--color-accent);
}

.dot.current {
  background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.3);
}

.xpEarned {
  position: fixed;
  top: 80px;
  right: 24px;
  background: var(--color-accent);
  color: #fff;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  animation: xpPop 0.5s ease, xpFade 0.5s ease 1.5s forwards;
  z-index: 200;
}

@keyframes xpPop {
  0% { transform: scale(0.5) translateY(10px); opacity: 0; }
  60% { transform: scale(1.1) translateY(-5px); }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes xpFade {
  to { opacity: 0; transform: translateY(-20px); }
}
```

- [ ] **Step 2: Create LessonView.jsx**

```jsx
// src/components/LessonView/LessonView.jsx
import { useState, useEffect } from 'react'
import { useProgressContext } from '../../context/ProgressContext'
import { loadModuleLessons, loadModules } from '../../utils/curriculum'
import ConceptCard from '../cards/ConceptCard'
import ExampleCard from '../cards/ExampleCard'
import QuizCard from '../cards/QuizCard'
import HandsOnCard from '../cards/HandsOnCard'
import BuildCard from '../cards/BuildCard'
import styles from './LessonView.module.css'

const CARD_COMPONENTS = {
  concept: ConceptCard,
  example: ExampleCard,
  quiz: QuizCard,
  'hands-on': HandsOnCard,
  build: BuildCard,
}

export default function LessonView({ moduleId, lessonId, onBack, onNavigate }) {
  const [lessons, setLessons] = useState([])
  const [modules, setModules] = useState([])
  const [xpPopup, setXpPopup] = useState(null)
  const { progress, completeLesson, completeModule, saveQuizScore } = useProgressContext()

  useEffect(() => {
    loadModuleLessons(moduleId).then(setLessons)
    loadModules().then(setModules)
  }, [moduleId])

  const lesson = lessons.find((l) => l.id === lessonId)
  const lessonIndex = lessons.findIndex((l) => l.id === lessonId)
  const completedLessons = progress.modules[moduleId]?.lessonsCompleted || []

  if (!lesson) return null

  const handleComplete = (isPerfect = false) => {
    completeLesson(moduleId, lessonId, lesson, isPerfect)

    // Show XP popup
    const earned = lesson.xp || 10
    const bonus = isPerfect && lesson.bonusXp ? lesson.bonusXp : 0
    setXpPopup(earned + bonus)
    setTimeout(() => setXpPopup(null), 2200)

    // Check if module is complete
    const updatedCompleted = [...completedLessons, lessonId]
    const moduleMeta = modules.find((m) => m.id === moduleId)
    if (moduleMeta && updatedCompleted.length >= moduleMeta.lessonCount) {
      completeModule(moduleId)
    }

    // Navigate to next lesson or back to module
    setTimeout(() => {
      if (lessonIndex < lessons.length - 1) {
        const nextLesson = lessons[lessonIndex + 1]
        onNavigate(`/module/${moduleId}/lesson/${nextLesson.id}`)
      } else {
        onBack()
      }
    }, 800)
  }

  const handleQuizScore = (qLessonId, score, total) => {
    saveQuizScore(qLessonId, score, total)
  }

  const CardComponent = CARD_COMPONENTS[lesson.type]
  if (!CardComponent) return <div>Unknown lesson type: {lesson.type}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          {'\u2190'} Back
        </button>
        <div className={styles.progressDots}>
          {lessons.map((l, i) => (
            <div
              key={l.id}
              className={`${styles.dot} ${
                completedLessons.includes(l.id) ? styles.completed : ''
              } ${l.id === lessonId ? styles.current : ''}`}
            />
          ))}
        </div>
      </div>

      <CardComponent
        lesson={lesson}
        onComplete={handleComplete}
        onQuizScore={handleQuizScore}
      />

      {xpPopup !== null && (
        <div className={styles.xpEarned}>+{xpPopup} XP</div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Update App.jsx with LessonView**

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { useRouter } from './hooks/useRouter'
import TopBar from './components/TopBar/TopBar'
import ModuleMap from './components/ModuleMap/ModuleMap'
import LessonList from './components/LessonList/LessonList'
import LessonView from './components/LessonView/LessonView'
import styles from './App.module.css'

function AppContent() {
  const { route, params, navigate, goHome } = useRouter()

  return (
    <div className={styles.app}>
      <TopBar onLogoClick={goHome} />
      <main className={styles.content}>
        {route === 'home' && (
          <ModuleMap onModuleClick={(id) => navigate(`/module/${id}`)} />
        )}
        {route === 'module' && (
          <LessonList
            moduleId={params.moduleId}
            onBack={goHome}
            onLessonClick={(lessonId) =>
              navigate(`/module/${params.moduleId}/lesson/${lessonId}`)
            }
          />
        )}
        {route === 'lesson' && (
          <LessonView
            moduleId={params.moduleId}
            lessonId={params.lessonId}
            onBack={() => navigate(`/module/${params.moduleId}`)}
            onNavigate={navigate}
          />
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  )
}
```

- [ ] **Step 4: Verify lesson flow works**

Run: `npm run dev`
1. Click Module 1 on the map
2. Click the first lesson
3. Should see the concept card with "Got it" button
4. Click "Got it" — XP popup appears, auto-advances to next lesson
5. Back button returns to lesson list

- [ ] **Step 5: Commit**

```bash
git add src/components/LessonView/ src/App.jsx
git commit -m "feat: add LessonView dispatcher with XP popup and auto-advance"
```

---

## Task 14: CelebrationOverlay

**Files:**
- Create: `src/components/CelebrationOverlay/CelebrationOverlay.jsx`
- Create: `src/components/CelebrationOverlay/CelebrationOverlay.module.css`
- Modify: `src/components/LessonView/LessonView.jsx` — trigger on module complete

- [ ] **Step 1: Create CelebrationOverlay.module.css**

```css
/* src/components/CelebrationOverlay/CelebrationOverlay.module.css */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--color-card);
  border-radius: var(--radius-lg);
  padding: 48px 32px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  animation: popIn 0.4s ease;
}

@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.trophy {
  font-size: 64px;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

.xpSummary {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 24px;
}

.continueButton {
  padding: 14px 32px;
  background: var(--color-accent);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: background-color 0.2s;
}

.continueButton:hover {
  background: var(--color-accent-hover);
}

.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1001;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: fall 2s ease-out forwards;
}

@keyframes fall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
```

- [ ] **Step 2: Create CelebrationOverlay.jsx**

```jsx
// src/components/CelebrationOverlay/CelebrationOverlay.jsx
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
```

- [ ] **Step 3: Add celebration trigger to LessonView.jsx**

Add to LessonView.jsx imports:
```jsx
import CelebrationOverlay from '../CelebrationOverlay/CelebrationOverlay'
```

Add state:
```jsx
const [showCelebration, setShowCelebration] = useState(false)
```

In handleComplete, replace the module completion and navigation section:
```jsx
    // Check if module is complete
    const updatedCompleted = [...completedLessons, lessonId]
    const moduleMeta = modules.find((m) => m.id === moduleId)
    if (moduleMeta && updatedCompleted.length >= moduleMeta.lessonCount) {
      completeModule(moduleId)
      setShowCelebration(true)
      return // Don't auto-navigate, celebration handles it
    }

    // Navigate to next lesson
    setTimeout(() => {
      if (lessonIndex < lessons.length - 1) {
        const nextLesson = lessons[lessonIndex + 1]
        onNavigate(`/module/${moduleId}/lesson/${nextLesson.id}`)
      } else {
        onBack()
      }
    }, 800)
```

Add at end of return JSX, before closing `</div>`:
```jsx
      {showCelebration && (
        <CelebrationOverlay
          moduleName={modules.find((m) => m.id === moduleId)?.title}
          onContinue={() => {
            setShowCelebration(false)
            onBack()
          }}
        />
      )}
```

- [ ] **Step 4: Verify celebration works**

This is hard to test with 14 lessons. Temporarily reduce Module 1 JSON to 1 lesson, complete it, and verify the celebration overlay appears with confetti particles and "Module Complete!" message.

- [ ] **Step 5: Commit**

```bash
git add src/components/CelebrationOverlay/ src/components/LessonView/LessonView.jsx
git commit -m "feat: add celebration overlay with confetti on module completion"
```

---

## Task 15: Module 1 Curriculum Content (Full 14 Lessons)

**Files:**
- Modify: `public/curriculum/01-cli-fundamentals.json` — replace placeholder with full content

- [ ] **Step 1: Write the complete Module 1 JSON**

Replace `public/curriculum/01-cli-fundamentals.json` with the full 14-lesson curriculum. This is a large JSON file. Each lesson must include:
- `id`, `title`, `type`, `xp` (and `bonusXp` for quizzes)
- `content.explanation` — 5th-grader clarity, real terminology
- `content.terminology` — array of `{term, definition}` for any new jargon
- `content.codeExample` — for example and hands-on types
- `content.exercise` — for quiz, hands-on, and build types

Write the full JSON file with all 14 lessons containing real, accurate, educational content about Claude Code CLI. Each explanation should be 2-4 paragraphs. Each code example should be real, runnable commands or configurations.

**Lesson content sources:**
- Lesson 1 (concept): What Claude Code is — a CLI tool, not a chatbot. Runs in your terminal. Has access to files, can run commands, uses tools. Contrast with claude.ai chat.
- Lesson 2 (hands-on): Install with `npm install -g @anthropic-ai/claude-code`. Launch with `claude`. First run auth flow.
- Lesson 3 (hands-on): Start a conversation. Ask Claude to read a file. Ask it to search for something. Observe tool use.
- Lesson 4 (concept): Context window — what fits, what gets compressed, how /compact works. Conversation as working memory.
- Lesson 5 (hands-on): Create a CLAUDE.md file. Real example rules. Show global vs project scope.
- Lesson 6 (example): Read tool, Grep tool, Glob tool. Show real commands and what they do.
- Lesson 7 (example): Bash tool. Running npm, git, python through Claude. Permission prompts.
- Lesson 8 (concept): Tools are actions Claude can take. Read, Write, Edit, Bash, Glob, Grep. Each has a purpose.
- Lesson 9 (quiz): Permission modes — what each one allows. Multiple choice.
- Lesson 10 (concept): Memory system. MEMORY.md as index. Auto memory saves learnings. Persists across sessions.
- Lesson 11 (example): settings.json — where it lives, what you can configure. Show real config snippets.
- Lesson 12 (quiz): Models — Opus vs Sonnet vs Haiku. When to use each. Cost vs capability tradeoffs.
- Lesson 13 (hands-on): Run /cost, /context, /stats. Understand token usage. Cost optimization tips.
- Lesson 14 (build): Set up Claude Code on a real project. Create CLAUDE.md with 5+ rules. Run 3 commands. Verify memory works. Checklist of steps.

- [ ] **Step 2: Validate JSON is well-formed**

Run: `node -e "JSON.parse(require('fs').readFileSync('public/curriculum/01-cli-fundamentals.json','utf8')); console.log('Valid JSON')"`
Expected: `Valid JSON`

- [ ] **Step 3: Verify lessons render in app**

Run: `npm run dev`
Navigate to Module 1 lesson list. Verify all 14 lessons appear. Click through the first 3 to verify content renders correctly — explanations, terminology boxes, code blocks, exercises.

- [ ] **Step 4: Commit**

```bash
git add public/curriculum/01-cli-fundamentals.json
git commit -m "feat: add full Module 1 curriculum — CLI Fundamentals (14 lessons)"
```

---

## Task 16: Run All Tests and Final Verification

**Files:**
- No new files. Verification only.

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass (xp, router, curriculum loader).

- [ ] **Step 2: Build production bundle**

Run: `npm run build`
Expected: Build succeeds. Output in `dist/` directory.

- [ ] **Step 3: Preview production build**

Run: `npm run preview`
Navigate to the preview URL.
Expected: Full app works — module map, lesson list, all 5 card types, XP tracking, streak counting, dark mode toggle, progress persistence across page refresh.

- [ ] **Step 4: End-to-end verification checklist**

Manually verify:
1. Module map shows 10 modules, Module 1 unlocked, rest locked
2. Clicking Module 1 shows 14 lessons, first one current
3. Completing a concept card awards 10 XP, auto-advances
4. Quiz card shows choices, validates answer, shows feedback
5. Hands-on card accepts input, validates length
6. Build card has checklist, requires all items checked
7. XP and streak update in TopBar
8. Dark mode toggle works and persists
9. Progress persists after page refresh
10. Completing all 14 lessons triggers celebration and unlocks Module 2

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Claude Codex v1 — complete app with Module 1 curriculum"
```

---

## Summary

| Task | Component | Files Created |
|---|---|---|
| 1 | Project scaffolding | package.json, vite.config.js, index.html, main.jsx, App.jsx |
| 2 | Theme system | theme.css, global.css, ThemeContext.jsx |
| 3 | Hash router | useRouter.js + tests |
| 4 | XP & streak logic | xp.js + tests |
| 5 | Curriculum loader | curriculum.js + tests |
| 6 | Progress context | ProgressContext.jsx, useProgress.js |
| 7 | TopBar | TopBar.jsx + CSS |
| 8 | ProgressRing | ProgressRing.jsx + CSS |
| 9 | ModuleMap (home) | ModuleMap.jsx + CSS, modules.json |
| 10 | LessonList | LessonList.jsx + CSS, stub curriculum JSON |
| 11 | CodeBlock + TermTooltip | 4 files |
| 12 | All 5 card types | 6 files (5 cards + shared CSS) |
| 13 | LessonView dispatcher | LessonView.jsx + CSS |
| 14 | CelebrationOverlay | CelebrationOverlay.jsx + CSS |
| 15 | Module 1 full content | 01-cli-fundamentals.json (14 lessons) |
| 16 | Tests + verification | No new files |

**Total: 16 tasks, ~40 files, one fully functional module.**
Remaining modules (2-10) are content-only — same JSON format, added to `public/curriculum/`.
