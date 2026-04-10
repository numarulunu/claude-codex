import { r as reactExports, u as useProgressContext, g as getModuleProgress, j as jsxRuntimeExports } from "./index-rEfxmL-f.js";
import { l as loadModules, a as loadModuleLessons } from "./curriculum-DNetKi3g.js";
import "./vendor-DUI7kKlB.js";
const container = "_container_1i0qu_1";
const header = "_header_1i0qu_5";
const backButton = "_backButton_1i0qu_9";
const moduleTitle = "_moduleTitle_1i0qu_25";
const moduleDescription = "_moduleDescription_1i0qu_31";
const progressBar = "_progressBar_1i0qu_37";
const progressFill = "_progressFill_1i0qu_45";
const lessons = "_lessons_1i0qu_52";
const lessonItem = "_lessonItem_1i0qu_58";
const locked = "_locked_1i0qu_70";
const completed = "_completed_1i0qu_75";
const current = "_current_1i0qu_79";
const lessonNumber = "_lessonNumber_1i0qu_89";
const lessonInfo = "_lessonInfo_1i0qu_113";
const lessonTitle = "_lessonTitle_1i0qu_117";
const lessonType = "_lessonType_1i0qu_123";
const lessonCheck = "_lessonCheck_1i0qu_129";
const styles = {
  container,
  header,
  backButton,
  moduleTitle,
  moduleDescription,
  progressBar,
  progressFill,
  lessons,
  lessonItem,
  locked,
  completed,
  current,
  lessonNumber,
  lessonInfo,
  lessonTitle,
  lessonType,
  lessonCheck
};
const TYPE_LABELS = {
  concept: "Concept",
  example: "Example",
  quiz: "Quiz",
  "hands-on": "Hands-on",
  build: "Build"
};
function LessonList({ moduleId, onBack, onLessonClick }) {
  const [modules, setModules] = reactExports.useState([]);
  const [lessons2, setLessons] = reactExports.useState([]);
  const { progress } = useProgressContext();
  reactExports.useEffect(() => {
    loadModules().then(setModules);
    loadModuleLessons(moduleId).then(setLessons);
  }, [moduleId]);
  const moduleMeta = modules.find((m) => m.id === moduleId);
  const completedLessons = progress.modules[moduleId]?.lessonsCompleted || [];
  const percent = moduleMeta ? getModuleProgress(moduleId, moduleMeta.lessonCount, progress) : 0;
  const completedSet = reactExports.useMemo(() => new Set(completedLessons), [completedLessons]);
  const firstIncompleteIndex = reactExports.useMemo(
    () => lessons2.findIndex((l) => !completedSet.has(l.id)),
    [lessons2, completedSet]
  );
  function getLessonState(lesson, index) {
    if (completedSet.has(lesson.id)) return "completed";
    if (index === firstIncompleteIndex) return "current";
    return "available";
  }
  if (!moduleMeta) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: styles.backButton, onClick: onBack, children: [
        "←",
        " Back to modules"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles.moduleTitle, children: moduleMeta.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.moduleDescription, children: moduleMeta.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.progressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.progressFill, style: { width: `${percent}%` } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.lessons, children: lessons2.map((lesson, i) => {
      const state = getLessonState(lesson, i);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `${styles.lessonItem} ${styles[state]}`,
          onClick: () => onLessonClick(lesson.id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.lessonNumber, children: state === "completed" ? "✓" : i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.lessonInfo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.lessonTitle, children: lesson.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.lessonType, children: TYPE_LABELS[lesson.type] || lesson.type })
            ] }),
            state === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.lessonCheck, children: "✓" })
          ]
        },
        lesson.id
      );
    }) })
  ] });
}
export {
  LessonList as default
};
//# sourceMappingURL=LessonList-BUgCx9pj.js.map
