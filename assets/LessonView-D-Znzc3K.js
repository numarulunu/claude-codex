import { j as jsxRuntimeExports, r as reactExports, u as useProgressContext } from "./index-2hIqRojP.js";
import { a as loadModuleLessons, l as loadModules } from "./curriculum-DNetKi3g.js";
import "./vendor-B0z2PQZu.js";
const termBox = "_termBox_1uibh_1";
const term = "_term_1uibh_1";
const definition = "_definition_1uibh_17";
const termList = "_termList_1uibh_21";
const styles$4 = {
  termBox,
  term,
  definition,
  termList
};
function TermTooltip({ terminology }) {
  if (!terminology || !terminology.length) return null;
  for (const item of terminology) {
    if (typeof item.term !== "string" || typeof item.definition !== "string") {
      console.error("TermTooltip: Invalid item", item);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "1rem", color: "red", fontSize: "0.9rem" }, children: "Error: Invalid terminology format. Term or definition is not a string." });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.termList, children: terminology.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.termBox, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$4.term, children: item.term }),
    " — ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$4.definition, children: item.definition })
  ] }, item.term)) });
}
const card = "_card_zre0u_1";
const typeBadge = "_typeBadge_zre0u_14";
const title$1 = "_title_zre0u_23";
const explanation = "_explanation_zre0u_31";
const continueButton$1 = "_continueButton_zre0u_38";
const choices = "_choices_zre0u_60";
const choice = "_choice_zre0u_60";
const selected = "_selected_zre0u_83";
const correct = "_correct_zre0u_83";
const wrong = "_wrong_zre0u_83";
const choiceLetter = "_choiceLetter_zre0u_102";
const feedbackBox = "_feedbackBox_zre0u_126";
const feedbackCorrect = "_feedbackCorrect_zre0u_135";
const feedbackWrong = "_feedbackWrong_zre0u_141";
const exerciseBox = "_exerciseBox_zre0u_147";
const exerciseLabel = "_exerciseLabel_zre0u_154";
const exerciseInstruction = "_exerciseInstruction_zre0u_162";
const textarea = "_textarea_zre0u_169";
const validationError = "_validationError_zre0u_188";
const checklist = "_checklist_zre0u_194";
const checklistItem = "_checklistItem_zre0u_199";
const checked = "_checked_zre0u_214";
const styles$3 = {
  card,
  typeBadge,
  title: title$1,
  explanation,
  continueButton: continueButton$1,
  choices,
  choice,
  selected,
  correct,
  wrong,
  choiceLetter,
  feedbackBox,
  feedbackCorrect,
  feedbackWrong,
  exerciseBox,
  exerciseLabel,
  exerciseInstruction,
  textarea,
  validationError,
  checklist,
  checklistItem,
  checked
};
function ConceptCard({ lesson, onComplete }) {
  if (typeof lesson.content.explanation !== "string") {
    console.error("ConceptCard: explanation is not a string", lesson.id, typeof lesson.content.explanation);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "2rem", color: "red" }, children: [
      'Error: Lesson "',
      lesson.id,
      '" has invalid explanation type.'
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.typeBadge, children: "Concept" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$3.title, children: lesson.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.explanation, children: lesson.content.explanation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TermTooltip, { terminology: lesson.content.terminology }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles$3.continueButton, onClick: onComplete, children: "Got it" })
  ] });
}
const codeBlock = "_codeBlock_v39vl_1";
const header$1 = "_header_v39vl_6";
const copyButton = "_copyButton_v39vl_21";
const copied = "_copied_v39vl_36";
const pre = "_pre_v39vl_41";
const annotation = "_annotation_v39vl_52";
const styles$2 = {
  codeBlock,
  header: header$1,
  copyButton,
  copied,
  pre,
  annotation
};
function CodeBlock({ language, code, annotation: annotation2 }) {
  const [copied2, setCopied] = reactExports.useState(false);
  if (code && typeof code !== "string") {
    console.error("CodeBlock: code is not a string", typeof code, code);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "red" }, children: "Error: CodeBlock code is not a string" });
  }
  if (annotation2 && typeof annotation2 !== "string") {
    console.error("CodeBlock: annotation is not a string", typeof annotation2, annotation2);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "red" }, children: "Error: CodeBlock annotation is not a string" });
  }
  if (language && typeof language !== "string") {
    console.error("CodeBlock: language is not a string", typeof language, language);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "red" }, children: "Error: CodeBlock language is not a string" });
  }
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.codeBlock, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language || "code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `${styles$2.copyButton} ${copied2 ? styles$2.copied : ""}`,
          onClick: handleCopy,
          children: copied2 ? "Copied" : "Copy"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: styles$2.pre, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: code }) }),
    annotation2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$2.annotation, children: annotation2 })
  ] });
}
function ExampleCard({ lesson, onComplete }) {
  const { codeExample } = lesson.content;
  if (typeof lesson.content.explanation !== "string") {
    console.error("ExampleCard: explanation is not a string", lesson.id, typeof lesson.content.explanation);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "2rem", color: "red" }, children: [
      'Error: Lesson "',
      lesson.id,
      '" has invalid explanation type.'
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.typeBadge, children: "Example" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$3.title, children: lesson.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.explanation, children: lesson.content.explanation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TermTooltip, { terminology: lesson.content.terminology }),
    codeExample && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        language: codeExample.language,
        code: codeExample.code,
        annotation: codeExample.annotation
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles$3.continueButton, onClick: onComplete, children: "Continue" })
  ] });
}
const LETTERS = ["A", "B", "C", "D"];
function QuizCard({ lesson, onComplete, onQuizScore }) {
  const [selected2, setSelected] = reactExports.useState(null);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const choices2 = lesson.content.exercise?.choices || [];
  if (choices2.length > 0 && choices2[0].text === void 0) {
    console.error("QuizCard: Invalid choices format", lesson.id, choices2[0]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "2rem", color: "red" }, children: [
      'Error: Quiz "',
      lesson.id,
      '" has invalid format. Expected choices with "text" property.'
    ] });
  }
  const correctIndex = choices2.findIndex((c) => c.correct);
  const handleSelect = (index) => {
    if (submitted) return;
    setSelected(index);
  };
  const handleSubmit = () => {
    if (selected2 === null) return;
    setSubmitted(true);
    const isCorrect = selected2 === correctIndex;
    if (onQuizScore) {
      onQuizScore(lesson.id, isCorrect ? 1 : 0, 1);
    }
  };
  const getChoiceClass = (index) => {
    if (!submitted) {
      return index === selected2 ? styles$3.selected : "";
    }
    if (index === correctIndex) return styles$3.correct;
    if (index === selected2 && index !== correctIndex) return styles$3.wrong;
    return "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.typeBadge, children: "Quiz" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$3.title, children: lesson.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.explanation, children: lesson.content.explanation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TermTooltip, { terminology: lesson.content.terminology }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.choices, role: "radiogroup", "aria-label": "Answer choices", children: choices2.map((choice2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": selected2 === i,
        disabled: submitted,
        className: `${styles$3.choice} ${getChoiceClass(i)}`,
        onClick: () => handleSelect(i),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.choiceLetter, children: LETTERS[i] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: choice2.text })
        ]
      },
      i
    )) }),
    submitted && selected2 !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "alert",
        className: `${styles$3.feedbackBox} ${selected2 === correctIndex ? styles$3.feedbackCorrect : styles$3.feedbackWrong}`,
        children: selected2 === correctIndex ? "Correct!" : choices2[selected2]?.explanation || `The correct answer is ${LETTERS[correctIndex]}.`
      }
    ),
    !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: styles$3.continueButton,
        disabled: selected2 === null,
        onClick: handleSubmit,
        children: "Check Answer"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles$3.continueButton, onClick: () => onComplete(selected2 === correctIndex), children: "Continue" })
  ] });
}
function HandsOnCard({ lesson, onComplete }) {
  const [input, setInput] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const { exercise, codeExample } = lesson.content;
  const inputType = exercise?.inputType || "confirm";
  if (typeof lesson.content.explanation !== "string") {
    console.error("HandsOnCard: explanation is not a string", lesson.id, typeof lesson.content.explanation);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "2rem", color: "red" }, children: [
      'Error: Lesson "',
      lesson.id,
      '" has invalid explanation type.'
    ] });
  }
  const handleSubmit = () => {
    if (inputType === "confirm") {
      onComplete();
      return;
    }
    const validation = exercise?.validation;
    if (validation) {
      if (validation.type === "length" && input.length < (validation.min || 0)) {
        setError(validation.errorMessage || "Response is too short.");
        return;
      }
      if (validation.type === "keyword") {
        const keywords = validation.keywords || [];
        const missing = keywords.filter(
          (kw) => !input.toLowerCase().includes(kw.toLowerCase())
        );
        if (missing.length) {
          setError(validation.errorMessage || `Missing: ${missing.join(", ")}`);
          return;
        }
      }
    }
    setError("");
    onComplete();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.typeBadge, children: "Hands-on" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$3.title, children: lesson.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.explanation, children: lesson.content.explanation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TermTooltip, { terminology: lesson.content.terminology }),
    codeExample && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        language: codeExample.language,
        code: codeExample.code,
        annotation: codeExample.annotation
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.exerciseBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.exerciseLabel, id: "exercise-label", children: "Try it yourself" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.exerciseInstruction, id: "exercise-instruction", children: exercise?.instruction }),
      inputType === "textarea" || inputType === "paste" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "exercise-input",
          className: styles$3.textarea,
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: inputType === "paste" ? "Paste your output here..." : "Type your answer...",
          "aria-label": "Your answer",
          "aria-describedby": "exercise-instruction"
        }
      ) : null,
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.validationError, role: "alert", children: error })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles$3.continueButton, onClick: handleSubmit, children: inputType === "confirm" ? "I did it" : "Submit" })
  ] });
}
function BuildCard({ lesson, onComplete }) {
  const steps = lesson.content.exercise?.steps || [];
  const [checked2, setChecked] = reactExports.useState(/* @__PURE__ */ new Set());
  if (typeof lesson.content.explanation !== "string") {
    console.error("BuildCard: explanation is not a string", lesson.id, typeof lesson.content.explanation);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "2rem", color: "red" }, children: [
      'Error: Lesson "',
      lesson.id,
      '" has invalid explanation type.'
    ] });
  }
  const toggleStep = (index) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };
  const allDone = steps.length > 0 && checked2.size === steps.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.typeBadge, children: "Build" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$3.title, children: lesson.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.explanation, children: lesson.content.explanation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TermTooltip, { terminology: lesson.content.terminology }),
    lesson.content.codeExample && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CodeBlock,
      {
        language: lesson.content.codeExample.language,
        code: lesson.content.codeExample.code,
        annotation: lesson.content.codeExample.annotation
      }
    ),
    steps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.exerciseBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.exerciseLabel, children: "Project Checklist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: styles$3.checklist, children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: `${styles$3.checklistItem} ${checked2.has(i) ? styles$3.checked : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: checked2.has(i),
                onChange: () => toggleStep(i)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
          ]
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: styles$3.continueButton,
        disabled: steps.length > 0 && !allDone,
        onClick: onComplete,
        children: "Complete Module"
      }
    )
  ] });
}
const overlay = "_overlay_vngnm_1";
const modal = "_modal_vngnm_17";
const trophy = "_trophy_vngnm_33";
const title = "_title_vngnm_38";
const subtitle = "_subtitle_vngnm_45";
const continueButton = "_continueButton_vngnm_51";
const particles = "_particles_vngnm_65";
const particle = "_particle_vngnm_65";
const styles$1 = {
  overlay,
  modal,
  trophy,
  title,
  subtitle,
  continueButton,
  particles,
  particle
};
const COLORS = ["#d97757", "#4caf50", "#ffd700", "#e74c3c", "#3498db", "#9b59b6"];
function CelebrationOverlay({ moduleName, onContinue }) {
  const continueRef = reactExports.useRef(null);
  const previouslyFocusedRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    continueRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onContinue();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === "function") {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [onContinue]);
  const particles2 = reactExports.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      color: COLORS[i % COLORS.length],
      size: 4 + Math.random() * 8
    }));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.particles, children: particles2.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: styles$1.particle,
        style: {
          left: p.left,
          animationDelay: p.delay,
          backgroundColor: p.color,
          width: p.size,
          height: p.size
        }
      },
      p.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: styles$1.modal,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "celebration-title",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.trophy, "aria-hidden": "true", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$1.title, id: "celebration-title", children: "Module Complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$1.subtitle, children: moduleName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ref: continueRef, className: styles$1.continueButton, onClick: onContinue, children: "Continue" })
        ]
      }
    ) })
  ] });
}
const container = "_container_ekknn_1";
const header = "_header_ekknn_5";
const backButton = "_backButton_ekknn_12";
const progressDots = "_progressDots_ekknn_27";
const dot = "_dot_ekknn_32";
const completed = "_completed_ekknn_39";
const current = "_current_ekknn_43";
const xpEarned = "_xpEarned_ekknn_48";
const styles = {
  container,
  header,
  backButton,
  progressDots,
  dot,
  completed,
  current,
  xpEarned
};
const CARD_COMPONENTS = {
  concept: ConceptCard,
  example: ExampleCard,
  quiz: QuizCard,
  "hands-on": HandsOnCard,
  build: BuildCard
};
function LessonView({ moduleId, lessonId, onBack, onNavigate }) {
  const [lessons, setLessons] = reactExports.useState([]);
  const [modules, setModules] = reactExports.useState([]);
  const [xpPopup, setXpPopup] = reactExports.useState(null);
  const [showCelebration, setShowCelebration] = reactExports.useState(false);
  const pendingNavRef = reactExports.useRef(false);
  const { progress, completeLesson, completeModule, saveQuizScore } = useProgressContext();
  reactExports.useEffect(() => {
    loadModuleLessons(moduleId).then(setLessons);
    loadModules().then(setModules);
  }, [moduleId]);
  const lesson = lessons.find((l) => l.id === lessonId);
  const lessonIndex = lessons.findIndex((l) => l.id === lessonId);
  const completedLessons = progress.modules[moduleId]?.lessonsCompleted || [];
  if (!lesson) return null;
  const handleComplete = (isPerfect = false) => {
    if (completedLessons.includes(lessonId)) return;
    completeLesson(moduleId, lessonId, lesson, isPerfect);
    const earned = lesson.xp || 10;
    const bonus = isPerfect && lesson.bonusXp ? lesson.bonusXp : 0;
    setXpPopup(earned + bonus);
    setTimeout(() => setXpPopup(null), 2200);
    pendingNavRef.current = true;
  };
  reactExports.useEffect(() => {
    if (!pendingNavRef.current) return;
    if (!completedLessons.includes(lessonId)) return;
    pendingNavRef.current = false;
    const moduleMeta = modules.find((m) => m.id === moduleId);
    if (moduleMeta && completedLessons.length >= moduleMeta.lessonCount) {
      completeModule(moduleId);
      setShowCelebration(true);
      return;
    }
    const t = setTimeout(() => {
      if (lessonIndex < lessons.length - 1) {
        const nextLesson = lessons[lessonIndex + 1];
        onNavigate(`/module/${moduleId}/lesson/${nextLesson.id}`);
      } else {
        onBack();
      }
    }, 800);
    return () => clearTimeout(t);
  }, [completedLessons, lessonId, lessonIndex, lessons, modules, moduleId, completeModule, onBack, onNavigate]);
  const handleQuizScore = (qLessonId, score, total) => {
    saveQuizScore(qLessonId, score, total);
  };
  const CardComponent = CARD_COMPONENTS[lesson.type];
  if (!CardComponent) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    "Unknown lesson type: ",
    lesson.type
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: styles.backButton, onClick: onBack, children: [
        "←",
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.progressDots, children: lessons.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `${styles.dot} ${completedLessons.includes(l.id) ? styles.completed : ""} ${l.id === lessonId ? styles.current : ""}`
        },
        l.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CardComponent,
      {
        lesson,
        onComplete: handleComplete,
        onQuizScore: handleQuizScore
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.xpLive, role: "status", "aria-live": "polite", "aria-atomic": "true", children: xpPopup !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.xpEarned, children: [
      "+",
      xpPopup,
      " XP"
    ] }) }),
    showCelebration && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CelebrationOverlay,
      {
        moduleName: modules.find((m) => m.id === moduleId)?.title,
        onContinue: () => {
          setShowCelebration(false);
          onBack();
        }
      }
    )
  ] });
}
export {
  LessonView as default
};
//# sourceMappingURL=LessonView-D-Znzc3K.js.map
