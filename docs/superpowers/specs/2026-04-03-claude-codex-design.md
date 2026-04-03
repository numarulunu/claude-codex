# Claude Codex — Design Spec

**Project:** Duolingo-style web app for mastering Claude Code CLI
**Owner:** Ionuț Roșu
**Date:** 2026-04-03
**Status:** Approved

---

## 1. Vision

A gamified, card-based learning app that teaches Claude Code CLI from fundamentals to advanced automation. Structured like Duolingo — bite-sized lessons (3-5 min each), vertical skill tree progression, XP, streaks, and hands-on exercises. Explains everything clearly (5th-grader language) while using correct terminology and jargon.

**Primary user:** Ionuț (intermediate CLI user, non-coder, vocal coach running Vocality)
**Secondary user:** Future audience — solopreneurs, creators, agency owners who want to leverage Claude for productivity, business, and content creation.

**Goal:** Make the user more capable of leveraging Claude for productivity, business, and content creation.

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 19 + Vite | Claude strongest with React; component model maps to lesson cards; Vite for zero-config fast dev |
| Styling | CSS Modules | Scoped per component, no naming collisions, no external dependencies |
| Routing | Hash-based (`#/module/lesson`) | No server config needed, works as static deployment |
| State | React Context + localStorage | Progress in localStorage, exportable/importable as JSON |
| Diagrams | Inline SVG / styled HTML | Zero external dependencies |
| Build | `npm run build` → static bundle | Deployable to Netlify, Vercel, or any static host |
| Dev server | `npm run dev` (Vite) | Hot-reload during development |

**No external UI libraries.** No Tailwind, no Material UI, no charting libraries. Everything hand-built to stay lean and on-brand.

---

## 3. Visual Design

### Brand
Claude's official visual language:

| Token | Light | Dark |
|---|---|---|
| Background | `#faf6f1` (warm cream) | `#1a1410` (warm charcoal) |
| Card surface | `#ffffff` | `#2a2420` |
| Primary accent | `#d97757` (terracotta) | `#d97757` |
| Text primary | `#1a1410` | `#f5efe8` |
| Text muted | `#8b7d6b` | `#a89888` |
| Borders | `#e8e0d8` | `#3a3430` |
| Success | `#4caf50` | `#4caf50` |
| Error | `#e74c3c` | `#e74c3c` |

### Dark Mode
- Toggle in top bar (icon button)
- Preference saved in `progress.json`
- `[data-theme="dark"]` selector on `<html>`
- All colors as CSS custom properties

### Typography
- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Monospace for code: `'SF Mono', 'Fira Code', 'Consolas', monospace`

---

## 4. App Structure

### File Layout

```
claude-codex/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── assets/
│   │   └── icons/                 ← Module icons, badges
│   └── curriculum/                ← JSON files served as static assets
│       ├── modules.json
│       ├── 01-cli-fundamentals.json
│       ├── 02-prompt-engineering.json
│       ├── 03-hooks-automation.json
│       ├── 04-skills-plugins.json
│       ├── 05-mcp-servers.json
│       ├── 06-subagents.json
│       ├── 07-scripts-pipelines.json
│       ├── 08-n8n-integration.json
│       ├── 09-business-automation.json
│       └── 10-content-pipelines.json
├── src/
│   ├── main.jsx                   ← App entry point
│   ├── App.jsx                    ← Root component, router, theme provider
│   ├── components/
│   │   ├── TopBar/                ← Logo, dark mode toggle, streak, XP
│   │   ├── ModuleMap/             ← Vertical skill tree (home screen)
│   │   ├── LessonList/            ← Cards within a module
│   │   ├── LessonCard/            ← Individual lesson renderer
│   │   ├── QuizCard/              ← Multiple choice / fill-in-blank
│   │   ├── HandsOnCard/           ← Paste-your-output exercises
│   │   ├── BuildCard/             ← Capstone mini-projects
│   │   ├── TermTooltip/           ← Inline terminology definitions
│   │   ├── ProgressRing/          ← Circular progress indicator
│   │   ├── CelebrationOverlay/    ← Module completion animation
│   │   └── CodeBlock/             ← Syntax-highlighted code display
│   ├── context/
│   │   └── ProgressContext.jsx    ← Global progress state
│   ├── hooks/
│   │   └── useProgress.js         ← Read/write progress.json
│   ├── utils/
│   │   ├── router.js              ← Hash-based routing logic
│   │   └── xp.js                  ← XP calculation, streak logic
│   └── styles/
│       ├── theme.css              ← CSS custom properties (light/dark)
│       └── global.css             ← Reset, base typography
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-03-claude-codex-design.md  ← This file
```

---

## 5. Navigation

### Home Screen (Module Map)
- Vertical skill tree down the center — Duolingo's path layout
- Each module is a circular node on a winding path, connected by a line/curve
- **Completed module:** Filled terracotta circle with checkmark
- **Current module:** Larger node, pulsing/glowing border, progress ring overlay showing % complete
- **Locked module:** Greyed out with lock icon
- Clicking a module opens its lesson list
- Modules unlock linearly (must complete Module N to unlock Module N+1)

### Top Bar (persistent)
- Left: Logo mark + "Claude Codex" text
- Right: Dark/light toggle icon, streak flame + day count, XP counter

### Inside a Module (Lesson List)
- Module title and description at top
- Vertical list of lesson cards, each showing: title, type badge (concept/example/quiz/hands-on/build), completion state
- Completed lessons: checkmark, muted
- Current lesson: highlighted
- Locked lessons: greyed (unlock sequentially within module)

### Inside a Lesson
- Full-screen card view
- Back arrow to return to lesson list
- Progress dots at top showing position within module (lesson 3 of 14)
- "Continue" button at bottom to advance

### No sidebar. Single column. Mobile-friendly by default.

---

## 6. Game Loop

### Lesson Types

| Type | Icon | Description | XP |
|---|---|---|---|
| **Concept** | 📖 | Plain-English explanation with diagram. "Here's what X is." Read and tap "Got it." | 10 |
| **Example** | 💻 | Annotated real code/command. Copy-paste ready. | 10 |
| **Quiz** | ❓ | Multiple choice or fill-in-the-blank. Wrong answers show explanation. | 10 (+5 bonus for perfect) |
| **Hands-on** | 🛠️ | "Run this in your terminal. Paste the output." Verifies action. | 15 |
| **Build** | 🏗️ | Capstone mini-project at end of module. Multi-step. | 25 |

### Progression
- Each module = a "unit" on the vertical path
- Each unit contains 8-14 lessons
- Modules unlock linearly
- Lessons within a module unlock sequentially
- Daily streak: tracked by date stamps in progress.json. Completing at least 1 lesson per day maintains streak.

### Visual Feedback
- Green progress ring around each module node (0% to 100%)
- XP counter animates when XP is earned
- Streak flame icon with day count
- Celebration animation overlay on module completion (confetti/particles)
- Correct quiz answer: green flash. Wrong: red flash + explanation.

### No leaderboards, no hearts/lives, no time pressure. Clean progression.

---

## 7. Lesson Card Schema

Each lesson in a module JSON file:

```json
{
  "id": "cli-01-03",
  "title": "Your First CLAUDE.md",
  "type": "hands-on",
  "xp": 15,
  "bonusXp": 5,
  "content": {
    "explanation": "CLAUDE.md is a file you put in your project root. Claude reads it automatically every time you start a conversation in that folder. Think of it as a cheat sheet you write for Claude — 'here's how this project works, here's what I like, here's what to never do.'",
    "terminology": [
      {
        "term": "CLAUDE.md",
        "definition": "A markdown file containing persistent instructions that Claude Code loads automatically when working in a directory."
      }
    ],
    "visual": {
      "type": "diagram",
      "id": "claude-md-flow",
      "description": "Flowchart: You create CLAUDE.md → Claude starts session → Claude reads CLAUDE.md → Claude follows your rules"
    },
    "codeExample": {
      "language": "markdown",
      "code": "# Project Rules\n- Always use TypeScript\n- Run tests before committing\n- Never modify the database schema without asking",
      "annotation": "A simple CLAUDE.md with 3 rules. Claude will follow these every time it works in this folder."
    },
    "exercise": {
      "instruction": "Create a CLAUDE.md file in any project folder. Write 3 rules you'd want Claude to always follow in that project. Paste the contents below.",
      "inputType": "textarea",
      "validation": {
        "type": "length",
        "min": 50,
        "errorMessage": "Your CLAUDE.md seems too short. Try adding at least 3 specific rules."
      }
    }
  }
}
```

### Content Fields

| Field | Required | Used In | Purpose |
|---|---|---|---|
| `explanation` | Yes | All types | Plain-English explanation, 5th-grader clarity |
| `terminology` | No | Any | Array of term/definition pairs, rendered as tooltips or callout boxes |
| `visual` | No | Concept, Example | Diagram reference, rendered as inline SVG or styled HTML |
| `codeExample` | No | Example, Hands-on | Code block with language tag and annotation |
| `exercise` | No | Quiz, Hands-on, Build | Interactive element |
| `exercise.inputType` | If exercise | — | `textarea`, `multipleChoice`, `paste`, `confirm` |
| `exercise.validation` | No | — | Client-side check: `length`, `keyword`, `regex`, or `confirm` |
| `exercise.choices` | If multipleChoice | Quiz | Array of `{ text, correct, explanation }` |

---

## 8. Progress System

### progress.json

```json
{
  "version": 1,
  "xp": 240,
  "streak": {
    "current": 7,
    "lastDate": "2026-04-03",
    "longest": 12
  },
  "theme": "light",
  "modules": {
    "01-cli-fundamentals": {
      "unlocked": true,
      "lessonsCompleted": ["cli-01-01", "cli-01-02", "cli-01-03"],
      "completedAt": null
    },
    "02-prompt-engineering": {
      "unlocked": false,
      "lessonsCompleted": [],
      "completedAt": null
    }
  },
  "quizScores": {
    "cli-01-05": {
      "score": 3,
      "total": 3,
      "bonus": true,
      "attempts": 1
    }
  }
}
```

### Read/Write Strategy
- **Primary store:** localStorage (instant, no server needed, works everywhere)
- On app load: read progress from localStorage, hydrate React Context
- On lesson completion: write updated state to localStorage immediately
- **Export/Import:** Settings screen has "Export Progress" (downloads progress.json) and "Import Progress" (uploads and restores from a progress.json file). This is the backup/portability mechanism.
- **Initial state:** If localStorage is empty, app initializes with Module 1 unlocked, zero XP, no streak.

---

## 9. Curriculum

### Module Overview

| # | Module | Lessons | Focus |
|---|---|---|---|
| 1 | CLI Fundamentals | 14 | Installation, commands, CLAUDE.md, memory, settings, permissions, models, costs |
| 2 | Prompt Engineering for CLI | 12 | Structured prompts, context management, multi-turn, images, debugging prompts |
| 3 | Hooks & Automation Inside Claude | 8 | Event hooks, tool matchers, PreToolUse/PostToolUse, security gates, auto-linting |
| 4 | Skills & Plugins | 10 | Skill files, YAML frontmatter, custom skills, plugins, manifests, distribution |
| 5 | MCP Servers | 11 | What MCP is, installing, building, connecting tools, OAuth, security |
| 6 | Subagents | 12 | Agent types, dispatch, parallel work, orchestration, teams, model/tool scoping |
| 7 | Claude in Scripts & Pipelines | 8 | --print mode, JSON output, shell piping, batch ops, CI/CD integration |
| 8 | n8n Integration | 12 | n8n basics, Claude as node, Claude as workflow builder, webhooks, error handling |
| 9 | Business Automation Templates | 10 | Student onboarding, scheduling, invoicing, leads, SOPs, Skool, reporting |
| 10 | Content Production Pipelines | 8 | YouTube scripts, thumbnails, social batching, newsletters, repurposing, calendar |

**Total: 105 lesson cards**

### Detailed Lesson Breakdown

#### Module 1: CLI Fundamentals (14 lessons)

| ID | Title | Type |
|---|---|---|
| cli-01-01 | What is Claude Code (and How It Differs from Chat) | concept |
| cli-01-02 | Installing and Launching Claude Code | hands-on |
| cli-01-03 | Your First Conversation in the Terminal | hands-on |
| cli-01-04 | The Conversation Loop — How Context Works | concept |
| cli-01-05 | Your First CLAUDE.md | hands-on |
| cli-01-06 | Reading Files, Searching Code, Navigating Projects | example |
| cli-01-07 | Running Commands Through Claude | example |
| cli-01-08 | Understanding Tool Use and Permissions | concept |
| cli-01-09 | Permission Modes — default, plan, auto, and more | quiz |
| cli-01-10 | The Memory System — MEMORY.md and Auto Memory | concept |
| cli-01-11 | Settings and Configuration | example |
| cli-01-12 | Model Selection — Opus, Sonnet, Haiku | quiz |
| cli-01-13 | Cost Awareness — /cost, /context, Token Management | hands-on |
| cli-01-14 | Capstone: Set Up Claude Code on a Real Project | build |

#### Module 2: Prompt Engineering for CLI (12 lessons)

| ID | Title | Type |
|---|---|---|
| pe-02-01 | Why CLI Prompts Differ from Chat Prompts | concept |
| pe-02-02 | Structured Prompts — Task, Context, Constraints, Format | example |
| pe-02-03 | CLAUDE.md Architecture — Global vs Project Instructions | hands-on |
| pe-02-04 | Few-Shot Examples in CLI Context | example |
| pe-02-05 | Controlling Output Format (JSON, Markdown, Code) | hands-on |
| pe-02-06 | Chain-of-Thought Prompting in CLI | example |
| pe-02-07 | Prompt Debugging — When Claude Misunderstands | concept |
| pe-02-08 | Working with Large Files and Targeted Reads | hands-on |
| pe-02-09 | Multi-Turn Strategy — Continue, Compact, Branch, Rewind | concept |
| pe-02-10 | Image and Screenshot Reading | hands-on |
| pe-02-11 | Batch Operations — Same Prompt Across Multiple Files | example |
| pe-02-12 | Capstone: Build a CLAUDE.md System for Your Business | build |

#### Module 3: Hooks & Automation Inside Claude (8 lessons)

| ID | Title | Type |
|---|---|---|
| hk-03-01 | What Are Hooks — Event-Driven Automation | concept |
| hk-03-02 | Hook Event Types — PreToolUse, PostToolUse, SessionStart, Stop | concept |
| hk-03-03 | Tool Matchers — Targeting Bash, Write, Edit | example |
| hk-03-04 | Your First Hook — Command-Based | hands-on |
| hk-03-05 | Prompt-Based Hooks — Asking Claude Before Acting | example |
| hk-03-06 | Practical: Auto-Linting and Security Gates | hands-on |
| hk-03-07 | Combining Hooks with Skills | example |
| hk-03-08 | Capstone: Build a Hook System for Your Project | build |

#### Module 4: Skills & Plugins (10 lessons)

| ID | Title | Type |
|---|---|---|
| sp-04-01 | What Are Skills — Slash Commands That Expand | concept |
| sp-04-02 | Built-In Skills vs Custom Skills | quiz |
| sp-04-03 | Anatomy of a Skill File | example |
| sp-04-04 | Writing Your First Skill | hands-on |
| sp-04-05 | YAML Frontmatter Deep-Dive — context, agent, model, triggers | concept |
| sp-04-06 | Skill Types — Rigid vs Flexible | quiz |
| sp-04-07 | Installing and Managing Plugins | hands-on |
| sp-04-08 | Plugin Manifests — agents.json, hooks, distribution | example |
| sp-04-09 | Building a Plugin with Multiple Skills | hands-on |
| sp-04-10 | Capstone: Create a Custom Skill for Your Daily Workflow | build |

#### Module 5: MCP Servers (11 lessons)

| ID | Title | Type |
|---|---|---|
| mc-05-01 | What MCP Is — In Plain Language | concept |
| mc-05-02 | How Claude Talks to External Tools Through MCP | concept |
| mc-05-03 | Installing Your First MCP Server | hands-on |
| mc-05-04 | MCP vs API Calls — When to Use Which | quiz |
| mc-05-05 | Browsing the MCP Ecosystem | example |
| mc-05-06 | Configuring MCP in Settings | hands-on |
| mc-05-07 | Building a Simple MCP Server | hands-on |
| mc-05-08 | Connecting MCP to Business Tools (Notion, Sheets, etc.) | example |
| mc-05-09 | OAuth and Authentication Flows | concept |
| mc-05-10 | Security and Permissions | quiz |
| mc-05-11 | Capstone: Connect Claude to One of Your Real Tools via MCP | build |

#### Module 6: Subagents (12 lessons)

| ID | Title | Type |
|---|---|---|
| sa-06-01 | What Subagents Are — Workers Claude Dispatches | concept |
| sa-06-02 | Agent Types and When to Use Each | quiz |
| sa-06-03 | Dispatching Your First Subagent | hands-on |
| sa-06-04 | Parallel vs Sequential Agent Work | concept |
| sa-06-05 | The Explore Agent for Research | example |
| sa-06-06 | The Plan Agent for Architecture | example |
| sa-06-07 | Background Agents — Fire and Forget | hands-on |
| sa-06-08 | Agent Isolation with Worktrees | concept |
| sa-06-09 | Orchestration Patterns — Multi-Agent Workflows | example |
| sa-06-10 | Agent Teams — Multiple Claudes in Parallel | concept |
| sa-06-11 | Model and Tool Restrictions per Subagent | quiz |
| sa-06-12 | Capstone: Build a Multi-Agent Workflow for a Real Task | build |

#### Module 7: Claude in Scripts & Pipelines (8 lessons)

| ID | Title | Type |
|---|---|---|
| sc-07-01 | The --print Flag — Claude as a Script Tool | concept |
| sc-07-02 | JSON Output and Structured Responses | example |
| sc-07-03 | Piping Data Into Claude | hands-on |
| sc-07-04 | Chaining Claude in Shell Workflows | example |
| sc-07-05 | Batch Processing Files with Claude | hands-on |
| sc-07-06 | CI/CD Integration — Claude in GitHub Actions | concept |
| sc-07-07 | Remote Sessions and Scheduling | hands-on |
| sc-07-08 | Capstone: Build an Automated Processing Pipeline | build |

#### Module 8: n8n Integration (12 lessons)

| ID | Title | Type |
|---|---|---|
| n8-08-01 | What n8n Is — Visual Automation in Plain Language | concept |
| n8-08-02 | n8n Core Concepts — Nodes, Workflows, Triggers | concept |
| n8-08-03 | Calling Claude from n8n via HTTP Node | hands-on |
| n8-08-04 | Claude as a Processing Node in a Workflow | example |
| n8-08-05 | Your First Claude-Powered n8n Workflow | hands-on |
| n8-08-06 | Webhook Triggers — Events That Start Automations | concept |
| n8-08-07 | Having Claude Generate n8n Workflow JSON | hands-on |
| n8-08-08 | Natural Language to Automation | example |
| n8-08-09 | Error Handling and Retry Logic | concept |
| n8-08-10 | Connecting n8n to Your Stack (Stripe, Google, Email) | example |
| n8-08-11 | Advanced: Multi-Step AI Chains in n8n | example |
| n8-08-12 | Capstone: Build a Lead-to-Student Automation Pipeline | build |

#### Module 9: Business Automation Templates (10 lessons)

| ID | Title | Type |
|---|---|---|
| ba-09-01 | Mapping Your Business Processes for Automation | concept |
| ba-09-02 | Student Onboarding Automation | example |
| ba-09-03 | Lesson Scheduling and Reminders | hands-on |
| ba-09-04 | Invoice and Payment Tracking | example |
| ba-09-05 | Lead Generation and Follow-Up Sequences | hands-on |
| ba-09-06 | Skool Community Content Scheduling | example |
| ba-09-07 | Client Communication Templates | hands-on |
| ba-09-08 | SOP Generation from Descriptions | hands-on |
| ba-09-09 | Financial Reporting and Bookkeeping Helpers | example |
| ba-09-10 | Capstone: Automate One End-to-End Business Process | build |

#### Module 10: Content Production Pipelines (8 lessons)

| ID | Title | Type |
|---|---|---|
| cp-10-01 | Content Strategy with Claude — Ideation to Publish | concept |
| cp-10-02 | YouTube Script Generation Pipeline | hands-on |
| cp-10-03 | Thumbnail Concept and Title A/B Testing | example |
| cp-10-04 | Social Media Content Batching | hands-on |
| cp-10-05 | Newsletter and Email Sequence Generation | example |
| cp-10-06 | Repurposing Long-Form to Short-Form | hands-on |
| cp-10-07 | Content Calendar Automation | example |
| cp-10-08 | Capstone: Build Your Full Content Pipeline | build |

---

## 10. Out of Scope (v1)

- User accounts / authentication
- Backend / database
- Payment / subscription
- Leaderboards or social features
- Mobile native app
- Content editor / CMS
- AI-powered adaptive difficulty

These are v2+ features if the app becomes a product.

---

## 11. Open Questions

None. All decisions resolved during brainstorming.
