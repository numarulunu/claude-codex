import { j as jsxRuntimeExports, r as reactExports, u as useProgressContext, g as getModuleProgress } from "./index-rEfxmL-f.js";
import { l as loadModules } from "./curriculum-DNetKi3g.js";
import "./vendor-DUI7kKlB.js";
const ring = "_ring_1p1l5_1";
const trackCircle = "_trackCircle_1p1l5_5";
const progressCircle = "_progressCircle_1p1l5_10";
const completed$1 = "_completed_1p1l5_17";
const styles$1 = {
  ring,
  trackCircle,
  progressCircle,
  completed: completed$1
};
function ProgressRing({ size = 64, strokeWidth = 4, percent = 0 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percent / 100 * circumference;
  const isComplete = percent >= 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className: `${styles$1.ring} ${isComplete ? styles$1.completed : ""}`,
      width: size,
      height: size,
      role: "progressbar",
      "aria-valuenow": Math.round(percent),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": `Progress: ${Math.round(percent)}%`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            className: styles$1.trackCircle,
            cx: size / 2,
            cy: size / 2,
            r: radius,
            strokeWidth
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            className: styles$1.progressCircle,
            cx: size / 2,
            cy: size / 2,
            r: radius,
            strokeWidth,
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }
        )
      ]
    }
  );
}
const map = "_map_yg9ce_1";
const title = "_title_yg9ce_8";
const subtitle = "_subtitle_yg9ce_15";
const path = "_path_yg9ce_21";
const connector = "_connector_yg9ce_29";
const completed = "_completed_yg9ce_35";
const node = "_node_yg9ce_39";
const nodeCircle = "_nodeCircle_yg9ce_52";
const current = "_current_yg9ce_66";
const checkmark = "_checkmark_yg9ce_81";
const ringOverlay = "_ringOverlay_yg9ce_93";
const nodeInfo = "_nodeInfo_yg9ce_99";
const nodeNumber = "_nodeNumber_yg9ce_103";
const nodeTitle = "_nodeTitle_yg9ce_111";
const nodeProgress = "_nodeProgress_yg9ce_121";
const styles = {
  map,
  title,
  subtitle,
  path,
  connector,
  completed,
  node,
  nodeCircle,
  current,
  checkmark,
  ringOverlay,
  nodeInfo,
  nodeNumber,
  nodeTitle,
  nodeProgress
};
const MODULE_ICONS = {
  "01-cli-fundamentals": "⌨️",
  "02-prompt-engineering": "🎯",
  "03-hooks-automation": "⚙️",
  "04-skills-plugins": "🧩",
  "05-mcp-servers": "🔌",
  "06-subagents": "🤖",
  "07-scripts-pipelines": "📜",
  "08-n8n-integration": "🔄",
  "09-business-automation": "💼",
  "10-content-pipelines": "🎥"
};
function ModuleMap({ onModuleClick }) {
  const [modules, setModules] = reactExports.useState([]);
  const { progress } = useProgressContext();
  reactExports.useEffect(() => {
    loadModules().then(setModules);
  }, []);
  if (!modules.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.map, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: styles.title, children: "Claude Codex" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles.subtitle, children: "Master Claude Code CLI, one lesson at a time" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.path, children: modules.map((mod, i) => {
      const percent = getModuleProgress(mod.id, mod.lessonCount, progress);
      const isComplete = percent >= 100;
      const isCurrent = !isComplete;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles.connector} ${isComplete || isCurrent && percent > 0 ? styles.completed : ""}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `${styles.node} ${isComplete ? styles.completed : ""} ${isCurrent ? styles.current : ""} ${""}`,
            onClick: () => onModuleClick(mod.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.nodeCircle, children: [
                isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.checkmark, children: "✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: MODULE_ICONS[mod.id] || "📖" }),
                isCurrent && percent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.ringOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { size: 80, strokeWidth: 3, percent }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.nodeInfo, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.nodeNumber, children: [
                  "Module ",
                  i + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.nodeTitle, children: mod.title }),
                isCurrent && percent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.nodeProgress, children: [
                  Math.round(percent),
                  "% complete"
                ] })
              ] })
            ]
          }
        )
      ] }, mod.id);
    }) })
  ] });
}
export {
  ModuleMap as default
};
//# sourceMappingURL=ModuleMap-Cgd-I_v7.js.map
