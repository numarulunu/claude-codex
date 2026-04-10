# SMAC Report: How best should I optimize this codebase?

**Generated:** 2026-04-09 | **Agents:** 5R + 5V | **Overall confidence:** ~93%

Claude Codex — React 19 + Vite learning app. 5 researchers (React arch, Performance, Data, A11y, Security/Hygiene) + 5 cross-verifiers. 50 findings surfaced, 45 CONFIRMED, 5 PARTIAL, 0 DISPUTED.

## Ranked Findings (Top 20 by impact × confidence × verification)

| # | Finding | Impact | Effort | Conf | Verdict | Score |
|---|---------|--------|--------|------|---------|-------|
| 1 | `resetProgress` reads localStorage before clearing — reset is a no-op | HIGH | LOW | 98% | CONFIRMED | 2.94 |
| 2 | `handleComplete` checks module completion against stale render snapshot | HIGH | LOW | 96% | CONFIRMED | 2.88 |
| 3 | Vite <=6.4.1 CVEs: arbitrary file read (WS) + path traversal | HIGH | LOW | 100% | CONFIRMED | 3.00 |
| 4 | No `:focus-visible` styles anywhere (WCAG 2.4.7 fail) | HIGH | LOW | 100% | CONFIRMED | 3.00 |
| 5 | CelebrationOverlay: no `role="dialog"`, no focus trap, no aria-modal | HIGH | MED | 100% | CONFIRMED | 3.00 |
| 6 | No `prefers-reduced-motion` guards on any animation | HIGH | LOW | 100% | CONFIRMED | 3.00 |
| 7 | No route-level code splitting (React.lazy) — all views eager-loaded | HIGH | LOW | 100% | CONFIRMED | 3.00 |
| 8 | Vite config has zero build optimizations (no chunks/compression) | HIGH | LOW | 100% | CONFIRMED | 3.00 |
| 9 | ProgressContext broadcasts full object to all consumers | HIGH | MED | 95% | CONFIRMED | 2.85 |
| 10 | `curriculum.js` has no `res.ok` check — 404 becomes SyntaxError | HIGH | LOW | 95% | CONFIRMED | 2.85 |
| 11 | `bonusXp: 5` dead field on 20 non-quiz lessons in modules 07/08 | HIGH | LOW | 95% | CONFIRMED | 2.85 |
| 12 | `inputType` drift: `"multipleChoice"` vs `"multi-select"` for same control | MED | LOW | 100% | CONFIRMED | 2.00 |
| 13 | QuizCard feedback box not announced (no `role="alert"`) | MED | LOW | 100% | CONFIRMED | 2.00 |
| 14 | QuizCard choices missing `aria-pressed`/selection state | MED | LOW | 100% | CONFIRMED | 2.00 |
| 15 | ProgressRing SVG has no `role="progressbar"`/aria-label | MED | LOW | 100% | CONFIRMED | 2.00 |
| 16 | TopBar logo is `<div>` with `onClick` — not keyboard-reachable | MED | LOW | 100% | CONFIRMED | 2.00 |
| 17 | HandsOnCard textarea has no label association | MED | LOW | 100% | CONFIRMED | 2.00 |
| 18 | `loadProgress` shallow-merge drops nested defaults on schema evolution | MED | LOW | 95% | CONFIRMED | 1.90 |
| 19 | `localStorage` quota errors silenced (console.warn only) | MED | LOW | 95% | CONFIRMED | 1.90 |
| 20 | `loadModules()` fetched independently by 3 sibling components | MED | LOW | 99% | PARTIAL* | 1.19 |

*Verifier noted: curriculum.js has a module-level cache, so no duplicate network requests — only redundant local state.

## Additional Confirmed Findings (Ranks 21-45, abbreviated)

21. `ThemeContext` value prop not memoized; `toggleTheme` not `useCallback`-wrapped — ThemeContext.jsx:19-21
22. `getLessonState` recomputes `findIndex` per iteration (O(n²)) — LessonList.jsx:29-37
23. Vitest `setupFiles: []` — jest-dom matchers silently unavailable — vite.config.js:5-9
24. Quiz lesson schema inconsistency across modules (PARTIAL — most have `exercise.choices` with `correct` flags, but shape varies)
25. `localStorage` quota failures silenced — useProgress.js:23-28 (dup of 19)
26. Stray generator scripts with hardcoded absolute Windows paths — `_gen_module3.py`, `gen_curriculum.cjs` (and empty `_write_m2.py`, misnamed `UsersGaming PC...cjs`)
27. `.gitignore` missing `__pycache__/`, `_gen_*`, `.playwright-mcp/`, `.serena/`, `.superpowers/`
28. `.superpowers/` directory tracked in git (9 files including PID files)
29. License mismatch: `package.json` says `"ISC"`, `LICENSE` file is MIT
30. `package.json` metadata gaps: empty `author`, `description`; no `repository`; vestigial `"main": "index.js"`
31. No `useProgress` hook tests; `importProgress` accepts arbitrary user JSON with weak validation (only `data.version` truthy check)
32. No component tests (QuizCard, HandsOnCard, ErrorBoundary, CodeBlock, TermTooltip)
33. No ESLint / Prettier / husky / CI workflow
34. 10 curriculum JSON files ~257KB uncompressed — no build-time compression
35. `LessonView` progress dots re-render inline on every render (no memoization) — LessonView.jsx:81-89
36. No `<link rel="preload">` for `modules.json` in index.html
37. `ProgressContext` value object not memoized (callbacks are `useCallback`, container isn't) — ProgressContext.jsx:91-100
38. No `<React.StrictMode>` wrapper in main.jsx
39. `ErrorBoundary` Reset button doesn't clear corrupt localStorage → crash loop risk
40. No per-route `ErrorBoundary` — lesson crash kills TopBar/nav
41. `LessonView` is a god component (fetch + completion + XP + celebration + navigation in one 113-line file)
42. `useRouter` has no in-app history stack (acceptable for current scope)
43. `useProgress.js` is misnamed — exports pure utils, should live in `src/utils/progress.js`
44. `TermTooltip` is a flat `<div>` list — misnamed, no `<dl><dt><dd>` semantics, not actually a tooltip
45. XP popup in LessonView not announced to AT (no `aria-live`)
46. `xp.test.js` missing coverage for `awardXp({})` fallback and `lessonsCompleted: null`
47. Minor: React ErrorBoundary placement is correct (researcher self-corrected; verifier confirms)

## Top 10 Actionable Fixes (Recommended Order)

**Ship-blocker bugs (do today):**
1. **Fix `resetProgress`** — ProgressContext.jsx:84-88. Swap order: `removeItem` first, then `loadProgress()` returns DEFAULT_PROGRESS.
2. **Fix `handleComplete` stale-state** — LessonView.jsx:38-54. Move module-completion check into the `completeLesson` updater, or use a `useEffect` watching `progress.modules[moduleId].lessonsCompleted.length`.
3. **`npm audit fix`** — patches Vite CVEs GHSA-4w7w-66w2-5vf9 + GHSA-p9ff-h696-f583.

**One-line/one-file high-ROI wins:**
4. **Add `:focus-visible` + reduced-motion rules** to `global.css` (~10 lines covers WCAG 2.4.7 + 2.3.3 app-wide).
5. **Add `res.ok` checks** in `curriculum.js:6-17` to turn silent SyntaxErrors into actionable errors.
6. **Convert routes to `React.lazy`** in App.jsx — splits bundle at zero architectural cost.
7. **Add Vite `build.rollupOptions.manualChunks` + vendor split** — one config block.
8. **Fix `package.json` license** → `"MIT"`; populate `author`, `description`, `repository`; drop `"main"`.
9. **Add `setupFiles: ['./src/test-setup.js']`** importing `@testing-library/jest-dom` so component tests don't silently fail.
10. **Strip `bonusXp` from non-quiz lessons** in modules 07 and 08 (or enforce `type === 'quiz'` in `awardXp`).

**Repo hygiene (batch into one PR):**
- `git rm -r --cached .superpowers/`
- `.gitignore`: add `__pycache__/`, `*.pyc`, `_gen_*`, `.playwright-mcp/`, `.serena/`, `.superpowers/`
- Delete `_gen_module3.py`, `_write_m2.py`, `UsersGaming PC...cjs`
- Standardize `inputType` to `"multi-select"` across all module JSONs

**Accessibility batch (half-day):**
- `CelebrationOverlay`: add `role="dialog" aria-modal="true"`, focus trap, return focus on close
- `QuizCard`: `role="alert"` on feedback div, `aria-pressed` on choices
- `ProgressRing`: `role="progressbar" aria-valuenow={percent}`
- `TopBar` logo: convert `<div onClick>` → `<button>`
- `HandsOnCard`: `<label htmlFor>` for the textarea

**Architecture (next sprint):**
- Lift `modules` into a `CurriculumContext` fetched once at boot
- Split `ProgressContext` into `ProgressStateContext` + `ProgressActionsContext`
- Deep-merge `loadProgress` with versioned migrations
- Wrap `saveProgress` errors in a user-surfaced toast
- Add ESLint flat config + GitHub Actions CI (`npm ci && npm test && npm audit --audit-level=high`)

## Disputed Findings

None. All findings cleared verification.

## Partial Findings

| Finding | Nuance |
|---------|--------|
| #20 `loadModules()` called 3× | No network cost (module cache), but redundant `useState` copies + re-renders |
| #24 Quiz `questions` array absent | Most quiz lessons have `exercise.choices[].correct` — scoreable but shape differs per module |
| #37 `ProgressContext` value not memoized | Callbacks ARE `useCallback`-wrapped; only container object lacks `useMemo` |
| #47 `ErrorBoundary` placement | Placement outside providers is correct; only the Reset-doesn't-clear-corrupt-state sub-claim holds |
| #22 `getLessonState` complexity | Technically O(n×m) not pure O(n²); fix (hoist `findIndex`) is unchanged |

## Coverage Gaps

| Role | Status | Notes |
|------|--------|-------|
| React Architecture | OK | 10 findings, 9 CONFIRMED, 1 PARTIAL |
| Performance & Bundle | OK | 10 findings, 7 CONFIRMED, 3 PARTIAL |
| Data & Curriculum | OK | 10 findings, 9 CONFIRMED, 1 PARTIAL |
| Accessibility & UX | OK | 10 findings, 10 CONFIRMED |
| Testing / Security / Hygiene | OK | 10 findings, 10 CONFIRMED |

No role timed out or errored. Full verification coverage.
