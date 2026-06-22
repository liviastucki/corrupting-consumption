// MARK: CURSOR 
if (window.self === window.top) {

const CURSOR_SIZE = 60;
const cursorUrl = chrome.runtime.getURL("cursor/cursor.svg");
const NUDGE_FRONT_Z_INDEX = "2147483647";
const NUDGE_UI_Z_INDEX = "2147483645";
const NUDGE_LINE_Z_INDEX = "2147483643";
import(chrome.runtime.getURL("modules/cart-chase.js")).catch((error) => {
  console.warn("[Nudge] Warenkorb-Effekt konnte nicht geladen werden", error);
});

// MARK: POPUP-BLOCKER
(() => {
  const POPUP_BLOCKER_STYLE_ID = "__nudge-popup-blocker-style";

const POPUP_TEXT_PATTERN =
  /\b(cookie|cookies|consent|privacy|gdpr|newsletter|subscribe|sign up|signup|popup|modal|registrieren|anmelden|rabatt|discount|angebot|deal|benachrichtigung|notification|welcome|coupon|coins|app|download|sign in|login|join|claim|exclusive|promotion|new user|limited|save)\b/i;
  
  const POPUP_SELECTORS = [
    "#onetrust-consent-sdk",
    "#onetrust-banner-sdk",
    "#didomi-host",
    "#usercentrics-root",
    "#CybotCookiebotDialog",
    "#sp_message_container",
    "#truste-consent-track",
    "#privacy-manager",
    ".didomi-popup-container",
    ".osano-cm-window",
    ".osano-cm-dialog",
    ".cc-window",
    ".cc-banner",
    ".cookie-banner",
    ".cookie-consent",
    ".cookie-notice",
    ".consent-banner",
    ".consent-modal",
    ".gdpr-banner",
    ".gdpr-modal",
    "[id*='cookie' i]",
    "[class*='cookie' i]",
    "[id*='consent' i]",
    "[class*='consent' i]",
    "[id*='newsletter' i]",
    "[class*='newsletter' i]"
  ].join(",");

    const ALIEXPRESS_POPUP_SELECTORS = [
    ".comet-modal",
    ".comet-modal-wrap",
    ".comet-modal-mask",
    ".comet-dialog",
    ".comet-dialog-mask",
    ".comet-v2-modal",
    ".comet-v2-modal-mask",
    "[class*='comet-modal' i]",
    "[class*='comet-dialog' i]",
    "[class*='newuser' i]",
    "[class*='new-user' i]",
    "[class*='coupon' i]",
    "[class*='promotion' i]",
    "[class*='ae-mask' i]",
    "[class*='ae-overlay' i]",
    "[class*='poplayer' i]",
    "[class*='pop-layer' i]"
  ].join(",");

  function isAliExpressPage() {
    return window.location.hostname.toLowerCase().includes("aliexpress.");
  }

  function getActivePopupSelectors() {
    return isAliExpressPage()
      ? `${POPUP_SELECTORS},${ALIEXPRESS_POPUP_SELECTORS}`
      : POPUP_SELECTORS;
  }

  const NUDGE_EXCLUDE_SELECTOR = [
    "#custom-extension-cursor",
    "#custom-extension-cursor *",
    "#__nudge-start-menu",
    "#__nudge-start-menu *",
    "#nudge-tools-wheel-menu",
    "#nudge-tools-wheel-menu *",
    "#nudge-content-wheel-menu",
    "#nudge-content-wheel-menu *",
    "[id^='__nudge-']",
    "[id^='__nudge-'] *",
    "[class^='nudge-']",
    "[class^='nudge-'] *"
  ].join(",");

  function isNudgeElement(element) {
    return element instanceof Element && element.closest(NUDGE_EXCLUDE_SELECTOR);
  }

  function removePopupElement(element) {
    if (!(element instanceof Element)) return;
    if (isNudgeElement(element)) return;

    element.remove();
  }

function removeKnownPopups(root = document) {
  const activeSelectors = getActivePopupSelectors();

  root.querySelectorAll?.(activeSelectors).forEach(removePopupElement);

  root.querySelectorAll?.("dialog, [role='dialog'], [aria-modal='true']").forEach((element) => {
    if (isNudgeElement(element)) return;

    const text = (element.innerText || element.textContent || "").slice(0, 1000);

    if (POPUP_TEXT_PATTERN.test(text)) {
      removePopupElement(element);
    }
  });

  if (!isAliExpressPage()) return;

  root.querySelectorAll?.("body > div, body > section").forEach((element) => {
    if (isNudgeElement(element)) return;

    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const text = (element.innerText || element.textContent || "").slice(0, 1200);
    const zIndex = parseInt(style.zIndex, 10) || 0;

    const looksLikeOverlay =
      (style.position === "fixed" || style.position === "sticky") &&
      zIndex >= 100 &&
      rect.width >= window.innerWidth * 0.35 &&
      rect.height >= window.innerHeight * 0.15;

    if (looksLikeOverlay && POPUP_TEXT_PATTERN.test(text)) {
      removePopupElement(element);
    }
  });
}

  function unlockPageScroll() {
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("position");
    document.body?.style.removeProperty("overflow");
    document.body?.style.removeProperty("position");
  }

  if (!document.getElementById(POPUP_BLOCKER_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = POPUP_BLOCKER_STYLE_ID;
    style.textContent = `
      ${getActivePopupSelectors()} {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.documentElement.appendChild(style);
  }

  removeKnownPopups();
  unlockPageScroll();

  const popupObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (node.matches?.(getActivePopupSelectors())) {
          removePopupElement(node);
          return;
        }

        removeKnownPopups(node);
      });
    });

    unlockPageScroll();
  });

  const startPopupObserver = () => {
    if (!document.body) {
      requestAnimationFrame(startPopupObserver);
      return;
    }

    popupObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  startPopupObserver();
})();

const AD_BACKDROP_BLUR = 12; // unschärfi ir flächi

const CURSOR_VIEWBOX_SIZE = 74;
const CURSOR_INNER_X      = 16.24;
const CURSOR_INNER_Y      = 16.49;
const CURSOR_INNER_SIZE   = 42.86;

const CURSOR_HOVER_SHRINK_SCALE = 0.5; // 0.5 = halb so gross
const CURSOR_HOVER_SHRINK_HIT_INSET_Y = 0.18; // 0 = ganze SVG-Fläche, 0.25 = nur mittlere 50%

const CURSOR_HOVER_SHRINK_SVG_PATHS = [ // hover effekt
  "content/*.svg",
  "content/*.webp",
  "cursor/*.svg",
  "menu/*.svg",
  "tools/*.svg"
];

const CURSOR_HOVER_SHRINK_EXCLUDE_PATHS = [ // hover effekt ausklammern
  "content/*_.svg",
  "cursor/*_.svg",
  "menu/e_*.svg",
  "tools/*_.svg"
];

function matchesCursorHoverShrinkPath(value, path) {
  if (!value || !path) return false;

  if (!path.includes("*")) {
    return value.includes(path);
  }

  const [before, after] = path.split("*");

  return value.includes(before) && value.includes(after);
}

let currentCursorScale = 1;
window.__nudgeCursorScale = 1;

const cursor = document.createElement("div");
cursor.id = "custom-extension-cursor";

Object.assign(cursor.style, {
  position:        "fixed",
  left:            "0px",
  top:             "0px",
  width:           `${CURSOR_SIZE}px`,
  height:          `${CURSOR_SIZE}px`,
  transform:       "translate(-50%, -50%) scale(1)",
  transition:      "transform 160ms cubic-bezier(0.22, 1, 0.36, 1)", //hoover skalierung
  transformOrigin: "center center",
  pointerEvents:   "none",
  zIndex:          NUDGE_FRONT_Z_INDEX,
  userSelect:      "none",
  display:         "none",
  background:      "transparent",
  border:          "none",
  outline:         "none",
  padding:         "0",
  margin:          "0"
});

const cursorBackdrop = document.createElement("div");

Object.assign(cursorBackdrop.style, {
  position:              "absolute",
  left:                  `${(CURSOR_INNER_X / CURSOR_VIEWBOX_SIZE) * 100}%`,
  top:                   `${(CURSOR_INNER_Y / CURSOR_VIEWBOX_SIZE) * 100}%`,
  width:                 `${(CURSOR_INNER_SIZE / CURSOR_VIEWBOX_SIZE) * 100}%`,
  height:                `${(CURSOR_INNER_SIZE / CURSOR_VIEWBOX_SIZE) * 100}%`,
  borderRadius:          "9999px",
  pointerEvents:         "none",
  background:            "rgba(255,255,255,0.001)",
  backdropFilter:        `blur(${AD_BACKDROP_BLUR}px)`,
  WebkitBackdropFilter:  `blur(${AD_BACKDROP_BLUR}px)`,
  zIndex:                "0"
});

const cursorImage = document.createElement("img");
cursorImage.src = cursorUrl;
cursorImage.alt = "";

Object.assign(cursorImage.style, {
  position:         "relative",
  zIndex:           "1",
  width:            "100%",
  height:           "100%",
  display:          "block",
  pointerEvents:    "none",
  userSelect:       "none",
  background:       "transparent",
  border:           "none",
  outline:          "none",
  padding:          "0",
  margin:           "0",
  imageRendering:   "-webkit-optimize-contrast"
});

const cursorRing = document.createElement("div");

Object.assign(cursorRing.style, {
  position:      "absolute",
  left:          `${(CURSOR_INNER_X / CURSOR_VIEWBOX_SIZE) * 100}%`,
  top:           `${(CURSOR_INNER_Y / CURSOR_VIEWBOX_SIZE) * 100}%`,
  width:         `${(CURSOR_INNER_SIZE / CURSOR_VIEWBOX_SIZE) * 100}%`,
  height:        `${(CURSOR_INNER_SIZE / CURSOR_VIEWBOX_SIZE) * 100}%`,
  pointerEvents: "none",
  border:        "1px solid white",
  borderRadius:  "9999px",
  boxSizing:     "border-box",
  zIndex:        "2"
});

function updateCursorRingPosition() {
  cursorRing.style.display = cursor.style.display === "none" ? "none" : "block";
}

cursor.appendChild(cursorBackdrop);
cursor.appendChild(cursorImage);
cursor.appendChild(cursorRing);
document.documentElement.appendChild(cursor);

const nativeCursorHideStyle = document.createElement("style");
nativeCursorHideStyle.id = "__nudge-hide-native-cursor-style";
nativeCursorHideStyle.textContent = `
  html,
  body,
  body *,
  #custom-extension-cursor,
  #custom-extension-cursor *,
  #__nudge-start-menu,
  #__nudge-start-menu *,
  #nudge-tools-wheel-menu,
  #nudge-tools-wheel-menu *,
  #nudge-content-wheel-menu,
  #nudge-content-wheel-menu *,
  [id^="__nudge-selected-tool-dock-img-"],
  [id^="__nudge-tools-wheel-side-cursor-"],
  [id^="__nudge-start-menu-"],
  #__nudge-tools-wheel-big-cursor,
  #__nudge-content-wheel-big-cursor,
  .nudge-content-website-preview,
  .nudge-content-website-preview * {
    cursor: none !important;
  }

  .nudge-content-website-preview iframe {
    cursor: default !important;
  }
`;

document.documentElement.appendChild(nativeCursorHideStyle);

function setCustomCursorHiddenForIframe(hidden) {
  cursor.style.display = hidden ? "none" : "block";
  updateCursorRingPosition();
}

function keepCursorAndThreadsInFront() {
  const threadSvg = document.getElementById("__nudge-dark-threads-svg");

  if (threadSvg) {
    threadSvg.style.zIndex = NUDGE_LINE_Z_INDEX;
  }

  cursor.style.zIndex = NUDGE_FRONT_Z_INDEX;

  if (
    cursor.parentNode === document.documentElement &&
    document.documentElement.lastElementChild !== cursor
  ) {
    document.documentElement.appendChild(cursor);
  }
}

keepCursorAndThreadsInFront();

let cursorRaf = 0;
let cursorX = 0;
let cursorY = 0;

function isInsideCursorShrinkHitArea(element, clientX, clientY) {
  const rect = element.getBoundingClientRect();

  if (!rect.width || !rect.height) return false;

  const insetY = rect.height * CURSOR_HOVER_SHRINK_HIT_INSET_Y;

  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top + insetY &&
    clientY <= rect.bottom - insetY
  );
}

function isCursorShrinkSvgTarget(event) {
  const target = event.target instanceof Element ? event.target : null;

  if (
    target?.closest?.("#__nudge-tools-wheel-side-cursor-left") ||
    target?.closest?.("#__nudge-tools-wheel-side-cursor-right") ||
    target?.closest?.(".nudge-content-website-preview button")
  ) {
    return true;
  }

  function isShrinkElement(element) {
    if (!element) return false;

    const candidate = element.closest?.("img, svg, use");
    if (!candidate) return false;

    if (!isInsideCursorShrinkHitArea(candidate, event.clientX, event.clientY)) {
      return false;
    }

    const value =
      candidate.tagName?.toLowerCase() === "img"
        ? (candidate.currentSrc || candidate.src || candidate.getAttribute("src") || "")
        : [
            candidate.id || "",
            candidate.getAttribute?.("href") || "",
            candidate.getAttribute?.("xlink:href") || "",
            candidate.getAttribute?.("data-svg") || ""
          ].join(" ");

    const included = CURSOR_HOVER_SHRINK_SVG_PATHS.some((path) => {
      return matchesCursorHoverShrinkPath(value, path);
    });

    const excluded = CURSOR_HOVER_SHRINK_EXCLUDE_PATHS.some((path) => {
      return matchesCursorHoverShrinkPath(value, path);
    });

    return included && !excluded;
  }

  const pointElements =
    typeof document.elementsFromPoint === "function"
      ? document.elementsFromPoint(event.clientX, event.clientY)
      : [];

  for (const element of pointElements) {
    if (isShrinkElement(element)) return true;
  }

  const fallbackElements = document.querySelectorAll([
    "#__nudge-start-menu img",
    "#__nudge-start-menu svg",
    "#nudge-tools-wheel-menu img",
    "#nudge-tools-wheel-menu svg",
    "#nudge-content-wheel-menu img",
    "#nudge-content-wheel-menu svg",
    "img[src*='menu/intro.svg']",
    "img[src*='menu/impressum.svg']"
  ].join(", "));

  for (const element of fallbackElements) {
    if (isShrinkElement(element)) return true;
  }

  return false;
}

function setCursorScale(nextScale) {
  if (currentCursorScale === nextScale) return;

  currentCursorScale = nextScale;
  window.__nudgeCursorScale = nextScale;
  cursor.style.transform = `translate(-50%, -50%) scale(${nextScale})`;
}

document.addEventListener(
  "mousemove",
  (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    
    setCursorScale(
      isCursorShrinkSvgTarget(event)
        ? CURSOR_HOVER_SHRINK_SCALE
        : 1
    );

    if (cursorRaf) return;

    cursorRaf = requestAnimationFrame(() => {
      cursorRaf = 0;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursor.style.display = "block";
        updateCursorRingPosition();
        keepCursorAndThreadsInFront();
    });
  },
  true
);

















// MARK: FÄDEN 
(function () {

  // ── Konstanten ──────────────────────────────────────────────────────────────
  const FADEN_RADIUS       = 500;
  const MAX_FÄDEN          = 5;
  const FADEN_BREITE       = 1;
  const OUTLINE_OFFSET     = 2;
  const FADEN_START_OFFSET = 18; // abstand vor liniä zum cursor

  // ── Ziel-Elemente ───────────────────────────────────────────────────────────
  const TARGET_SELECTOR = "div";

  const UI_EXCLUDE_SELECTOR = [
    "#custom-extension-cursor",
    "#custom-extension-cursor *",
    "#__nudge-dark-threads-svg",
    "#__nudge-dark-threads-svg *",
    ".__nudge-dark-pattern-box",
    ".__nudge-dark-pattern-box *",
    "#__nudge-start-menu",
    "#__nudge-start-menu *",
    "#nudge-tools-wheel-menu",
    "#nudge-tools-wheel-menu *"
  ].join(", ");


  // ── SVG-Container + Shadow-Filter ───────────────────────────────────────────
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "__nudge-dark-threads-svg";

  Object.assign(svg.style, {
    position:      "fixed",
    left:          "0",
    top:           "0",
    width:         "100vw",
    height:        "100vh",
    pointerEvents: "none",
    zIndex:        NUDGE_LINE_Z_INDEX,
    overflow:      "visible"
  });

  svg.innerHTML = `
    <defs>
      <filter id="__nudge-thread-shadow"
              x="-200%"
              y="-200%"
              width="600%"
              height="600%">
        <feDropShadow
          in="SourceAlpha"
          dx="0"
          dy="0"
          stdDeviation="8"
          flood-color="#000000"
          flood-opacity="2"
          result="darkShadow"/>
        <feMerge>
          <feMergeNode in="darkShadow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;

  document.documentElement.appendChild(svg);

  // ── State ───────────────────────────────────────────────────────────────────
  const aktiveFäden = new Map();

  let mausX      = -9999;
  let mausY      = -9999;
  let kandidaten = [];
  let letzterScan = 0;
  let scanDirty  = true;
  let rafId      = 0;

    const THREAD_TARGET_REGISTRY = window.__nudgeThreadTargetRegistry || {
    sources: new Map()
  };

  window.__nudgeThreadTargetRegistry = THREAD_TARGET_REGISTRY;

  window.__nudgeSetThreadTargets = function (toolId, elements, options = {}) {
    if (!toolId) return;

    THREAD_TARGET_REGISTRY.sources.set(toolId, {
      active: true,
      radius: Number(options.radius) || FADEN_RADIUS,
      targets: new Set(Array.from(elements || []).filter((el) => el instanceof Element))
    });

    scanDirty = true;
    scheduleRender();
  };

  window.__nudgeClearThreadTargets = function (toolId) {
    if (!toolId) return;

    THREAD_TARGET_REGISTRY.sources.delete(toolId);

    scanDirty = true;
    scheduleRender();
  };

  function getActiveThreadSources() {
    return Array.from(THREAD_TARGET_REGISTRY.sources.values())
      .filter((source) => source?.active);
  }

  function getRegisteredThreadTargets() {
    const targets = new Set();

    getActiveThreadSources().forEach((source) => {
      source.targets.forEach((el) => {
        if (el?.isConnected) targets.add(el);
      });
    });

    return Array.from(targets);
  }

  function getActiveThreadRadius() {
    const sources = getActiveThreadSources();

    if (!sources.length) return FADEN_RADIUS;

    return Math.max(
      ...sources.map((source) => Number(source.radius) || FADEN_RADIUS)
    );
  }

  // ── Hilfsfunktionen ─────────────────────────────────────────────────────────
  function isUI(element) {
    return (
      element instanceof Element &&
      element.closest(UI_EXCLUDE_SELECTOR) !== null
    );
  }

  function istSichtbar(element) {
    const r = element.getBoundingClientRect();
    return (
      r.width > 0 &&
      r.height > 0 &&
      r.bottom >= 0 &&
      r.right >= 0 &&
      r.top <= window.innerHeight &&
      r.left <= window.innerWidth
    );
  }

  // ── Fäden erstellen / entfernen ─────────────────────────────────────────────
  function erstelleFaden(element) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("stroke", "#ffffff");
    line.setAttribute("stroke-width", String(FADEN_BREITE));
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("filter", "url(#__nudge-thread-shadow)");

    svg.appendChild(line);

    const box = document.createElement("div");
    box.className = "__nudge-dark-pattern-box";

    Object.assign(box.style, {
      position:     "fixed",
      left:         "0px",
      top:          "0px",
      width:        "0px",
      height:       "0px",
      boxSizing:    "border-box",
      border:       "0px solid #ffffff00", // usgschauteti umrandigä
      borderRadius: "600px",               // radius vo dä umrandigä
      boxShadow:    `
        0 0 8px rgba(0, 0, 0, 0),
        0 0 3px rgba(255, 255, 255, 0)
      `,
      filter:       "url(#__nudge-thread-shadow)",
      pointerEvents: "none",
      zIndex:       NUDGE_LINE_Z_INDEX
      });

    document.documentElement.appendChild(box);
    box.style.zIndex = NUDGE_LINE_Z_INDEX;

    aktiveFäden.set(element, { line, box });

    return { line, box };
  }

  function entferneFaden(element) {
    const item = aktiveFäden.get(element);
    if (!item) return;
    item.line.remove();
    item.box.remove();
    aktiveFäden.delete(element);
  }

  function aktualisiereBox(box, rect, opacity) {
    box.style.left   = `${rect.left   - OUTLINE_OFFSET}px`;
    box.style.top    = `${rect.top    - OUTLINE_OFFSET}px`;
    box.style.width  = `${rect.width  + OUTLINE_OFFSET * 2}px`;
    box.style.height = `${rect.height + OUTLINE_OFFSET * 2}px`;
    box.style.opacity = String(opacity);
  }

  // ── Render-Loop ─────────────────────────────────────────────────────────────
  function scanneKandidaten() {
    const activeThreadSources = getActiveThreadSources();

    if (activeThreadSources.length) {
      kandidaten = getRegisteredThreadTargets()
        .filter((element) => !isUI(element) && istSichtbar(element));

      letzterScan = performance.now();
      scanDirty   = false;
      return;
    }

    kandidaten = Array.from(
      document.querySelectorAll(TARGET_SELECTOR)
    ).filter((element) => {
      return (
        element instanceof HTMLDivElement &&
        !isUI(element) &&
        istSichtbar(element)
      );
    });

  letzterScan = performance.now();
  scanDirty   = false;
  }

  function renderFäden() {
    rafId = 0;

    const jetzt = performance.now();
    if (scanDirty || jetzt - letzterScan > 1000) {
      scanneKandidaten();
    }

    const naheElemente = kandidaten
      .map((element) => {
        const r = element.getBoundingClientRect();
        const ex = r.left + r.width  / 2;
        const ey = r.top  + r.height / 2;
        const distanz = Math.sqrt((ex - mausX) ** 2 + (ey - mausY) ** 2);
        return { element, rect: r, ex, ey, distanz };
      })
      .filter((item) => item.distanz < getActiveThreadRadius())
      .sort((a, b) => a.distanz - b.distanz)
      .slice(0, MAX_FÄDEN);

    aktiveFäden.forEach((_, element) => {
      if (!naheElemente.some((item) => item.element === element)) {
        entferneFaden(element);
      }
    });

    naheElemente.forEach(({ element, rect, ex, ey }) => {
      const opacity = 1;
      const item    = aktiveFäden.get(element) || erstelleFaden(element);

      const dx  = ex - mausX;
      const dy  = ey - mausY;
      const len = Math.hypot(dx, dy) || 1;

      const cursorScale = Number(window.__nudgeCursorScale) || 1;
      const cursorThreadOffset = FADEN_START_OFFSET * cursorScale;

      const startX = mausX + (dx / len) * cursorThreadOffset;
      const startY = mausY + (dy / len) * cursorThreadOffset;

      item.line.setAttribute("x1", String(startX));
      item.line.setAttribute("y1", String(startY));
      item.line.setAttribute("x2", String(ex));
      item.line.setAttribute("y2", String(ey));
      item.line.setAttribute("stroke-opacity", "1");
      item.line.setAttribute("stroke-width", String(FADEN_BREITE));
      aktualisiereBox(item.box, rect, opacity);
    });
  }

  function scheduleRender() {
    if (rafId) return;
    rafId = requestAnimationFrame(renderFäden);
  }

  // ── Event-Listener ──────────────────────────────────────────────────────────
  document.addEventListener(
    "mousemove",
    (event) => {
      mausX = event.clientX;
      mausY = event.clientY;
      scheduleRender();
    },
    true
  );

  window.addEventListener("scroll", scheduleRender, true);
  window.addEventListener("resize", scheduleRender, true);

  const observer = new MutationObserver(() => { scanDirty = true; });

  if (document.body) {
    observer.observe(document.body, {
      childList:     true,
      subtree:       true,
      characterData: true
    });
  }

})();















// MARK: START-MENÜ
(() => {

  const FEATURE_ID = "__nudge-start-menu";
  if (document.getElementById(FEATURE_ID)) return;

  // ── Storage-Keys ────────────────────────────────────────────────────────────
  const SHARED_HOST_KEY   = "riggedLastHostname";
  const FEATURE_HOST_KEY  = "__nudgeStartMenuLastHostname";
  const NAV_SKIP_INTRO_KEY = "__nudgeSkipIntroOnce";
  const NAV_SNAP_POSITION_KEY = "__nudgeNavSnapPosition";
  const NAV_MENU_POSITIONS_KEY = "__nudgeNavMenuPositions";
  const NAV_TARGET_URL_KEY = "__nudgeNavTargetUrl";
  const NAV_TARGET_RETRY_KEY = "__nudgeNavTargetRetry";
  const FORCE_INTRO_KEY = "__nudgeForceIntroOnce";
  const IDLE_INTRO_PAUSE_KEY = "__nudgeIdleIntroPauseOnce";
  const IDLE_INTRO_START_MIDDLE_KEY = "__nudgeIdleIntroStartMiddleOnce";
  const PAGE_CLICK_NAV_KEY = "__nudgePageClickNavigationOnce";
  const POSITION_KEY      = `__nudgeStartMenuPositions:${window.location.hostname}`;
  const MENU_RESTORE_EVENT = "__nudgeStartMenuReady";

  const currentHostname = window.location.hostname;
  const currentUrlNoHash = window.location.href.split("#")[0];

  // ── Layout-Konstanten ───────────────────────────────────────────────────────
  const BIG_SIZE   = 200;
  const SIDE_SIZE  = 250;
  const GAP        = 10;

  const BIG_HALF   = BIG_SIZE  / 2;
  const SIDE_HALF  = SIDE_SIZE / 2;

  const TOP_CURSOR_SIZE          = 60;  // grösse vom oberen cursor.svg
  const TOP_CURSOR_VISIBLE_RATIO = 0.5; // 0.5 = genau halb sichtbar
  const TOP_CURSOR_HOVER_OFFSET =35; // hover-bounce nach unten
  const TOP_CURSOR_FRAME_GAP     = -13.5;  // abstand vom rahmen zum oberen cursor.svg
  const SIDE_FRAME_CURSOR_SIZE = 60;
  const SIDE_FRAME_CURSOR_GAP = -13.5;
  const SIDE_FRAME_GAP_UPDATE_EVENT = "__nudgeSideCursorFrameGapUpdate";

  const TOP_CURSOR_MOVE_DURATION     = 900;  // bewegung von oben in die mitte
  const IMPRESSUM_WIDTH              = 800;  // grösse von menu/Impressum.svg
  const IMPRESSUM_CURSOR_SCALE       = 4.65;    // skalierung vom big_cursor.svg in der mitte
  const IMPRESSUM_SCALE_DURATION     = 2000; // duur vor impressum ani

  const SIDE_BOTTOM_EXTRA   = 60;  // px weiter nach unten erlaubt
  const SIDE_SCREEN_MARGIN_X = 30; // px Abstand links und rechts

  const BIG_LINE_RADIUS           = 82;
  const FADEN_START_OFFSET        = 1;
  const CONSOLE_LINE_ANCHOR_OFFSET_X = 0; // versatz vom ankerpunkt
  const CONSOLE_LINE_ANCHOR_OFFSET_Y = 20;
  const CONTENT_LINE_ANCHOR_OFFSET_X = 0; // versatz vom ankerpunkt
  const CONTENT_LINE_ANCHOR_OFFSET_Y = 20;

  const EDGE_BOTTOM = "bottom";
  const EDGE_LEFT   = "left";
  const EDGE_RIGHT  = "right";

  // ── Rahmen-Konstanten ───────────────────────────────────────────────────────
  const FRAME_MARGIN       = 10;
  const BIG_SNAP_MARGIN    = 20; // abstand links u rächts i dä snapps vom menu
  const FRAME_RADIUS       = 24;
  const FRAME_STROKE_WIDTH = 1.5;
  const FRAME_GAP_EXTRA    = 17; // abstand vor dä ändinä vor liniä zum big cursor
  const FRAME_GAP_EXTRA_COLLAPSED = 45; // rahmen-linien weiter nach innen wenn big_cursor nur 1/4 sichtbar ist

  const Z_MENU = "2147483600";

  // ── Asset-URLs ──────────────────────────────────────────────────────────────
  const bigCursorUrl = chrome.runtime.getURL("cursor/big_cursor_intro.svg");
  const bigCursorIntroUrl = bigCursorUrl;
  const consoleUrl   = chrome.runtime.getURL("menu/console.svg");
  const contentUrl   = chrome.runtime.getURL("menu/content.svg");
  const topCursorUrl = chrome.runtime.getURL("cursor/cursor.svg");
  const topCursorIcon1Url = chrome.runtime.getURL("cursor/icon_1.svg");
  const topCursorIcon2Url = chrome.runtime.getURL("cursor/icon_2.svg");

  const TOP_CURSOR_ICON1_SIZE = 76;
  const TOP_CURSOR_ICON1_OFFSET_X = 7; // + = nach rechts - = nach links
  const TOP_CURSOR_ICON1_OFFSET_Y = 27; // + = nach unten - = nach oben

  const TOP_CURSOR_ICON2_SIZE = 76;
  const TOP_CURSOR_ICON2_OFFSET_X = -2; // + = nach rechts - = nach links
  const TOP_CURSOR_ICON2_OFFSET_Y = 3; // + = nach unten - = nach oben

  const impressumUrl = chrome.runtime.getURL("menu/impressum.svg");

  // ── Title-PNG-Animation vor Intro ───────────────────────────────────────────
  const TITLE_FRAME_START    = 0;
  const TITLE_FRAME_END      = 259;
  const TITLE_FRAME_FPS      = 24;  // HIER anpassen: 12 / 24 / 30
  const TITLE_FRAME_WIDTH    = 700; // grössi vor ani
  const TITLE_FRAME_SCALE    = 2.2; // HIER grösse einstellen
  const TITLE_FRAME_FADE_OUT = 200;

  const TITLE_BACKDROP_BLUR = 12; // HIER blur-stärke einstellen
  const BIG_CURSOR_BACKDROP_BLUR = 12; // unschärfi ir flächi vom big_cursor_intro.svg
  const TOP_CURSOR_BACKDROP_BLUR = 12; // unschärfi ir flächi vom top_cursor / impressum-cursor
  let pauseTitleAtMiddleAfterIdle = false;
  let startTitleDirectlyAtMiddleAfterIdle = false;

  function getTitleFrameUrl(frameNumber) {
    return chrome.runtime.getURL(
      `menu/title/titel animation_${String(frameNumber).padStart(5, "0")}.png`
    );
  }

  // ── Root-Container ──────────────────────────────────────────────────────────
  const root = document.createElement("div");
  root.id = FEATURE_ID;

  Object.assign(root.style, {
    position:      "fixed",
    inset:         "0",
    pointerEvents: "none",
    zIndex:        Z_MENU
  });

  document.documentElement.appendChild(root);

  // ── Hilfsfunktionen: Positionsberechnung ────────────────────────────────────
  function bottomTop()      { return window.innerHeight - BIG_HALF; }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  // ── SVG-Container für Verbindungslinien ─────────────────────────────────────
  function createFallbackLineSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "__nudge-start-menu-line-svg";
    Object.assign(svg.style, {
      position:      "fixed",
      left:          "0",
      top:           "0",
      width:         "100vw",
      height:        "100vh",
      pointerEvents: "none",
      zIndex:        "2147483000",
      overflow:      "visible"
    });
    document.documentElement.appendChild(svg);
    return svg;
  }

  function getLineSvg() {
    return (
      window.lineSvg ||
      document.getElementById("__nudge-dark-threads-svg") ||
      createFallbackLineSvg()
    );
  }

  const lineSvg = getLineSvg();

  // ── Shadow-Filter für Linien ────────────────────────────────────────────────
  function ensureDpShadowFilter(svg) {
    if (document.getElementById("__dp_shadow")) return;

    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.id = "__dp_shadow";
    filter.setAttribute("x", "-300%");
    filter.setAttribute("y", "-300%");
    filter.setAttribute("width", "800%");
    filter.setAttribute("height", "800%");

    filter.innerHTML = `
      <feDropShadow in="SourceAlpha" dx="0" dy="0"
        stdDeviation="6" flood-color="#000000" flood-opacity="1"
        result="shadow1"/>
      <feDropShadow in="SourceAlpha" dx="0" dy="0"
        stdDeviation="12" flood-color="#000000" flood-opacity="1"
        result="shadow2"/>
      <feMerge>
        <feMergeNode in="shadow2"/>
        <feMergeNode in="shadow1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    `;

    defs.appendChild(filter);
  }

  ensureDpShadowFilter(lineSvg);

  // ── Verbindungslinien (big_cursor → console / content) ──────────────────────
  function makeLine(id) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.id = id;
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "1.5");
    line.setAttribute("stroke-opacity", "1");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("filter", "url(#__dp_shadow)");
    line.style.display = "none";
    lineSvg.appendChild(line);
    return line;
  }

  const lineToConsole = makeLine("__nudge-start-menu-line-console");
  const lineToContent = makeLine("__nudge-start-menu-line-content");

  // ── Icon-Elemente ───────────────────────────────────────────────────────────
  function makeImg(id, src, size, transformValue) {
    const img = document.createElement("img");
    img.id  = id;
    img.src = src;
    img.alt = "";
    Object.assign(img.style, {
      position:       "fixed",
      left:           "0px",
      top:            "0px",
      width:          `${size}px`,
      height:         `${size}px`,
      transform:      transformValue,
      transformOrigin: "center center",
      pointerEvents:  "auto",
      userSelect:     "none",
      cursor:         "grab",
      zIndex:         Z_MENU,
      touchAction:    "none",
      WebkitUserDrag: "none"
    });
    root.appendChild(img);
    return img;
  }

  const bigCursor   = makeImg("__nudge-start-menu-big-cursor", bigCursorUrl, BIG_SIZE,  "none");

  //unscherfi im big_cursor_intro.svg
  let mainBigCursorBackdrop = null;
  let mainBigCursorBackdropRaf = 0;

  function updateMainBigCursorBackdropPosition() {
    if (!mainBigCursorBackdrop || !bigCursor) return;

    const rect = bigCursor.getBoundingClientRect();

    if (!rect.width || !rect.height || bigCursor.style.opacity === "0") {
      mainBigCursorBackdrop.style.display = "none";
      return;
    }

    mainBigCursorBackdrop.style.display = "block";
    mainBigCursorBackdrop.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
    mainBigCursorBackdrop.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
    mainBigCursorBackdrop.style.width  = `${rect.width  * (151 / 182)}px`;
    mainBigCursorBackdrop.style.height = `${rect.height * (151 / 182)}px`;
  }

  function startMainBigCursorBackdrop() {
    if (mainBigCursorBackdrop) return;

    mainBigCursorBackdrop = document.createElement("div");

    Object.assign(mainBigCursorBackdrop.style, {
      position:              "fixed",
      pointerEvents:         "none",
      borderRadius:          "9999px",
      background:            "rgba(255,255,255,0.001)",
      backdropFilter:        `blur(${BIG_CURSOR_BACKDROP_BLUR}px)`,
      WebkitBackdropFilter:  `blur(${BIG_CURSOR_BACKDROP_BLUR}px)`,
      zIndex:                String(Number(Z_MENU) - 1),
      display:               "none"
    });

    root.appendChild(mainBigCursorBackdrop);

    function loop() {
      updateMainBigCursorBackdropPosition();
      mainBigCursorBackdropRaf = requestAnimationFrame(loop);
    }

    loop();
  }
  
  let mainBigCursorRing = null;
  let mainBigCursorRingRaf = 0;

  function updateMainBigCursorRingPosition() {
    if (!mainBigCursorRing || !bigCursor) return;

    const rect = bigCursor.getBoundingClientRect();

    if (!rect.width || !rect.height || bigCursor.style.opacity === "0") {
      mainBigCursorRing.style.display = "none";
      return;
    }

    mainBigCursorRing.style.display = "block";
    mainBigCursorRing.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
    mainBigCursorRing.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
    mainBigCursorRing.style.width  = `${rect.width  * (151 / 182)}px`;
    mainBigCursorRing.style.height = `${rect.height * (151 / 182)}px`;
  }

  function startMainBigCursorRing() {
    if (mainBigCursorRing) return;

    mainBigCursorRing = document.createElement("div");

    Object.assign(mainBigCursorRing.style, {
      position:      "fixed",
      pointerEvents: "none",
      border:        "1px solid white",
      borderRadius:  "9999px",
      boxShadow:     "0 0 3px rgba(0, 0, 0, 0), 0 0 0.5px rgba(255, 255, 255, 0)",
      boxSizing:     "border-box",
      zIndex:        String(Number(Z_MENU) + 1),
      display:       "none"
    });

    root.appendChild(mainBigCursorRing);

    function loop() {
      updateMainBigCursorRingPosition();
      mainBigCursorRingRaf = requestAnimationFrame(loop);
    }

    loop();
  }

    const consoleIcon = makeImg("__nudge-start-menu-console",    consoleUrl,   SIDE_SIZE, "translate(-50%, -50%) scale(1)");
    const contentIcon = makeImg("__nudge-start-menu-content",    contentUrl,   SIDE_SIZE, "translate(-50%, -50%) scale(1)");

    consoleIcon.style.zIndex = NUDGE_UI_Z_INDEX;
    contentIcon.style.zIndex = NUDGE_UI_Z_INDEX;

    document.documentElement.appendChild(consoleIcon);
    document.documentElement.appendChild(contentIcon);

    const topCursor = makeImg("__nudge-start-menu-top-cursor", topCursorUrl, TOP_CURSOR_SIZE, "none");

    Object.assign(topCursor.style, {
      pointerEvents: "auto",
      cursor:        "pointer"
    });

    const topCursorIcon = document.createElement("img");
      topCursorIcon.id = "__nudge-start-menu-top-cursor-icon";
      topCursorIcon.src = topCursorIcon1Url;
      topCursorIcon.alt = "";
      topCursorIcon.draggable = false;

      Object.assign(topCursorIcon.style, {
        position:        "fixed",
        left:            "0px",
        top:             "0px",
        width:           `${TOP_CURSOR_ICON1_SIZE}px`,
        height:          `${TOP_CURSOR_ICON1_SIZE}px`,
        transform:       "translate(-50%, -50%)",
        transformOrigin: "center center",
        pointerEvents:   "none",
        userSelect:      "none",
        zIndex:          String(Number(Z_MENU) + 5),
        display:         "none",
        WebkitUserDrag:  "none"
    });

    root.appendChild(topCursorIcon);

    let topCursorBackdrop = null;
    let topCursorBackdropRaf = 0;
    let topCursorRing = null;
    let topCursorRingRaf = 0;

    function getTopCursorInnerGeometry() {
      const isBig =
        topCursor.src === bigCursorIntroUrl ||
        topCursor.style.width === `${BIG_SIZE}px`;

      if (isBig) {
        return {
          x: 16.17 / 182,
          y: 16.42 / 182,
          w: 151 / 182,
          h: 151 / 182
        };
      }

      return {
        x: 16.24 / 74,
        y: 16.49 / 74,
        w: 42.86 / 74,
        h: 42.86 / 74
      };
    }

    function updateTopCursorBackdropPosition() {
      if (!topCursorBackdrop || !topCursor) return;

      const rect = topCursor.getBoundingClientRect();
      const g = getTopCursorInnerGeometry();

      if (!rect.width || !rect.height || topCursor.style.opacity === "0") {
        topCursorBackdrop.style.display = "none";
        return;
      }

      topCursorBackdrop.style.display = "block";
      topCursorBackdrop.style.left   = `${rect.left + rect.width * g.x}px`;
      topCursorBackdrop.style.top    = `${rect.top  + rect.height * g.y}px`;
      topCursorBackdrop.style.width  = `${rect.width  * g.w}px`;
      topCursorBackdrop.style.height = `${rect.height * g.h}px`;
    }

    function updateTopCursorRingPosition() {
      if (!topCursorRing || !topCursor) return;

      const rect = topCursor.getBoundingClientRect();
      const g = getTopCursorInnerGeometry();

      if (!rect.width || !rect.height || topCursor.style.opacity === "0") {
        topCursorRing.style.display = "none";
        return;
      }

      topCursorRing.style.display = "block";
      topCursorRing.style.left   = `${rect.left + rect.width * g.x}px`;
      topCursorRing.style.top    = `${rect.top  + rect.height * g.y}px`;
      topCursorRing.style.width  = `${rect.width  * g.w}px`;
      topCursorRing.style.height = `${rect.height * g.h}px`;
    }

    function startTopCursorEffects() {
      if (!topCursorBackdrop) {
        topCursorBackdrop = document.createElement("div");

        Object.assign(topCursorBackdrop.style, {
          position:              "fixed",
          pointerEvents:         "none",
          borderRadius:          "9999px",
          background:            "rgba(255,255,255,0.001)",
          backdropFilter:        `blur(${TOP_CURSOR_BACKDROP_BLUR}px)`,
          WebkitBackdropFilter:  `blur(${TOP_CURSOR_BACKDROP_BLUR}px)`,
          zIndex:                String(Number(Z_MENU) - 1),
          display:               "none"
        });

        root.appendChild(topCursorBackdrop);
      }

      if (!topCursorRing) {
        topCursorRing = document.createElement("div");

        Object.assign(topCursorRing.style, {
          position:      "fixed",
          pointerEvents: "none",
          border:        "1px solid white",
          borderRadius:  "9999px",
          boxSizing:     "border-box",
          zIndex:        String(Number(Z_MENU) + 4),
          display:       "none"
        });

        root.appendChild(topCursorRing);
      }

      function backdropLoop() {
        updateTopCursorBackdropPosition();
        topCursorBackdropRaf = requestAnimationFrame(backdropLoop);
      }

      function ringLoop() {
        updateTopCursorRingPosition();
        topCursorRingRaf = requestAnimationFrame(ringLoop);
      }

      if (!topCursorBackdropRaf) backdropLoop();
      if (!topCursorRingRaf) ringLoop();
    }

    function stopTopCursorEffects() {
      if (topCursorBackdropRaf) {
        cancelAnimationFrame(topCursorBackdropRaf);
        topCursorBackdropRaf = 0;
      }

      if (topCursorRingRaf) {
        cancelAnimationFrame(topCursorRingRaf);
        topCursorRingRaf = 0;
      }

      topCursorBackdrop?.remove();
      topCursorRing?.remove();

      topCursorBackdrop = null;
      topCursorRing = null;
    }

    function setSelectedToolDocksBehindTopImpressum(active) {
      const toolLineSvg = document.getElementById("__nudge-tools-wheel-line-svg");
      const toolConnectionSvg = document.getElementById("__nudge-tools-wheel-connection-svg");

      if (toolLineSvg) {
        toolLineSvg.style.zIndex = active ? "2147483639" : "2147483647";
      }

      if (toolConnectionSvg) {
        toolConnectionSvg.style.zIndex = active ? "2147483638" : "2147483647";
      }

      document.querySelectorAll('[id^="__nudge-selected-tool-dock-img-"]').forEach((img) => {
        img.style.zIndex = active ? "2147483640" : "2147483648";
      });

      root.style.zIndex = active ? "2147483646" : Z_MENU;
    }

    function topCursorVisibleTop() {
      return -(TOP_CURSOR_SIZE * (1 - TOP_CURSOR_VISIBLE_RATIO));
    }

    function topCursorHiddenTop() {
      return -TOP_CURSOR_SIZE - 2;
    }

  let topCursorHovered = false;
  let topCursorIntroIconLocked = false;
  let introInteractionLocked = true;
  
  let introPageBlocker = null;
  let introScrollX = 0;
  let introScrollY = 0;

  function preventIntroPageEvent(event) {
    if (!introInteractionLocked) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
  }

  function lockPageUntilIntroFinished() {
    if (introPageBlocker) return;

    introScrollX = window.scrollX || window.pageXOffset || 0;
    introScrollY = window.scrollY || window.pageYOffset || 0;

    introPageBlocker = document.createElement("div");
    introPageBlocker.id = "__nudge-intro-page-blocker";

    Object.assign(introPageBlocker.style, {
      position:      "fixed",
      inset:         "0",
      width:         "100vw",
      height:        "100vh",
      zIndex:        String(Number(Z_MENU) + 9),
      pointerEvents: "auto",
      background:    "transparent",
      cursor:        "default",
      touchAction:   "none"
    });

    introPageBlocker.addEventListener("pointerdown", preventIntroPageEvent, true);
    introPageBlocker.addEventListener("click", preventIntroPageEvent, true);
    introPageBlocker.addEventListener("wheel", preventIntroPageEvent, { capture: true, passive: false });
    introPageBlocker.addEventListener("touchmove", preventIntroPageEvent, { capture: true, passive: false });

    root.appendChild(introPageBlocker);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function unlockPageAfterIntroFinished() {
    introPageBlocker?.remove();
    introPageBlocker = null;

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    window.scrollTo(introScrollX, introScrollY);
  }

  function topCursorHoverTop() {
    return topCursorVisibleTop() + TOP_CURSOR_HOVER_OFFSET;
  }

  function updateTopCursorIconPosition(nextTop) {
  const shouldShow =
    !topCursorIntroIconLocked &&
    !topCursorImpressumAnimating &&
    topCursor.style.opacity !== "0" &&
    topCursor.src === topCursorUrl &&
    topCursor.style.width === `${TOP_CURSOR_SIZE}px`;

    if (!shouldShow) {
      topCursorIcon.style.display = "none";
      return;
    }

    const settings = topCursorHovered
      ? {
          size: TOP_CURSOR_ICON2_SIZE,
          offsetX: TOP_CURSOR_ICON2_OFFSET_X,
          offsetY: TOP_CURSOR_ICON2_OFFSET_Y
        }
      : {
          size: TOP_CURSOR_ICON1_SIZE,
          offsetX: TOP_CURSOR_ICON1_OFFSET_X,
          offsetY: TOP_CURSOR_ICON1_OFFSET_Y
        };

    topCursorIcon.style.display = "block";
    topCursorIcon.style.width = `${settings.size}px`;
    topCursorIcon.style.height = `${settings.size}px`;
    topCursorIcon.style.left = `${window.innerWidth / 2 + settings.offsetX}px`;
    topCursorIcon.style.top = `${nextTop + TOP_CURSOR_SIZE / 2 + settings.offsetY}px`;
  }

  function setTopCursorPosition(top = null) {
    const nextTop = Number.isFinite(top)
      ? top
      : (topCursorHovered ? topCursorHoverTop() : topCursorVisibleTop());

    topCursor.style.left      = `${(window.innerWidth - TOP_CURSOR_SIZE) / 2}px`;
    topCursor.style.top       = `${nextTop}px`;
    topCursor.style.transform = "none";

    updateTopCursorIconPosition(nextTop);
  }

  function pulseTopCursor(active) {
    if (topCursorImpressumAnimating) return;

    topCursorHovered = active;

    topCursor.style.transition =
      "top 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out";
      
    topCursorIcon.style.transition =
      "top 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out";

    topCursorIcon.src = active ? topCursorIcon2Url : topCursorIcon1Url;

    setTopCursorPosition();

    animateTopCursorFrameGapTo(active ? 0 : 1, 260);
  }

    let topCursorImpressumAnimating = false;
    let topCursorFrameGapProgress = 1; // 1 = gap offen, 0 = gap geschlossen

        let topCursorFrameGapHoverRaf = 0;

    function animateTopCursorFrameGapTo(targetProgress, duration = 260) {
      if (topCursorFrameGapHoverRaf) {
        cancelAnimationFrame(topCursorFrameGapHoverRaf);
        topCursorFrameGapHoverRaf = 0;
      }

      const startProgress = topCursorFrameGapProgress;
      const startedAt = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function animate(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = easeOutCubic(progress);

        topCursorFrameGapProgress =
          startProgress + (targetProgress - startProgress) * eased;

        updateScreenFrameLine();

        if (progress < 1) {
          topCursorFrameGapHoverRaf = requestAnimationFrame(animate);
        } else {
          topCursorFrameGapHoverRaf = 0;
          topCursorFrameGapProgress = targetProgress;
          updateScreenFrameLine();
        }
      }

      topCursorFrameGapHoverRaf = requestAnimationFrame(animate);
    }

  function topCursorCenterTop() {
    return (window.innerHeight - TOP_CURSOR_SIZE) / 2;
  }

function setTopCursorAsSmallCursor(top = null) {
    topCursor.src = topCursorUrl;
    topCursor.style.width     = `${TOP_CURSOR_SIZE}px`;
    topCursor.style.height    = `${TOP_CURSOR_SIZE}px`;
    topCursor.style.zIndex    = Z_MENU;
    topCursor.style.transform = "none";
    setTopCursorPosition(top);
  }

  function setTopCursorAsBigCursorCenter() {
    topCursor.src = bigCursorIntroUrl;
    topCursor.style.width  = `${BIG_SIZE}px`;
    topCursor.style.height = `${BIG_SIZE}px`;
    topCursor.style.left   = `${(window.innerWidth - BIG_SIZE) / 2}px`;
    topCursor.style.top    = `${(window.innerHeight - BIG_SIZE) / 2}px`;
    topCursor.style.zIndex = String(Number(Z_MENU) + 3);
    topCursor.style.transformOrigin = "center center";
    topCursor.style.transform = "scale(0)";
    topCursorIcon.style.display = "none";
  }

    async function animateTopCursorFrameGapClose() {
      const startProgress = topCursorFrameGapProgress;
      const duration = TOP_CURSOR_MOVE_DURATION;
      const startedAt = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      await new Promise((resolve) => {
        function animate(now) {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = easeOutCubic(progress);

          topCursorFrameGapProgress = startProgress + (0 - startProgress) * eased;
          updateScreenFrameLine();

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            topCursorFrameGapProgress = 0;
            updateScreenFrameLine();
            resolve();
          }
        }

        requestAnimationFrame(animate);
      });
    }

    async function animateTopCursorFrameGapOpen() {
      const startProgress = topCursorFrameGapProgress;
      const duration = TOP_CURSOR_MOVE_DURATION;
      const startedAt = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      await new Promise((resolve) => {
        function animate(now) {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = easeOutCubic(progress);

          topCursorFrameGapProgress = startProgress + (1 - startProgress) * eased;
          updateScreenFrameLine();

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            topCursorFrameGapProgress = 1;
            updateScreenFrameLine();
            resolve();
          }
        }

        requestAnimationFrame(animate);
      });
    }

  function waitForImpressumClick() {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      let done = false;

      function finish() {
        if (done) return;
        done = true;
        window.clearTimeout(autoContinueTimer);
        overlay.remove();
        resolve();
      }

      Object.assign(overlay.style, {
        position:      "fixed",
        inset:         "0",
        width:         "100vw",
        height:        "100vh",
        zIndex:        String(Number(Z_MENU) + 4),
        pointerEvents: "auto",
        background:    "transparent",
        cursor:        "pointer"
      });

      overlay.addEventListener(
        "pointerdown",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          finish();
        },
        { once: true, capture: true }
      );

      root.appendChild(overlay);

      const autoContinueTimer = window.setTimeout(() => {
        finish();
      }, 10000);
    });
  }

  async function openImpressumFromTopCursor(event) {
    if (introInteractionLocked) {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      event?.stopImmediatePropagation?.();
      return;
    }

    if (topCursorImpressumAnimating) return;

    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();

    topCursorImpressumAnimating = true;
    topCursorIcon.style.display = "none";
    topCursorHovered = false;
    setSelectedToolDocksBehindTopImpressum(true);
    topCursor.style.pointerEvents = "none";

    setTopCursorAsSmallCursor(topCursorVisibleTop());
    startTopCursorEffects();

    const menuCollapsePromise = collapseMenuToMinimal();

    topCursor.style.transition =
      `top ${TOP_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    const movePromise = new Promise((resolve) => {
      requestAnimationFrame(() => {
        topCursor.style.top = `${topCursorCenterTop()}px`;
      });
      window.setTimeout(resolve, TOP_CURSOR_MOVE_DURATION);
    });

    await Promise.all([
      movePromise,
      animateTopCursorFrameGapClose(),
      menuCollapsePromise
    ]);

    topCursor.style.transition = "none";
    setTopCursorAsBigCursorCenter();

    const impressumIcon = document.createElement("img");
    impressumIcon.src = impressumUrl;
    impressumIcon.alt = "";

    Object.assign(impressumIcon.style, {
      position:        "fixed",
      left:            "50%",
      top:             "50%",
      width:           `${IMPRESSUM_WIDTH}px`,
      height:          "auto",
      transform:       "translate(-50%, -50%) scale(0)",
      transformOrigin: "center center",
      pointerEvents:   "none",
      userSelect:      "none",
      zIndex:          String(Number(Z_MENU) + 5),
      WebkitUserDrag:  "none"
    });

    root.appendChild(impressumIcon);

    void topCursor.offsetWidth;
    void impressumIcon.offsetWidth;

    requestAnimationFrame(() => {
      topCursor.style.transition =
        `transform ${IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      impressumIcon.style.transition =
        `transform ${IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      topCursor.style.transform = `scale(${IMPRESSUM_CURSOR_SCALE})`;
      impressumIcon.style.transform = "translate(-50%, -50%) scale(1)";
    });

    await wait(IMPRESSUM_SCALE_DURATION);

    await waitForImpressumClick();

    const menuExpandPromise = expandMenuFromMinimal();

    topCursor.style.transition =
      `transform ${IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    impressumIcon.style.transition =
      `transform ${IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    topCursor.style.transform = `scale(${TOP_CURSOR_SIZE / BIG_SIZE})`; // wiä gross wieder bim chliner wärdä vor schleiss ani
    impressumIcon.style.transform = "translate(-50%, -50%) scale(0)";

    await Promise.all([
      wait(IMPRESSUM_SCALE_DURATION),
      menuExpandPromise
    ]);

    impressumIcon.remove();

    topCursor.style.transition = "none";
    topCursor.style.opacity = "1";
    setTopCursorAsSmallCursor(topCursorCenterTop());

    void topCursor.offsetWidth;

    topCursor.style.transition =
      `top ${TOP_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    const returnMovePromise = new Promise((resolve) => {
      requestAnimationFrame(() => {
        setTopCursorPosition();
      });
      window.setTimeout(resolve, TOP_CURSOR_MOVE_DURATION);
    });

    await Promise.all([
      returnMovePromise,
      animateTopCursorFrameGapOpen()
    ]);

    topCursor.style.transition = "none";
    setTopCursorPosition();

    showScreenFrameImmediately();

    topCursor.style.transition = "none";
    topCursor.style.opacity = "1";
    topCursor.style.display = "block";
    topCursor.style.pointerEvents = "auto";
    topCursor.style.cursor = "pointer";
    topCursor.style.zIndex = Z_MENU;

    setTopCursorAsSmallCursor();
    startTopCursorEffects();

    setSelectedToolDocksBehindTopImpressum(false);
    topCursorImpressumAnimating = false;
    topCursorIcon.src = topCursorIcon1Url;
    setTopCursorPosition();
  }

topCursor.addEventListener("pointerdown", (event) => {
  openImpressumFromTopCursor(event);
}, true);

  topCursor.addEventListener("pointerenter", () => {
    if (introInteractionLocked) return;
    pulseTopCursor(true);
  }, true);

  topCursor.addEventListener("pointerleave", () => {
    if (introInteractionLocked) return;
    pulseTopCursor(false);
  }, true);

  // ── Positions-State ─────────────────────────────────────────────────────────
  // big.x / big.y = linke obere Ecke von big_cursor.svg
  // console / content = Mittelpunkt-Koordinaten
  const state = {
    edge: EDGE_BOTTOM,
    big: {
      x: (window.innerWidth - BIG_SIZE) / 2,
      y: bottomTop()
    },
    console: {
      x: window.innerWidth / 2 - BIG_HALF - GAP - SIDE_HALF,
      y: bottomTop() + BIG_HALF
    },
    content: {
      x: window.innerWidth / 2 + BIG_HALF + GAP + SIDE_HALF,
      y: bottomTop() + BIG_HALF
    },
    consoleManual: false,
    contentManual: false
  };

    // ── Previous-/Next-Punkte am unteren big_cursor ─────────────────────────────
  const BIG_NAV_CURSOR_SIZE = 60;
  const BIG_NAV_CURSOR_MARGIN = 20;
  const BIG_NAV_CURSOR_SYMBOL_SIZE = 24;
  const BIG_NAV_CURSOR_MOVE_DURATION = 800; // schnäuigkeit vo previous u next 
  const BIG_NAV_CURSOR_BACKDROP_BLUR = 12;

  let bigNavCursors = { previous: null, next: null };
  let bigNavVisible = false;
  let bigNavReady = false;

  function isBigCursorHalfVisible() {
    return (
      bigNavReady &&
      !isCollapsed &&
      !isMinimalAnimating &&
      Math.abs(state.big.y - bottomTop()) <= 4
    );
  }

  function getBigNavSymbolUrl(type) {
    return chrome.runtime.getURL(
      type === "previous"
        ? "cursor/previous.svg"
        : "cursor/next.svg"
    );
  }

  function getBigNavStartLeft(type) {
    const rect = bigCursor.getBoundingClientRect();

    return type === "previous"
      ? rect.left + BIG_NAV_CURSOR_MARGIN
      : rect.right - BIG_NAV_CURSOR_SIZE - BIG_NAV_CURSOR_MARGIN;
  }

  function getBigNavTargetLeft(type) {
    return type === "previous"
      ? BIG_NAV_CURSOR_MARGIN
      : window.innerWidth - BIG_NAV_CURSOR_SIZE - BIG_NAV_CURSOR_MARGIN;
  }

  function getBigNavTop() {
    return window.innerHeight - BIG_NAV_CURSOR_SIZE - BIG_NAV_CURSOR_MARGIN;
  }

  function createBigNavCursor(type) {
    const cursor = document.createElement("div");
    cursor.id = `__nudge-start-menu-${type}-cursor`;

    Object.assign(cursor.style, {
      position: "fixed",
      left: `${getBigNavStartLeft(type)}px`,
      top: `${getBigNavTop()}px`,
      width: `${BIG_NAV_CURSOR_SIZE}px`,
      height: `${BIG_NAV_CURSOR_SIZE}px`,
      transform: "none",
      transformOrigin: "center center",
      pointerEvents: "auto",
      userSelect: "none",
      cursor: "pointer",
      touchAction: "none",
      zIndex: String(Number(Z_MENU) + 4),
      opacity: "1",
      WebkitUserDrag: "none",
      transition:
        `left ${BIG_NAV_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out`
    });

    const base = document.createElement("img");
    base.src = chrome.runtime.getURL("cursor/cursor.svg");
    base.alt = "";
    base.draggable = false;

    Object.assign(base.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      pointerEvents: "none",
      userSelect: "none",
      WebkitUserDrag: "none"
    });

    const icon = document.createElement("img");
    icon.src = getBigNavSymbolUrl(type);
    icon.alt = "";
    icon.draggable = false;

    Object.assign(icon.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: `${BIG_NAV_CURSOR_SYMBOL_SIZE}px`,
      height: `${BIG_NAV_CURSOR_SYMBOL_SIZE}px`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: "2",
      WebkitUserDrag: "none"
    });

    const backdrop = document.createElement("div");

    Object.assign(backdrop.style, {
      position: "absolute",
      left: `${(16.24 / 74) * 100}%`,
      top: `${(16.49 / 74) * 100}%`,
      width: `${(42.86 / 74) * 100}%`,
      height: `${(42.86 / 74) * 100}%`,
      borderRadius: "9999px",
      background: "rgba(255,255,255,0.001)",
      backdropFilter: `blur(${BIG_NAV_CURSOR_BACKDROP_BLUR}px)`,
      WebkitBackdropFilter: `blur(${BIG_NAV_CURSOR_BACKDROP_BLUR}px)`,
      pointerEvents: "none",
      zIndex: "0"
    });

    const ring = document.createElement("div");

    Object.assign(ring.style, {
      position: "absolute",
      left: `${(16.24 / 74) * 100}%`,
      top: `${(16.49 / 74) * 100}%`,
      width: `${(42.86 / 74) * 100}%`,
      height: `${(42.86 / 74) * 100}%`,
      border: "1px solid white",
      borderRadius: "9999px",
      boxSizing: "border-box",
      pointerEvents: "none",
      zIndex: "3"
    });

    base.style.zIndex = "1";

    cursor.appendChild(backdrop);
    cursor.appendChild(base);
    cursor.appendChild(icon);
    cursor.appendChild(ring);

    cursor.addEventListener(
      "pointerdown",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();

        hideBigNavCursors(false);
        snapBigToNearestPosition(type === "previous" ? "left" : "right");
      },
      true
    );

    root.appendChild(cursor);
    bigNavCursors[type] = cursor;

    return cursor;
  }

  function ensureBigNavCursor(type) {
    if (!bigNavCursors[type] || !bigNavCursors[type].isConnected) {
      bigNavCursors[type]?.remove();
      bigNavCursors[type] = null;
      return createBigNavCursor(type);
    }

    return bigNavCursors[type];
  }

  function showBigNavCursors() {
  if (!isBigCursorHalfVisible() || bigNavVisible) return;

  bigNavVisible = true;

  ["previous", "next"].forEach((type) => {
    const cursor = ensureBigNavCursor(type);

    cursor.style.display = "block";
    cursor.style.opacity = "1";
    cursor.style.pointerEvents = "auto";
    cursor.style.transition = "none";
    cursor.style.left = `${getBigNavStartLeft(type)}px`;
    cursor.style.top = `${getBigNavTop()}px`;

    void cursor.offsetWidth;

    cursor.style.transition =
      `left ${BIG_NAV_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out`;

    requestAnimationFrame(() => {
      cursor.style.left = `${getBigNavTargetLeft(type)}px`;
      cursor.style.top = `${getBigNavTop()}px`;
    });
  });
}

  function hideBigNavCursors(animate = true) {
    bigNavVisible = false;

    ["previous", "next"].forEach((type) => {
      const cursor = bigNavCursors[type];

      if (!cursor) return;

      cursor.style.pointerEvents = "none";

      if (animate && isBigCursorHalfVisible()) {
        cursor.style.transition =
          `left ${BIG_NAV_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-in`;

        requestAnimationFrame(() => {
          cursor.style.left = `${getBigNavStartLeft(type)}px`;
          cursor.style.opacity = "0";
        });

        window.setTimeout(() => {
          cursor.remove();

          if (bigNavCursors[type] === cursor) {
            bigNavCursors[type] = null;
          }
        }, BIG_NAV_CURSOR_MOVE_DURATION + 40);

        return;
      }

      cursor.remove();

      if (bigNavCursors[type] === cursor) {
        bigNavCursors[type] = null;
      }
    });
  }

  bigCursor.addEventListener(
    "pointerenter",
    () => {
      if (introInteractionLocked) return;
      showBigNavCursors();
    },
    true
  );

  window.addEventListener(
    "resize",
    () => {
      if (!bigNavVisible) return;

      ["previous", "next"].forEach((type) => {
        const cursor = bigNavCursors[type];
        if (!cursor) return;

        cursor.style.left = `${getBigNavTargetLeft(type)}px`;
        cursor.style.top = `${getBigNavTop()}px`;
      });
    },
    true
  );

  function bigCenter() {
    return {
      x: state.big.x + BIG_HALF,
      y: state.big.y + BIG_HALF
    };
  }

  // ── Bildschirmrahmen (SVG-Pfade) ────────────────────────────────────────────
  let screenFrameLeftPath  = null;
  let screenFrameRightPath = null;

  function createScreenFramePath(id) {
    let path = document.getElementById(id);
    if (path) return path;

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.id = id;
    path.setAttribute("fill",             "none");
    path.setAttribute("stroke",           "white");
    path.setAttribute("stroke-width",     String(FRAME_STROKE_WIDTH));
    path.setAttribute("stroke-opacity",   "1");
    path.setAttribute("stroke-linecap",   "round");
    path.setAttribute("stroke-linejoin",  "round");
    path.setAttribute("filter",           "url(#__dp_shadow)");
    path.setAttribute("vector-effect",    "non-scaling-stroke");
    path.style.display       = "none";
    path.style.pointerEvents = "none";

    if (lineToConsole.parentNode === lineSvg) {
      lineSvg.insertBefore(path, lineToConsole);
    } else {
      lineSvg.appendChild(path);
    }
    return path;
  }

    function getScreenFramePaths() {
    const left   = FRAME_MARGIN;
    const top    = FRAME_MARGIN;
    const right  = window.innerWidth  - FRAME_MARGIN;
    const bottom = window.innerHeight - FRAME_MARGIN;

    const radius = Math.min(FRAME_RADIUS, (right - left) / 2, (bottom - top) / 2);

    const topCenterX = window.innerWidth / 2;
    const topGapHalf = (TOP_CURSOR_SIZE / 2 + TOP_CURSOR_FRAME_GAP) * topCursorFrameGapProgress;

    const topLeftStartX  = topCenterX - topGapHalf;
    const topRightStartX = topCenterX + topGapHalf;

    const minBottomX   = left  + radius;
    const maxBottomX   = Math.max(minBottomX, right - radius);

    const frameGapExtra =
      state.big.y > bottomTop() + 10
        ? FRAME_GAP_EXTRA_COLLAPSED
        : FRAME_GAP_EXTRA;

    const rawLeftGapX  = state.big.x + frameGapExtra;
    const rawRightGapX = state.big.x + BIG_SIZE - frameGapExtra;

    const leftGapX  = clamp(rawLeftGapX,  minBottomX, maxBottomX);
    const rightGapX = clamp(rawRightGapX, minBottomX, maxBottomX);

    function getSideFrameGap(side) {
      const cursor = document.getElementById(`__nudge-tools-wheel-side-cursor-${side}`);
      if (!cursor) return null;

      const rect = cursor.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      if (cursor.dataset.frameGapClosed === "true") return null;

      const isAtFrame =
        side === "left"
          ? rect.left <= left + 4 && rect.right >= left
          : rect.left <= right && rect.right >= right - 4;

      if (!isAtFrame) return null;

      const centerY = rect.top + rect.height / 2;
      const gapHalf = Math.max(0, SIDE_FRAME_CURSOR_SIZE / 2 + SIDE_FRAME_CURSOR_GAP);

      const startY = clamp(centerY - gapHalf, top + radius, bottom - radius);
      const endY   = clamp(centerY + gapHalf, top + radius, bottom - radius);

      if (endY <= startY) return null;

      return { startY, endY };
    }

    const leftSideGap  = getSideFrameGap("left");
    const rightSideGap = getSideFrameGap("right");

    const leftPath = [
      `M ${topLeftStartX} ${top}`,
      `H ${left + radius}`,
      `Q ${left} ${top} ${left} ${top + radius}`
    ];

    if (leftSideGap) {
      leftPath.push(
        `V ${leftSideGap.startY}`,
        `M ${left} ${leftSideGap.endY}`
      );
    }

    leftPath.push(
      `V ${bottom - radius}`,
      `Q ${left} ${bottom} ${left + radius} ${bottom}`,
      `H ${Math.min(leftGapX, rightGapX)}`
    );

    const rightPath = [
      `M ${topRightStartX} ${top}`,
      `H ${right - radius}`,
      `Q ${right} ${top} ${right} ${top + radius}`
    ];

    if (rightSideGap) {
      rightPath.push(
        `V ${rightSideGap.startY}`,
        `M ${right} ${rightSideGap.endY}`
      );
    }

    rightPath.push(
      `V ${bottom - radius}`,
      `Q ${right} ${bottom} ${right - radius} ${bottom}`,
      `H ${Math.max(leftGapX, rightGapX)}`
    );

    return {
      left: leftPath.join(" "),
      right: rightPath.join(" ")
    };
  }

  function updateScreenFrameLine() {
    if (!screenFrameLeftPath || !screenFrameRightPath) return;
    const paths = getScreenFramePaths();
    screenFrameLeftPath.setAttribute("d",  paths.left);
    screenFrameRightPath.setAttribute("d", paths.right);
  }

    let sideFrameGapRaf = 0;

  function followSideFrameGap(duration = 400) {
    if (sideFrameGapRaf) {
      cancelAnimationFrame(sideFrameGapRaf);
      sideFrameGapRaf = 0;
    }

    const startedAt = performance.now();

    function loop(now) {
      updateScreenFrameLine();

      if (now - startedAt < duration) {
        sideFrameGapRaf = requestAnimationFrame(loop);
      } else {
        sideFrameGapRaf = 0;
        updateScreenFrameLine();
      }
    }

    sideFrameGapRaf = requestAnimationFrame(loop);
  }

  window.addEventListener(
    SIDE_FRAME_GAP_UPDATE_EVENT,
    (event) => {
      followSideFrameGap(Number(event.detail?.duration) || 400);
    },
    true
  );

  function createScreenFrameLine() {
    screenFrameLeftPath  = createScreenFramePath("__nudge-screen-frame-left");
    screenFrameRightPath = createScreenFramePath("__nudge-screen-frame-right");
    updateScreenFrameLine();
  }

  async function animateScreenFrameIn() {
    createScreenFrameLine();

    const paths = [screenFrameLeftPath, screenFrameRightPath];

    paths.forEach((path) => {
      path.style.display     = "block";
      path.style.transition  = "none";
      const length           = path.getTotalLength();
      path.style.strokeDasharray  = String(length);
      path.style.strokeDashoffset = String(length);
    });

    void lineSvg.getBoundingClientRect();

    requestAnimationFrame(() => {
      paths.forEach((path) => {
        path.style.transition       = "stroke-dashoffset 2000ms cubic-bezier(0.22, 1, 0.36, 1)";
        path.style.strokeDashoffset = "0";
      });
    });

    await wait(2000); // schnäuigkeit vo dr rahmä animation muäs mit derä zahl da obä überiistimmä

    paths.forEach((path) => {
      path.style.transition        = "none";
      path.style.strokeDasharray   = "";
      path.style.strokeDashoffset  = "";
    });

    updateScreenFrameLine();
  }

  function showScreenFrameImmediately() {
    createScreenFrameLine();

    [screenFrameLeftPath, screenFrameRightPath].forEach((path) => {
      path.style.display          = "block";
      path.style.transition       = "none";
      path.style.strokeDasharray  = "";
      path.style.strokeDashoffset = "";
    });

    updateScreenFrameLine();
  }

  // ── Storage: Positionen speichern / laden ───────────────────────────────────
  function savePositions(extra = {}) {
    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};
      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          edge:          state.edge,
          big:           { x: state.big.x,     y: state.big.y     },
          console:       { x: state.console.x, y: state.console.y },
          content:       { x: state.content.x, y: state.content.y },
          consoleManual: state.consoleManual,
          contentManual: state.contentManual,
          ...extra
        }
      });
    });
  }

  function loadPositions(saved) {
    if (!saved) return;

    state.edge =
      saved.edge === EDGE_LEFT || saved.edge === EDGE_RIGHT || saved.edge === EDGE_BOTTOM
        ? saved.edge
        : EDGE_BOTTOM;

    if (saved.big) {
      /*
        Falls noch alte gespeicherte Daten existieren:
        Die frühere Version speicherte big.x/big.y als Mittelpunkt.
        Ohne saved.edge wird deshalb einmalig auf linke obere Ecke umgerechnet.
      */
      if (saved.edge) {
        state.big.x = saved.big.x;
        state.big.y = saved.big.y;
      } else {
        state.big.x = saved.big.x - BIG_HALF;
        state.big.y = bottomTop();
      }
    }

    if (saved.console) {
      state.console.x = saved.console.x;
      state.console.y = saved.console.y;
    }

    if (saved.content) {
      state.content.x = saved.content.x;
      state.content.y = saved.content.y;
    }

    state.consoleManual = Boolean(saved.consoleManual);
    state.contentManual = Boolean(saved.contentManual);

    clampBigToCurrentEdge();
  }

  // ── DOM-Positionierung ──────────────────────────────────────────────────────
  function setBigPosition() {
    bigCursor.style.left      = `${state.big.x}px`;
    bigCursor.style.top       = `${state.big.y}px`;
    bigCursor.style.transform = "none";
  }

  function setCenterPosition(el, point) {
    el.style.left = `${point.x}px`;
    el.style.top  = `${point.y}px`;
  }

  function clampSidePoint(point) {
    return {
      x: clamp(point.x, SIDE_HALF + SIDE_SCREEN_MARGIN_X, window.innerWidth  - SIDE_HALF - SIDE_SCREEN_MARGIN_X),
      y: clamp(point.y, SIDE_HALF,                         window.innerHeight - SIDE_HALF + SIDE_BOTTOM_EXTRA)
    };
  }

  function clampBigToCurrentEdge() {
    state.edge  = EDGE_BOTTOM;
    state.big.x = clamp(state.big.x, -BIG_HALF, window.innerWidth - BIG_HALF);
    state.big.y = bottomTop();
  }

  function getDefaultFollowerPositions() {
    const c = bigCenter();

    if (state.edge === EDGE_BOTTOM) {
      return {
        console: { x: state.big.x - GAP - SIDE_HALF,          y: c.y -180},
        content: { x: state.big.x + BIG_SIZE + GAP + SIDE_HALF, y: c.y -180}
      };
    }

    if (state.edge === EDGE_LEFT) {
      const x = state.big.x + BIG_SIZE + GAP + SIDE_HALF;
      return {
        console: { x, y: c.y - SIDE_HALF - GAP },
        content: { x, y: c.y + SIDE_HALF + GAP }
      };
    }

    const x = state.big.x - GAP - SIDE_HALF;
    return {
      console: { x, y: c.y - SIDE_HALF - GAP },
      content: { x, y: c.y + SIDE_HALF + GAP }
    };
  }

  function enforceMinDistance(point, preferredSide) {
    const c           = bigCenter();
    const dx          = point.x - c.x;
    const dy          = point.y - c.y;
    const minDistance = BIG_HALF + SIDE_HALF + GAP;
    const distance    = Math.hypot(dx, dy);

    if (distance >= minDistance) return point;

    if (distance < 0.001) {
      const direction = preferredSide === "left" ? -1 : 1;
      return { x: c.x + direction * minDistance, y: c.y };
    }

    return {
      x: c.x + (dx / distance) * minDistance,
      y: c.y + (dy / distance) * minDistance
    };
  }

  function updateFollowerPositions() {
    clampBigToCurrentEdge();
    const defaults = getDefaultFollowerPositions();

    state.console = state.consoleManual
      ? clampSidePoint(enforceMinDistance(state.console, "left"))
      : clampSidePoint(defaults.console);

    state.content = state.contentManual
      ? clampSidePoint(enforceMinDistance(state.content, "right"))
      : clampSidePoint(defaults.content);
  }

  function applyPositions() {
    updateFollowerPositions();
    setBigPosition();
    setCenterPosition(consoleIcon, state.console);
    setCenterPosition(contentIcon, state.content);
    updateLines();
    updateScreenFrameLine();
  }

  // ── Linien-Updates ──────────────────────────────────────────────────────────
  function getLineStartPoint(target) {
    const c     = bigCenter();
    const angle = Math.atan2(target.y - c.y, target.x - c.x);
    return {
      x: c.x + Math.cos(angle) * (BIG_LINE_RADIUS + FADEN_START_OFFSET),
      y: c.y + Math.sin(angle) * (BIG_LINE_RADIUS + FADEN_START_OFFSET)
    };
  }

  function updateLine(line, target, type) {
    const start = getLineStartPoint(target);
    let endX = target.x;
    let endY = target.y;

    if (type === "console") { endX += CONSOLE_LINE_ANCHOR_OFFSET_X; endY += CONSOLE_LINE_ANCHOR_OFFSET_Y; }
    if (type === "content") { endX += CONTENT_LINE_ANCHOR_OFFSET_X; endY += CONTENT_LINE_ANCHOR_OFFSET_Y; }

    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));
    line.setAttribute("x2", String(endX));
    line.setAttribute("y2", String(endY));
  }

  function updateLines() {
    updateLine(lineToConsole, state.console, "console");
    updateLine(lineToContent, state.content, "content");
  }

  function showLines() {
    lineToConsole.style.display = "block";
    lineToContent.style.display = "block";
    updateLines();
  }

    async function showLinesAnimated() {
    const lines = [lineToConsole, lineToContent];

    lineToConsole.style.display = "block";
    lineToContent.style.display = "block";

    updateLines();

    lines.forEach((line) => {
      line.style.transition = "none";

      const length = line.getTotalLength();

      line.setAttribute("stroke-dasharray", String(length));
      line.setAttribute("stroke-dashoffset", String(length));

      void line.getBoundingClientRect();
    });

    requestAnimationFrame(() => {
      lines.forEach((line) => {
        line.style.transition =
          "stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1)";
        line.setAttribute("stroke-dashoffset", "0");
      });
    });

    await wait(650);

    lines.forEach((line) => {
      line.removeAttribute("stroke-dasharray");
      line.removeAttribute("stroke-dashoffset");
      line.style.removeProperty("transition");
    });
  }

async function collapseMenuToMinimal() {
  if (isCollapsed || isMinimalAnimating) return;

  isMinimalAnimating = true;
  isCollapsed = true;

  const consoleRect = consoleIcon.getBoundingClientRect();
  const contentRect = contentIcon.getBoundingClientRect();

  hiddenConsolePosition = {
    x: consoleRect.left + consoleRect.width / 2,
    y: consoleRect.top + consoleRect.height / 2
  };

  hiddenContentPosition = {
    x: contentRect.left + contentRect.width / 2,
    y: contentRect.top + contentRect.height / 2
  };

  state.console.x = hiddenConsolePosition.x;
  state.console.y = hiddenConsolePosition.y;
  state.content.x = hiddenContentPosition.x;
  state.content.y = hiddenContentPosition.y;

  if (returnConsoleHomeRaf) {
    cancelAnimationFrame(returnConsoleHomeRaf);
    returnConsoleHomeRaf = null;
  }

  if (returnContentHomeRaf) {
    cancelAnimationFrame(returnContentHomeRaf);
    returnContentHomeRaf = null;
  }

  consoleIcon.style.display = "block";
  contentIcon.style.display = "block";

  consoleIcon.style.transition = "opacity 300ms ease-in";
  contentIcon.style.transition = "opacity 300ms ease-in";

  consoleIcon.style.opacity = "0";
  contentIcon.style.opacity = "0";

  updateLines();

  [lineToConsole, lineToContent].forEach((line) => {
    if (!line) return;

    line.style.display = "block";
    line.style.visibility = "visible";
    line.style.opacity = "1";
    line.style.transition = "none";

    line.removeAttribute("stroke-dasharray");
    line.removeAttribute("stroke-dashoffset");

    const length = line.getTotalLength();

    line.setAttribute("stroke-dasharray", String(length));
    line.setAttribute("stroke-dashoffset", "0");

    void line.getBoundingClientRect();

    requestAnimationFrame(() => {
      line.style.transition = "stroke-dashoffset 400ms ease-in";
      line.setAttribute("stroke-dashoffset", String(length));
    });
  });

  await wait(400);

  consoleIcon.style.display = "none";
  contentIcon.style.display = "none";

  [lineToConsole, lineToContent].forEach((line) => {
    if (!line) return;

    line.style.display = "none";
    line.style.transition = "none";
    line.removeAttribute("stroke-dasharray");
    line.removeAttribute("stroke-dashoffset");
  });

  const targetY = window.innerHeight - BIG_SIZE / 4;

  bigCursor.style.transition = "top 500ms cubic-bezier(0.22, 1, 0.36, 1)";
  state.big.y = targetY;
  bigCursor.style.top = `${targetY}px`;

  updateScreenFrameLine();
  savePositions();

  await wait(500);

  bigCursor.style.transition = "none";
  isMinimalAnimating = false;
}

async function expandMenuFromMinimal() {
  if (!isCollapsed || isMinimalAnimating) return;

  isMinimalAnimating = true;

  const restoredConsolePosition = hiddenConsolePosition || { ...state.console };
  const restoredContentPosition = hiddenContentPosition || { ...state.content };

  const targetY = bottomTop();

  bigCursor.style.transition = "top 500ms cubic-bezier(0.22, 1, 0.36, 1)";
  state.big.y = targetY;
  bigCursor.style.top = `${targetY}px`;

  updateScreenFrameLine();

  await wait(500);

  bigCursor.style.transition = "none";

  state.console.x = restoredConsolePosition.x;
  state.console.y = restoredConsolePosition.y;
  state.content.x = restoredContentPosition.x;
  state.content.y = restoredContentPosition.y;

  setCenterPosition(consoleIcon, state.console);
  setCenterPosition(contentIcon, state.content);

  consoleIcon.style.display = "block";
  contentIcon.style.display = "block";

  consoleIcon.style.opacity = "0";
  contentIcon.style.opacity = "0";

  consoleIcon.style.transition = "opacity 300ms ease-out";
  contentIcon.style.transition = "opacity 300ms ease-out";

  updateLines();

  void consoleIcon.offsetWidth;
  void contentIcon.offsetWidth;

  consoleIcon.style.opacity = "1";
  contentIcon.style.opacity = "1";

  await showLinesAnimated();

  consoleIcon.style.transition = "none";
  contentIcon.style.transition = "none";

  hiddenConsolePosition = null;
  hiddenContentPosition = null;

  isCollapsed = false;
  isMinimalAnimating = false;

  savePositions();
}

    async function animateIntroFollowerPulse() {
    const startConsole = { x: state.console.x, y: state.console.y };
    const startContent = { x: state.content.x, y: state.content.y };

    const duration = 1000;
    const startedAt = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    await new Promise((resolve) => {
      function animate(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const pulse = progress < 0.5
          ? easeInOutCubic(progress / 0.5)
          : easeInOutCubic((1 - progress) / 0.5);

        state.console.x = startConsole.x - 40 * pulse;
        state.console.y = startConsole.y - 40 * pulse;

        state.content.x = startContent.x + 40 * pulse;
        state.content.y = startContent.y - 40 * pulse;

        setCenterPosition(consoleIcon, state.console);
        setCenterPosition(contentIcon, state.content);
        updateLines();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          state.console.x = startConsole.x;
          state.console.y = startConsole.y;
          state.content.x = startContent.x;
          state.content.y = startContent.y;

          setCenterPosition(consoleIcon, state.console);
          setCenterPosition(contentIcon, state.content);
          updateLines();

          resolve();
        }
      }

      requestAnimationFrame(animate);
    });
  }

  async function animateIntroBigCursorPulse() {
    const startX = state.big.x;
    const duration = 1500;
    const startedAt = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    await new Promise((resolve) => {
      function animate(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        let offsetX;

        if (progress < 1 / 3) {
          const p = easeInOutCubic(progress / (1 / 3));
          offsetX = 0 + (-40 - 0) * p;
        } else if (progress < 2 / 3) {
          const p = easeInOutCubic((progress - 1 / 3) / (1 / 3));
          offsetX = -40 + (40 - (-40)) * p;
        } else {
          const p = easeInOutCubic((progress - 2 / 3) / (1 / 3));
          offsetX = 40 + (0 - 40) * p;
        }

        state.big.x = startX + offsetX;
        state.big.y = bottomTop();

        setBigPosition();
        updateLines();
        updateScreenFrameLine();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          state.big.x = startX;
          state.big.y = bottomTop();

          setBigPosition();
          updateLines();
          updateScreenFrameLine();

          resolve();
        }
      }

      requestAnimationFrame(animate);
    });
  }

  // ── Wiggle nach 15 / 20 / 25 Sekunden, Intro nach 30 Sekunden ──────────────
  const IDLE_WIGGLE_TIMES = [15000, 20000, 25000];
  const IDLE_INTRO_TIME = 30000;

  let idleWiggleTimers = [];
  let idleWiggleRunning = false;
  let idleIntroStartedAt = Date.now();
  let idleIntroStarting = false;

  function idleWiggleIsBlocked() {
    return (
      introInteractionLocked ||
      topCursorImpressumAnimating ||
      isCollapsed ||
      isMinimalAnimating ||
      activeDrag ||
      bigSnapRaf ||
      document.getElementById("__nudge-tools-wheel-backdrop") ||
      document.getElementById("__nudge-content-wheel-backdrop") ||
      document.querySelector(".nudge-content-website-preview") ||
      consoleIcon.style.display === "none" ||
      contentIcon.style.display === "none"
    );
  }

  function idleIntroIsBlocked() {
    return (
      introInteractionLocked ||
      topCursorImpressumAnimating ||
      activeDrag
    );
  }

  async function runIdleWiggle() {
    if (idleWiggleRunning || idleWiggleIsBlocked()) return;

    idleWiggleRunning = true;

    try {
      await animateIntroFollowerPulse();
      await animateIntroBigCursorPulse();
    } finally {
      idleWiggleRunning = false;
    }
  }

  function startIntroAfterIdle(startDirectlyAtMiddle = document.hidden) {
    if (idleIntroStarting) return;

    if (idleIntroIsBlocked()) {
      restartIdleWiggleTimers();
      return;
    }

    idleIntroStarting = true;

    idleWiggleTimers.forEach((timer) => {
      window.clearTimeout(timer);
    });

    idleWiggleTimers = [];

    chrome.storage.local.set({
      [IDLE_INTRO_PAUSE_KEY]: true,
      [IDLE_INTRO_START_MIDDLE_KEY]: startDirectlyAtMiddle
    }, () => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "s",
          bubbles: true,
          cancelable: true
        })
      );
    });
  }

  function restartIdleWiggleTimers() {
    idleIntroStartedAt = Date.now();
    idleIntroStarting = false;
    idleWiggleTimers.forEach((timer) => {
      window.clearTimeout(timer);
    });

    idleWiggleTimers = IDLE_WIGGLE_TIMES.map((delay) => {
      return window.setTimeout(() => {
        runIdleWiggle();
      }, delay);
    });

    idleWiggleTimers.push(
      window.setTimeout(() => {
        startIntroAfterIdle();
      }, IDLE_INTRO_TIME)
    );
  }

  /*
  window.addEventListener(
    "mousemove",
    restartIdleWiggleTimers,
    true
  );

  function checkIdleIntroDeadline() {
    if (idleIntroStarting) return;

    if (Date.now() - idleIntroStartedAt >= IDLE_INTRO_TIME) {
      startIntroAfterIdle(true);
    }
  }

  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) {
        checkIdleIntroDeadline();
      }
    },
    true
  );

  window.addEventListener("focus", checkIdleIntroDeadline, true);

  restartIdleWiggleTimers();
  */

  function hideLines() {
    lineToConsole.style.display = "none";
    lineToContent.style.display = "none";
  }

  // ── Sofort anzeigen (kein New-Domain) ───────────────────────────────────────
  function showPersistentMenuImmediately() {
    introInteractionLocked = false;
    unlockPageAfterIntroFinished();

    bigCursor.style.transition   = "none";
    consoleIcon.style.transition = "none";
    contentIcon.style.transition = "none";

    topCursor.style.transition = "none";
    topCursor.style.opacity    = "1";
    setTopCursorPosition(topCursorHiddenTop());

    topCursorIcon.style.transition = "none";
    updateTopCursorIconPosition(topCursorHiddenTop());

    void topCursor.offsetWidth;
    void topCursorIcon.offsetWidth;

    topCursor.style.transition =
      "top 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out";

    topCursorIcon.style.transition =
      "top 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out";

    requestAnimationFrame(() => {
      setTopCursorPosition();
    });

    startTopCursorEffects();

    bigCursor.style.opacity   = "1";
    consoleIcon.style.opacity = "1";
    contentIcon.style.opacity = "1";

    bigCursor.style.transform   = "none";
    consoleIcon.style.transform = "translate(-50%, -50%) scale(1)";
    contentIcon.style.transform = "translate(-50%, -50%) scale(1)";

    applyPositions();
    showLines();
    showScreenFrameImmediately();
    startMainBigCursorBackdrop();
    startMainBigCursorRing();
    savePositions();
    bigNavReady = true;
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function createIntroBigCursorRing() {
    const ring = document.createElement("div");

    Object.assign(ring.style, {
      position:      "fixed",
      pointerEvents: "none",
      border:        "1px solid white",
      borderRadius:  "9999px",
      boxShadow:     "0 0 3px rgba(0, 0, 0, 0), 0 0 0.5px rgba(255, 255, 255, 0)",
      boxSizing:     "border-box",
      zIndex:        String(Number(Z_MENU) + 2),
      display:       "none"
    });

    root.appendChild(ring);

    let raf = 0;

    function update() {
      const rect = bigCursor.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        ring.style.display = "none";
        return;
      }

      ring.style.display = "block";
      ring.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
      ring.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
      ring.style.width  = `${rect.width  * (151 / 182)}px`;
      ring.style.height = `${rect.height * (151 / 182)}px`;
    }

    function loop() {
      update();
      raf = requestAnimationFrame(loop);
    }

    return {
      start() {
        if (raf) return;
        loop();
      },
      stop() {
        // Ring bewusst weiterlaufen lassen,
        // damit die weisse Kontur sichtbar bleibt und nicht mit der SVG skaliert.
      },
      remove() {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        ring.remove();
      }
    };
  }

  async function playTitlePngAnimation() {
    const frames = [];
    const frameStep = 2; // HIER einstellen: 1 = alle Frames, 2 = jedes zweite Frame, 3 = jedes dritte Frame

    for (let frame = TITLE_FRAME_START; frame <= TITLE_FRAME_END; frame += frameStep) {
      const img = new Image();
      img.src = getTitleFrameUrl(frame);
      frames.push(img);
    }

    await Promise.all(
      frames.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    const frameDelay = 1000 / TITLE_FRAME_FPS;
    const titleDuration = frames.length * frameDelay;
    const halfDuration = titleDuration / 2;

    const titleBlurLayer = document.createElement("div");

    Object.assign(titleBlurLayer.style, {
      position:              "fixed",
      inset:                 "0",
      width:                 "100vw",
      height:                "100vh",
      pointerEvents:         "none",
      background:            "rgba(255,255,255,0.001)",
      backdropFilter:        "blur(0px)",
      WebkitBackdropFilter:  "blur(0px)",
      transition:            `backdrop-filter ${halfDuration}ms ease-in-out, -webkit-backdrop-filter ${halfDuration}ms ease-in-out`,
      zIndex:                String(Number(Z_MENU) + 5)
    });

    root.appendChild(titleBlurLayer);

    const titleFrame = document.createElement("img");

    titleFrame.src = frames[0].src;
    titleFrame.alt = "";

    Object.assign(titleFrame.style, {
      position:        "fixed",
      left:            "50%",
      top:             "50%",
      width:           `${TITLE_FRAME_WIDTH}px`,
      height:          "auto",
      transform:       `translate(-50%, -50%) scale(${TITLE_FRAME_SCALE})`,
      transformOrigin: "center center",
      pointerEvents:   "none",
      userSelect:      "none",
      zIndex:          String(Number(Z_MENU) + 6),
      WebkitUserDrag:  "none"
    });

    root.appendChild(titleFrame);

    void titleBlurLayer.offsetWidth;

requestAnimationFrame(() => {
  titleBlurLayer.style.backdropFilter =
    `blur(${TITLE_BACKDROP_BLUR}px)`;

  titleBlurLayer.style.WebkitBackdropFilter =
    `blur(${TITLE_BACKDROP_BLUR}px)`;
});

if (!pauseTitleAtMiddleAfterIdle) {
  window.setTimeout(() => {
    titleBlurLayer.style.backdropFilter = "blur(0px)";
    titleBlurLayer.style.WebkitBackdropFilter = "blur(0px)";
  }, halfDuration);
}

const middleFrameIndex = Math.floor(frames.length / 2);
const firstFrameIndex = startTitleDirectlyAtMiddleAfterIdle
  ? middleFrameIndex
  : 0;

for (let i = firstFrameIndex; i < frames.length; i += 1) {
  titleFrame.src = frames[i].src;

  if (
    pauseTitleAtMiddleAfterIdle &&
    i === middleFrameIndex
  ) {
    titleBlurLayer.style.transition = "none";
    titleBlurLayer.style.backdropFilter =
      `blur(${TITLE_BACKDROP_BLUR}px)`;

    titleBlurLayer.style.WebkitBackdropFilter =
      `blur(${TITLE_BACKDROP_BLUR}px)`;

    await new Promise((resolve) => {
      window.addEventListener(
        "mousemove",
        resolve,
        {
          capture: true,
          once: true
        }
      );
    });

    pauseTitleAtMiddleAfterIdle = false;

    titleBlurLayer.style.transition =
      `backdrop-filter ${halfDuration}ms ease-in-out, ` +
      `-webkit-backdrop-filter ${halfDuration}ms ease-in-out`;

    void titleBlurLayer.offsetWidth;

    requestAnimationFrame(() => {
      titleBlurLayer.style.backdropFilter = "blur(0px)";
      titleBlurLayer.style.WebkitBackdropFilter = "blur(0px)";
    });
  }

  await wait(frameDelay);
}

    titleFrame.style.transition = `opacity ${TITLE_FRAME_FADE_OUT}ms ease-in`;
    titleFrame.style.opacity = "0";

    await wait(TITLE_FRAME_FADE_OUT);

    titleFrame.remove();
    titleBlurLayer.remove();
  }

  function rememberPageClickNavigation(event) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target?.closest?.("a[href]");
  if (!link) return;

  const target = link.getAttribute("target");
  if (target && target !== "_self") return;

  let nextUrl;

  try {
    nextUrl = new URL(link.href, window.location.href);
  } catch (_) {
    return;
  }

  if (nextUrl.protocol !== "http:" && nextUrl.protocol !== "https:") return;
  if (nextUrl.hostname !== window.location.hostname) return;

  const nextUrlNoHash = nextUrl.href.split("#")[0];
  if (nextUrlNoHash === currentUrlNoHash) return;

  chrome.storage.local.set({ //da wird gspicheret hihi
    [PAGE_CLICK_NAV_KEY]: {
      url: nextUrlNoHash,
      createdAt: Date.now(),
      console: {
        x: state.console.x,
        y: state.console.y
      },
      content: {
        x: state.content.x,
        y: state.content.y
      },
      consoleManual: state.consoleManual,
      contentManual: state.contentManual
    }
  });
}

window.addEventListener("pointerdown", rememberPageClickNavigation, true);



  // ── console.svg nach Menü-Schliessen zur Startposition zurückbewegen ─────────
  const RETURN_CONSOLE_HOME_EVENT = "__nudgeReturnConsoleHomeAfterMenuClose";
  const RETURN_CONTENT_HOME_EVENT = "__nudgeReturnContentHomeAfterMenuClose";

  let introConsoleHomePosition = null;
  let introContentHomePosition = null;
  let returnConsoleHomeRaf     = 0;
  let returnContentHomeRaf     = 0;

  let hiddenConsolePosition = null;
  let hiddenContentPosition = null;
  let isCollapsed = false;
  let isMinimalAnimating = false;

  function getIntroConsoleHomeCenter() {
    if (introConsoleHomePosition) {
      return { ...introConsoleHomePosition };
    }
    return {
      x: (window.innerWidth - BIG_SIZE) / 2 - GAP - SIDE_HALF,
      y: bottomTop() + BIG_HALF
    };
  }


  async function animateConsoleBackToIntroHomePosition() {
    if (!consoleIcon) return;

    window.cancelAnimationFrame(returnConsoleHomeRaf);

    state.big.x = (window.innerWidth - BIG_SIZE) / 2;
    state.big.y = bottomTop();
    state.edge  = EDGE_BOTTOM;

    const targetCenter = getIntroConsoleHomeCenter();

    const startCenter = {
      x: Number.isFinite(state.console?.x) ? state.console.x : targetCenter.x,
      y: Number.isFinite(state.console?.y) ? state.console.y : targetCenter.y
    };

    const shouldAnimate =
      Math.abs(startCenter.x - targetCenter.x) > 0.5 ||
      Math.abs(startCenter.y - targetCenter.y) > 0.5;

    consoleIcon.style.transition = "none";
    consoleIcon.style.transform  = "translate(-50%, -50%) scale(1)";
    consoleIcon.style.opacity    = "1";

    setCenterPosition(consoleIcon, startCenter);
    state.console.x = startCenter.x;
    state.console.y = startCenter.y;
    updateLines();

    if (shouldAnimate) {
      void consoleIcon.offsetWidth;

      consoleIcon.style.transition =
        "left 600ms cubic-bezier(0.22, 1, 0.36, 1), top 600ms cubic-bezier(0.22, 1, 0.36, 1)";

      requestAnimationFrame(() => {
        setCenterPosition(consoleIcon, targetCenter);
      });

      const startedAt = performance.now();

      function followConsoleLine() {
        const elapsed  = performance.now() - startedAt;
        const progress = Math.min(elapsed / 600, 1);
        state.console.x = startCenter.x + (targetCenter.x - startCenter.x) * progress;
        state.console.y = startCenter.y + (targetCenter.y - startCenter.y) * progress;
        updateLines();
        if (elapsed < 650) {
          returnConsoleHomeRaf = requestAnimationFrame(followConsoleLine);
        }
      }

      returnConsoleHomeRaf = requestAnimationFrame(followConsoleLine);
      await wait(600);
      window.cancelAnimationFrame(returnConsoleHomeRaf);
    }

    consoleIcon.style.transition = "none";
    consoleIcon.style.transform  = "translate(-50%, -50%) scale(1)";
    consoleIcon.style.opacity    = "1";

    setCenterPosition(consoleIcon, targetCenter);

    state.big.x     = (window.innerWidth - BIG_SIZE) / 2;
    state.big.y     = bottomTop();
    state.edge      = EDGE_BOTTOM;
    state.console.x = targetCenter.x;
    state.console.y = targetCenter.y;
    state.consoleManual = false;

    updateLines();
    savePositions({
      edge:          EDGE_BOTTOM,
      big:           { x: state.big.x, y: state.big.y },
      console:       { x: targetCenter.x, y: targetCenter.y },
      consoleManual: false
    });
  }

  window.addEventListener(
    RETURN_CONSOLE_HOME_EVENT,
    (event) => {
      if (event.detail?.expand) {
        expandMenuFromMinimal();
      } else {
        collapseMenuToMinimal();
      }
    },
    true
  );

    function getIntroContentHomeCenter() {
    if (introContentHomePosition) {
      return { ...introContentHomePosition };
    }
    return {
      x: (window.innerWidth - BIG_SIZE) / 2 + BIG_SIZE + GAP + SIDE_HALF,
      y: bottomTop() + BIG_HALF
    };
  }

  async function animateContentBackToIntroHomePosition() {
    if (!contentIcon) return;

    window.cancelAnimationFrame(returnContentHomeRaf);

    state.big.x = (window.innerWidth - BIG_SIZE) / 2;
    state.big.y = bottomTop();
    state.edge  = EDGE_BOTTOM;

    const targetCenter = getIntroContentHomeCenter();

    const startCenter = {
      x: Number.isFinite(state.content?.x) ? state.content.x : targetCenter.x,
      y: Number.isFinite(state.content?.y) ? state.content.y : targetCenter.y
    };

    const shouldAnimate =
      Math.abs(startCenter.x - targetCenter.x) > 0.5 ||
      Math.abs(startCenter.y - targetCenter.y) > 0.5;

    contentIcon.style.transition = "none";
    contentIcon.style.transform  = "translate(-50%, -50%) scale(1)";
    contentIcon.style.opacity    = "1";

    setCenterPosition(contentIcon, startCenter);
    state.content.x = startCenter.x;
    state.content.y = startCenter.y;
    updateLines();

    if (shouldAnimate) {
      void contentIcon.offsetWidth;

      contentIcon.style.transition =
        "left 600ms cubic-bezier(0.22, 1, 0.36, 1), top 600ms cubic-bezier(0.22, 1, 0.36, 1)";

      requestAnimationFrame(() => {
        setCenterPosition(contentIcon, targetCenter);
      });

      const startedAt = performance.now();

      function followContentLine() {
        const elapsed  = performance.now() - startedAt;
        const progress = Math.min(elapsed / 600, 1);
        state.content.x = startCenter.x + (targetCenter.x - startCenter.x) * progress;
        state.content.y = startCenter.y + (targetCenter.y - startCenter.y) * progress;
        updateLines();
        if (elapsed < 650) {
          returnContentHomeRaf = requestAnimationFrame(followContentLine);
        }
      }

      returnContentHomeRaf = requestAnimationFrame(followContentLine);
      await wait(600);
      window.cancelAnimationFrame(returnContentHomeRaf);
    }

    contentIcon.style.transition = "none";
    contentIcon.style.transform  = "translate(-50%, -50%) scale(1)";
    contentIcon.style.opacity    = "1";

    setCenterPosition(contentIcon, targetCenter);

    state.big.x     = (window.innerWidth - BIG_SIZE) / 2;
    state.big.y     = bottomTop();
    state.edge      = EDGE_BOTTOM;
    state.content.x = targetCenter.x;
    state.content.y = targetCenter.y;
    state.contentManual = false;

    updateLines();
    savePositions({
      edge:          EDGE_BOTTOM,
      big:           { x: state.big.x, y: state.big.y },
      content:       { x: targetCenter.x, y: targetCenter.y },
      contentManual: false
    });
  }

  window.addEventListener(
    RETURN_CONTENT_HOME_EVENT,
    () => { collapseMenuToMinimal(); },
    true
  );

  // ── Intro-Animation (New-Domain) ────────────────────────────────────────────
  async function runIntroAnimation() {
    introInteractionLocked = true;
    lockPageUntilIntroFinished();
    hideLines();

    bigCursor.style.transition   = "none";
    consoleIcon.style.transition = "none";
    contentIcon.style.transition = "none";

    // Alle Icons ausblenden während die Rahmenanimation läuft
    bigCursor.style.opacity = "0";
    bigCursor.style.left    = "-9999px";
    bigCursor.style.top     = "-9999px";
    bigCursor.style.transform = "none";

    consoleIcon.style.opacity = "0";
    consoleIcon.style.left    = "-9999px";
    consoleIcon.style.top     = "-9999px";

    contentIcon.style.opacity = "0";
    contentIcon.style.left    = "-9999px";
    contentIcon.style.top     = "-9999px";

    topCursor.style.transition = "none";
    topCursor.style.opacity    = "0";
    setTopCursorPosition(topCursorHiddenTop());

    state.edge            = EDGE_BOTTOM;
    state.consoleManual   = false;
    state.contentManual   = false;

    await playTitlePngAnimation();

    bigCursor.src = bigCursorIntroUrl;

    const introUrl = chrome.runtime.getURL("menu/intro.svg");

    bigCursor.style.transition   = "none";
    consoleIcon.style.transition = "none";
    contentIcon.style.transition = "none";

    bigCursor.style.opacity   = "1";
    consoleIcon.style.opacity = "0";
    contentIcon.style.opacity = "0";
    consoleIcon.style.left    = "-9999px";
    consoleIcon.style.top     = "-9999px";
    contentIcon.style.left    = "-9999px";
    contentIcon.style.top     = "-9999px";

    bigCursor.style.transformOrigin = "center center";
    bigCursor.style.left            = "50%";
    bigCursor.style.top             = "50%";
    bigCursor.style.transform       = "translate(-50%, -50%) scale(0)";

    // Intro-SVG
    const introIcon = document.createElement("img");
    introIcon.src   = introUrl;
    introIcon.alt   = "";

    Object.assign(introIcon.style, {
      position:        "fixed",
      left:            "50%",
      top:             "50%",
      width:           "800px",
      height:          "auto",
      transform:       "translate(-50%, -50%) scale(0)",
      transformOrigin: "center center",
      pointerEvents:   "none",
      userSelect:      "none",
      zIndex:          String(Number(Z_MENU) + 1),
      WebkitUserDrag:  "none"
    });

    root.appendChild(introIcon);

    const introBigCursorRing = createIntroBigCursorRing();
    introBigCursorRing.start();
    startMainBigCursorBackdrop();

    void bigCursor.offsetWidth;
    void introIcon.offsetWidth;

    // Aufblasen
    requestAnimationFrame(() => {
      bigCursor.style.transition = "transform 1800ms cubic-bezier(0.22, 1, 0.36, 1)";
      introIcon.style.transition = "transform 2000ms cubic-bezier(0.22, 1, 0.36, 1)";
      bigCursor.style.transform  = "translate(-50%, -50%) scale(4.65)";
      introIcon.style.transform  = "translate(-50%, -50%) scale(1)";
    });

    // Warten bis Nutzer irgendwo klickt (Seite reagiert nicht)
    await wait(2000);

    await new Promise((resolve) => {
      const introClickOverlay = document.createElement("div");
      let done = false;
      let autoContinueTimer = null;

      function finish(event = null) {
        if (done) return;
        done = true;

        if (event) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
        }

        window.clearTimeout(autoContinueTimer);
        introClickOverlay.remove();
        resolve();
      }

      Object.assign(introClickOverlay.style, {
        position:      "fixed",
        inset:         "0",
        width:         "100vw",
        height:        "100vh",
        zIndex:        String(Number(Z_MENU) + 10),
        pointerEvents: "auto",
        background:    "transparent",
        cursor:        "pointer"
      });

      introClickOverlay.addEventListener(
        "pointerdown",
        (event) => {
          finish(event);
        },
        { once: true, capture: true }
      );

      root.appendChild(introClickOverlay);

      autoContinueTimer = window.setTimeout(() => {
        finish();
      }, 10000);
    });

    // Verkleinern
    requestAnimationFrame(() => {
      bigCursor.style.transition = "transform 2000ms cubic-bezier(0.22, 1, 0.36, 1)";
      introIcon.style.transition = "transform 100ms ease-in";
      bigCursor.style.transform  = "translate(-50%, -50%) scale(1)";
      introIcon.style.transform  = "translate(-50%, -50%) scale(0)";
    });

    await wait(1100);
    introIcon.remove();

    // big_cursor von Mitte nach unten bewegen
    const topLeftStartRect = bigCursor.getBoundingClientRect();

    bigCursor.style.transition = "none";
    bigCursor.style.transform  = "none";
    bigCursor.style.left       = `${topLeftStartRect.left}px`;
    bigCursor.style.top        = `${topLeftStartRect.top}px`;

    topCursorIntroIconLocked = false;
    topCursorHovered = false;
    topCursorIcon.src = topCursorIcon1Url;

    topCursor.style.transition = "none";
    topCursor.style.opacity    = "1";
    topCursorIcon.style.transition = "none";
    setTopCursorPosition(topCursorHiddenTop());

    startTopCursorEffects();
    updateTopCursorBackdropPosition();
    updateTopCursorRingPosition();

    void bigCursor.offsetWidth;
    void topCursor.offsetWidth;
    void topCursorIcon.offsetWidth;

    state.big.x = (window.innerWidth - BIG_SIZE) / 2;
    state.big.y = bottomTop();

    bigCursor.style.transition =
      "top 1400ms cubic-bezier(0.22, 1, 0.36, 1), left 1400ms cubic-bezier(0.22, 1, 0.36, 1)";

    topCursor.style.transition =
      "top 1400ms cubic-bezier(0.22, 1, 0.36, 1)";

    topCursorIcon.style.transition =
      "top 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out";

    requestAnimationFrame(() => {
      setBigPosition();
      setTopCursorPosition();
    });

    await wait(1400);
    topCursorIntroIconLocked = false;
    topCursorIcon.src = topCursorIcon1Url;

    bigCursor.style.transition = "none";
    bigCursor.style.transform  = "none";
    state.big.y = bottomTop();
    setBigPosition();

    topCursor.style.transition = "none";
    topCursorIcon.style.transition = "none";
    setTopCursorPosition();
    startTopCursorEffects();

    introBigCursorRing.stop();
    bigCursor.src = bigCursorIntroUrl;

    startMainBigCursorRing();

    // console + content von unten einfahren
    updateFollowerPositions();

    consoleIcon.style.transition = "none";
    contentIcon.style.transition = "none";

    setCenterPosition(consoleIcon, { x: state.console.x, y: state.console.y + 80 });
    setCenterPosition(contentIcon, { x: state.content.x, y: state.content.y + 80 });

    void consoleIcon.offsetWidth;
    void contentIcon.offsetWidth;

    consoleIcon.style.opacity    = "1";
    contentIcon.style.opacity    = "1";
    consoleIcon.style.transition = "top 600ms cubic-bezier(0.22, 1, 0.36, 1)";
    contentIcon.style.transition = "top 600ms cubic-bezier(0.22, 1, 0.36, 1)";

    requestAnimationFrame(() => {
      setCenterPosition(consoleIcon, state.console);
      setCenterPosition(contentIcon, state.content);
    });

    await wait(600);

    bigCursor.style.transition   = "none";
    bigCursor.style.transform    = "none";
    consoleIcon.style.transition = "none";
    contentIcon.style.transition = "none";

    // Startposition merken für spätere Rückkehr nach Menü-Item-Klick
    introConsoleHomePosition = {
      x: state.console.x,
      y: state.console.y
    };

    introContentHomePosition = {
      x: state.content.x,
      y: state.content.y
    };

    // Alte Stelle:
    // showLines();

    await showLinesAnimated();
    await animateScreenFrameIn();

    await animateIntroFollowerPulse();
    await animateIntroBigCursorPulse();
    introInteractionLocked = false;
    unlockPageAfterIntroFinished();

    savePositions({
      menuOpen:        false,
      snappedIndex:    0,
      targetProgress:  0,
      currentProgress: 0,
      wheelAccumulated: 0,
      linesReady:      true
    });

    bigNavReady = true;

    if (bigCursor.matches?.(":hover")) {
      showBigNavCursors();
}
  }

  // ── Intro-Neustart via Tastatur (Taste S) ────────────────────────────────────
  const handleIntroRestartKey = (event) => {
    if (
      event.key?.toLowerCase() !== "s" ||
      event.repeat ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    chrome.storage.local.remove([
      POSITION_KEY,
      SHARED_HOST_KEY,
      FEATURE_HOST_KEY,
      NAV_SKIP_INTRO_KEY,
      NAV_SNAP_POSITION_KEY,
      NAV_MENU_POSITIONS_KEY,
      PAGE_CLICK_NAV_KEY
    ], () => {
      chrome.storage.local.set({
        [FORCE_INTRO_KEY]: true
      }, () => {
        window.location.href = "https://en.zalando.de/women-home/?_rfl=de";
      });
    });
  };

  window.addEventListener("keydown", handleIntroRestartKey, true);

  // ── Drag & Drop ─────────────────────────────────────────────────────────────
  let activeDrag = null;
  let dragRaf    = 0;
  let snapTimer  = 0;
  let bigSnapRaf = 0;
  let unlockAfterCenterSnap = false;

  function scheduleDragRender() {
    if (dragRaf) return;
    dragRaf = requestAnimationFrame(() => {
      dragRaf = 0;
      applyPositions();
    });
  }

  const NUDGE_SITE_LIST = [
  "https://en.zalando.de/women-home/?_rfl=de",

  "https://www.amazon.com/s?k=Jeans&rh=n%3A1040660%2Cn%3A1048188%2Cp_36%3A-5000&dc&ds=v1%3AZrh2YeJ%2Bmo6tc5p1QJD9idnCpBDTF2pKNTUbGqlhFKk&_encoding=UTF8&content-id=amzn1.sym.1cb3993a-41fc-4a2a-b2ee-016e70298d9f&crid=1TZCO6ZC2HZVA&pd_rd_r=bf680754-91af-449e-b909-2f847d731ac2&pd_rd_w=t0MV5&pd_rd_wg=zGFGp&pf_rd_p=1cb3993a-41fc-4a2a-b2ee-016e70298d9f&pf_rd_r=87X7WK6FWGVZ9GT44WB1&qid=1684823801&rnid=2941120011&sprefix=jeans%2Caps%2C155&ref=pd_hp_d_atf_unk",

  "https://www.shein.com/super-deals?pagefrom=page_home&fromPageType=home&src_module=all&src_identifier=on%3DFLEXIBLE_LAYOUT_COMPONENT%60cn%3Dsuperdeals%60hz%3Drefresh_0%60jc%3DthriftyFind_%60ps%3D3_1&src_tab_page_id=page_home1781390059936&ici=CCCSN%3Dall_ON%3DFLEXIBLE_LAYOUT_COMPONENT_OI%3D0_CN%3DFLEXIBLE_LAYOUT_FOR_SALEZONE_TI%3D50001_aod%3D0_PS%3D3-1_ABT%3D0&adp=454786942&flash_adp=35043908&eventTimestamp=1781390074105",

  "https://www.asos.com/us/women/sale/cat/?cid=7046#nlid=ww|sale|shop+by+category|view+all+sale",

  "https://www.aliexpress.us/",

  "https://www2.hm.com/en_us/women/seasonal-trending/best-sellers.html",

  "https://www.aboutyou.ch/p/guido-maria-kretschmer-women/kleid-cora-28671708",

  "https://www.amazon.com/",

  "https://www.galaxus.ch/de/daily-deal"
];

function getNudgeSiteKey(url) {
  try {
    const parsedUrl = new URL(url);

    const host = parsedUrl.hostname
      .replace(/^www\d*\./, "")
      .toLowerCase();

    const path =
      parsedUrl.pathname.toLowerCase().replace(/\/+$/, "") ||
      "/";

    if (
      host === "amazon.com" ||
      host.endsWith(".amazon.com")
    ) {
      return path === "/"
        ? "amazon-home"
        : "amazon-listing";
    }

    if (host.includes("zalando.")) {
      return "zalando";
    }

    if (host.includes("shein.")) {
      return "shein";
    }

    if (host.includes("asos.")) {
      return "asos";
    }

    if (host.includes("aliexpress.")) {
      return "aliexpress";
    }

    if (host.includes("aboutyou.")) {
      return "aboutyou";
    }

    if (
      host === "hm.com" ||
      host.endsWith(".hm.com")
    ) {
      return "hm";
    }

    if (host.includes("galaxus.")) {
      return "galaxus";
    }
  } catch (_) {
    return null;
  }

  return null;
}

function getCurrentSiteIndex() {
  const currentSiteKey =
    getNudgeSiteKey(window.location.href);

  if (!currentSiteKey) return -1;

  return NUDGE_SITE_LIST.findIndex((url) => {
    return getNudgeSiteKey(url) === currentSiteKey;
  });
}

  function snapBigToNearestPosition(releasedAtX, forceTarget = null) {
    // NEU: erlaubt auch snapBigToNearestPosition("center")
    if (
      releasedAtX === "left" ||
      releasedAtX === "center" ||
      releasedAtX === "right"
    ) {
      forceTarget = releasedAtX;
    }

    let targetX;
    let snapDirection = forceTarget || "center";

    // Alte Stelle: Drittel-Berechnung nur über releasedAtX
    if (forceTarget === "left") {
      targetX = BIG_SNAP_MARGIN;
      snapDirection = "left";
    } else if (forceTarget === "right") {
      targetX = window.innerWidth - BIG_SIZE - BIG_SNAP_MARGIN;
      snapDirection = "right";
    } else if (forceTarget === "center") {
      targetX = (window.innerWidth - BIG_SIZE) / 2;
      snapDirection = "center";
    } else if (releasedAtX < window.innerWidth / 3) {
      targetX = BIG_SNAP_MARGIN;
      snapDirection = "left";
    } else if (releasedAtX > window.innerWidth * 2 / 3) {
      targetX = window.innerWidth - BIG_SIZE - BIG_SNAP_MARGIN;
      snapDirection = "right";
    } else {
      targetX = (window.innerWidth - BIG_SIZE) / 2;
      snapDirection = "center";
    }

    // Alte Stelle:
    // bigCursor.style.transition = "left 1000ms ...";
    // state.big.x = targetX;
    // state.big.y = bottomTop();
    // Dadurch springen Linien/Rahmen sofort zur Zielposition.

    window.clearTimeout(snapTimer);
    window.cancelAnimationFrame(bigSnapRaf);

    const startX = state.big.x;
    const endX   = targetX;
    const duration = 1000;
    const startedAt = performance.now();

    bigCursor.style.transition = "none";

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateBigSnap(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = easeOutCubic(progress);

      state.big.x = startX + (endX - startX) * eased;
      state.big.y = bottomTop();

      applyPositions();

      if (progress < 1) {
        bigSnapRaf = window.requestAnimationFrame(animateBigSnap);
      } else {
        state.big.x = endX;
        state.big.y = bottomTop();

        applyPositions();
        savePositions();

        if (unlockAfterCenterSnap && snapDirection === "center") {
          unlockAfterCenterSnap = false;
          introInteractionLocked = false;
          unlockPageAfterIntroFinished();
          bigNavReady = true;
        }
      }
    }

    bigSnapRaf = window.requestAnimationFrame(animateBigSnap);

    // Navigation bleibt erhalten, aber erst nach sichtbarem Snap
    if (snapDirection === "left" || snapDirection === "right") {
      const currentIndex = getCurrentSiteIndex();
      const baseIndex = currentIndex === -1 ? 0 : currentIndex;

      const nextIndex =
        snapDirection === "right"
          ? (baseIndex + 1) % NUDGE_SITE_LIST.length
          : (baseIndex - 1 + NUDGE_SITE_LIST.length) % NUDGE_SITE_LIST.length;

      const targetSnapPosition = snapDirection;

      window.setTimeout(() => {
        // NEU: Positionen von console.svg und content.svg vor Seitenwechsel merken
        const navMenuPositions = {
          console: {
            x: state.console.x,
            y: state.console.y
          },
          content: {
            x: state.content.x,
            y: state.content.y
          },
          consoleManual: state.consoleManual,
          contentManual: state.contentManual
        };

        chrome.storage.local.set({
          [NAV_SKIP_INTRO_KEY]: true,
          [NAV_SNAP_POSITION_KEY]: targetSnapPosition,
          [NAV_MENU_POSITIONS_KEY]: navMenuPositions
        }, () => {
          const targetUrl = NUDGE_SITE_LIST[nextIndex];

        chrome.storage.local.set({
          [NAV_TARGET_URL_KEY]: targetUrl,
          [NAV_TARGET_RETRY_KEY]: 0
        }, () => {
          window.location.href = targetUrl;
        });
        });
      }, duration + 50);
    }

    applyPositions();
    savePositions();

    snapTimer = window.setTimeout(() => {
      bigCursor.style.transition = "none";
    }, 1000);
  }

  function startDrag(event, type) {
    if (introInteractionLocked) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      return;
    }

    event.preventDefault();
    event.stopPropagation();

  if (type === "big" && isCollapsed) {
      activeDrag = null;
      expandMenuFromMinimal();
      return;
    }

    if (isMinimalAnimating) return;

    const point =
      type === "big"     ? state.big     :
      type === "console" ? state.console :
                          state.content;

    activeDrag = {
      type,
      pointerId: event.pointerId,
      offsetX:   event.clientX - point.x,
      offsetY:   event.clientY - point.y
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  }

  function moveDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    event.preventDefault();
    event.stopPropagation();

    if (activeDrag.type === "big") {
      if (bigNavVisible) hideBigNavCursors(false);

      bigCursor.style.transform  = "none";
      bigCursor.style.transition = "none";
      state.edge  = EDGE_BOTTOM;
      state.big.x = clamp(event.clientX - activeDrag.offsetX, -BIG_HALF, window.innerWidth - BIG_HALF);
      state.big.y = bottomTop();
    }

    if (activeDrag.type === "console") {
      state.consoleManual = true;
      state.console = clampSidePoint(
        enforceMinDistance(
          { x: event.clientX - activeDrag.offsetX, y: event.clientY - activeDrag.offsetY },
          "left"
        )
      );
    }

    if (activeDrag.type === "content") {
      state.contentManual = true;
      state.content = clampSidePoint(
        enforceMinDistance(
          { x: event.clientX - activeDrag.offsetX, y: event.clientY - activeDrag.offsetY },
          "right"
        )
      );
    }

    scheduleDragRender();
  }

  function endDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    event.preventDefault();
    event.stopPropagation();

    const dragType = activeDrag.type;

    const el =
      activeDrag.type === "big"     ? bigCursor   :
      activeDrag.type === "console" ? consoleIcon :
                                      contentIcon;

    el.style.cursor = "grab";
    activeDrag = null;

    // Alte Stelle:
    // clampBigToCurrentEdge();
    // applyPositions();
    // savePositions();

    if (dragType === "big") {
      snapBigToNearestPosition(state.big.x + BIG_HALF);
    } else {
      clampBigToCurrentEdge();
      applyPositions();
      savePositions();
    }
  }

  bigCursor.addEventListener("pointerdown",   (event) => startDrag(event, "big"),     true);
  consoleIcon.addEventListener("pointerdown", (event) => startDrag(event, "console"), true);
  contentIcon.addEventListener("pointerdown", (event) => startDrag(event, "content"), true);

  window.addEventListener("pointermove",  moveDrag, true);
  window.addEventListener("pointerup",    endDrag,  true);
  window.addEventListener("pointercancel", endDrag, true);

  window.addEventListener("resize", () => {
    clampBigToCurrentEdge();
    applyPositions();
    setTopCursorPosition();
    updateScreenFrameLine();
    savePositions();
  }, true);

 // ── Initialisierung ─────────────────────────────────────────────────────────
chrome.storage.local.get(
  [
    SHARED_HOST_KEY,
    FEATURE_HOST_KEY,
    POSITION_KEY,
    NAV_SKIP_INTRO_KEY,
    NAV_SNAP_POSITION_KEY,
    FORCE_INTRO_KEY,
    IDLE_INTRO_PAUSE_KEY,
    IDLE_INTRO_START_MIDDLE_KEY,
    PAGE_CLICK_NAV_KEY,
    NAV_TARGET_URL_KEY,
    NAV_TARGET_RETRY_KEY
  ],
  async (result) => {
  const forcedTargetUrl = result[NAV_TARGET_URL_KEY] || null;
  const forcedTargetRetry = Number(result[NAV_TARGET_RETRY_KEY] || 0);

  const forcedTargetIsHm =
    forcedTargetUrl &&
    getNudgeSiteKey(forcedTargetUrl) === "hm";

  const currentPageIsHm =
    getNudgeSiteKey(window.location.href) === "hm";

  const forcedTargetReached =
    forcedTargetUrl &&
    (
      currentUrlNoHash === forcedTargetUrl.split("#")[0] ||
      (forcedTargetIsHm && currentPageIsHm)
    );

  if (
    forcedTargetUrl &&
    !forcedTargetReached &&
    forcedTargetRetry < 2
  ) {
      chrome.storage.local.set({
        [NAV_TARGET_RETRY_KEY]: forcedTargetRetry + 1
      }, () => {
        window.location.replace(forcedTargetUrl);
      });

      return;
    }

    if (forcedTargetUrl) {
      chrome.storage.local.remove([
        NAV_TARGET_URL_KEY,
        NAV_TARGET_RETRY_KEY
      ]);
    }
    const featureLastHostname = result[FEATURE_HOST_KEY];
    const isNewDomain         = featureLastHostname !== currentHostname;

    loadPositions(result[POSITION_KEY]);

    const pageClickNavigation = result[PAGE_CLICK_NAV_KEY] || null;

    const isPageClickNavigation =
      pageClickNavigation &&
      pageClickNavigation.url === currentUrlNoHash &&
      Date.now() - pageClickNavigation.createdAt < 10000;

    const isSnapNavigation = result[NAV_SKIP_INTRO_KEY] === true;
    const forceIntro       = result[FORCE_INTRO_KEY] === true;

    pauseTitleAtMiddleAfterIdle =
      result[IDLE_INTRO_PAUSE_KEY] === true;

    startTitleDirectlyAtMiddleAfterIdle =
      result[IDLE_INTRO_START_MIDDLE_KEY] === true;

    if (pauseTitleAtMiddleAfterIdle || startTitleDirectlyAtMiddleAfterIdle) {
      chrome.storage.local.remove([
        IDLE_INTRO_PAUSE_KEY,
        IDLE_INTRO_START_MIDDLE_KEY
      ]);
    }

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isBrowserReload =
      navigationEntry?.type === "reload" ||
      performance.navigation?.type === 1;

   const skipIntro = !forceIntro;

    if (forceIntro) {
      chrome.storage.local.remove(FORCE_INTRO_KEY);
    }

    if (isSnapNavigation) {
      chrome.storage.local.remove(NAV_SKIP_INTRO_KEY);
    }

    chrome.storage.local.remove(PAGE_CLICK_NAV_KEY);

    if (!skipIntro) {
      await runIntroAnimation();
    } else {
      if (isPageClickNavigation) {
        if (pageClickNavigation.console) {
          state.console.x = pageClickNavigation.console.x;
          state.console.y = pageClickNavigation.console.y;
        }

        if (pageClickNavigation.content) {
          state.content.x = pageClickNavigation.content.x;
          state.content.y = pageClickNavigation.content.y;
        }

        state.consoleManual = Boolean(pageClickNavigation.consoleManual);
        state.contentManual = Boolean(pageClickNavigation.contentManual);
      }

      showPersistentMenuImmediately();

      if (isSnapNavigation) {
        introInteractionLocked = true;
        lockPageUntilIntroFinished();
        bigNavReady = false;
        hideBigNavCursors(false);

        chrome.storage.local.get(
          [NAV_SNAP_POSITION_KEY, NAV_MENU_POSITIONS_KEY],
          (posResult) => {
            const savedSnap = posResult[NAV_SNAP_POSITION_KEY] || "center";
            const navMenuPositions = posResult[NAV_MENU_POSITIONS_KEY] || null;

            chrome.storage.local.remove([
              NAV_SNAP_POSITION_KEY,
              NAV_MENU_POSITIONS_KEY
            ]);

            const snapX =
              savedSnap === "left"  ? FRAME_MARGIN :
              savedSnap === "right" ? window.innerWidth - BIG_SIZE - FRAME_MARGIN :
                                      (window.innerWidth - BIG_SIZE) / 2;

            state.big.x = snapX;
            state.big.y = bottomTop();

            if (navMenuPositions?.console) {
              state.console.x = navMenuPositions.console.x;
              state.console.y = navMenuPositions.console.y;
            }

            if (navMenuPositions?.content) {
              state.content.x = navMenuPositions.content.x;
              state.content.y = navMenuPositions.content.y;
            }

            state.consoleManual = true;
            state.contentManual = true;

            applyPositions();

            state.consoleManual = Boolean(navMenuPositions?.consoleManual);
            state.contentManual = Boolean(navMenuPositions?.contentManual);

            savePositions();

            window.setTimeout(() => {
              snapBigToNearestPosition("center");

              window.setTimeout(() => {
                introInteractionLocked = false;
                unlockPageAfterIntroFinished();
                bigNavReady = true;
              }, 1100);
            }, 1000);
          }
        );
      }
    }

    chrome.storage.local.set({
      [SHARED_HOST_KEY]:  currentHostname,
      [FEATURE_HOST_KEY]: currentHostname
    });

    const restoreContext = { sameHostname: !isNewDomain };

    window.__nudgeStartMenuReady          = true;
    window.__nudgeStartMenuRestoreContext = restoreContext;

    window.dispatchEvent(
      new CustomEvent(MENU_RESTORE_EVENT, { detail: restoreContext })
    );
  }
);

})();
















// MARK: 1 ARC-MENÜ 
// (console.svg)
(() => {
  "use strict";

  // ── IDs & Konstanten ────────────────────────────────────────────────────────
  const MENU_ID             = "nudge-tools-wheel-menu";
  const STYLE_ID            = "__nudge-tools-wheel-style";
  const BACKDROP_ID         = "__nudge-tools-wheel-backdrop";
  const CONSOLE_ICON_ID     = "__nudge-start-menu-console";
  const START_BIG_CURSOR_ID = "__nudge-start-menu-big-cursor";
  const CLICK_MOVE_THRESHOLD = 5;
  const MENU_Z_INDEX        = "2147483645";
  const SWAP_CURSOR_Z_INDEX = "2147483646";

  const POSITION_KEY           = `__nudgeStartMenuPositions:${window.location.hostname}`;
  const MENU_RESTORE_EVENT     = "__nudgeStartMenuReady";
  const RETURN_CONSOLE_HOME_EVENT = "__nudgeReturnConsoleHomeAfterMenuClose";
  const MENU_TOOL_EVENT        = "__nudgeMenuToolActivated";

  const MAX_ACTIVE_TOOLS = 1;

  let activeModuleIds = [];
  let activeModuleId = null; // bleibt: zuletzt aktives Tool

  function syncActiveModuleId() {
    activeModuleId = activeModuleIds[activeModuleIds.length - 1] || null;
  }
    const MODULE_ACTIVATE_EVENT = "__nudgeModuleActivate";
    const MODULE_DEACTIVATE_EVENT = "__nudgeModuleDeactivate";

    const MODULE_SCRIPT_BY_TOOL_ID = {
      wording: "modules/wording.js",
      rating: "modules/rating.js",
      ad: "modules/ad.js",
      quantity: "modules/quantity.js",
      urgency: "modules/urgency.js",
      discounting: "modules/discounting.js",
      interference: "modules/interference.js",
      registration: "modules/registration.js",
      app: "modules/app.js",
      delivery: "modules/delivery.js",
      gamification: "modules/gamification.js"
    };

    const loadedToolModulePromises = new Map();

    function loadToolModule(toolId) {
      const scriptPath = MODULE_SCRIPT_BY_TOOL_ID[toolId];

      if (!scriptPath) {
        return Promise.resolve();
      }

      if (!loadedToolModulePromises.has(toolId)) {
        loadedToolModulePromises.set(
          toolId,
          import(chrome.runtime.getURL(scriptPath)).catch((error) => {
            loadedToolModulePromises.delete(toolId);
            console.warn(`[Nudge] Modul konnte nicht geladen werden: ${toolId}`, error);
          })
        );
      }

      return loadedToolModulePromises.get(toolId);
    }

    function dispatchModuleActivate(toolId) {
      loadToolModule(toolId).then(() => {
        if (!activeModuleIds.includes(toolId)) return;

        window.dispatchEvent(
          new CustomEvent(MODULE_ACTIVATE_EVENT, {
            detail: { toolId }
          })
        );
      });
    }

    function dispatchModuleDeactivate(toolId) {
      if (!toolId) return;

      window.dispatchEvent(
        new CustomEvent(MODULE_DEACTIVATE_EVENT, {
          detail: { toolId }
        })
      );
    }

  window.addEventListener(MENU_TOOL_EVENT, (event) => {
    const toolId = event.detail?.toolId;
    if (!toolId) return;
        if (event.detail?.source === "content") return;

    if (activeModuleIds.includes(toolId)) {
      activeModuleIds = activeModuleIds.filter((id) => id !== toolId);
      syncActiveModuleId();

      dispatchModuleDeactivate(toolId);
      removeActiveToolDock(toolId, true);
      saveSelectedToolDocksState();
      return;
    }

    if (activeModuleIds.length >= MAX_ACTIVE_TOOLS) {
      const oldestToolId = activeModuleIds.shift();

      if (oldestToolId) {
        dispatchModuleDeactivate(oldestToolId);
        removeActiveToolDock(oldestToolId, true);
      }
    }

    activeModuleIds.push(toolId);
    syncActiveModuleId();

    dispatchModuleActivate(toolId);
    saveSelectedToolDocksState();
  });

  /*
    Lokale Kopien der Werte aus dem Start-Menü-Block.
    Die Originalwerte sind dort innerhalb einer IIFE gekapselt und deshalb
    in diesem separaten Block nicht direkt lesbar.
  */
  const BIG_SIZE                    = 200;
  const BIG_LINE_RADIUS             = 82;
  const FADEN_START_OFFSET          = 1;
  const CONSOLE_LINE_ANCHOR_OFFSET_X = 0;
  const CONSOLE_LINE_ANCHOR_OFFSET_Y = 20;
  const TOOL_DOCK_DISTANCE = 20; // px abstand vom big_cursor zum svg mittupunkt
  const TOOL_DOCK_STACK_ANGLE_STEP = 18; // abstand zwüschä mehreren aktiven _.svg

  const SIDE_CURSOR_SIZE = 60; // grösse vom linken/rechten Punkt
  const SIDE_CURSOR_REST_VISIBLE_RATIO = 0.5; // normal nur 1/2 vom Punkt sichtbar
  const SIDE_CURSOR_BOUNCE_VISIBLE_RATIO = 1.2; // bounce stärke
  const SIDE_CURSOR_SYMBOL_SIZE = 24; // grösse von cursor/i.svg und cursor/x.svg
  const SIDE_CURSOR_MOVE_DURATION = 900; // bewegung von der seite in die mitte
  const SIDE_CURSOR_APPEAR_DURATION = 320; // hinein-/hinausfahren vom Punkt
  const SIDE_CURSOR_HOVER_OFFSET = 14; // hover-bewegung horizontal
  const SIDE_IMPRESSUM_WIDTH = 800; // grösse vom geöffneten info-svg
  const SIDE_IMPRESSUM_CURSOR_SCALE = 4.65; // skalierung vom big_cursor.svg in der mitte
  const SIDE_IMPRESSUM_SCALE_DURATION = 2000; // dauer info-animation
  const SIDE_INFO_SWITCH_MS = 4000; // bei mehreren _.svg: nach 4s nächstes info-svg
  const SIDE_CURSOR_BACKDROP_BLUR = 12; // blur-stärke vom linken/rechten Punkt
  const SIDE_CURSOR_DELETE_TRIGGER_RADIUS = 100; // reaktions-radius vom rechten Punkt fürs löschen
  const SIDE_INFO_OPEN_Z_INDEX = "2147483646"; // geöffnetes Info liegt vorne, aber unter dem Cursor
  const SIDE_FRAME_GAP_UPDATE_EVENT = "__nudgeSideCursorFrameGapUpdate";
  const SIDE_CURSOR_Z_INDEX = "2147483645";
  const SIDE_CURSOR_BACKDROP_Z_INDEX = "2147483644";
  const SIDE_CURSOR_RING_Z_INDEX = "2147483647";

  const SIDE_INFO_SVG_BY_TOOL_ID = {
    wording: "menu/info_wording.svg",
    rating: "menu/info_rating.svg",
    ad: "menu/info_ad.svg",
    quantity: "menu/info_quantity.svg",
    urgency: "menu/info_urgency.svg",
    discounting: "menu/info_discounting.svg",
    interference: "menu/info_interference.svg",
  };


  const SELECTED_TOOL_LINE_END_OFFSET_X = 0; // linie bei _.svg +X = nach rechts, -X = nach links
  const SELECTED_TOOL_LINE_END_OFFSET_Y = -140; //linie bei _.svg  +Y = nach unten, -Y = nach oben

  const SELECTED_TOOL_BIG_CURSOR_SAFE_RADIUS = 150; // Sperrbereich um big_cursor_intro.svg

  // ── Menü-Konfiguration ──────────────────────────────────────────────────────
  const CONFIG = {
    visibleCenterAngle:  180,
    itemAngleStep:       26,
    visibleItems:        7,
    scrollPixelsPerItem: 250,
    smoothing:           0.25,
    svgRotationOffset:   0
  };

  const MENU_ITEM_SIZE   = 300;
  const MENU_RADIUS      = 260;
  const ERKLARUNG_SIZE   = 540;
  const ERKLARUNG_RADIUS = 380;

  // ── Menü-Items ──────────────────────────────────────────────────────────────
  const MENU_ITEMS = [
    { label: "Up",           href: "#up",           svg: "tools/up.svg",            lineEndOffsetX: -4, lineEndOffsetY: 0, hideLine: true },

    { label: "Thresholding", href: "#thresholding", svg: "tools/wording.svg",       erklarung: "menu/e_wording.svg",       lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Trusting",     href: "#trusting",     svg: "tools/rating.svg",        erklarung: "menu/e_rating.svg",        lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Framing",      href: "#framing",      svg: "tools/ad.svg",            erklarung: "menu/e_ad.svg",            lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Pressuring",   href: "#pressuring",   svg: "tools/quantity.svg",      erklarung: "menu/e_quantity.svg",      lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Blending",     href: "#blending",     svg: "tools/urgency.svg",       erklarung: "menu/e_urgency.svg",       lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Rushing",      href: "#rushing",      svg: "tools/discounting.svg",   erklarung: "menu/e_discounting.svg",   lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Targeting",    href: "#targeting",    svg: "tools/interference.svg",  erklarung: "menu/e_interference.svg",  lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Distracting",  href: "#distracting",  svg: "tools/registration.svg",  erklarung: "menu/e_registration.svg",  lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Directing",    href: "#directing",    svg: "tools/app.svg",           erklarung: "menu/e_app.svg",           lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Registering",  href: "#registering",  svg: "tools/delivery.svg",      erklarung: "menu/e_delivery.svg",      lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },
    { label: "Redirecting",  href: "#redirecting",  svg: "tools/gamification.svg",  erklarung: "menu/e_gamification.svg",  lineEndOffsetX: 0, lineEndOffsetY: 0, erklarungLineEndOffsetX: 5, erklarungLineEndOffsetY: 0 },

    { label: "Down",         href: "#down",         svg: "tools/down.svg",          lineEndOffsetX: -4, lineEndOffsetY: 0, hideLine: true }
  ];

  //+X = nach rechts
  //-X = nach links
  //+Y = nach unten
  //-Y = nach oben

    function getWebsiteKeyForConsoleMenu() {
    const host = window.location.hostname.toLowerCase();

    if (host.includes("amazon.")) return "amazon";
    if (host.includes("shein.")) return "shein";
    if (host.includes("zalando.")) return "zalando";
    if (host.includes("asos.")) return "asos";
    if (host.includes("aliexpress.")) return "aliexpress";
    if (host.includes("aboutyou.")) return "aboutyou";
    if (host === "hm.com" || host.endsWith(".hm.com")) return "hm";
    if (host.includes("galaxus.")) return "galaxus";

    return null;
  }

    const WEBSITE_CONSOLE_TOOLS = {
  // ── AMAZON ────────────────────────────────────────────────────────────────
  amazon: [
    "wording",
    "rating",
    "ad",
    "quantity",
    "discounting",
    "interference",
  ],

  "amazon:home": [
    "wording"
  ],

  "amazon:listing": [
    "wording",
    "rating",
    "ad",
    "quantity",
    "urgency",
    "discounting",
    "interference"
  ],

  "amazon:product": [
    "wording",
    "rating",
    "ad",
    "quantity",
    "discounting",
    "interference"
  ],

  // ── SHEIN ─────────────────────────────────────────────────────────────────
  shein: [
    "wording",
    "rating",
    "quantity",
    "discounting",
    "interference",
  ],

  "shein:home": [
    "wording",
    "discounting",
    "interference",
  ],

  "shein:listing": [
    "wording",
    "rating",
    "quantity",
    "discounting",
    "interference",
  ],

  "shein:product": [
    "wording",
    "rating",
    "quantity",
    "discounting",
    "interference",
  ],

  // ── ZALANDO ───────────────────────────────────────────────────────────────
  zalando: [
    "wording",
    "ad",
    "quantity",
    "discounting",
    "interference",
  ],

  "zalando:home": [
    "wording",
    "ad",
    "discounting",
    "interference",
  ],

  "zalando:listing": [
    "wording",
    "ad",
    "discounting",
    "interference",
  ],

  "zalando:product": [
    "wording",
    "ad",
    "quantity",
    "discounting",
    "interference",
  ],

  // ── ASOS ──────────────────────────────────────────────────────────────────
  asos: [
    "wording",
    "rating",
    "quantity",
    "discounting",
    "interference",
  ],

  "asos:home": [
    "wording",
    "discounting",
    "interference",
  ],

  "asos:listing": [
    "wording",
    "quantity",
    "discounting",
    "interference",
  ],

  "asos:product": [
    "wording",
    "rating",
    "discounting",
    "interference",
  ],

  // ── ALIEXPRESS ────────────────────────────────────────────────────────────
  aliexpress: [
    "wording",
    "rating",
    "quantity",
    "urgency",
    "discounting",
    "interference",
  ],

  "aliexpress:home": [
    "wording",
    "rating",
    "quantity",
    "urgency",
    "discounting",
    "interference",
  ],

  "aliexpress:listing": [
    "wording",
    "rating",
    "quantity",
    "discounting",
    "interference",
  ],

  "aliexpress:product": [
    "wording",
    "rating",
    "quantity",
    "discounting",
    "interference",
  ],

  // ── ABOUT YOU ─────────────────────────────────────────────────────────────
  aboutyou: [
    "wording",
    "discounting",
    "interference",
  ],

  "aboutyou:home": [
    "wording",
    "discounting",
    "interference",
  ],

  "aboutyou:listing": [
    "wording",
    "discounting",
    "interference",
  ],

  "aboutyou:product": [
    "wording",
    "discounting",
    "interference",
  ],

  // ── H&M ───────────────────────────────────────────────────────────────────
  hm: [
    "wording",
    "discounting",
    "interference",
  ],

  "hm:home": [
    "wording",
    "discounting",
  ],

  "hm:listing": [
    "wording",
    "discounting",
  ],

  "hm:product": [
    "wording",
    "discounting",
  ],

  // ── GALAXUS ───────────────────────────────────────────────────────────────
  galaxus: [
    "wording",
    "rating",
    "quantity",
    "interference",
  ],

  "galaxus:home": [
    "wording",
  ],

  "galaxus:listing": [
    "wording",
    "rating",
    "quantity",
    "urgency", // only https://www.galaxus.ch/en/daily-deal
    "interference"
  ],

  "galaxus:product": [
    "wording",
    "rating",
    "interference"
  ]
};

function getSpecialPageConsoleTools() {
  const host = window.location.hostname.toLowerCase();

  const path =
    window.location.pathname
      .toLowerCase()
      .replace(/\/+$/, "") ||
    "/";

  const searchParams =
    new URLSearchParams(window.location.search);

  const isAmazon =
    host === "amazon.com" ||
    host.endsWith(".amazon.com");

  const isShein =
    host === "shein.com" ||
    host.endsWith(".shein.com");

  const isZalando =
    host.includes("zalando.");

  const isAsos =
    host === "asos.com" ||
    host.endsWith(".asos.com");

  const isAliExpress =
    host.includes("aliexpress.");

  const isAboutYou =
    host.includes("aboutyou.");

  const isHm =
    host === "hm.com" ||
    host.endsWith(".hm.com");

  const isGalaxus =
    host.includes("galaxus.");

  // Zalando Women Home
  if (
    isZalando &&
    path === "/women-home"
  ) {
    return [
      "wording",
      "ad",
      "discounting"
    ];
  }

  // Amazon Jeans Listing
  if (
    isAmazon &&
    path === "/s" &&
    (
      searchParams.get("k") ||
      ""
    ).toLowerCase() === "jeans"
  ) {
    return [
      "wording",
      "rating",
      "quantity",
      "ad",
      "urgency",
      "discounting",
      "interference"
    ];
  }

  // Shein Super Deals
  if (
    isShein &&
    path === "/super-deals"
  ) {
    return [
      "wording",
      "quantity",
      "urgency",
      "discounting",
      "interference"
    ];
  }
  // ASOS Sale
  if (
    isAsos &&
    path.endsWith("/women/sale/cat") &&
    searchParams.get("cid") === "7046"
  ) {
    return [
      "wording",
      "quantity",
      "discounting"
    ];
  }

  // AliExpress Home
  if (
    isAliExpress &&
    (
      path === "/" ||
      path.startsWith("/p/calp-plus/")
    )
  ) {
    return [
      "wording",
      "rating",
      "quantity",
      "urgency",
      "discounting",
      "interference"
    ];
  }

  // H&M Best Sellers
  if (
    isHm &&
    path ===
      "/en_us/women/seasonal-trending/best-sellers.html"
  ) {
    return [
      "wording",
      "discounting"
    ];
  }

  // About You Kleid Cora
  if (
    isAboutYou &&
    path ===
      "/p/guido-maria-kretschmer-women/kleid-cora-28671708"
  ) {
    return [
      "wording",
      "urgency",
      "discounting",
      "interference"
    ];
  }

  // Amazon Home
  if (
    isAmazon &&
    path === "/"
  ) {
    return [
      "wording"
    ];
  }

  // Galaxus Daily Deal
  if (
    isGalaxus &&
    path === "/de/daily-deal"
  ) {
    return [
      "wording",
      "rating",
      "quantity",
      "urgency",
      "discounting",
      "interference"
    ];
  }

  return null;
}

 function getWebsitePageTypeForConsoleMenu(websiteKey) {
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (websiteKey === "amazon") {
    if (
      /\/(dp|gp\/product)\//.test(path) ||
      document.querySelector("#productTitle, #buybox, #ppd")
    ) {
      return "product";
    }

    if (
      path === "/s" ||
      path.startsWith("/s/") ||
      search.includes("k=") ||
      document.querySelector("[data-component-type='s-search-result'], .s-main-slot")
    ) {
      return "listing";
    }

    if (
      path === "/" ||
      path === "" ||
      path.startsWith("/ref=") ||
      document.querySelector("#gw-layout, #gw-card-layout, #desktop-grid, #gw-desktop-herotator")
    ) {
      return "home";
    }

    return "home";
  }

  if (websiteKey === "shein") {
    if (
      path.includes("/pd-") ||
      path.includes("/product-") ||
      document.querySelector(".product-intro, .product-intro__head, .product-intro__info")
    ) {
      return "product";
    }

    if (
      path.includes("/women-") ||
      path.includes("/men-") ||
      path.includes("/kids-") ||
      path.includes("/category") ||
      path.includes("/store") ||
      search.includes("ici=") ||
      document.querySelector(".product-list, .product-card, .goods-list")
    ) {
      return "listing";
    }

    return "home";
  }

  if (websiteKey === "zalando") {
    if (
      path.includes(".html") ||
      document.querySelector("[data-testid='pdp-gallery'], [data-testid='pdp-add-to-cart']")
    ) {
      return "product";
    }

    if (
      path.includes("/catalog/") ||
      path.includes("/clothing/") ||
      path.includes("/shoes/") ||
      path.includes("/sports/") ||
      document.querySelector("[data-testid='product-card'], article")
    ) {
      return "listing";
    }

    return "home";
  }

  if (websiteKey === "asos") {
    if (
      path.includes("/prd/") ||
      document.querySelector("[data-testid='product-page'], #product-add")
    ) {
      return "product";
    }

    if (
      path.includes("/cat/") ||
      path.includes("/search/") ||
      search.includes("q=") ||
      document.querySelector("[data-testid='productTile'], article")
    ) {
      return "listing";
    }

    return "home";
  }

  if (websiteKey === "aliexpress") {
    if (
      path.includes("/item/") ||
      document.querySelector(".product-main, .product-info, #root")
    ) {
      if (path.includes("/item/")) return "product";
    }

    if (
      path.includes("/w/") ||
      path.includes("/category/") ||
      path.includes("/wholesale") ||
      search.includes("searchtext=") ||
      document.querySelector(".search-item-card-wrapper-gallery, .list--gallery")
    ) {
      return "listing";
    }

    return "home";
  }

  if (websiteKey === "aboutyou") {
    if (
      path.includes("/p/") ||
      document.querySelector("[data-testid='pdp'], [data-testid='add-to-basket']")
    ) {
      return "product";
    }

    if (
      path.includes("/c/") ||
      path.includes("/search") ||
      search.includes("term=") ||
      document.querySelector("[data-testid='productTile'], [data-testid='product-tile']")
    ) {
      return "listing";
    }

    return "home";
  }

  if (websiteKey === "hm") {
    if (
      path.includes("/productpage.") ||
      document.querySelector("[data-testid='product-detail'], .product-detail-main")
    ) {
      return "product";
    }

    if (
      path.includes("/ladies/") ||
      path.includes("/men/") ||
      path.includes("/kids/") ||
      path.includes("/home/") ||
      path.includes("/search-results") ||
      search.includes("q=") ||
      document.querySelector(".product-item, .product-listing")
    ) {
      return "listing";
    }

    return "home";
  }

  if (websiteKey === "galaxus") {
    if (
      path.includes("/product/") ||
      document.querySelector("[data-testid='productDetail'], [data-testid='addToCartButton']")
    ) {
      return "product";
    }

    if (
      path.includes("/search") ||
      path.includes("/s") ||
      path.includes("/category") ||
      document.querySelector("[data-testid='productTile'], article")
    ) {
      return "listing";
    }

    return "home";
  }

  return "home";
}

function getWebsiteConsoleToolsKey() {
  const websiteKey = getWebsiteKeyForConsoleMenu();
  if (!websiteKey) return null;

  const pageType = getWebsitePageTypeForConsoleMenu(websiteKey);
  const specificKey = `${websiteKey}:${pageType}`;

  return WEBSITE_CONSOLE_TOOLS[specificKey]
    ? specificKey
    : websiteKey;
}

function filterConsoleMenuItemsForWebsite() {
  const specialAllowedTools =
    getSpecialPageConsoleTools();

  const websiteKey =
    getWebsiteConsoleToolsKey();

  const allowedTools =
    specialAllowedTools ||
    WEBSITE_CONSOLE_TOOLS[websiteKey];

  if (!allowedTools) return;

  const filteredItems = MENU_ITEMS.filter((item) => {
    const toolId = getMenuToolId(item);

    return (
      toolId === "up" ||
      toolId === "down" ||
      allowedTools.includes(toolId)
    );
  });

  MENU_ITEMS.splice(
    0,
    MENU_ITEMS.length,
    ...filteredItems
  );
}

  filterConsoleMenuItemsForWebsite();

  // ── State ───────────────────────────────────────────────────────────────────
  let consoleIcon   = null;
  let startBigCursor = null;
  let root          = null;
  let stage         = null;
  let swapCursor    = null;
  let swapCursorRing = null;
  let swapCursorRingRaf = 0;
  let swapCursorBackdrop = null;
  let swapCursorBackdropRaf = 0;
  let backdrop      = null;

  let items              = [];
  let activeErklarungImg  = null;
  let selectedToolDocks = [];
  let selectedToolDockPointerStart = null;
  let selectedToolDockRaf = 0;
  let selectedToolDockPendingItem = null;

  let sideCursors = { left: null, right: null };
  let sideCursorIcons = { left: null, right: null };
  let sideCursorBackdrops = { left: null, right: null };
  let sideCursorRings = { left: null, right: null };
  let sideCursorRafs = {
    left: { backdrop: 0, ring: 0 },
    right: { backdrop: 0, ring: 0 }
  };
  let sideCursorHovered = { left: false, right: false };
  let sideCursorRemoving = { left: false, right: false };
  let sideCursorImpressumAnimating = false;

  let deleteCursorActive = false; // true wenn _.svg nah am rechten lösch-punkt ist
  let infoCursorActive = false; // true wenn _.svg nah am linken info-punkt ist
  let sideCursorsPinnedOpen = false; // true wenn Klick auf _.svg Info-/Löschpunkt vorne hält
  let sideCursorsDragBouncing = false; // true solange _.svg per Drag verschoben wird

  let menuOpen = false;
  let opening  = false;
  let closing  = false;

  let targetProgress  = 0;
  let currentProgress = 0;
  let snappedIndex    = 0;
  let wheelAccumulated = 0;
  let linesReady      = true;
  let rafId           = null;

  let pointerStart         = null;
  let swapPointerStart     = null;
  let menuItemPointerStart = null; // FIX: Menü-Item-Klick über pointerdown + pointerup

  let menuRestoreChecked = false;

  // ── Aufräumen von alten DOM-Elementen ───────────────────────────────────────
  document.getElementById("__nudge-console-dropdown")?.remove();
  document.getElementById("__nudge-console-dropdown-blocker")?.remove();
  document.getElementById("__nudge-content-dropdown")?.remove();
  document.getElementById("__nudge-content-dropdown-blocker")?.remove();
  document.getElementById(MENU_ID)?.remove();
  document.getElementById("__nudge-tools-wheel-big-cursor")?.remove();
  document.getElementById("__nudge-tools-wheel-active-erklarung")?.remove();
  document.getElementById("__nudge-tools-wheel-active-item-line")?.remove();
  document.getElementById("__nudge-tools-wheel-active-erklarung-line")?.remove();

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getSvgUrl(path) {
    return chrome.runtime.getURL(path);
  }

  function getInactiveSvgPath(activePath) {
    return activePath.replace(".svg", "_.svg");
  }

  // ── Storage ─────────────────────────────────────────────────────────────────
  function getSavedSnappedIndex(saved) {
    const parsed = Number(saved?.snappedIndex);
    return Number.isFinite(parsed)
      ? clamp(Math.round(parsed), 0, MENU_ITEMS.length - 1)
      : 0;
  }

  function saveMenuState(extra = {}) {
    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};
      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          menuOpen, snappedIndex, targetProgress,
          currentProgress, wheelAccumulated, linesReady,
          ...extra
        }
      });
    });
  }

  // ── SVG-Container für Wheel-Linien ──────────────────────────────────────────
  function getLineSvg() {
    let svg = document.getElementById("__nudge-tools-wheel-line-svg");
    if (svg) return svg;

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "__nudge-tools-wheel-line-svg";
 
    Object.assign(svg.style, {
      position:      "fixed",
      left:          "0",
      top:           "0",
      width:         "100vw",
      height:        "100vh",
      pointerEvents: "none",
      zIndex:        NUDGE_LINE_Z_INDEX,
      overflow:      "visible",
      display:       "block",
      visibility:    "visible"
    });

    svg.setAttribute("width", String(window.innerWidth));
    svg.setAttribute("height", String(window.innerHeight));
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    document.documentElement.appendChild(svg);
    return svg;
  }

  const lineSvg = getLineSvg();

  // ── Shadow-Filter ───────────────────────────────────────────────────────────
  function ensureDpShadowFilter(svg) {
    if (document.getElementById("__dp_shadow")) return;

    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.id = "__dp_shadow";
    filter.setAttribute("x", "-300%");
    filter.setAttribute("y", "-300%");
    filter.setAttribute("width",  "800%");
    filter.setAttribute("height", "800%");

    filter.innerHTML = `
      <feDropShadow in="SourceAlpha" dx="0" dy="0"
        stdDeviation="6" flood-color="#000000" flood-opacity="1" result="shadow1"/>
      <feDropShadow in="SourceAlpha" dx="0" dy="0"
        stdDeviation="12" flood-color="#000000" flood-opacity="1" result="shadow2"/>
      <feMerge>
        <feMergeNode in="shadow2"/>
        <feMergeNode in="shadow1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    `;

    defs.appendChild(filter);
  }

  ensureDpShadowFilter(lineSvg);

    // ── ARC-Menü Verbindungslinien (big_cursor → SVG / Erklärung) ──────────────
  function createArcConnectionLineSvg() {
    let svg = document.getElementById("__nudge-tools-wheel-connection-svg");
    if (svg) return svg;

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "__nudge-tools-wheel-connection-svg";

    Object.assign(svg.style, {
      position:      "fixed",
      left:          "0",
      top:           "0",
      width:         "100vw",
      height:        "100vh",
      pointerEvents: "none",
      zIndex:        NUDGE_LINE_Z_INDEX,
      overflow:      "visible",
      display:       "block",
      visibility:    "visible"
    });

    svg.setAttribute("width", String(window.innerWidth));
    svg.setAttribute("height", String(window.innerHeight));
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    document.documentElement.appendChild(svg);
    return svg;
  }

  const arcConnectionLineSvg = createArcConnectionLineSvg();

  function makeArcConnectionLine(id) {
    document.getElementById(id)?.remove();

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.id = id;

    line.setAttribute("stroke",         "white");
    line.setAttribute("stroke-width",   "1");
    line.setAttribute("stroke-opacity", "1");
    line.setAttribute("stroke-linecap", "round");
    line.style.filter = "drop-shadow(0px 0px 3px rgba(0,0,0,1)) drop-shadow(0px 0px 6px rgba(0,0,0,1))";

    line.style.display    = "none";
    line.style.opacity    = "0";
    line.style.visibility = "hidden";

    arcConnectionLineSvg.appendChild(line);
    return line;
  }

  const arcLineToActiveItem = makeArcConnectionLine("__nudge-tools-wheel-line-to-active-item");
  const arcLineToErklarung  = makeArcConnectionLine("__nudge-tools-wheel-line-to-active-erklarung");

  function getArcBigCursorCenter() {
    if (swapCursor) {
      const rect = swapCursor.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top  + rect.height / 2
      };
    }

    return getConsoleCenter();
  }

  function getArcItemLineTarget(itemCenter, itemData) {
    return {
      x: itemCenter.x + MENU_ITEM_SIZE / 2 + (itemData.lineEndOffsetX || 0),
      y: itemCenter.y + (itemData.lineEndOffsetY || 0)
    };
  }

  function getArcErklarungLineTarget(erklarungCenter, itemData) {
    return {
      x: erklarungCenter.x - ERKLARUNG_SIZE / 2 + (itemData.erklarungLineEndOffsetX || 0),
      y: erklarungCenter.y + (itemData.erklarungLineEndOffsetY || 0)
    };
  }

  function showArcConnectionLine(line, fromCenter, toCenter) {
    if (!line || !fromCenter || !toCenter) return;

    const start = pointOnCircleEdge(
      fromCenter,
      toCenter,
      BIG_LINE_RADIUS + FADEN_START_OFFSET
    );

    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));
    line.setAttribute("x2", String(toCenter.x));
    line.setAttribute("y2", String(toCenter.y));

    line.setAttribute("stroke",         "white");
    line.setAttribute("stroke-width",   "1");
    line.setAttribute("stroke-opacity", "1");
    line.setAttribute("stroke-linecap", "round");
    line.style.filter = "drop-shadow(0px 0px 3px rgba(0,0,0,1)) drop-shadow(0px 0px 6px rgba(0,0,0,1))";

    line.style.display    = "block";
    line.style.opacity    = "1";
    line.style.visibility = "visible";
  }

  function hideArcConnectionLine(line) {
    if (!line) return;

    line.style.display    = "none";
    line.style.opacity    = "0";
    line.style.visibility = "hidden";
    line.setAttribute("stroke-opacity", "0");
  }

  function keepSelectedToolDockOutsideBigCursorArea(point) {
  const bigCenter = getStartBigCenter();

  let dx = point.x - bigCenter.x;
  let dy = point.y - bigCenter.y;
  let distance = Math.hypot(dx, dy);

  if (distance >= SELECTED_TOOL_BIG_CURSOR_SAFE_RADIUS) {
    return point;
  }

  if (!distance) {
    dx = -1;
    dy = -1;
    distance = Math.hypot(dx, dy);
  }

  return {
    x: bigCenter.x + (dx / distance) * SELECTED_TOOL_BIG_CURSOR_SAFE_RADIUS,
    y: bigCenter.y + (dy / distance) * SELECTED_TOOL_BIG_CURSOR_SAFE_RADIUS
  };
}

  function getSelectedToolDockDefaultCenter(index = 0) {
    const bigCenter = getStartBigCenter();
    const angle = ((235 + index * TOOL_DOCK_STACK_ANGLE_STEP) * Math.PI) / 180; //default position von _.svg
    const radius = SELECTED_TOOL_BIG_CURSOR_SAFE_RADIUS + TOOL_DOCK_DISTANCE;

    return keepSelectedToolDockOutsideBigCursorArea({
      x: bigCenter.x + Math.cos(angle) * radius,
      y: bigCenter.y + Math.sin(angle) * radius
    });
  }


    function getSideCursorUrl() {
    return chrome.runtime.getURL("cursor/cursor.svg");
  }

  function getSideCursorBigUrl() {
    return chrome.runtime.getURL("cursor/big_cursor_intro.svg");
  }

  function getSideCursorSymbolUrl(side) {
    return chrome.runtime.getURL(side === "left" ? "cursor/i.svg" : "cursor/x.svg");
  }

  function updateSideCursorFrameGap(duration = SIDE_CURSOR_APPEAR_DURATION + 80) {
    window.dispatchEvent(
      new CustomEvent(SIDE_FRAME_GAP_UPDATE_EVENT, {
        detail: { duration }
      })
    );
  }

  function getSideInfoSvgPath(toolId) {
    return SIDE_INFO_SVG_BY_TOOL_ID[toolId] || "menu/impressum.svg";
  }

  function getActiveSideInfoSvgPaths() {
    const paths = [];
    const used = new Set();

    selectedToolDocks.forEach((dock) => {
      if (!dock?.img || !dock.toolId) return;

      const path = getSideInfoSvgPath(dock.toolId);
      if (used.has(path)) return;

      used.add(path);
      paths.push(path);
    });

    return paths.length ? paths : ["menu/impressum.svg"];
  }

  function sideCursorHiddenLeft(side) {
    return side === "left"
      ? -SIDE_CURSOR_SIZE - 2
      : window.innerWidth + 2;
  }

  function sideCursorLeftForRatio(side, visibleRatio) {
    if (side === "left") {
      return -(SIDE_CURSOR_SIZE * (1 - visibleRatio));
    }

    return window.innerWidth - SIDE_CURSOR_SIZE * visibleRatio;
  }

  function sideCursorVisibleLeft(side) {
    return sideCursorLeftForRatio(side, SIDE_CURSOR_REST_VISIBLE_RATIO);
  }

  function sideCursorHoverLeft(side) {
    return sideCursorLeftForRatio(side, SIDE_CURSOR_BOUNCE_VISIBLE_RATIO);
  }

  function sideCursorVisibleTop() {
    return (window.innerHeight - SIDE_CURSOR_SIZE) / 2;
  }

  function sideCursorCenterLeft() {
    return (window.innerWidth - SIDE_CURSOR_SIZE) / 2;
  }

  function sideCursorCenterTop() {
    return (window.innerHeight - SIDE_CURSOR_SIZE) / 2;
  }

  function getSideCursorInnerGeometry(cursor) {
    const isBig = cursor?.dataset?.big === "true";

    if (isBig) {
      return {
        x: 16.17 / 182,
        y: 16.42 / 182,
        w: 151 / 182,
        h: 151 / 182
      };
    }

    return {
      x: 16.24 / 74,
      y: 16.49 / 74,
      w: 42.86 / 74,
      h: 42.86 / 74
    };
  }

  function updateSideCursorBackdropPosition(side) {
    const backdrop = sideCursorBackdrops[side];
    const cursor = sideCursors[side];
    if (!backdrop || !cursor) return;

    const rect = cursor.getBoundingClientRect();
    const g = getSideCursorInnerGeometry(cursor);

    if (!rect.width || !rect.height || cursor.style.opacity === "0") {
      backdrop.style.display = "none";
      return;
    }

    backdrop.style.display = "block";
    backdrop.style.left = `${rect.left + rect.width * g.x}px`;
    backdrop.style.top = `${rect.top + rect.height * g.y}px`;
    backdrop.style.width = `${rect.width * g.w}px`;
    backdrop.style.height = `${rect.height * g.h}px`;
  }

  function updateSideCursorRingPosition(side) {
    const ring = sideCursorRings[side];
    const cursor = sideCursors[side];
    if (!ring || !cursor) return;

    const rect = cursor.getBoundingClientRect();
    const g = getSideCursorInnerGeometry(cursor);

    if (!rect.width || !rect.height || cursor.style.opacity === "0") {
      ring.style.display = "none";
      return;
    }

    ring.style.display = "block";
    ring.style.left = `${rect.left + rect.width * g.x}px`;
    ring.style.top = `${rect.top + rect.height * g.y}px`;
    ring.style.width = `${rect.width * g.w}px`;
    ring.style.height = `${rect.height * g.h}px`;
  }

  function startSideCursorEffects(side) {
    if (!sideCursorBackdrops[side]) {
      const backdrop = document.createElement("div");

      Object.assign(backdrop.style, {
        position: "fixed",
        pointerEvents: "none",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.001)",
        backdropFilter: `blur(${SIDE_CURSOR_BACKDROP_BLUR}px)`,
        WebkitBackdropFilter: `blur(${SIDE_CURSOR_BACKDROP_BLUR}px)`,
        zIndex: SIDE_CURSOR_BACKDROP_Z_INDEX,
        display: "none"
      });

      document.documentElement.appendChild(backdrop);
      sideCursorBackdrops[side] = backdrop;
    }

    if (!sideCursorRings[side]) {
      const ring = document.createElement("div");

      Object.assign(ring.style, {
        position: "fixed",
        pointerEvents: "none",
        border: "1px solid white",
        borderRadius: "9999px",
        boxSizing: "border-box",
        zIndex: SIDE_CURSOR_RING_Z_INDEX,
        display: "none"
      });

      document.documentElement.appendChild(ring);
      sideCursorRings[side] = ring;
    }

    function backdropLoop() {
      updateSideCursorBackdropPosition(side);
      sideCursorRafs[side].backdrop = requestAnimationFrame(backdropLoop);
    }

    function ringLoop() {
      updateSideCursorRingPosition(side);
      sideCursorRafs[side].ring = requestAnimationFrame(ringLoop);
    }

    if (!sideCursorRafs[side].backdrop) backdropLoop();
    if (!sideCursorRafs[side].ring) ringLoop();
  }

  function stopSideCursorEffects(side) {
    if (sideCursorRafs[side].backdrop) {
      cancelAnimationFrame(sideCursorRafs[side].backdrop);
      sideCursorRafs[side].backdrop = 0;
    }

    if (sideCursorRafs[side].ring) {
      cancelAnimationFrame(sideCursorRafs[side].ring);
      sideCursorRafs[side].ring = 0;
    }

    sideCursorBackdrops[side]?.remove();
    sideCursorRings[side]?.remove();

    sideCursorBackdrops[side] = null;
    sideCursorRings[side] = null;
  }

  function setSideCursorIconVisible(side, visible) {
    const icon = sideCursorIcons[side];
    if (!icon) return;

    icon.style.display = "block";
    icon.style.opacity = visible ? "1" : "0";
  }

  function setSideCursorAsSmall(side) {
    const cursor = sideCursors[side];
    if (!cursor) return;

    const base = cursor.querySelector("[data-side-cursor-base]");
    const icon = sideCursorIcons[side];

    if (base) base.src = getSideCursorUrl();
    if (icon) {
      icon.src = getSideCursorSymbolUrl(side);
      icon.style.display = "block";
      icon.style.opacity = sideCursorHovered[side] ? "1" : "0";
    }

    cursor.dataset.big = "false";
    cursor.style.width = `${SIDE_CURSOR_SIZE}px`;
    cursor.style.height = `${SIDE_CURSOR_SIZE}px`;
    cursor.style.transform = "none";
    setSideCursorIconVisible(side, sideCursorHovered[side]);
    cursor.style.transformOrigin = "center center";
    cursor.style.zIndex = SIDE_CURSOR_Z_INDEX;
    }

  function setSideCursorAsBigCenter(side) {
    const cursor = sideCursors[side];
    if (!cursor) return;

    const base = cursor.querySelector("[data-side-cursor-base]");
    const icon = sideCursorIcons[side];

    if (base) base.src = getSideCursorBigUrl();
    if (icon) {
      icon.style.opacity = "0";
      icon.style.display = "none";
    }

    cursor.dataset.big = "true";
    cursor.style.width = `${BIG_SIZE}px`;
    cursor.style.height = `${BIG_SIZE}px`;
    cursor.style.left = `${(window.innerWidth - BIG_SIZE) / 2}px`;
    cursor.style.top = `${(window.innerHeight - BIG_SIZE) / 2}px`;
    cursor.style.zIndex = SIDE_INFO_OPEN_Z_INDEX;
    cursor.style.transformOrigin = "center center";
    cursor.style.transform = "scale(0)";
  }

  function setSideCursorPosition(side) {
    const cursor = sideCursors[side];
    if (!cursor || sideCursorImpressumAnimating || sideCursorRemoving[side]) return;

    const left = sideCursorHovered[side]
      ? sideCursorHoverLeft(side)
      : sideCursorVisibleLeft(side);

    cursor.style.left = `${left}px`;
    cursor.style.top = `${sideCursorVisibleTop()}px`;
    cursor.style.transform = "none";
    cursor.dataset.frameGapClosed = sideCursorHovered[side] ? "true" : "false";
    setSideCursorIconVisible(side, sideCursorHovered[side]);
    updateSideCursorFrameGap(320);
  }

  function pulseSideCursor(side, active) {
    if (!sideCursors[side] || sideCursorImpressumAnimating || sideCursorRemoving[side]) return;

    sideCursorHovered[side] = (sideCursorsPinnedOpen || sideCursorsDragBouncing) ? true : active;

    sideCursors[side].style.transition =
      `left 260ms cubic-bezier(0.22, 1, 0.36, 1), top 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out`;

    setSideCursorPosition(side);
  }

  function setSideCursorsPinnedOpen(active) {
    sideCursorsPinnedOpen = active;

    if (active) {
      ensureSideCursor("left");
      ensureSideCursor("right");
    }

    ["left", "right"].forEach((side) => {
      const cursor = sideCursors[side];
      if (!cursor || sideCursorImpressumAnimating || sideCursorRemoving[side]) return;

      sideCursorHovered[side] = active;

      cursor.style.transition =
        `left 260ms cubic-bezier(0.22, 1, 0.36, 1), top 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out`;

      void cursor.offsetWidth;
    });

    requestAnimationFrame(() => {
      ["left", "right"].forEach((side) => {
        if (!sideCursors[side] || sideCursorImpressumAnimating || sideCursorRemoving[side]) return;

        sideCursorHovered[side] = active;
        setSideCursorPosition(side);
      });
    });
  }

  function setSideCursorsDragBouncing(active) {
    if (sideCursorsDragBouncing === active) return;

    sideCursorsDragBouncing = active;

    if (active) {
      ensureSideCursor("left");
      ensureSideCursor("right");
    }

    ["left", "right"].forEach((side) => {
      const cursor = sideCursors[side];
      if (!cursor || sideCursorImpressumAnimating || sideCursorRemoving[side]) return;

      sideCursorHovered[side] = sideCursorsPinnedOpen || active;

      cursor.style.transition =
        `left 260ms cubic-bezier(0.22, 1, 0.36, 1), top 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out`;

      void cursor.offsetWidth;
    });

    requestAnimationFrame(() => {
      ["left", "right"].forEach((side) => {
        if (!sideCursors[side] || sideCursorImpressumAnimating || sideCursorRemoving[side]) return;

        sideCursorHovered[side] = sideCursorsPinnedOpen || active;
        setSideCursorPosition(side);
      });
    });
  }

  function ensureSideCursor(side) {
    if (sideCursorRemoving[side]) return null;

    if (sideCursors[side]) {
      document.documentElement.appendChild(sideCursors[side]);
      setSideCursorAsSmall(side);
      setSideCursorPosition(side);
      startSideCursorEffects(side);
      return sideCursors[side];
    }

    const cursor = document.createElement("div");
    cursor.id = `__nudge-tools-wheel-side-cursor-${side}`;
    cursor.dataset.big = "false";

    Object.assign(cursor.style, {
      position: "fixed",
      left: `${sideCursorHiddenLeft(side)}px`,
      top: `${sideCursorVisibleTop()}px`,
      width: `${SIDE_CURSOR_SIZE}px`,
      height: `${SIDE_CURSOR_SIZE}px`,
      transform: "none",
      transformOrigin: "center center",
      pointerEvents: "auto",
      userSelect: "none",
      cursor: "pointer",
      touchAction: "none",
      zIndex: SIDE_CURSOR_Z_INDEX,
      opacity: "1",
      WebkitUserDrag: "none",
      transition:
        `left ${SIDE_CURSOR_APPEAR_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SIDE_CURSOR_APPEAR_DURATION}ms ease-out`
    });

    const base = document.createElement("img");
    base.src = getSideCursorUrl();
    base.alt = "";
    base.draggable = false;
    base.setAttribute("data-side-cursor-base", "true");

    Object.assign(base.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      pointerEvents: "none",
      userSelect: "none",
      WebkitUserDrag: "none"
    });

    const icon = document.createElement("img");
    icon.src = getSideCursorSymbolUrl(side);
    icon.alt = "";
    icon.draggable = false;

    Object.assign(icon.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: `${SIDE_CURSOR_SYMBOL_SIZE}px`,
      height: `${SIDE_CURSOR_SYMBOL_SIZE}px`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: "2",
      opacity: "0",
      transition: "opacity 160ms ease-out",
      WebkitUserDrag: "none"
    });

    cursor.appendChild(base);
    cursor.appendChild(icon);

    cursor.addEventListener("pointerenter", () => pulseSideCursor(side, true), true);
    cursor.addEventListener("pointerleave", () => pulseSideCursor(side, false), true);

    if (side === "left") {
      cursor.addEventListener(
        "pointerdown",
        (event) => openImpressumFromSideCursor(side, event),
        true
      );
    } else {
      cursor.addEventListener(
        "pointerdown",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation?.();

          removeLatestSelectedToolDock(true);
        },
        true
      );
    }

    document.documentElement.appendChild(cursor);
    sideCursors[side] = cursor;
    sideCursorIcons[side] = icon;
    startSideCursorEffects(side);

    requestAnimationFrame(() => {
      setSideCursorPosition(side);

      window.setTimeout(() => {
        if (!sideCursors[side] || sideCursorImpressumAnimating) return;

        pulseSideCursor(side, true);

        window.setTimeout(() => {
          if (!sideCursors[side] || sideCursorImpressumAnimating) return;
          if (sideCursors[side].matches?.(":hover")) return;
          if (side === "left" && infoCursorActive) return;
          if (side === "right" && deleteCursorActive) return;

          pulseSideCursor(side, false);
        }, 260);
      }, SIDE_CURSOR_APPEAR_DURATION + 40);
    });

    return cursor;
  }

  function removeSideCursor(side) {
    const cursor = sideCursors[side];
    if (!cursor || sideCursorRemoving[side]) return;

    sideCursorRemoving[side] = true;
    sideCursorHovered[side] = false;

    cursor.style.pointerEvents = "none";
    cursor.style.transition =
      `left ${SIDE_CURSOR_APPEAR_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SIDE_CURSOR_APPEAR_DURATION}ms ease-in`;

    requestAnimationFrame(() => {
      cursor.style.left = `${sideCursorHiddenLeft(side)}px`;
      cursor.style.opacity = "0";
      updateSideCursorFrameGap(SIDE_CURSOR_APPEAR_DURATION + 80);
    });

    window.setTimeout(() => {
      stopSideCursorEffects(side);
      cursor.remove();

      sideCursors[side] = null;
      sideCursorIcons[side] = null;
      sideCursorRemoving[side] = false;
    }, SIDE_CURSOR_APPEAR_DURATION + 40);
  }

  function removeSideCursors() {
    removeSideCursor("left");
    removeSideCursor("right");
    deleteCursorActive = false;
    infoCursorActive = false;
  }

  function hasVisibleSelectedToolDock() {
    return selectedToolDocks.some((dock) => dock?.img);
  }

  function updateSideCursorsVisibility() {
    if (sideCursorImpressumAnimating) return;

    if (hasVisibleSelectedToolDock()) {
      ensureSideCursor("left");
      ensureSideCursor("right");
      return;
    }

    removeSideCursors();
  }

  function updateSideCursorPositions() {
    if (sideCursorImpressumAnimating) return;

    ["left", "right"].forEach((side) => {
      if (!sideCursors[side]) return;
      setSideCursorPosition(side);
    });
  }

  function waitForSideImpressumClick() {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");

      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        zIndex: SIDE_INFO_OPEN_Z_INDEX,
        pointerEvents: "auto",
        background: "transparent",
        cursor: "pointer"
      });

      overlay.addEventListener(
        "pointerdown",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation?.();
          overlay.remove();
          resolve();
        },
        { once: true, capture: true }
      );

      document.documentElement.appendChild(overlay);
    });
  }

  function startSideInfoSvgSequence(infoIcon) {
    const paths = getActiveSideInfoSvgPaths();
    let index = 0;
    let switchTimer = 0;

    infoIcon.src = chrome.runtime.getURL(paths[index]);

    if (paths.length <= 1) {
      return () => {};
    }

    switchTimer = window.setInterval(() => {
      infoIcon.style.opacity = "0";

      window.setTimeout(() => {
        index = (index + 1) % paths.length;
        infoIcon.src = chrome.runtime.getURL(paths[index]);
        infoIcon.style.opacity = "1";
      }, 300);
    }, SIDE_INFO_SWITCH_MS);

    return () => {
      if (switchTimer) {
        window.clearInterval(switchTimer);
        switchTimer = 0;
      }
    };
  }

  async function openImpressumFromSideCursor(side, event) {
    if (side !== "left") return;
    if (sideCursorImpressumAnimating) return;

    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();

    const cursor = ensureSideCursor(side);
    if (!cursor) return;
    document.documentElement.appendChild(cursor);

    sideCursorImpressumAnimating = true;
    deleteCursorActive = false;
    infoCursorActive = false;
    sideCursorHovered[side] = true;
    setSideCursorIconVisible(side, true);
    setSelectedToolDocksBehindSideInfo(true);

    removeSideCursor("right");

    cursor.style.pointerEvents = "none";
    cursor.style.transition =
      `left ${SIDE_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), top ${SIDE_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    requestAnimationFrame(() => {
      cursor.style.left = `${sideCursorCenterLeft()}px`;
      cursor.style.top = `${sideCursorCenterTop()}px`;
    });

    await wait(SIDE_CURSOR_MOVE_DURATION);

    cursor.style.transition = "none";
    setSideCursorAsBigCenter(side);

    const infoIcon = document.createElement("img");
    infoIcon.alt = "";

    Object.assign(infoIcon.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      width: `${SIDE_IMPRESSUM_WIDTH}px`,
      height: "auto",
      transform: "translate(-50%, -50%) scale(0)",
      transformOrigin: "center center",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: SIDE_INFO_OPEN_Z_INDEX,
      opacity: "1",
      transition:
        `transform ${SIDE_IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease-out`,
      WebkitUserDrag: "none"
    });

    document.documentElement.appendChild(infoIcon);

    const stopSequence = startSideInfoSvgSequence(infoIcon);

    void cursor.offsetWidth;
    void infoIcon.offsetWidth;

    requestAnimationFrame(() => {
      cursor.style.transition =
        `transform ${SIDE_IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      infoIcon.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.transform = `scale(${SIDE_IMPRESSUM_CURSOR_SCALE})`;
    });

    await wait(SIDE_IMPRESSUM_SCALE_DURATION);
    await waitForSideImpressumClick();

    stopSequence();

    cursor.style.transition =
      `transform ${SIDE_IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    infoIcon.style.transition =
      `transform ${SIDE_IMPRESSUM_SCALE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease-out`;

    cursor.style.transform = `scale(${SIDE_CURSOR_SIZE / BIG_SIZE})`;
    infoIcon.style.transform = "translate(-50%, -50%) scale(0)";

    await wait(SIDE_IMPRESSUM_SCALE_DURATION);

    infoIcon.remove();

    setSideCursorAsSmall(side);
    cursor.style.left = `${sideCursorCenterLeft()}px`;
    cursor.style.top = `${sideCursorCenterTop()}px`;
    cursor.style.pointerEvents = "none";

    void cursor.offsetWidth;

    cursor.style.transition =
      `left ${SIDE_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), top ${SIDE_CURSOR_MOVE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    requestAnimationFrame(() => {
      cursor.style.left = `${sideCursorVisibleLeft(side)}px`;
      cursor.style.top = `${sideCursorVisibleTop()}px`;
      cursor.style.transform = "none";
    });

    await wait(SIDE_CURSOR_MOVE_DURATION);

    cursor.style.transition = "none";
    cursor.style.pointerEvents = "auto";
    cursor.style.cursor = "pointer";

    setSelectedToolDocksBehindSideInfo(false);

    sideCursorImpressumAnimating = false;
    updateSideCursorsVisibility();
  }

  function getSideCursorDistance(side, dockRect) {
    const cursor = sideCursors[side];

    if (!cursor || !dockRect) {
      return Infinity;
    }

    const cursorRect = cursor.getBoundingClientRect();

    const cursorCenterX = cursorRect.left + cursorRect.width / 2;
    const cursorCenterY = cursorRect.top + cursorRect.height / 2;

    const dockCenterX = dockRect.left + dockRect.width / 2;
    const dockCenterY = dockRect.top + dockRect.height / 2;

    return Math.hypot(
      dockCenterX - cursorCenterX,
      dockCenterY - cursorCenterY
    );
  }

  function checkDeleteProximity(dockRect) {
    if (!dockRect || sideCursorImpressumAnimating) {
      deleteCursorActive = false;
      infoCursorActive = false;
      pulseSideCursor("right", false);
      pulseSideCursor("left", false);
      return;
    }

    deleteCursorActive =
      getSideCursorDistance("right", dockRect) <= SIDE_CURSOR_DELETE_TRIGGER_RADIUS;

    infoCursorActive =
      getSideCursorDistance("left", dockRect) <= SIDE_CURSOR_DELETE_TRIGGER_RADIUS;

    pulseSideCursor("right", deleteCursorActive);
    pulseSideCursor("left", infoCursorActive);
  }



function getSelectedToolDockByToolId(toolId) {
    return selectedToolDocks.find((dock) => dock.toolId === toolId) || null;
  }

  function getSelectedToolDockByImg(img) {
    return selectedToolDocks.find((dock) => dock.img === img) || null;
  }

  function deactivateAndRemoveToolDock(toolId, animate = true) {
    if (!toolId) return false;

    activeModuleIds = activeModuleIds.filter((id) => id !== toolId);
    syncActiveModuleId();

    dispatchModuleDeactivate(toolId);
    removeActiveToolDock(toolId, animate);

    deleteCursorActive = false;
    infoCursorActive = false;

    updateSideCursorsVisibility();
        window.dispatchEvent(
        new CustomEvent(RETURN_CONSOLE_HOME_EVENT, {
        detail: { expand: true }
      })
    );

    return true;
  }

  function removeLatestSelectedToolDock(animate = true) {
    const dock = [...selectedToolDocks].reverse().find((item) => item?.img);
    return deactivateAndRemoveToolDock(dock?.toolId || activeModuleId, animate);
  }

  function setSelectedToolDocksBehindSideInfo(active) {
    if (lineSvg) {
      lineSvg.style.zIndex = active ? "2147483639" : NUDGE_LINE_Z_INDEX;
    }

    selectedToolDocks.forEach((dock) => {
      if (dock?.img) {
        dock.img.style.zIndex = active ? "2147483640" : NUDGE_UI_Z_INDEX;
      }

      if (dock?.line) {
        dock.line.style.opacity = "1";
        dock.line.style.visibility = "visible";
      }
    });

    keepCursorAndThreadsInFront();
  }

  function saveSelectedToolDocksState() {
    const docks = selectedToolDocks
      .filter((dock) => dock.img)
      .map((dock) => ({
        x: parseFloat(dock.img.style.left) || 0,
        y: parseFloat(dock.img.style.top) || 0,
        svg: dock.svg || dock.img.dataset.svg || "",
        toolId: dock.toolId || dock.img.dataset.toolId || ""
      }));

    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};

      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          selectedToolDocks: docks,
          selectedToolDock: docks[0]
            ? { ...docks[0], active: true }
            : { active: false }
        }
      });
    });
  }

  function removeDockObject(dock, animate = false) {
    if (!dock) return;

    if (dock.line) {
      dock.line.remove();
      dock.line = null;
    }

    if (!dock.img) return;

    const img = dock.img;
    dock.img = null;

    if (animate) {
      img.style.transition = "opacity 300ms ease-out, transform 300ms ease-out";
      img.style.opacity = "0";
      img.style.transform = "translate(-50%, -50%) scale(0)";
      window.setTimeout(() => img.remove(), 320);
      return;
    }

    img.remove();
  }

  function removeActiveToolDock(toolId, animate = false) {
    const dock = getSelectedToolDockByToolId(toolId);
    if (!dock) return;

    removeDockObject(dock, animate);
    selectedToolDocks = selectedToolDocks.filter((item) => item !== dock);

    if (!selectedToolDocks.length && selectedToolDockRaf) {
      cancelAnimationFrame(selectedToolDockRaf);
      selectedToolDockRaf = 0;
    }

    if (selectedToolDockPointerStart?.dock === dock) {
      selectedToolDockPointerStart = null;
    }

    saveSelectedToolDocksState();
    updateSideCursorsVisibility();
  }

  function removeSelectedToolDock(animate = false) {
    if (selectedToolDockRaf) {
      cancelAnimationFrame(selectedToolDockRaf);
      selectedToolDockRaf = 0;
    }

    selectedToolDockPointerStart = null;
    selectedToolDockPendingItem = null;

    selectedToolDocks.forEach((dock) => removeDockObject(dock, animate));
    selectedToolDocks = [];

    saveSelectedToolDocksState();
    updateSideCursorsVisibility();
  }

  function updateSelectedToolDockLine(dockToUpdate = null) {
    if (!startBigCursor) return;

    const docks = dockToUpdate ? [dockToUpdate] : selectedToolDocks;

    docks.forEach((dock) => {
      if (!dock?.img || !dock?.line) return;

      const imgRect = dock.img.getBoundingClientRect();

      const imgCenter = {
        x: imgRect.left + imgRect.width / 2,
        y: imgRect.top + imgRect.height / 2
      };

      const bigCenter = getStartBigCenter();

      const start = pointOnCircleEdge(
        bigCenter,
        imgCenter,
        BIG_LINE_RADIUS + FADEN_START_OFFSET
      );

      const end = {
        x: imgRect.left + imgRect.width / 2 + SELECTED_TOOL_LINE_END_OFFSET_X,
        y: imgRect.top + imgRect.height + SELECTED_TOOL_LINE_END_OFFSET_Y
      };

      dock.line.setAttribute("x1", String(start.x));
      dock.line.setAttribute("y1", String(start.y));
      dock.line.setAttribute("x2", String(end.x));
      dock.line.setAttribute("y2", String(end.y));
    });
  }

  function startSelectedToolDockLineLoop() {
    if (selectedToolDockRaf) return;

    function loop() {
      updateSelectedToolDockLine();
      selectedToolDockRaf = requestAnimationFrame(loop);
    }

    loop();
  }

  function buildSelectedToolDockLine(dock) {
    if (!dock?.img) return;

    if (dock.line) dock.line.remove();

    dock.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dock.line.id = `__nudge-selected-tool-dock-line-${dock.toolId}`;

    dock.line.setAttribute("stroke", "white");
    dock.line.setAttribute("stroke-width", "1.5");
    dock.line.setAttribute("stroke-opacity", "1");
    dock.line.setAttribute("stroke-linecap", "round");
    dock.line.setAttribute("filter", "url(#__dp_shadow)");

    dock.line.style.display = "block";
    dock.line.style.opacity = "1";
    dock.line.style.visibility = "visible";

    lineSvg.appendChild(dock.line);

    updateSelectedToolDockLine(dock);

    const length = dock.line.getTotalLength();

    dock.line.setAttribute("stroke-dasharray", String(length));
    dock.line.setAttribute("stroke-dashoffset", String(length));

    requestAnimationFrame(() => {
      if (!dock.line) return;

      dock.line.style.transition = "stroke-dashoffset 420ms ease-out";
      dock.line.setAttribute("stroke-dashoffset", "0");

      window.setTimeout(() => {
        if (!dock.line) return;

        dock.line.style.transition = "none";
        dock.line.removeAttribute("stroke-dasharray");
        dock.line.removeAttribute("stroke-dashoffset");
      }, 440);
    });

    startSelectedToolDockLineLoop();
  }

  function createSelectedToolDockImg(item, center, animate = true) {
    const toolId = getMenuToolId(item);

    removeActiveToolDock(toolId, false);

    const dock = {
      toolId,
      svg: item.svg,
      img: null,
      line: null
    };

    const img = document.createElement("img");
    img.id = `__nudge-selected-tool-dock-img-${toolId}`;
    img.src = getSvgUrl("cursor/_" + toolId + ".svg");
    img.dataset.svg = item.svg;
    img.dataset.toolId = toolId;
    img.alt = "";
    img.draggable = false;

    Object.assign(img.style, {
      position: "fixed",
      left: `${center.x}px`,
      top: `${center.y}px`,
      width: `${MENU_ITEM_SIZE}px`,
      height: `${MENU_ITEM_SIZE}px`,
      transform: animate
        ? "translate(-50%, -50%) scale(0)"
        : "translate(-50%, -50%) scale(1)",
      transformOrigin: "center center",
      pointerEvents: "auto",
      userSelect: "none",
      cursor: "grab",
      touchAction: "none",
      zIndex: NUDGE_UI_Z_INDEX,
      opacity: "1",
      WebkitUserDrag: "none",
      transition: animate
        ? "transform 300ms ease-out"
        : "none"
    });

    img.addEventListener("pointerdown", onSelectedToolDockPointerDown, true);

    dock.img = img;
    selectedToolDocks.push(dock);

    document.documentElement.appendChild(img);
    updateSideCursorsVisibility();

    if (animate) {
      requestAnimationFrame(() => {
        if (!dock.img) return;
        dock.img.style.transform = "translate(-50%, -50%) scale(1)";
      });

      window.setTimeout(() => {
        if (!dock.img) return;
        dock.img.style.transition = "none";
        buildSelectedToolDockLine(dock);
        saveSelectedToolDocksState();
      }, 320);
    } else {
      buildSelectedToolDockLine(dock);
      saveSelectedToolDocksState();
    }
  }

  function getSavedSelectedToolDockCenter(toolId, index = 0) {
    return new Promise((resolve) => {
      const fallback = getSelectedToolDockDefaultCenter(index);

      chrome.storage.local.get([POSITION_KEY], (result) => {
        const saved = result[POSITION_KEY] || {};
        const docks = Array.isArray(saved.selectedToolDocks)
          ? saved.selectedToolDocks
          : (saved.selectedToolDock?.active ? [saved.selectedToolDock] : []);

        const dock = docks.find((item) => item.toolId === toolId) || {};

        const x = Number(dock.x);
        const y = Number(dock.y);

        if (Number.isFinite(x) && Number.isFinite(y)) {
          resolve({ x, y });
          return;
        }

        resolve(fallback);
      });
    });
  }

  async function showSelectedToolDockAfterMenuClose() {
    const item = selectedToolDockPendingItem;
    selectedToolDockPendingItem = null;

    if (!item) return;

    const toolId = getMenuToolId(item);

    if (!activeModuleIds.includes(toolId)) {
      removeActiveToolDock(toolId, true);
      return;
    }

    const center = await getSavedSelectedToolDockCenter(toolId, selectedToolDocks.length);
    createSelectedToolDockImg(item, center, true);
  }

  function restoreSelectedToolDockFromStorage() {
    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};
      const docks = Array.isArray(saved.selectedToolDocks)
        ? saved.selectedToolDocks
        : (saved.selectedToolDock?.active ? [saved.selectedToolDock] : []);

      docks.slice(0, MAX_ACTIVE_TOOLS).forEach((dock, index) => {
        if (!dock.svg || !dock.toolId) return;

                const toolIsAllowed = MENU_ITEMS.some((item) => {
          return getMenuToolId(item) === dock.toolId;
        });

        if (!toolIsAllowed) return;

        const x = Number(dock.x);
        const y = Number(dock.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) return;

        if (!activeModuleIds.includes(dock.toolId)) {
          activeModuleIds.push(dock.toolId);
          dispatchModuleActivate(dock.toolId);
        }

        createSelectedToolDockImg(
          { svg: dock.svg },
          { x, y },
          index === 0
        );
      });

      activeModuleIds = activeModuleIds.slice(0, MAX_ACTIVE_TOOLS);
      syncActiveModuleId();
    });
  }

function onSelectedToolDockPointerDown(event) {
  if (event.button !== undefined && event.button !== 0) return;

  const bigRect = startBigCursor?.getBoundingClientRect();

  const bigCursorIsCollapsed =
    bigRect &&
    bigRect.top > window.innerHeight - BIG_SIZE / 2 + 10;

  const pointerIsOnVisibleBigCursor =
    bigRect &&
    event.clientX >= bigRect.left &&
    event.clientX <= bigRect.right &&
    event.clientY >= Math.max(bigRect.top, 0) &&
    event.clientY <= Math.min(bigRect.bottom, window.innerHeight);

  if (bigCursorIsCollapsed && pointerIsOnVisibleBigCursor) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    window.dispatchEvent(
      new CustomEvent(RETURN_CONSOLE_HOME_EVENT, {
        detail: { expand: true }
      })
    );

    return;
  }

  const dock = getSelectedToolDockByImg(event.currentTarget);
    if (!dock?.img) return;

    event.preventDefault();
    event.stopPropagation();

    showMenuBackdrop();
    document.documentElement.classList.add("nudge-tools-scroll-locked");
    document.body?.classList.add("nudge-tools-scroll-locked");

    dock.img.style.transition = "none";

    selectedToolDockPointerStart = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
      startLeft: parseFloat(dock.img.style.left) || 0,
      startTop: parseFloat(dock.img.style.top) || 0,
      dock
    };

    dock.img.setPointerCapture?.(event.pointerId);
    dock.img.style.cursor = "grabbing";

    updateSideCursorsVisibility();
    checkDeleteProximity(dock.img.getBoundingClientRect());
  }

  // ── Wheel-Linien ────────────────────────────────────────────────────────────
 

  // ── CSS ─────────────────────────────────────────────────────────────────────
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .nudge-tools-scroll-locked {
        overflow: hidden !important;
      }

      #${BACKDROP_ID} {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: ${Number(MENU_Z_INDEX) - 2};
        pointer-events: auto;
        background: transparent;
        display: block;
        cursor: none !important;
      }

      #${MENU_ID} {
        position: fixed;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        z-index: ${MENU_Z_INDEX};
        pointer-events: none;
        overflow: visible;
        --nudge-tools-radius: ${MENU_RADIUS}px;
      }

      #${MENU_ID} .nudge-tools-wheel__stage {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        pointer-events: none;
        overflow: visible;
      }

      #${MENU_ID} .nudge-tools-wheel__item {
        position: absolute;
        left: 0;
        top: 0;
        width: ${MENU_ITEM_SIZE}px;
        height: ${MENU_ITEM_SIZE}px;
        display: block;
        transform-origin: center center;
        pointer-events: auto;
        user-select: none;
        text-decoration: none;
        will-change: transform, opacity;
        z-index: ${MENU_Z_INDEX};
        transition:
          transform 180ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity 120ms ease-out;
      }

      /* FIX: Menü-SVGs selbst klickbar machen wie console.svg */
      #${MENU_ID} .nudge-tools-wheel__svg {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        pointer-events: auto;
        user-select: none;
        touch-action: none;
        cursor: pointer;
        -webkit-user-drag: none;
      }
    `;
    document.documentElement.appendChild(style);
  }

  // ── Menü-Aktion auslösen ────────────────────────────────────────────────────
  function getMenuToolId(item) {
    return String(item.svg || "").split("/").pop().replace(".svg", "");
  }
  function isSelectableToolItem(item) {
    const toolId = getMenuToolId(item);
    return toolId !== "up" && toolId !== "down";
  }

  function dispatchMenuToolEvent(item, index) {
    window.dispatchEvent(
      new CustomEvent(MENU_TOOL_EVENT, {
        detail: { toolId: getMenuToolId(item), label: item.label, href: item.href, index }
      })
    );
    return true;
  }

  function triggerMenuAction(item, index) {
    if (!isSelectableToolItem(item)) return false;

    dispatchMenuToolEvent(item, index);

    const toolId = getMenuToolId(item);
    selectedToolDockPendingItem = activeModuleIds.includes(toolId) ? item : null;

    return true;
  }

  // ── Menü-Geometrie ──────────────────────────────────────────────────────────
  function getRadius() {
    if (!root) return MENU_RADIUS;
    const value  = getComputedStyle(root).getPropertyValue("--nudge-tools-radius").trim();
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : MENU_RADIUS;
  }

  function getMenuBoundsRadius() {
    return getRadius() + MENU_ITEM_SIZE / 2;
  }

  function getConsoleCenter() {
    if (!consoleIcon) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = consoleIcon.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function getStartBigCenter() {
    if (!startBigCursor) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = startBigCursor.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function getSafeCenter(point) {
    const r    = getMenuBoundsRadius();
    const minX = r;
    const maxX = window.innerWidth  - r;
    const minY = r;
    const maxY = window.innerHeight - r;
    return {
      x: minX > maxX ? window.innerWidth  / 2 : clamp(point.x, minX, maxX),
      y: minY > maxY ? window.innerHeight / 2 : clamp(point.y, minY, maxY)
    };
  }

  // ── console.svg bewegen ─────────────────────────────────────────────────────
  function moveConsoleToCenter(point, animate = false) {
    if (!consoleIcon) return;

    consoleIcon.style.transition = animate
      ? "left 400ms ease-in-out, top 400ms ease-in-out"
      : "none";

    consoleIcon.style.left = `${point.x}px`;
    consoleIcon.style.top  = `${point.y}px`;

    if (animate) {
      window.setTimeout(() => {
        if (consoleIcon) consoleIcon.style.transition = "none";
      }, 420);
    }

    updateSwapCursorPosition();
    updateExistingConsoleLine(menuOpen || Boolean(swapCursor));
  }

  function saveConsolePosition(point) {
    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};
      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          console: { x: point.x, y: point.y },
          consoleManual: true,
          menuOpen, snappedIndex, targetProgress,
          currentProgress, wheelAccumulated, linesReady
        }
      });
    });
  }

  function clampConsoleForOpenMenu() {
    if (!menuOpen || !consoleIcon) return;
    const current = getConsoleCenter();
    const safe    = getSafeCenter(current);
    if (Math.abs(current.x - safe.x) > 0.5 || Math.abs(current.y - safe.y) > 0.5) {
      moveConsoleToCenter(safe, false);
    }
  }

  // ── Verbindungslinien (Arc-Menü ↔ big_cursor) ───────────────────────────────
  function pointOnCircleEdge(center, target, radius) {
    const dx  = target.x - center.x;
    const dy  = target.y - center.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: center.x + (dx / len) * radius,
      y: center.y + (dy / len) * radius
    };
  }

  function updateExistingConsoleLine(useSwapAnchor) {
    const line = document.getElementById("__nudge-start-menu-line-console");
    if (!line || !consoleIcon) return;

    const menuCenter  = getConsoleCenter();
    const startCenter = getStartBigCenter();
    const start       = pointOnCircleEdge(startCenter, menuCenter, BIG_LINE_RADIUS + FADEN_START_OFFSET);

    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));

    if (useSwapAnchor && swapCursor) {
      const end = pointOnCircleEdge(menuCenter, startCenter, BIG_LINE_RADIUS);
      line.setAttribute("x2", String(end.x));
      line.setAttribute("y2", String(end.y));
      return;
    }

    line.setAttribute("x2", String(menuCenter.x + CONSOLE_LINE_ANCHOR_OFFSET_X));
    line.setAttribute("y2", String(menuCenter.y + CONSOLE_LINE_ANCHOR_OFFSET_Y));
  }

  // ── Backdrop (Seite blockieren während Menü offen) ──────────────────────────
  function blockBackgroundEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
  }

  function showMenuBackdrop() {
    if (backdrop && backdrop.isConnected) return;
    document.getElementById(BACKDROP_ID)?.remove();

    backdrop = document.createElement("div");
    backdrop.id = BACKDROP_ID;

    ["pointerdown","pointerup","mousedown","mouseup","click",
     "dblclick","contextmenu","wheel","touchstart","touchmove","touchend"
    ].forEach((type) => {
      backdrop.addEventListener(type, blockBackgroundEvent, { capture: true, passive: false });
    });

    document.documentElement.appendChild(backdrop);
  }

  function hideMenuBackdrop() {
    document.getElementById(BACKDROP_ID)?.remove();
    backdrop = null;
  }

  // ── Menü-Items erstellen ────────────────────────────────────────────────────
  function onMenuItemPointerDown(event, item, index) {
    if (event.button !== undefined && event.button !== 0) return;
    if (!menuOpen || closing) return;
    if (index !== snappedIndex) return; // nur eingerastetes Item

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    menuItemPointerStart = {
      pointerId: event.pointerId,
      x:         event.clientX,
      y:         event.clientY,
      moved:     false,
      item,
      index,
      element:   event.currentTarget
    };

    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch (_) {}
  }

  function createMenuItem(item, index) {
    const link = document.createElement("a");
    link.className = "nudge-tools-wheel__item";
    link.href      = item.href || "#";
    link.dataset.index   = String(index);
    link.dataset.visible = "false";
    link.setAttribute("aria-label", item.label || `Tool ${index + 1}`);

    const img = document.createElement("img");
    img.className = "nudge-tools-wheel__svg";
    img.src       = getSvgUrl(item.svg);
    img.alt       = "";
    img.draggable = false;
    img.setAttribute("aria-hidden", "true");

    // FIX: SVG erhält echte Pointer-Events damit es klickbar ist
    Object.assign(img.style, {
      pointerEvents: "auto",
      cursor:        "pointer",
      touchAction:   "none"
    });

    link.appendChild(img);

    // FIX: pointerdown/pointerup-Ablauf wie bei console.svg
    img.addEventListener(
      "pointerdown",
      (event) => { onMenuItemPointerDown(event, item, index); },
      true
    );

    // Kein href/#-Sprung nach dem Pointer-Klick
    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
      },
      true
    );

    return link;
  }

  // ── Menü aufbauen ───────────────────────────────────────────────────────────
  function buildMenu() {
    if (document.getElementById(MENU_ID)) return;

    root = document.createElement("nav");
    root.id        = MENU_ID;
    root.className = "nudge-tools-wheel";
    root.setAttribute("aria-label", "Nudge tools navigation");
    root.style.setProperty("--nudge-tools-radius", `${MENU_RADIUS}px`);

    stage = document.createElement("div");
    stage.className = "nudge-tools-wheel__stage";

    items = MENU_ITEMS.map(createMenuItem);

    activeErklarungImg = document.createElement("img");
    activeErklarungImg.id       = "__nudge-tools-wheel-active-erklarung";
    activeErklarungImg.alt      = "";
    activeErklarungImg.draggable = false;
    activeErklarungImg.onerror  = () => { console.warn("[Nudge] erklarung.svg konnte nicht geladen werden"); };

    Object.assign(activeErklarungImg.style, {
      position:        "fixed",
      left:            "0px",
      top:             "0px",
      width:           `${ERKLARUNG_SIZE}px`,
      height:          `${ERKLARUNG_SIZE}px`,
      transform:       "translate(-50%, -50%) scale(1)",
      transformOrigin: "center center",
      pointerEvents:   "none",
      userSelect:      "none",
      zIndex:          "2147483646",
      display:         "none",
      opacity:         "0",
      visibility:      "hidden",
      WebkitUserDrag:  "none"
    });

    document.documentElement.appendChild(activeErklarungImg);

    stage.append(...items);
    root.appendChild(stage);
    document.documentElement.appendChild(root);
  }

  function removeMenuLines() {
    activeErklarungImg?.remove();
    activeErklarungImg = null;
  }

  // ── Scrollen im Menü ────────────────────────────────────────────────────────
  function scrollBy(deltaY) {
    const maxProgress   = MENU_ITEMS.length - 1;
    const stepThreshold = 90;

    wheelAccumulated += deltaY;
    if (Math.abs(wheelAccumulated) < stepThreshold) return;

    const direction = wheelAccumulated > 0 ? 1 : -1;
    wheelAccumulated = 0;

    const nextIndex = clamp(snappedIndex + direction, 0, maxProgress);
    if (nextIndex === snappedIndex) return;

    snappedIndex    = nextIndex;
    targetProgress  = snappedIndex;
    linesReady      = false;

    saveMenuState({
      menuOpen: true, snappedIndex, targetProgress,
      currentProgress: targetProgress, wheelAccumulated, linesReady
    });
  }

  // ── Swap-Cursor (ersetzt console.svg wenn Menü offen) ───────────────────────
  function updateSwapCursorPosition() {
    if (!swapCursor) return;
    const center = getConsoleCenter();
    swapCursor.style.left = `${center.x}px`;
    swapCursor.style.top  = `${center.y}px`;
    updateSwapCursorRingPosition();
  }

  function updateSwapCursorRingPosition() {
    if (!swapCursorRing || !swapCursor) return;

    const rect = swapCursor.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      swapCursorRing.style.display = "none";
      return;
    }

    swapCursorRing.style.display = "block";
    swapCursorRing.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
    swapCursorRing.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
    swapCursorRing.style.width  = `${rect.width  * (151 / 182)}px`;
    swapCursorRing.style.height = `${rect.height * (151 / 182)}px`;
  }

  function updateSwapCursorBackdropPosition() {
    if (!swapCursorBackdrop || !swapCursor) return;

    const rect = swapCursor.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      swapCursorBackdrop.style.display = "none";
      return;
    }

    swapCursorBackdrop.style.display = "block";
    swapCursorBackdrop.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
    swapCursorBackdrop.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
    swapCursorBackdrop.style.width  = `${rect.width  * (151 / 182)}px`;
    swapCursorBackdrop.style.height = `${rect.height * (151 / 182)}px`;
  }

  function startSwapCursorBackdrop() {
    if (swapCursorBackdrop) return;

    swapCursorBackdrop = document.createElement("div");

    Object.assign(swapCursorBackdrop.style, {
      position:              "fixed",
      pointerEvents:         "none",
      borderRadius:          "9999px",
      background:            "rgba(255,255,255,0.001)",
      backdropFilter:        "blur(12px)",
      WebkitBackdropFilter:  "blur(12px)",
      zIndex:                String(Number(SWAP_CURSOR_Z_INDEX) - 2),
      display:               "none"
    });

    document.documentElement.appendChild(swapCursorBackdrop);

    function loop() {
      updateSwapCursorBackdropPosition();
      swapCursorBackdropRaf = requestAnimationFrame(loop);
    }

    loop();
  }

  function removeSwapCursorBackdrop() {
    if (swapCursorBackdropRaf) {
      cancelAnimationFrame(swapCursorBackdropRaf);
      swapCursorBackdropRaf = 0;
    }

    swapCursorBackdrop?.remove();
    swapCursorBackdrop = null;
  }

  function startSwapCursorRing() {
    if (swapCursorRing) return;

    swapCursorRing = document.createElement("div");

    Object.assign(swapCursorRing.style, {
      position:      "fixed",
      pointerEvents: "none",
      border:        "1px solid white",
      borderRadius:  "9999px",
      boxShadow:     "0 0 3px rgba(0, 0, 0, 0), 0 0 0.5px rgba(255, 255, 255, 0)",
      boxSizing:     "border-box",
      zIndex:        String(Number(SWAP_CURSOR_Z_INDEX) + 1),
      display:       "none"
    });

    document.documentElement.appendChild(swapCursorRing);

    function loop() {
      updateSwapCursorRingPosition();
      swapCursorRingRaf = requestAnimationFrame(loop);
    }

    loop();
  }

  function removeSwapCursorRing() {
    if (swapCursorRingRaf) {
      cancelAnimationFrame(swapCursorRingRaf);
      swapCursorRingRaf = 0;
    }

    swapCursorRing?.remove();
    swapCursorRing = null;
  }

  function createSwapCursor() {
    if (swapCursor) return swapCursor;

    const center = getConsoleCenter();

    swapCursor = document.createElement("img");
    swapCursor.id  = "__nudge-tools-wheel-big-cursor";
    swapCursor.src = chrome.runtime.getURL("cursor/big_cursor_intro.svg");
    swapCursor.alt = "";

    Object.assign(swapCursor.style, {
      position:        "fixed",
      left:            `${center.x}px`,
      top:             `${center.y}px`,
      width:           `${BIG_SIZE}px`,
      height:          `${BIG_SIZE}px`,
      transform:       "translate(-50%, -50%) scale(0)",
      transformOrigin: "center center",
      pointerEvents:   "auto",
      userSelect:      "none",
      cursor:          "grab",
      zIndex:          SWAP_CURSOR_Z_INDEX,
      touchAction:     "none",
      WebkitUserDrag:  "none"
    });

    swapCursor.addEventListener("pointerdown", onSwapPointerDown, true);
  document.documentElement.appendChild(swapCursor);
  startSwapCursorBackdrop();
  startSwapCursorRing();
  return swapCursor;
  }

  async function animateConsoleToSwapCursor() {
    if (!consoleIcon) return;

    consoleIcon.style.transition = "transform 300ms ease-in-out";
    consoleIcon.style.transform  = "translate(-50%, -50%) scale(0)";

    await wait(300);

    createSwapCursor();
    updateExistingConsoleLine(true);

    void swapCursor.offsetWidth;

    requestAnimationFrame(() => {
      swapCursor.style.transition = "transform 300ms ease-out";
      swapCursor.style.transform  = "translate(-50%, -50%) scale(1)";
    });

    await wait(300);

    swapCursor.style.transition = "none";
    swapCursor.style.transform  = "translate(-50%, -50%) scale(1)";
  }

  async function animateSwapCursorBackToConsole() {
    if (swapCursor) {
      swapCursor.style.transition = "transform 300ms ease-in";
      swapCursor.style.transform  = "translate(-50%, -50%) scale(0)";
      await wait(300);
      removeSwapCursorRing();
      removeSwapCursorBackdrop();
      swapCursor.remove();
      swapCursor = null;
    }

    if (consoleIcon) {
      consoleIcon.style.transition = "transform 300ms ease-out";
      consoleIcon.style.transform  = "translate(-50%, -50%) scale(1)";
      await wait(300);
      consoleIcon.style.transition = "none";
      consoleIcon.style.transform  = "translate(-50%, -50%) scale(1)";
    }

    updateExistingConsoleLine(false);
  }

  // ── Render-Loop (Arc-Menü) ──────────────────────────────────────────────────
  function render() {
    if (!root || !items.length) {
      rafId = window.requestAnimationFrame(render);
      return;
    }

    clampConsoleForOpenMenu();
    updateSwapCursorPosition();
    updateExistingConsoleLine(true);

    lineSvg.setAttribute("width", String(window.innerWidth));
    lineSvg.setAttribute("height", String(window.innerHeight));
    lineSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    const center = getConsoleCenter();
    root.style.left = `${center.x}px`;
    root.style.top  = `${center.y}px`;

    arcConnectionLineSvg.setAttribute("width", String(window.innerWidth));
    arcConnectionLineSvg.setAttribute("height", String(window.innerHeight));
    arcConnectionLineSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    currentProgress += (targetProgress - currentProgress) * CONFIG.smoothing;

    if (Math.abs(currentProgress - targetProgress) < 0.04) {
      currentProgress = targetProgress;
      linesReady      = true;
    }

    const radius      = getRadius();
    const halfVisible = Math.floor(CONFIG.visibleItems / 2);
    const fullStep    = CONFIG.itemAngleStep;

    let activeItemCenter      = null;
    let activeErklarungCenter = null;
    let activeErklarungPath   = null;

    if (activeErklarungImg) {
      activeErklarungImg.style.display    = "none";
      activeErklarungImg.style.opacity    = "0";
      activeErklarungImg.style.visibility = "hidden";
    }

    items.forEach((item, index) => {
      const relativeIndex = index - currentProgress;
      const isVisible     = Math.abs(relativeIndex) <= halfVisible + 0.15;

      if (!isVisible) {
        item.dataset.visible   = "false";
        item.style.opacity     = "0";
        item.style.visibility  = "hidden";
        item.style.pointerEvents = "none";
        return;
      }

      const angle   = CONFIG.visibleCenterAngle - relativeIndex * fullStep;
      const radians = (angle * Math.PI) / 180;

      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;

      const itemCenter      = { x: center.x + x,  y: center.y + y  };
      const erklarungCenter = { x: center.x - Math.cos(radians) * ERKLARUNG_RADIUS,
                                y: center.y - Math.sin(radians) * ERKLARUNG_RADIUS };

      item.dataset.visible   = "true";
      item.style.opacity     = "1";
      item.style.visibility  = "visible";
      item.style.pointerEvents = "auto";
      item.style.zIndex      = String(1000 - Math.round(Math.abs(relativeIndex) * 10));

      item.style.transform = [
        "translate3d(-50%, -50%, 0)",
        `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`,
        `rotate(${(angle + 180 + CONFIG.svgRotationOffset).toFixed(2)}deg)`,
        "scale(1)"
      ].join(" ");

      const img = item.querySelector(".nudge-tools-wheel__svg");
      const svgPath = linesReady && index === snappedIndex
        ? MENU_ITEMS[index].svg
        : getInactiveSvgPath(MENU_ITEMS[index].svg);

      if (img && img.dataset.currentSvg !== svgPath) {
        img.src = getSvgUrl(svgPath);
        img.dataset.currentSvg = svgPath;
      }

      if (linesReady && index === snappedIndex) {
        activeItemCenter      = itemCenter;
        activeErklarungPath   = MENU_ITEMS[index].erklarung || null;
        activeErklarungCenter = activeErklarungPath ? erklarungCenter : null;
      }
    });

    if (linesReady && activeErklarungCenter && activeErklarungPath && activeErklarungImg) {
      activeErklarungImg.src        = chrome.runtime.getURL(activeErklarungPath);
      activeErklarungImg.style.left = `${activeErklarungCenter.x}px`;
      activeErklarungImg.style.top  = `${activeErklarungCenter.y}px`;
      activeErklarungImg.style.display    = "block";
      activeErklarungImg.style.opacity    = "1";
      activeErklarungImg.style.visibility = "visible";
    }

    const arcBigCenter = getArcBigCursorCenter();
    const activeMenuItem = MENU_ITEMS[snappedIndex];
    const showArcLines = menuOpen && !closing;

if (showArcLines && linesReady && activeItemCenter && activeMenuItem && !activeMenuItem.hideLine) {      
  showArcConnectionLine(
        arcLineToActiveItem,
        arcBigCenter,
        getArcItemLineTarget(activeItemCenter, activeMenuItem)
      );
    } else {
      hideArcConnectionLine(arcLineToActiveItem);
    }

    if (showArcLines && linesReady && activeErklarungCenter && activeErklarungPath && activeMenuItem && !activeMenuItem.hideLine) {
      showArcConnectionLine(
        arcLineToErklarung,
        arcBigCenter,
        getArcErklarungLineTarget(activeErklarungCenter, activeMenuItem)
      );
    } else {
      hideArcConnectionLine(arcLineToErklarung);
    }

    rafId = window.requestAnimationFrame(render);
  }

  // ── Menü öffnen / schliessen ────────────────────────────────────────────────
  function openMenuNow(options = {}) {
    if (menuOpen) return;

    const restoredIndex = Number.isFinite(options.snappedIndex)
      ? clamp(Math.round(options.snappedIndex), 0, MENU_ITEMS.length - 1)
      : 0;

    menuOpen        = true;
    snappedIndex    = restoredIndex;
    targetProgress  = restoredIndex;
    currentProgress = restoredIndex;
    wheelAccumulated = 0;
    linesReady      = true;

    buildMenu();
    showMenuBackdrop();

    if (options.instant) {
      items.forEach((item) => { item.style.transition = "none"; });
      if (activeErklarungImg) activeErklarungImg.style.transition = "none";
    }

    document.documentElement.classList.add("nudge-tools-scroll-locked");
    document.body?.classList.add("nudge-tools-scroll-locked");

    if (!rafId) rafId = window.requestAnimationFrame(render);

    if (options.instant) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          items.forEach((item) => { item.style.transition = ""; });
          if (activeErklarungImg) activeErklarungImg.style.transition = "";
        });
      });
    }

    if (!options.skipSave) {
      saveMenuState({ menuOpen: true, snappedIndex, targetProgress, currentProgress, wheelAccumulated, linesReady });
    }
  }

  function restoreOpenMenuImmediately(saved) {
    if (menuOpen || opening || closing) return;

    const restoreIndex = getSavedSnappedIndex(saved);

    if (consoleIcon) {
      consoleIcon.style.transition = "none";
      consoleIcon.style.transform  = "translate(-50%, -50%) scale(0)";
    }

    createSwapCursor();

    if (swapCursor) {
      swapCursor.style.transition = "none";
      swapCursor.style.transform  = "translate(-50%, -50%) scale(1)";
      updateSwapCursorPosition();
    }

    updateExistingConsoleLine(true);

    openMenuNow({ snappedIndex: restoreIndex, instant: true, skipSave: true });

    saveMenuState({
      menuOpen: true, snappedIndex: restoreIndex,
      targetProgress: restoreIndex, currentProgress: restoreIndex,
      wheelAccumulated: 0, linesReady: true
    });
  }

  async function closeMenu() {
    if (!menuOpen && !swapCursor) return;
    if (closing) return;

    closing  = true;
    menuOpen = false;

    hideMenuBackdrop();

    hideArcConnectionLine(arcLineToActiveItem);
    hideArcConnectionLine(arcLineToErklarung);

    saveMenuState({ menuOpen: false });

    items.forEach((item) => {
      item.style.opacity      = "0";
      item.style.pointerEvents = "none";
      item.style.transform    = `${item.style.transform} scale(0)`;
    });

    if (activeErklarungImg) activeErklarungImg.style.opacity = "0";

    await wait(180);

    if (rafId) { window.cancelAnimationFrame(rafId); rafId = null; }

    document.getElementById(MENU_ID)?.remove();
    root = stage = null;
    items = [];

    removeMenuLines();

    targetProgress = currentProgress = snappedIndex = wheelAccumulated = 0;
    linesReady = true;

    document.documentElement.classList.remove("nudge-tools-scroll-locked");
    document.body?.classList.remove("nudge-tools-scroll-locked");

    await animateSwapCursorBackToConsole();

    closing = false;

    saveMenuState({ menuOpen: false, snappedIndex, targetProgress, currentProgress, wheelAccumulated, linesReady });
  }

  window.__nudgeCloseConsoleMenu = closeMenu;

  async function openMenuWithViewportCheck() {
    if (opening || closing || menuOpen) return;
    opening = true;

      if (typeof window.__nudgeCloseContentMenu === "function") {
        await window.__nudgeCloseContentMenu();
      }

    const current = getConsoleCenter();
    const safe    = getSafeCenter(current);

    if (Math.abs(current.x - safe.x) > 0.5 || Math.abs(current.y - safe.y) > 0.5) {
      moveConsoleToCenter(safe, true);
      saveConsolePosition(safe);
      await wait(400);
    }

    await animateConsoleToSwapCursor();
    openMenuNow();
    opening = false;
  }

  async function toggleMenu() {
    if (opening || closing) return;
    if (menuOpen || swapCursor) {
      await closeMenu();
    } else {
      await openMenuWithViewportCheck();
    }
  }

  // ── Pointer-Handler ─────────────────────────────────────────────────────────
  function onConsolePointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    pointerStart = {
      pointerId: event.pointerId,
      x:         event.clientX,
      y:         event.clientY,
      moved:     false
    };
  }

  function onSwapPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    swapPointerStart = {
      pointerId:   event.pointerId,
      x:           event.clientX,
      y:           event.clientY,
      startCenter: getConsoleCenter(),
      moved:       false
    };

    swapCursor?.setPointerCapture?.(event.pointerId);
    if (swapCursor) swapCursor.style.cursor = "grabbing";
  }

  function onWindowPointerMove(event) {
    // FIX: Bewegung während Menü-Item-Klick erkennen
    if (menuItemPointerStart && event.pointerId === menuItemPointerStart.pointerId) {
      const dx = event.clientX - menuItemPointerStart.x;
      const dy = event.clientY - menuItemPointerStart.y;
      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) menuItemPointerStart.moved = true;
    }

    if (pointerStart && event.pointerId === pointerStart.pointerId) {
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) pointerStart.moved = true;
    }

    if (swapPointerStart && event.pointerId === swapPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();

      const dx = event.clientX - swapPointerStart.x;
      const dy = event.clientY - swapPointerStart.y;

      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) swapPointerStart.moved = true;

      if (swapPointerStart.moved) {
        moveConsoleToCenter(
          getSafeCenter({ x: swapPointerStart.startCenter.x + dx, y: swapPointerStart.startCenter.y + dy }),
          false
        );
      }
    }

    if (
      selectedToolDockPointerStart &&
      event.pointerId === selectedToolDockPointerStart.pointerId &&
      selectedToolDockPointerStart.dock?.img
    ) {
      event.preventDefault();
      event.stopPropagation();

      const dock = selectedToolDockPointerStart.dock;
      const dx = event.clientX - selectedToolDockPointerStart.x;
      const dy = event.clientY - selectedToolDockPointerStart.y;

      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) {
        selectedToolDockPointerStart.moved = true;
        setSideCursorsDragBouncing(true);
      }

      const safePoint = keepSelectedToolDockOutsideBigCursorArea({
        x: selectedToolDockPointerStart.startLeft + dx,
        y: selectedToolDockPointerStart.startTop + dy
      });

      dock.img.style.left = `${safePoint.x}px`;
      dock.img.style.top = `${safePoint.y}px`;

      updateSelectedToolDockLine(dock);
      updateSideCursorPositions();
      checkDeleteProximity(dock.img.getBoundingClientRect());
    }

    if (menuOpen) {
      clampConsoleForOpenMenu();
      updateSwapCursorPosition();
      updateExistingConsoleLine(true);
    }
  }

  async function onWindowPointerUp(event) {
    // FIX: Klick auf eingerastetes Menü-SVG
    if (menuItemPointerStart && event.pointerId === menuItemPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();

      const started = menuItemPointerStart;
      menuItemPointerStart = null;

      try { started.element?.releasePointerCapture?.(event.pointerId); } catch (_) {}

      if (!started.moved && menuOpen && !closing && started.index === snappedIndex) {
        const didTrigger = triggerMenuAction(started.item, started.index);

      if (didTrigger) {
        const toolId = getMenuToolId(started.item);
        const toolStillActive = activeModuleIds.includes(toolId);

        await closeMenu();

        window.dispatchEvent(
          new CustomEvent(RETURN_CONSOLE_HOME_EVENT, {
            detail: { expand: !toolStillActive }
          })
        );

        await showSelectedToolDockAfterMenuClose();
      }
      }
      return;
    }

    if (swapPointerStart && event.pointerId === swapPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();

      const wasClick = !swapPointerStart.moved;
      swapPointerStart = null;

      if (swapCursor) swapCursor.style.cursor = "grab";

      if (wasClick) {
        await closeMenu();
      } else {
        const safe = getSafeCenter(getConsoleCenter());
        moveConsoleToCenter(safe, false);
        saveConsolePosition(safe);
      }
      return;
    }

    if (selectedToolDockPointerStart && event.pointerId === selectedToolDockPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();

      const wasDockClick = !selectedToolDockPointerStart.moved;
      const shouldDeleteDock = deleteCursorActive;
      const shouldOpenInfo = infoCursorActive && !shouldDeleteDock;
      const dock = selectedToolDockPointerStart.dock;

      selectedToolDockPointerStart = null;
      setSideCursorsDragBouncing(false);

      hideMenuBackdrop();
      document.documentElement.classList.remove("nudge-tools-scroll-locked");
      document.body?.classList.remove("nudge-tools-scroll-locked");

      if (dock?.img) {
        dock.img.style.cursor = "grab";
      }

      if (shouldDeleteDock && dock?.toolId) {
        setSideCursorsPinnedOpen(false);
        deactivateAndRemoveToolDock(dock.toolId, true);
        return;
      }

      if (shouldOpenInfo) {
        deleteCursorActive = false;
        infoCursorActive = false;

        pulseSideCursor("left", false);
        pulseSideCursor("right", false);

        updateSideCursorsVisibility();
        updateSelectedToolDockLine(dock);
        saveSelectedToolDocksState();

        await openImpressumFromSideCursor("left", event);
        return;
      }

      if (wasDockClick && dock?.img) {
        deleteCursorActive = false;
        infoCursorActive = false;

        setSideCursorsPinnedOpen(!sideCursorsPinnedOpen);

        window.setTimeout(updateSideCursorsVisibility, 280);
        updateSelectedToolDockLine(dock);
        saveSelectedToolDocksState();
        return;
      }

      deleteCursorActive = false;
      window.setTimeout(updateSideCursorsVisibility, 280);
      updateSelectedToolDockLine(dock);
      saveSelectedToolDocksState();
      return;
    }

    if (!pointerStart || event.pointerId !== pointerStart.pointerId) return;

    const wasClick = !pointerStart.moved;
    pointerStart   = null;

    if (!wasClick) {
      if (menuOpen) {
        const safe = getSafeCenter(getConsoleCenter());
        moveConsoleToCenter(safe, false);
        saveConsolePosition(safe);
      }
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    await toggleMenu();
  }

  // ── Tastatur + Scroll im Menü ───────────────────────────────────────────────
  function onWheel(event) {
      if (!menuOpen) return;
      event.preventDefault();
      event.stopPropagation();
      scrollBy(event.deltaY);
    }

  function resetAllWithRKey() {
    const idsToDeactivate = Array.from(new Set(activeModuleIds));

    idsToDeactivate.forEach((toolId) => {
      dispatchModuleDeactivate(toolId);
    });

    activeModuleIds = [];
    syncActiveModuleId();

    if (selectedToolDockRaf) {
      cancelAnimationFrame(selectedToolDockRaf);
      selectedToolDockRaf = 0;
    }

    selectedToolDockPointerStart = null;
    selectedToolDockPendingItem = null;

    selectedToolDocks.forEach((dock) => removeDockObject(dock, true));
    selectedToolDocks = [];

    deleteCursorActive = false;
    infoCursorActive = false;

    removeSideCursors();
    hideMenuBackdrop();

    document.documentElement.classList.remove("nudge-tools-scroll-locked");
    document.body?.classList.remove("nudge-tools-scroll-locked");

    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};

      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          selectedToolDocks: [],
          selectedToolDock: { active: false }
        }
      });
    });
  }

  async function onKeyDown(event) {
    if (
    event.key === "Escape" &&
    !event.repeat &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !document.querySelector(".nudge-content-website-preview") &&
    !sideCursorImpressumAnimating
  ) {
    const hasSelectedTool =
      activeModuleIds.length > 0 ||
      selectedToolDocks.some((dock) => dock?.img);

    if (hasSelectedTool) {
      event.preventDefault();
      event.stopPropagation();

      removeLatestSelectedToolDock(true);
      return;
    }
  }

  if (
    event.key?.toLowerCase() === "r" &&
    !event.repeat &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey
  ) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    resetAllWithRKey();
    return;
  }

    if (!menuOpen) return;
    
    const blockedKeys = [
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
      "Enter"
    ];

    const isEnter =
      event.key === "Enter" ||
      event.code === "Enter" ||
      event.code === "NumpadEnter";

    if (!isEnter && !blockedKeys.includes(event.key)) return;

    if (isEnter) {
      if (!linesReady) return;

      event.preventDefault();
      event.stopPropagation();

      const selectedItem = MENU_ITEMS[snappedIndex];
      const didTrigger = triggerMenuAction(selectedItem, snappedIndex);

      if (didTrigger) {
        const toolId = getMenuToolId(selectedItem);
        const toolStillActive = activeModuleIds.includes(toolId);

        await closeMenu();

        window.dispatchEvent(
          new CustomEvent(RETURN_CONSOLE_HOME_EVENT, {
            detail: { expand: !toolStillActive }
          })
        );

        await showSelectedToolDockAfterMenuClose();
      }

      return;
    }

    event.preventDefault();
    event.stopPropagation();

    scrollBy(event.key === "ArrowUp" || event.key === "PageUp" ? -120 : 120);
  }

  // ── State aus Storage wiederherstellen ──────────────────────────────────────
  function restoreSavedMenuStateFromStorage(sameHostname) {
    if (menuRestoreChecked) return;
    menuRestoreChecked = true;

    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};

      if (!sameHostname) {
        saveMenuState({ menuOpen: false, snappedIndex: 0, targetProgress: 0, currentProgress: 0, wheelAccumulated: 0, linesReady: true });
        return;
      }

      if (saved.menuOpen === true) {
        restoreOpenMenuImmediately(saved);
      } else {
        saveMenuState({ menuOpen: false });
      }
    });
  }

  function waitForStartMenuRestore() {
    const context = window.__nudgeStartMenuRestoreContext;

    if (window.__nudgeStartMenuReady && context) {
      restoreSavedMenuStateFromStorage(Boolean(context.sameHostname));
      return;
    }

    window.addEventListener(
      MENU_RESTORE_EVENT,
      (event) => { restoreSavedMenuStateFromStorage(Boolean(event.detail?.sameHostname)); },
      { once: true }
    );
  }

  // ── Initialisierung ─────────────────────────────────────────────────────────
  function bindConsoleIcon() {
    consoleIcon    = document.getElementById(CONSOLE_ICON_ID);
    startBigCursor = document.getElementById(START_BIG_CURSOR_ID);

    if (!consoleIcon || !startBigCursor) {
      requestAnimationFrame(bindConsoleIcon);
      return;
    }

    consoleIcon.addEventListener("pointerdown", onConsolePointerDown, true);

    window.addEventListener("pointermove", onWindowPointerMove, true);
    window.addEventListener("pointerup",   onWindowPointerUp,   true);

    window.addEventListener("pointercancel", () => {
      pointerStart         = null;
      swapPointerStart     = null;
      menuItemPointerStart = null; // FIX: abgebrochenen Menü-Item-Klick zurücksetzen
      selectedToolDockPointerStart = null;
      setSideCursorsDragBouncing(false);

      deleteCursorActive = false;
      updateSideCursorsVisibility();
      hideMenuBackdrop();

      document.documentElement.classList.remove("nudge-tools-scroll-locked");
      document.body?.classList.remove("nudge-tools-scroll-locked");

      if (swapCursor) swapCursor.style.cursor = "grab";
      selectedToolDocks.forEach((dock) => {
        if (dock.img) dock.img.style.cursor = "grab";
      });
    }, true);

    document.addEventListener("wheel",   onWheel,   { capture: true, passive: false });
    document.addEventListener("keydown", onKeyDown, true);

    window.addEventListener("resize", () => {
      updateSideCursorPositions();
      if (!menuOpen) return;
      const safe = getSafeCenter(getConsoleCenter());
      moveConsoleToCenter(safe, false);
      saveConsolePosition(safe);
    }, true);

    restoreSelectedToolDockFromStorage();
    }

  bindConsoleIcon();

})();

























// MARK: 2 ARC-MENÜ
// (content.svg)
(() => {
  "use strict";

  const CONTENT_MENU_ID        = "nudge-content-wheel-menu";
  const CONTENT_STYLE_ID       = "__nudge-content-wheel-style";
  const CONTENT_BACKDROP_ID    = "__nudge-content-wheel-backdrop";
  const CONTENT_ICON_ID        = "__nudge-start-menu-content";
  const START_BIG_CURSOR_ID    = "__nudge-start-menu-big-cursor";
  const CLICK_MOVE_THRESHOLD   = 5;
  const CONTENT_MENU_Z_INDEX   = "2147483645";
  const CONTENT_SWAP_Z_INDEX   = "2147483646";

  const POSITION_KEY              = `__nudgeStartMenuPositions:${window.location.hostname}`;
  const MENU_RESTORE_EVENT        = "__nudgeStartMenuReady";
  const RETURN_CONTENT_HOME_EVENT = "__nudgeReturnContentHomeAfterMenuClose";
  const MENU_TOOL_EVENT           = "__nudgeMenuToolActivated";

  const BIG_SIZE                     = 200;
  const DELETE_CURSOR_SIZE          = 60; // grössi vom delete sign
  const BIG_LINE_RADIUS              = 82;
  const FADEN_START_OFFSET           = 1;
  const CONTENT_LINE_ANCHOR_OFFSET_X = 0;
  const CONTENT_LINE_ANCHOR_OFFSET_Y = 20;

  const CONTENT_CONFIG = {
    visibleCenterAngle:  0,
    itemAngleStep:       26,
    visibleItems:        7,
    scrollPixelsPerItem: 250,
    smoothing:           0.25,
    svgRotationOffset:   0
  };

  const CONTENT_MENU_ITEM_SIZE        = 70;
  const CONTENT_MENU_SVG_SCALE        = 4.28;
  const CONTENT_MENU_RADIUS           = 260;
  const CONTENT_CORRESPONDENCE_RADIUS = 300;
  const CONTENT_MAX_CORRESPONDENCES   = 4;
  const CONTENT_WEBSITE_PREVIEW_CLOSE_SIZE = 60;
  const CONTENT_PDF_PREVIEW_ZOOM = 73; // PDF-Inhalt im iframe: 100 = normal, 115 = grösser, 130 = sehr gross

  const CONTENT_EXTERNAL_RETURN_HOSTS = new Set([
    "darkpatternstipline.org",
    "www.darkpatternstipline.org",
    "deceptive.design",
    "www.deceptive.design",
    "publiceye.ch",
    "www.publiceye.ch",
    "www.srf.ch",
    "youtube.com",
    "www.youtube.com",
    "youtu.be",
    "shows.acast.com",
    "www.bbc.co.uk"
  ]);

  const CONTENT_MENU_ITEMS = [
  { label: "Up",          href: "#content-up",          svg: "content/up.svg",                                                     lineEndOffsetX: -94, lineEndOffsetY: 0, correspondenceWidth: 470, correspondenceHeight: 470, correspondenceLineEndOffsetX: 0, correspondenceLineEndOffsetY: 0, hideLine: true },

    { label: "Quotes",      
      href: "#content-quotes",      
      svg: "content/quotes.svg",      
    lineEndOffsetX: -114, 
    lineEndOffsetY: 0, 
    correspondences: [
      {
        src: "content/_quote_1.svg",
        width: 470,
        height: 200,
        offsetX: 30,
        offsetY: 180,
        lineEndOffsetX: -50,
        lineEndOffsetY: -47

   
      },
      {
        src: "content/_quote_2.svg",
        width: 470,
        height: 300,
        offsetX: 30,
        offsetY: -180,
        lineEndOffsetX:-50,
        lineEndOffsetY: 47
      },
      {
        src: "content/_quote_3.svg",
        width: 470,
        height: 200,
        offsetX: -60,
        offsetY: 60,
        lineEndOffsetX: -6,
        lineEndOffsetY: 6
      },
      {
        src: "content/_quote_4.svg",
        width: 470,
        height: 200,
        offsetX: -60,
        offsetY: -60,
        lineEndOffsetX: -6,
        lineEndOffsetY: 2
      },
    ]
  },

    { label: "Websites",
      href: "#content-websites",
      svg: "content/websites.svg",
      lineEndOffsetX: -114,
      lineEndOffsetY: 0,
      correspondences: [
        {
          src: "content/_webseite_1.webp",
          url: "https://darkpatternstipline.org/sightings/",
          openUrl: "https://darkpatternstipline.org/sightings/",
          width: 470,
          height: 200,
          offsetX: 50,
          offsetY: -100,
          lineEndOffsetX: -112,
          lineEndOffsetY: 75
        },

        {
          src: "content/_webseite_3.webp",
          url: "https://www.publiceye.ch/de/themen/mode/dark-patterns-im-onlinehandel-heizen-den-mode-ueberkonsum-an",
          width: 470,
          height: 200,
          offsetX: 50,
          offsetY: 100,
          lineEndOffsetX: -112,
          lineEndOffsetY: -75
        },
      ]
    },

    { label: "Videos",      
      href: "#content-videos",      
      svg: "content/videos.svg",      
      lineEndOffsetX: -114, 
      lineEndOffsetY: 0, 
      correspondences: [
        {
          src: "content/_vid_1.webp",
          url: "https://www.youtube-nocookie.com/embed/gVaC_Xa5KsA?autoplay=1&rel=0&modestbranding=1",
          openUrl: "https://youtu.be/gVaC_Xa5KsA",
          iframeAllow: "geolocation *; autoplay; encrypted-media",
          previewRatio: 16 / 9,
          width: 470,
          height: 200,
          offsetX: 50,
          offsetY: 100,
          lineEndOffsetX: -97,
          lineEndOffsetY: -75
        },
        {
          src: "content/_vid_2.webp",
          url: "https://www.srf.ch/play/embed?urn=urn:srf:video:5a8f6dd1-034e-433b-a22c-4effe447d9e0&subdivisions=false",
          openUrl: "https://www.srf.ch/play/tv/kassensturz/video/die-corona-test-abzocke-rechnungen-fuer-nie-gemachte-tests?urn=urn:srf:video:36844002-52f9-4df5-b40f-39c65a596224",
          iframeAllow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          referrerPolicy: "strict-origin-when-cross-origin",
          previewRatio: 16 / 9,
          width: 470,
          height: 200,
          offsetX: 50,
          offsetY: -100,
          lineEndOffsetX: -97,
          lineEndOffsetY: 75
        },
      ]
    },

    { label: "Books",       
      href: "#content-books",       
      svg: "content/books.svg",       
      lineEndOffsetX: -114, 
      lineEndOffsetY: 0, 
      correspondences: [
        {
          src: "content/_book_1.webp",
          pdf: "content/dark patterns_brignull.pdf",
          previewType: "pdf",
          previewRatio: 210 / 297, //hochformatig
          pdfPages: 80,
          width: 470,
          height: 200,
          offsetX: 130,
          offsetY: 100,
          lineEndOffsetX: -183,
          lineEndOffsetY: -77
        },
        {
          src: "content/_book_2.webp",
          pdf: "content/web_berners-lee.pdf",
          previewType: "pdf",
          previewRatio: 297 / 210, //querformatig
          pdfPages: 131,
          width: 470,
          height: 200,
          offsetX: 130,
          offsetY: -100,
          lineEndOffsetX: -180,
          lineEndOffsetY: 77
        },
      ]
    },

    { label: "Documentary",      
      href: "#content-documentary",      
      svg: "content/documentary.svg",      
      lineEndOffsetX: -114, 
      lineEndOffsetY: 0, 
      correspondences: [
        {
          src: "content/_doc_1.webp",
          url: "https://www.youtube.com/embed/OVfZw_eqJW8",
          openUrl: "https://youtu.be/OVfZw_eqJW8",
          iframeAllow: "geolocation *; autoplay; encrypted-media",
          previewRatio: 16 / 9,
          width: 470,
          height: 200,
          offsetX: 50,
          offsetY: 0,
          lineEndOffsetX: -95,
          lineEndOffsetY: 0
        },
      ]
    },

  { label: "Papers",      
    href: "#content-papers",      
    svg: "content/papers.svg",      
    lineEndOffsetX: -114, 
    lineEndOffsetY: 0, 
    correspondences: [
      {
        src: "content/_paper_1.webp",
        pdf: "content/ba.pdf",
        previewType: "pdf",
        previewRatio: 210 / 297, // hochformatig
        width: 470,
        height: 200,
        offsetX: 220,
        offsetY: 180,
        lineEndOffsetX: -179,
        lineEndOffsetY: -77
      },
      {
        src: "content/_paper_2.webp",
        pdf: "content/dark patterns_zac.pdf",
        previewType: "pdf",
        previewRatio: 210 / 297, // hochformatig
        width: 470,
        height: 200,
        offsetX: 220,
        offsetY: -180,
        lineEndOffsetX: -179,
        lineEndOffsetY: 77
      },
      {
        src: "content/_paper_3.webp",
        pdf: "content/2018_Grayetal_CHI_DarkPatternsUXDesign.pdf",
        previewType: "pdf",
        previewRatio: 210 / 297, // hochformatig
        width: 470,
        height: 200,
        offsetX: 80,
        offsetY: -100,
        lineEndOffsetX: -179,
        lineEndOffsetY: -5
      },
      {
        src: "content/_paper_4.webp",
        pdf: "content/dark patterns_cambridge university.pdf",
        previewType: "pdf",
        previewRatio: 210 / 297, // hochformatig
        width: 470,
        height: 200,
        offsetX: 80,
        offsetY: 100,
        lineEndOffsetX: -184,
        lineEndOffsetY: 5
      },
    ]
  },

  { label: "Podcasts",    
    href: "#content-podcasts",    
    svg: "content/podcasts.svg",    
    lineEndOffsetX: -114, 
    lineEndOffsetY: 0, 
    correspondences: [
      {
        src: "content/_pod_1.webp",
        audio: "content/_documentary.mp3",
        previewType: "podcast",
        openUrl: "https://www.bbc.co.uk/programmes/w3ct3hgn",
        previewRatio: 1.6 / 1,
        previewWidth: 525,
        previewHeight: 550,
        width: 470,
        height: 200,
        offsetX: 115,
        offsetY: 100,
        lineEndOffsetX: -157,
        lineEndOffsetY: -77
      },
      {
        src: "content/_pod_2.webp",
        audio: "content/_future.mp3",
        previewType: "podcast",
        openUrl: "https://shows.acast.com/fighting-dark-patterns/episodes/whats-the-future-of-online-manipulation-fight",
        previewRatio: 1.6 / 1,
        previewWidth: 525,
        previewHeight: 550,
        width: 470,
        height: 200,
        offsetX: 115,
        offsetY: -100,
        lineEndOffsetX: -157,
        lineEndOffsetY: 77
      },
    ]
  },
    { label: "Down",        href: "#content-down",        svg: "content/down.svg",                                                   lineEndOffsetX: -94, lineEndOffsetY: 0, correspondenceWidth: 470, correspondenceHeight: 470, correspondenceLineEndOffsetX: 0, correspondenceLineEndOffsetY: 0, hideLine: true }
  ];

  let contentIcon = null;
  let startBigCursor = null;
  let root = null;
  let stage = null;
  let swapCursor = null;
  let swapCursorRing = null;
  let swapCursorRingRaf = 0;
  let swapCursorBackdrop = null;
  let swapCursorBackdropRaf = 0;
  let backdrop = null;

  let contentItems = [];
  let activeCorrespondenceImg = null;
  let activeCorrespondenceImgs = [];
  let contentWebsitePreviewOverlay = null;

  let contentMenuOpen = false;
  let opening = false;
  let closing = false;

  let targetProgress = 0;
  let currentProgress = 0;
  let snappedIndex = 0;
  let wheelAccumulated = 0;
  let linesReady = true;
  let rafId = null;

  let contentPointerStart = null;
  let swapPointerStart = null;
  let menuItemPointerStart = null;
  let quotePointerStart = null;

  let contentMenuRestoreChecked = false;

  document.getElementById(CONTENT_MENU_ID)?.remove();
  document.getElementById("__nudge-content-wheel-big-cursor")?.remove();
  document.getElementById("__nudge-content-wheel-active-correspondence")?.remove();
  document.getElementById("__nudge-content-wheel-active-correspondence-2")?.remove();
  document.getElementById("__nudge-content-wheel-active-correspondence-3")?.remove();
  document.getElementById("__nudge-content-wheel-active-correspondence-4")?.remove();
  document.getElementById("__nudge-content-wheel-line-to-active-item")?.remove();
  document.getElementById("__nudge-content-wheel-line-to-active-correspondence")?.remove();
  document.getElementById("__nudge-content-wheel-line-to-active-correspondence-2")?.remove();
  document.getElementById("__nudge-content-wheel-line-to-active-correspondence-3")?.remove();
  document.getElementById("__nudge-content-wheel-line-to-active-correspondence-4")?.remove();

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getSvgUrl(path) {
    return chrome.runtime.getURL(path);
  }

function getInactiveSvgPath(activePath) {
  return activePath;
}

  function getSavedContentSnappedIndex(saved) {
    const parsed = Number(saved?.contentSnappedIndex);
    return Number.isFinite(parsed)
      ? clamp(Math.round(parsed), 0, CONTENT_MENU_ITEMS.length - 1)
      : 0;
  }

  function saveContentMenuState(extra = {}) {
    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};
      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          contentMenuOpen,
          contentSnappedIndex: snappedIndex,
          contentTargetProgress: targetProgress,
          contentCurrentProgress: currentProgress,
          contentWheelAccumulated: wheelAccumulated,
          contentLinesReady: linesReady,
          ...extra
        }
      });
    });
  }

  function saveContentPosition(point) {
    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};
      chrome.storage.local.set({
        [POSITION_KEY]: {
          ...saved,
          content: { x: point.x, y: point.y },
          contentManual: true,
          contentMenuOpen,
          contentSnappedIndex: snappedIndex,
          contentTargetProgress: targetProgress,
          contentCurrentProgress: currentProgress,
          contentWheelAccumulated: wheelAccumulated,
          contentLinesReady: linesReady
        }
      });
    });
  }

  function getLineSvg() {
    let svg = document.getElementById("__nudge-content-wheel-line-svg");
    if (svg) return svg;

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "__nudge-content-wheel-line-svg";

    Object.assign(svg.style, {
      position:      "fixed",
      left:          "0",
      top:           "0",
      width:         "100vw",
      height:        "100vh",
      pointerEvents: "none",
      zIndex:        "2147483647",
      overflow:      "visible",
      display:       "block",
      visibility:    "visible"
    });

    svg.setAttribute("width", String(window.innerWidth));
    svg.setAttribute("height", String(window.innerHeight));
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    document.documentElement.appendChild(svg);
    return svg;
  }

  const lineSvg = getLineSvg();

  function ensureDpShadowFilter(svg) {
    if (document.getElementById("__dp_shadow")) return;

    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.id = "__dp_shadow";
    filter.setAttribute("x", "-300%");
    filter.setAttribute("y", "-300%");
    filter.setAttribute("width", "800%");
    filter.setAttribute("height", "800%");

    filter.innerHTML = `
      <feDropShadow in="SourceAlpha" dx="0" dy="0"
        stdDeviation="6" flood-color="#000000" flood-opacity="1" result="shadow1"/>
      <feDropShadow in="SourceAlpha" dx="0" dy="0"
        stdDeviation="12" flood-color="#000000" flood-opacity="1" result="shadow2"/>
      <feMerge>
        <feMergeNode in="shadow2"/>
        <feMergeNode in="shadow1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    `;

    defs.appendChild(filter);
  }

  ensureDpShadowFilter(lineSvg);

  function createContentConnectionLineSvg() {
    let svg = document.getElementById("__nudge-content-wheel-connection-svg");
    if (svg) return svg;

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "__nudge-content-wheel-connection-svg";

    Object.assign(svg.style, {
      position:      "fixed",
      left:          "0",
      top:           "0",
      width:         "100vw",
      height:        "100vh",
      pointerEvents: "none",
      zIndex:        "2147483647",
      overflow:      "visible",
      display:       "block",
      visibility:    "visible"
    });

    svg.setAttribute("width", String(window.innerWidth));
    svg.setAttribute("height", String(window.innerHeight));
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    document.documentElement.appendChild(svg);
    return svg;
  }

  const contentConnectionLineSvg = createContentConnectionLineSvg();

  function makeContentConnectionLine(id) {
    document.getElementById(id)?.remove();

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.id = id;
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("stroke-opacity", "1");
    line.setAttribute("stroke-linecap", "round");
    line.style.filter = "drop-shadow(0px 0px 3px rgba(0,0,0,1)) drop-shadow(0px 0px 6px rgba(0,0,0,1))";
    line.style.display = "none";
    line.style.opacity = "0";
    line.style.visibility = "hidden";

    contentConnectionLineSvg.appendChild(line);
    return line;
  }

  const contentLineToActiveItem = makeContentConnectionLine("__nudge-content-wheel-line-to-active-item");
  const contentLineToCorrespondence = makeContentConnectionLine("__nudge-content-wheel-line-to-active-correspondence");

  const contentLinesToCorrespondences = [
    contentLineToCorrespondence,
    makeContentConnectionLine("__nudge-content-wheel-line-to-active-correspondence-2"),
    makeContentConnectionLine("__nudge-content-wheel-line-to-active-correspondence-3"),
    makeContentConnectionLine("__nudge-content-wheel-line-to-active-correspondence-4")
  ];

  function getContentCorrespondences(itemData) {
    const raw = Array.isArray(itemData.correspondences)
      ? itemData.correspondences
      : itemData.correspondence
        ? [{
            src: itemData.correspondence,
            width: itemData.correspondenceWidth || 470,
            height: itemData.correspondenceHeight || 470,
            offsetX: itemData.correspondenceOffsetX || 0,
            offsetY: itemData.correspondenceOffsetY || 0,
            lineEndOffsetX: itemData.correspondenceLineEndOffsetX || 0,
            lineEndOffsetY: itemData.correspondenceLineEndOffsetY || 0
          }]
        : [];

    return raw
      .slice(0, CONTENT_MAX_CORRESPONDENCES)
      .filter((item) => item && item.src);
  }

  function getShiftedCorrespondenceCenter(baseCenter, correspondenceData) {
    return {
      x: baseCenter.x + (correspondenceData.offsetX || 0),
      y: baseCenter.y + (correspondenceData.offsetY || 0)
    };
  }

  function clampCorrespondenceCenterToViewport(center, correspondenceData) {
    const width = correspondenceData.width || 470;
    const height = correspondenceData.height || 470;
    const margin = 12;

    return {
      x: clamp(
        center.x,
        margin + width / 2,
        window.innerWidth - margin - width / 2
      ),
      y: clamp(
        center.y,
        margin + height / 2,
        window.innerHeight - margin - height / 2
      )
    };
  }

  function getQuoteCorrespondenceByIndex(index) {
  const quotesItem = CONTENT_MENU_ITEMS.find((item) => item.label === "Quotes");
  return quotesItem?.correspondences?.[index] || null;
}

function onQuotePointerDown(event) {
  const img = event.currentTarget;

  if (img.dataset.contentLabel !== "Quotes") return;
  if (event.button !== undefined && event.button !== 0) return;

  const index = Number(img.dataset.correspondenceIndex);
  const correspondence = getQuoteCorrespondenceByIndex(index);
  if (!correspondence) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();

  quotePointerStart = {
    pointerId: event.pointerId,
    index,
    x: event.clientX,
    y: event.clientY,
    startOffsetX: correspondence.offsetX || 0,
    startOffsetY: correspondence.offsetY || 0,
    moved: false
  };

  img.setPointerCapture?.(event.pointerId);
}

  if (!document.getElementById(CONTENT_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = CONTENT_STYLE_ID;
    style.textContent = `
      .nudge-tools-scroll-locked {
        overflow: hidden !important;
      }

      #${CONTENT_BACKDROP_ID} {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: ${Number(CONTENT_MENU_Z_INDEX) - 2};
        pointer-events: auto;
        background: transparent;
        display: block;
        cursor: none !important;
      }

      #${CONTENT_MENU_ID} {
        position: fixed;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        z-index: ${CONTENT_MENU_Z_INDEX};
        pointer-events: none;
        overflow: visible;
        --nudge-content-radius: ${CONTENT_MENU_RADIUS}px;
      }

      #${CONTENT_MENU_ID} .nudge-content-wheel__stage {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        pointer-events: none;
        overflow: visible;
      }

      #${CONTENT_MENU_ID} .nudge-content-wheel__item {
        position: absolute;
        left: 0;
        top: 0;
        width: ${CONTENT_MENU_ITEM_SIZE}px;
        height: ${CONTENT_MENU_ITEM_SIZE}px;
        display: block;
        transform-origin: center center;
        pointer-events: auto;
        user-select: none;
        text-decoration: none;
        will-change: transform, opacity;
        z-index: ${CONTENT_MENU_Z_INDEX};
        transition:
          transform 180ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity 120ms ease-out;
      }

      #${CONTENT_MENU_ID} .nudge-content-wheel__svg {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        pointer-events: auto;
        user-select: none;
        touch-action: none;
        cursor: pointer;
        -webkit-user-drag: none;
      }
    `;
    document.documentElement.appendChild(style);
  }

  function getRadius() {
    if (!root) return CONTENT_MENU_RADIUS;
    const value = getComputedStyle(root).getPropertyValue("--nudge-content-radius").trim();
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : CONTENT_MENU_RADIUS;
  }

  function getContentCenter() {
    if (!contentIcon) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = contentIcon.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function getStartBigCenter() {
    if (!startBigCursor) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = startBigCursor.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function getContentCircleCenter() {
    return getContentCenter();
  }

  function getContentSafeCenter(point) {
    const radius = getRadius();
    const minX = radius + CONTENT_MENU_ITEM_SIZE / 2;
    const maxX = window.innerWidth - BIG_SIZE / 2;
    const minY = radius + CONTENT_MENU_ITEM_SIZE / 2;
    const maxY = window.innerHeight - radius - CONTENT_MENU_ITEM_SIZE / 2;

    return {
      x: minX > maxX ? window.innerWidth / 2 : clamp(point.x, minX, maxX),
      y: minY > maxY ? window.innerHeight / 2 : clamp(point.y, minY, maxY)
    };
  }

  function pointOnCircleEdge(center, target, radius) {
    const dx = target.x - center.x;
    const dy = target.y - center.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: center.x + (dx / len) * radius,
      y: center.y + (dy / len) * radius
    };
  }

  function getContentArcBigCursorCenter() {
    if (swapCursor) {
      const rect = swapCursor.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    return getContentCenter();
  }

  function getContentItemLineTarget(itemCenter, itemData) {
    return {
      x: itemCenter.x - CONTENT_MENU_ITEM_SIZE / 2 + (itemData.lineEndOffsetX || 0),
      y: itemCenter.y + (itemData.lineEndOffsetY || 0)
    };
  }

  function getContentCorrespondenceLineTarget(correspondenceCenter, correspondenceData) {
    const width = correspondenceData.width || 470;

    return {
      x: correspondenceCenter.x + width / 2 + (correspondenceData.lineEndOffsetX || 0),
      y: correspondenceCenter.y + (correspondenceData.lineEndOffsetY || 0)
    };
  }

  function showContentConnectionLine(line, fromCenter, toCenter) {
    if (!line || !fromCenter || !toCenter) return;

    const start = pointOnCircleEdge(
      fromCenter,
      toCenter,
      BIG_LINE_RADIUS + FADEN_START_OFFSET
    );

    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));
    line.setAttribute("x2", String(toCenter.x));
    line.setAttribute("y2", String(toCenter.y));
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("stroke-opacity", "1");
    line.setAttribute("stroke-linecap", "round");
    line.style.filter = "drop-shadow(0px 0px 3px rgba(0,0,0,1)) drop-shadow(0px 0px 6px rgba(0,0,0,1))";
    line.style.display = "block";
    line.style.opacity = "1";
    line.style.visibility = "visible";
  }

  function hideContentConnectionLine(line) {
    if (!line) return;
    line.style.display = "none";
    line.style.opacity = "0";
    line.style.visibility = "hidden";
    line.setAttribute("stroke-opacity", "0");
  }

  function moveContentToCenter(point, animate = false) {
    if (!contentIcon) return;

    contentIcon.style.transition = animate
      ? "left 400ms ease-in-out, top 400ms ease-in-out"
      : "none";

    contentIcon.style.left = `${point.x}px`;
    contentIcon.style.top = `${point.y}px`;

    if (animate) {
      window.setTimeout(() => {
        if (contentIcon) contentIcon.style.transition = "none";
      }, 420);
    }

    updateSwapCursorPosition();
    updateExistingContentLine(contentMenuOpen || Boolean(swapCursor));
  }

  function clampContentForOpenMenu() {
    if (!contentMenuOpen || !contentIcon) return;
    const current = getContentCenter();
    const safe = getContentSafeCenter(current);
    if (Math.abs(current.x - safe.x) > 0.5 || Math.abs(current.y - safe.y) > 0.5) {
      moveContentToCenter(safe, false);
    }
  }

  function updateExistingContentLine(useSwapAnchor) {
    const line = document.getElementById("__nudge-start-menu-line-content");
    if (!line || !contentIcon) return;

    const menuCenter = getContentCenter();
    const startCenter = getStartBigCenter();
    const start = pointOnCircleEdge(startCenter, menuCenter, BIG_LINE_RADIUS + FADEN_START_OFFSET);

    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));

    if (useSwapAnchor && swapCursor) {
      const end = pointOnCircleEdge(menuCenter, startCenter, BIG_LINE_RADIUS);
      line.setAttribute("x2", String(end.x));
      line.setAttribute("y2", String(end.y));
      return;
    }

    line.setAttribute("x2", String(menuCenter.x + CONTENT_LINE_ANCHOR_OFFSET_X));
    line.setAttribute("y2", String(menuCenter.y + CONTENT_LINE_ANCHOR_OFFSET_Y));
  }

  function blockBackgroundEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
  }

  function showMenuBackdrop() {
    if (backdrop && backdrop.isConnected) return;
    document.getElementById(CONTENT_BACKDROP_ID)?.remove();

    backdrop = document.createElement("div");
    backdrop.id = CONTENT_BACKDROP_ID;

    ["pointerdown", "pointerup", "mousedown", "mouseup", "click",
     "dblclick", "contextmenu", "wheel", "touchstart", "touchmove", "touchend"
    ].forEach((type) => {
      backdrop.addEventListener(type, blockBackgroundEvent, { capture: true, passive: false });
    });

    document.documentElement.appendChild(backdrop);
  }

  function hideMenuBackdrop() {
    document.getElementById(CONTENT_BACKDROP_ID)?.remove();
    backdrop = null;
  }

  function closeContentWebsitePreview() {
    setCustomCursorHiddenForIframe(false);

    if (!contentWebsitePreviewOverlay) return;

  const overlay = contentWebsitePreviewOverlay;
  const panel = overlay.querySelector(".nudge-content-website-preview__panel");

  if (panel) {
    panel.style.transform = "scale(0.85)";
    panel.style.opacity = "0";
  }

  overlay.style.opacity = "0";

  window.setTimeout(() => {
    overlay.remove();
    if (contentWebsitePreviewOverlay === overlay) {
      contentWebsitePreviewOverlay = null;
    }
  }, 220);
}

function openContentWebsitePreview(url, sourceImg, options = {}) {
  if (!url || !sourceImg) return;

  closeContentWebsitePreview();

  const rect = sourceImg.getBoundingClientRect();

  const overlay = document.createElement("div");
  overlay.className = "nudge-content-website-preview";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483647",
    background: "transparent",
    opacity: "0",
    transition: "opacity 220ms ease",
    pointerEvents: "auto",
    cursor: "default"
  });

  const blurLayer = document.createElement("div");

  Object.assign(blurLayer.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    background: "rgba(255,255,255,0.001)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    pointerEvents: "none",
    zIndex: "0"
  });

  const panel = document.createElement("div");
  panel.className = "nudge-content-website-preview__panel";

  Object.assign(panel.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    background: "#ffffff",
    border: "1px solid #ffffff",
    borderRadius: "20px", //abrundig vo dä eggänä vo dä iframes
    zIndex: "1",
    overflow: "hidden",
    boxShadow: "0 0 3px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.65)",
    opacity: "0.4",
    transformOrigin: "center center",
    transition: "left 320ms ease, top 320ms ease, width 320ms ease, height 320ms ease, opacity 220ms ease"
  });

function createPreviewPoint(ariaLabel, iconPath, side = "left") {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", ariaLabel);

    Object.assign(button.style, {
      position: "fixed",
      left: side === "right" ? `${rect.right}px` : `${rect.left}px`,
      top: `${rect.top - 10}px`,
      width: `${CONTENT_WEBSITE_PREVIEW_CLOSE_SIZE}px`,
      height: `${CONTENT_WEBSITE_PREVIEW_CLOSE_SIZE}px`,
      padding: "0",
      border: "0",
      outline: "1px solid white",
      outlineOffset: "-12px",
      borderRadius: "9999px",
      boxSizing: "border-box",
      background: "transparent",
      backgroundImage: `url(${chrome.runtime.getURL("cursor/cursor.svg")})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      cursor: "pointer",
      pointerEvents: "auto",
      zIndex: "2147483647",
      appearance: "none",
      WebkitAppearance: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: side === "right" ? "translate(-100%, -100%)" : "translate(0, -100%)",
      opacity: "0.4",
      transition: "left 320ms ease, top 320ms ease, opacity 220ms ease"
    });

    const icon = document.createElement("img");
    icon.src = chrome.runtime.getURL(iconPath);
    icon.alt = "";

    Object.assign(icon.style, {
      width: "24px",
      height: "24px",
      objectFit: "contain",
      pointerEvents: "none",
      userSelect: "none",
      WebkitUserDrag: "none"
    });

    button.appendChild(icon);
    return button;
  }

  const linkPoint = createPreviewPoint("Link öffnen", "cursor/link.svg", "left");
  const closePoint = createPreviewPoint("Schliessen", "cursor/x.svg", "right");

  let pdfPage = 1;

  function getPdfPageUrl(page) {
    return `${url.split("#")[0]}#page=${page}&view=Fit&toolbar=0&navpanes=0`;
  }

  const iframe = document.createElement("iframe");

  if (options.previewType === "pdf") {
    iframe.src = getPdfPageUrl(pdfPage);
} else if (options.previewType === "podcast") {
  function escapeHtmlAttribute(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const posterUrl = options.posterUrl || sourceImg?.currentSrc || sourceImg?.src || "";
  const safePosterUrl = escapeHtmlAttribute(posterUrl);
  const safeAudioUrl = escapeHtmlAttribute(url);

  iframe.srcdoc = `
    <!doctype html>
    <html>
      <body style="margin:0;width:100vw;height:100vh;background:#ffffff;display:flex;flex-direction:column;overflow:hidden;font-family:Arial,sans-serif;">
        <div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:22px 22px 12px;box-sizing:border-box;">
          <img src="${safePosterUrl}" style="max-width:100%;max-height:100%;display:block;object-fit:contain;border-radius:10px;">
        </div>
        <div style="flex:0 0 auto;padding:0 22px 22px;box-sizing:border-box;">
          <audio src="${safeAudioUrl}" controls autoplay style="width:100%;display:block;"></audio>
        </div>
      </body>
    </html>
  `;
  } else {
    iframe.src = url;
  }

  Object.assign(iframe.style, {
    width: "100%",
    height: "100%",
    border: "0",
    display: "block",
    background: "#ffffff",
    pointerEvents: "auto"
  });

  iframe.setAttribute("loading", "eager");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    options.iframeAllow || "geolocation *; autoplay; encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture; web-share"
  );
  iframe.setAttribute("referrerpolicy", options.referrerPolicy || "no-referrer-when-downgrade");

  iframe.addEventListener("mouseenter", () => {
    setCustomCursorHiddenForIframe(true);
  }, true);

  iframe.addEventListener("mouseleave", () => {
    setCustomCursorHiddenForIframe(false);
  }, true);

  closePoint.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    closeContentWebsitePreview();
  }, true);

linkPoint.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();

  const targetUrl = options.openUrl || url;

  const isOwnPdf =
    targetUrl.startsWith(chrome.runtime.getURL("content/")) &&
    /\.pdf(?:$|[?#])/i.test(targetUrl);

  let useExternalReturnWindow = isOwnPdf;

  try {
    useExternalReturnWindow =
      useExternalReturnWindow ||
      CONTENT_EXTERNAL_RETURN_HOSTS.has(
        new URL(targetUrl).hostname.toLowerCase()
      );
  } catch (_) {}

  if (useExternalReturnWindow) {
    chrome.runtime.sendMessage({
      type: "__nudgeOpenExternalPage",
      url: targetUrl
    });

    return;
  }

  window.open(targetUrl, "_blank", "noopener,noreferrer");
}, true);

  overlay.addEventListener("click", (event) => {
    if (event.target !== overlay) return;

    if (options.previewType === "pdf") {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      return;
    }

    closeContentWebsitePreview();
  }, true);

  window.addEventListener("keydown", function onPreviewKeyDown(event) {
    if (event.key !== "Escape") return;
    window.removeEventListener("keydown", onPreviewKeyDown, true);
    closeContentWebsitePreview();
  }, true);

  panel.appendChild(iframe);
  overlay.appendChild(blurLayer);
  overlay.appendChild(panel);
  overlay.appendChild(linkPoint);
  overlay.appendChild(closePoint);

  document.documentElement.appendChild(overlay);

  contentWebsitePreviewOverlay = overlay;

  requestAnimationFrame(() => {
  let targetHeight = window.innerHeight - 120;
  let targetWidth = Math.min(window.innerWidth - 160, Math.round(targetHeight * 1.55));

  if (options.previewRatio) {
    targetWidth = Math.min(window.innerWidth - 160, Math.round(targetHeight * options.previewRatio));
    targetHeight = Math.round(targetWidth / options.previewRatio);
  }

  if (options.previewWidth && options.previewHeight) {
    targetWidth = Math.min(window.innerWidth - 160, options.previewWidth);
    targetHeight = Math.min(window.innerHeight - 120, options.previewHeight);
  }

  const targetLeft = (window.innerWidth - targetWidth) / 2;
  const targetTop = options.previewType === "podcast"
    ? (window.innerHeight - targetHeight) / 2
    : 80;

    overlay.style.opacity = "1";
    panel.style.left = `${targetLeft}px`;
    panel.style.top = `${targetTop}px`;
    panel.style.width = `${targetWidth}px`;
    panel.style.height = `${targetHeight}px`;
    panel.style.opacity = "1";
    linkPoint.style.left = `${targetLeft}px`;
    linkPoint.style.top = `${targetTop - 10}px`;
    linkPoint.style.opacity = "1";

    closePoint.style.left = `${targetLeft + targetWidth}px`;
    closePoint.style.top = `${targetTop - 10}px`;
    closePoint.style.opacity = "1";
  });
}

  function getContentMenuToolId(item) {
    return String(item.svg || "").split("/").pop().replace(".svg", "");
  }

  function dispatchContentMenuToolEvent(item, index) {
    window.dispatchEvent(
      new CustomEvent(MENU_TOOL_EVENT, {
        detail: {
          source: "content",
          toolId: getContentMenuToolId(item),
          label: item.label,
          href: item.href,
          index
        }
      })
    );
    return true;
  }

    function triggerContentMenuAction(item, index) {
      dispatchContentMenuToolEvent(item, index);
      return true;
    }

  function onMenuItemPointerDown(event, item, index) {
    if (event.button !== undefined && event.button !== 0) return;
    if (!contentMenuOpen || closing) return;
    if (index !== snappedIndex) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    menuItemPointerStart = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
      item,
      index,
      element: event.currentTarget
    };

    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch (_) {}
  }

  function createMenuItem(item, index) {
    const link = document.createElement("a");
    link.className = "nudge-content-wheel__item";
    link.href = item.href || "#";
    link.dataset.index = String(index);
    link.dataset.visible = "false";
    link.setAttribute("aria-label", item.label || `Content ${index + 1}`);

    const img = document.createElement("img");
    img.className = "nudge-content-wheel__svg";
    img.src = getSvgUrl(item.svg);
    img.alt = "";
    img.draggable = false;
    img.setAttribute("aria-hidden", "true");

    Object.assign(img.style, {
      pointerEvents: "auto",
      cursor: "pointer",
      touchAction: "none",
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transform: `scale(${CONTENT_MENU_SVG_SCALE})`,
      transformOrigin: "center center"
    });

    link.appendChild(img);

    img.addEventListener(
      "pointerdown",
      (event) => { onMenuItemPointerDown(event, item, index); },
      true
    );

    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
      },
      true
    );

    return link;
  }

  function buildMenu() {
    if (document.getElementById(CONTENT_MENU_ID)) return;

    root = document.createElement("nav");
    root.id = CONTENT_MENU_ID;
    root.className = "nudge-content-wheel";
    root.setAttribute("aria-label", "Nudge content navigation");
    root.style.setProperty("--nudge-content-radius", `${CONTENT_MENU_RADIUS}px`);

    stage = document.createElement("div");
    stage.className = "nudge-content-wheel__stage";

    contentItems = CONTENT_MENU_ITEMS.map(createMenuItem);

    activeCorrespondenceImgs = Array.from({ length: CONTENT_MAX_CORRESPONDENCES }, (_, index) => {
      const img = document.createElement("img");
      img.id = index === 0
        ? "__nudge-content-wheel-active-correspondence"
        : `__nudge-content-wheel-active-correspondence-${index + 1}`;
      img.alt = "";
      img.draggable = false;
      img.onerror = () => { console.warn("[Nudge] content correspondence konnte nicht geladen werden"); };

      Object.assign(img.style, {
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "470px",
        height: "470px",
        objectFit: "contain",
        transform: "translate(-50%, -50%) scale(1)",
        transformOrigin: "center center",
        pointerEvents: "auto",
        userSelect: "none",
        zIndex: "2147483646",
        display: "none",
        opacity: "0",
        visibility: "hidden",
        WebkitUserDrag: "none"
      });

    img.addEventListener("pointerdown", onQuotePointerDown, true);
img.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();

  const bigRect = startBigCursor?.getBoundingClientRect();

  const pointerIsOnVisibleBigCursor =
    bigRect &&
    event.clientX >= bigRect.left &&
    event.clientX <= bigRect.right &&
    event.clientY >= Math.max(bigRect.top, 0) &&
    event.clientY <= Math.min(bigRect.bottom, window.innerHeight);

  if (pointerIsOnVisibleBigCursor) {
    void closeMenu();
    return;
  }

  if (!contentMenuOpen || closing) return;

  const clickedImg = activeCorrespondenceImgs
    .filter((candidate) => {
      return (
        candidate &&
        candidate.style.display !== "none" &&
        candidate.style.visibility !== "hidden" &&
        candidate.dataset.websiteUrl
      );
    })
    .reduce((closest, candidate) => {
      const candidateRect = candidate.getBoundingClientRect();

      const distance = Math.hypot(
        event.clientX - (candidateRect.left + candidateRect.width / 2),
        event.clientY - (candidateRect.top + candidateRect.height / 2)
      );

      if (!closest || distance < closest.distance) {
        return {
          img: candidate,
          distance
        };
      }

      return closest;
    }, null)?.img || img;

  const url = clickedImg.dataset.websiteUrl;
  if (!url) return;

  openContentWebsitePreview(url, clickedImg, {
    openUrl: clickedImg.dataset.websiteOpenUrl || "",
    iframeAllow: clickedImg.dataset.iframeAllow || "",
    referrerPolicy: clickedImg.dataset.referrerPolicy || "",
    previewRatio: Number(clickedImg.dataset.previewRatio) || 0,
    previewWidth: Number(clickedImg.dataset.previewWidth) || 0,
    previewHeight: Number(clickedImg.dataset.previewHeight) || 0,
    previewType: clickedImg.dataset.previewType || "",
    pdfPages: Number(clickedImg.dataset.pdfPages) || 1,
    posterUrl:
      clickedImg.dataset.posterUrl ||
      clickedImg.currentSrc ||
      clickedImg.src ||
      ""
  });
}, true);

    document.documentElement.appendChild(img);
    return img;
    });

    activeCorrespondenceImg = activeCorrespondenceImgs[0] || null;

    stage.append(...contentItems);
    root.appendChild(stage);
    document.documentElement.appendChild(root);
  }

  function removeMenuLines() {
    activeCorrespondenceImgs.forEach((img) => img?.remove());
    activeCorrespondenceImgs = [];
    activeCorrespondenceImg = null;
  }

  function scrollBy(deltaY) {
    const maxProgress = CONTENT_MENU_ITEMS.length - 1;
    const stepThreshold = 90;

    wheelAccumulated += deltaY;
    if (Math.abs(wheelAccumulated) < stepThreshold) return;

    const direction = wheelAccumulated > 0 ? 1 : -1;
    wheelAccumulated = 0;

    const nextIndex = clamp(snappedIndex + direction, 0, maxProgress);
    if (nextIndex === snappedIndex) return;

    snappedIndex = nextIndex;
    targetProgress = snappedIndex;
    linesReady = false;

    saveContentMenuState({
      contentMenuOpen: true,
      contentSnappedIndex: snappedIndex,
      contentTargetProgress: targetProgress,
      contentCurrentProgress: targetProgress,
      contentWheelAccumulated: wheelAccumulated,
      contentLinesReady: linesReady
    });
  }

  function updateSwapCursorPosition() {
  if (!swapCursor) return;
  const center = getContentCenter();
  swapCursor.style.left = `${center.x}px`;
  swapCursor.style.top = `${center.y}px`;
  updateSwapCursorRingPosition();
}

function updateSwapCursorRingPosition() {
  if (!swapCursorRing || !swapCursor) return;

  const rect = swapCursor.getBoundingClientRect();

  if (!rect.width || !rect.height) {
    swapCursorRing.style.display = "none";
    return;
  }

  swapCursorRing.style.display = "block";
  swapCursorRing.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
  swapCursorRing.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
  swapCursorRing.style.width  = `${rect.width  * (151 / 182)}px`;
  swapCursorRing.style.height = `${rect.height * (151 / 182)}px`;
}

function updateSwapCursorBackdropPosition() {
  if (!swapCursorBackdrop || !swapCursor) return;

  const rect = swapCursor.getBoundingClientRect();

  if (!rect.width || !rect.height) {
    swapCursorBackdrop.style.display = "none";
    return;
  }

  swapCursorBackdrop.style.display = "block";
  swapCursorBackdrop.style.left   = `${rect.left + rect.width * (16.17 / 182)}px`;
  swapCursorBackdrop.style.top    = `${rect.top  + rect.height * (16.42 / 182)}px`;
  swapCursorBackdrop.style.width  = `${rect.width  * (151 / 182)}px`;
  swapCursorBackdrop.style.height = `${rect.height * (151 / 182)}px`;
  }

  function startSwapCursorBackdrop() {
    if (swapCursorBackdrop) return;

    swapCursorBackdrop = document.createElement("div");

    Object.assign(swapCursorBackdrop.style, {
      position:              "fixed",
      pointerEvents:         "none",
      borderRadius:          "9999px",
      background:            "rgba(255,255,255,0.001)",
      backdropFilter:        "blur(12px)",
      WebkitBackdropFilter:  "blur(12px)",
      zIndex:                String(Number(CONTENT_SWAP_Z_INDEX) - 2),
      display:               "none"
    });

    document.documentElement.appendChild(swapCursorBackdrop);

    function loop() {
      updateSwapCursorBackdropPosition();
      swapCursorBackdropRaf = requestAnimationFrame(loop);
    }

    loop();
  }

  function removeSwapCursorBackdrop() {
    if (swapCursorBackdropRaf) {
      cancelAnimationFrame(swapCursorBackdropRaf);
      swapCursorBackdropRaf = 0;
    }

    swapCursorBackdrop?.remove();
    swapCursorBackdrop = null;
  }

function startSwapCursorRing() {
  if (swapCursorRing) return;

  swapCursorRing = document.createElement("div");

  Object.assign(swapCursorRing.style, {
    position:      "fixed",
    pointerEvents: "none",
    border:        "1px solid white",
    borderRadius:  "9999px",
    boxShadow:     "0 0 3px rgba(0, 0, 0, 0), 0 0 0.5px rgba(255, 255, 255, 0)",
    boxSizing:     "border-box",
    zIndex:        String(Number(CONTENT_SWAP_Z_INDEX) + 1),
    display:       "none"
  });

  document.documentElement.appendChild(swapCursorRing);

  function loop() {
    updateSwapCursorRingPosition();
    swapCursorRingRaf = requestAnimationFrame(loop);
  }

  loop();
}

function removeSwapCursorRing() {
  if (swapCursorRingRaf) {
    cancelAnimationFrame(swapCursorRingRaf);
    swapCursorRingRaf = 0;
  }

  swapCursorRing?.remove();
  swapCursorRing = null;
}

  function createSwapCursor() {
    if (swapCursor) return swapCursor;

    const center = getContentCenter();

    swapCursor = document.createElement("img");
    swapCursor.id = "__nudge-content-wheel-big-cursor";
    swapCursor.src = chrome.runtime.getURL("cursor/big_cursor_intro.svg");
    swapCursor.alt = "";

    Object.assign(swapCursor.style, {
      position: "fixed",
      left: `${center.x}px`,
      top: `${center.y}px`,
      width: `${BIG_SIZE}px`,
      height: `${BIG_SIZE}px`,
      transform: "translate(-50%, -50%) scale(0)",
      transformOrigin: "center center",
      pointerEvents: "auto",
      userSelect: "none",
      cursor: "grab",
      zIndex: "2147483647",
      touchAction: "none",
      WebkitUserDrag: "none"
    });

    swapCursor.addEventListener("pointerdown", onSwapPointerDown, true);
    document.documentElement.appendChild(swapCursor);
    startSwapCursorBackdrop();
    startSwapCursorRing();
    return swapCursor;
  }

  async function animateContentToSwapCursor() {
    if (!contentIcon) return;

    contentIcon.style.transition = "transform 300ms ease-in-out";
    contentIcon.style.transform = "translate(-50%, -50%) scale(0)";

    await wait(300);

    createSwapCursor();
    updateExistingContentLine(true);

    void swapCursor.offsetWidth;

    requestAnimationFrame(() => {
      swapCursor.style.transition = "transform 300ms ease-out";
      swapCursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

    await wait(300);

    swapCursor.style.transition = "none";
    swapCursor.style.transform = "translate(-50%, -50%) scale(1)";
  }

  async function animateSwapCursorBackToContent() {
    if (swapCursor) {
      swapCursor.style.transition = "transform 300ms ease-in";
      swapCursor.style.transform = "translate(-50%, -50%) scale(0)";
      await wait(300);
      removeSwapCursorRing();
      removeSwapCursorBackdrop();
      swapCursor.remove();
      swapCursor = null;
    }

    if (contentIcon) {
      contentIcon.style.transition = "transform 300ms ease-out";
      contentIcon.style.transform = "translate(-50%, -50%) scale(1)";
      await wait(300);
      contentIcon.style.transition = "none";
      contentIcon.style.transform = "translate(-50%, -50%) scale(1)";
    }

    updateExistingContentLine(false);
  }

  function render() {
    if (!root || !contentItems.length) {
      rafId = window.requestAnimationFrame(render);
      return;
    }

    clampContentForOpenMenu();
    updateSwapCursorPosition();
    updateExistingContentLine(true);

    lineSvg.setAttribute("width", String(window.innerWidth));
    lineSvg.setAttribute("height", String(window.innerHeight));
    lineSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    contentConnectionLineSvg.setAttribute("width", String(window.innerWidth));
    contentConnectionLineSvg.setAttribute("height", String(window.innerHeight));
    contentConnectionLineSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

    const center = getContentCircleCenter();
    root.style.left = `${center.x}px`;
    root.style.top = `${center.y}px`;

    currentProgress += (targetProgress - currentProgress) * CONTENT_CONFIG.smoothing;

    if (Math.abs(currentProgress - targetProgress) < 0.04) {
      currentProgress = targetProgress;
      linesReady = true;
    }

    const radius = getRadius();
    const halfVisible = Math.floor(CONTENT_CONFIG.visibleItems / 2);
    const fullStep = CONTENT_CONFIG.itemAngleStep;

    let activeItemCenter = null;
    let activeCorrespondenceCenter = null;
    let activeCorrespondenceConfigs = [];

    activeCorrespondenceImgs.forEach((img) => {
      img.style.display = "none";
      img.style.opacity = "0";
      img.style.visibility = "hidden";
    });

    contentItems.forEach((item, index) => {
      const relativeIndex = index - currentProgress;
      const isVisible = Math.abs(relativeIndex) <= halfVisible + 0.15;

      if (!isVisible) {
        item.dataset.visible = "false";
        item.style.opacity = "0";
        item.style.visibility = "hidden";
        item.style.pointerEvents = "none";
        return;
      }

      const angle = CONTENT_CONFIG.visibleCenterAngle + relativeIndex * fullStep;
      const radians = (angle * Math.PI) / 180;

      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;

      const itemCenter = { x: center.x + x, y: center.y + y };
      const correspondenceCenter = {
        x: center.x - Math.cos(radians) * CONTENT_CORRESPONDENCE_RADIUS,
        y: center.y - Math.sin(radians) * CONTENT_CORRESPONDENCE_RADIUS
      };

      item.dataset.visible = "true";
      item.style.opacity = "1";
      item.style.visibility = "visible";
      item.style.pointerEvents = "auto";
      item.style.zIndex = String(1000 - Math.round(Math.abs(relativeIndex) * 10));

      item.style.transform = [
        "translate3d(-50%, -50%, 0)",
        `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`,
        `rotate(${(angle + CONTENT_CONFIG.svgRotationOffset).toFixed(2)}deg)`,
        "scale(1)"
      ].join(" ");

      const img = item.querySelector(".nudge-content-wheel__svg");
      const svgPath = linesReady && index === snappedIndex
        ? CONTENT_MENU_ITEMS[index].svg
        : getInactiveSvgPath(CONTENT_MENU_ITEMS[index].svg);

      if (img && img.dataset.currentSvg !== svgPath) {
        img.src = getSvgUrl(svgPath);
        img.dataset.currentSvg = svgPath;
      }

      if (linesReady && index === snappedIndex) {
        activeItemCenter = itemCenter;
        activeCorrespondenceConfigs = getContentCorrespondences(CONTENT_MENU_ITEMS[index]);
        activeCorrespondenceCenter = activeCorrespondenceConfigs.length ? correspondenceCenter : null;
      }
    });

    const activeMenuItem = CONTENT_MENU_ITEMS[snappedIndex];

    if (linesReady && activeCorrespondenceCenter && activeCorrespondenceConfigs.length) {
      activeCorrespondenceConfigs.forEach((correspondenceData, correspondenceIndex) => {
        const img = activeCorrespondenceImgs[correspondenceIndex];
        if (!img) return;

        const shiftedCenter = clampCorrespondenceCenterToViewport(
          getShiftedCorrespondenceCenter(activeCorrespondenceCenter, correspondenceData),
          correspondenceData
        );

        const nextSrc = chrome.runtime.getURL(correspondenceData.src);

        if (img.dataset.currentCorrespondenceSrc !== nextSrc) {
          img.src = nextSrc;
          img.dataset.currentCorrespondenceSrc = nextSrc;
        }
        img.dataset.posterUrl = chrome.runtime.getURL(correspondenceData.src);
        const previewUrl = correspondenceData.pdf
          ? chrome.runtime.getURL(correspondenceData.pdf)
          : correspondenceData.audio
            ? chrome.runtime.getURL(correspondenceData.audio)
            : (correspondenceData.url || "");

        const openUrl = correspondenceData.openUrl
          ? (
              correspondenceData.openUrl.startsWith("http")
                ? correspondenceData.openUrl
                : chrome.runtime.getURL(correspondenceData.openUrl)
            )
          : previewUrl;

        img.dataset.websiteUrl = previewUrl;
        img.dataset.websiteOpenUrl = openUrl;
        img.dataset.iframeAllow = correspondenceData.iframeAllow || "";
        img.dataset.referrerPolicy = correspondenceData.referrerPolicy || "";
        img.dataset.previewRatio = correspondenceData.previewRatio || "";
        img.dataset.previewWidth = correspondenceData.previewWidth || "";
        img.dataset.previewHeight = correspondenceData.previewHeight || "";
        img.dataset.previewType = correspondenceData.previewType || (correspondenceData.pdf ? "pdf" : correspondenceData.audio ? "podcast" : "");
        img.dataset.pdfPages = correspondenceData.pdfPages || "";
        img.dataset.contentLabel = activeMenuItem?.label || "";
        img.dataset.correspondenceIndex = String(correspondenceIndex);
        img.style.left = `${shiftedCenter.x}px`;
        img.style.top = `${shiftedCenter.y}px`;
        img.style.width = `${correspondenceData.width || 470}px`;
        img.style.height = `${correspondenceData.height || 470}px`;
        img.style.objectFit = "contain";
        img.style.display = "block";
        img.style.opacity = "1";
        img.style.visibility = "visible";
      });
    }

    const contentBigCenter = getContentArcBigCursorCenter();
    const showContentLines = contentMenuOpen && !closing;

    if (showContentLines && linesReady && activeItemCenter && activeMenuItem && !activeMenuItem.hideLine) {
      showContentConnectionLine(
        contentLineToActiveItem,
        contentBigCenter,
        getContentItemLineTarget(activeItemCenter, activeMenuItem)
      );
    } else {
      hideContentConnectionLine(contentLineToActiveItem);
    }

  contentLinesToCorrespondences.forEach((line, correspondenceIndex) => {
    const correspondenceData = activeCorrespondenceConfigs[correspondenceIndex];

    if (showContentLines && linesReady && activeCorrespondenceCenter && correspondenceData) {
      const shiftedCenter = clampCorrespondenceCenterToViewport(
        getShiftedCorrespondenceCenter(activeCorrespondenceCenter, correspondenceData),
        correspondenceData
      );

      showContentConnectionLine(
        line,
        contentBigCenter,
        getContentCorrespondenceLineTarget(shiftedCenter, correspondenceData)
      );
    } else {
      hideContentConnectionLine(line);
    }
  });

    rafId = window.requestAnimationFrame(render);
  }

  function openMenuNow(options = {}) {
    if (contentMenuOpen) return;

    const restoredIndex = Number.isFinite(options.snappedIndex)
      ? clamp(Math.round(options.snappedIndex), 0, CONTENT_MENU_ITEMS.length - 1)
      : 0;

    contentMenuOpen = true;
    snappedIndex = restoredIndex;
    targetProgress = restoredIndex;
    currentProgress = restoredIndex;
    wheelAccumulated = 0;
    linesReady = true;

    buildMenu();
    showMenuBackdrop();

    if (options.instant) {
      contentItems.forEach((item) => { item.style.transition = "none"; });
      if (activeCorrespondenceImg) activeCorrespondenceImg.style.transition = "none";
    }

    document.documentElement.classList.add("nudge-tools-scroll-locked");
    document.body?.classList.add("nudge-tools-scroll-locked");

    if (!rafId) rafId = window.requestAnimationFrame(render);

    if (options.instant) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          contentItems.forEach((item) => { item.style.transition = ""; });
          if (activeCorrespondenceImg) activeCorrespondenceImg.style.transition = "";
        });
      });
    }

    if (!options.skipSave) {
      saveContentMenuState({
        contentMenuOpen: true,
        contentSnappedIndex: snappedIndex,
        contentTargetProgress: targetProgress,
        contentCurrentProgress: currentProgress,
        contentWheelAccumulated: wheelAccumulated,
        contentLinesReady: linesReady
      });
    }
  }

  function restoreOpenMenuImmediately(saved) {
    if (contentMenuOpen || opening || closing) return;

    const restoreIndex = getSavedContentSnappedIndex(saved);

    if (contentIcon) {
      contentIcon.style.transition = "none";
      contentIcon.style.transform = "translate(-50%, -50%) scale(0)";
    }

    createSwapCursor();

    if (swapCursor) {
      swapCursor.style.transition = "none";
      swapCursor.style.transform = "translate(-50%, -50%) scale(1)";
      updateSwapCursorPosition();
    }

    updateExistingContentLine(true);

    openMenuNow({ snappedIndex: restoreIndex, instant: true, skipSave: true });

    saveContentMenuState({
      contentMenuOpen: true,
      contentSnappedIndex: restoreIndex,
      contentTargetProgress: restoreIndex,
      contentCurrentProgress: restoreIndex,
      contentWheelAccumulated: 0,
      contentLinesReady: true
    });
  }

  async function closeMenu() {
    if (!contentMenuOpen && !swapCursor) return;
    if (closing) return;

    closing = true;
    contentMenuOpen = false;

    hideMenuBackdrop();
    hideContentConnectionLine(contentLineToActiveItem);
    contentLinesToCorrespondences.forEach(hideContentConnectionLine);

    saveContentMenuState({ contentMenuOpen: false });

    contentItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.pointerEvents = "none";
      item.style.transform = `${item.style.transform} scale(0)`;
    });

    activeCorrespondenceImgs.forEach((img) => {
      img.style.pointerEvents = "none";
      img.style.opacity = "0";
    });

    await wait(180);

    if (rafId) { window.cancelAnimationFrame(rafId); rafId = null; }

    document.getElementById(CONTENT_MENU_ID)?.remove();
    root = stage = null;
    contentItems = [];

    removeMenuLines();

    targetProgress = currentProgress = snappedIndex = wheelAccumulated = 0;
    linesReady = true;

    document.documentElement.classList.remove("nudge-tools-scroll-locked");
    document.body?.classList.remove("nudge-tools-scroll-locked");

    await animateSwapCursorBackToContent();

    closing = false;

    saveContentMenuState({
      contentMenuOpen: false,
      contentSnappedIndex: snappedIndex,
      contentTargetProgress: targetProgress,
      contentCurrentProgress: currentProgress,
      contentWheelAccumulated: wheelAccumulated,
      contentLinesReady: linesReady
    });
  }

  window.__nudgeCloseContentMenu = closeMenu;

  async function openMenuWithViewportCheck() {
    if (opening || closing || contentMenuOpen) return;
    opening = true;

      if (typeof window.__nudgeCloseConsoleMenu === "function") {
        await window.__nudgeCloseConsoleMenu();
      }

    const current = getContentCenter();
    const safe = getContentSafeCenter(current);

    if (Math.abs(current.x - safe.x) > 0.5 || Math.abs(current.y - safe.y) > 0.5) {
      moveContentToCenter(safe, true);
      saveContentPosition(safe);
      await wait(400);
    }

    await animateContentToSwapCursor();
    openMenuNow();
    opening = false;
  }

  async function toggleMenu() {
    if (opening || closing) return;
    if (contentMenuOpen || swapCursor) {
      await closeMenu();
    } else {
      await openMenuWithViewportCheck();
    }
  }

  function onContentPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (!contentIcon) return;

    if (contentMenuOpen && startBigCursor) {
      const bigRect = startBigCursor.getBoundingClientRect();

      const pointerIsOnVisibleBigCursor =
        event.clientX >= bigRect.left &&
        event.clientX <= bigRect.right &&
        event.clientY >= Math.max(bigRect.top, 0) &&
        event.clientY <= Math.min(bigRect.bottom, window.innerHeight);

      if (pointerIsOnVisibleBigCursor) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();

        contentPointerStart = null;
        void closeMenu();
        return;
      }
    }

    if (event.target !== contentIcon) return;

    contentPointerStart = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false
    };
  }

  function onSwapPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    swapPointerStart = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startCenter: getContentCenter(),
      moved: false
    };

    swapCursor?.setPointerCapture?.(event.pointerId);
    if (swapCursor) swapCursor.style.cursor = "grabbing";
  }

  function onWindowPointerMove(event) {
    if (quotePointerStart && event.pointerId === quotePointerStart.pointerId) {
        event.preventDefault();
        event.stopPropagation();

        const dx = event.clientX - quotePointerStart.x;
        const dy = event.clientY - quotePointerStart.y;

        if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) {
          quotePointerStart.moved = true;
        }

        const correspondence = getQuoteCorrespondenceByIndex(quotePointerStart.index);
        if (correspondence) {
          correspondence.offsetX = quotePointerStart.startOffsetX + dx;
          correspondence.offsetY = quotePointerStart.startOffsetY + dy;
        }

        return;
      }
    if (menuItemPointerStart && event.pointerId === menuItemPointerStart.pointerId) {
      const dx = event.clientX - menuItemPointerStart.x;
      const dy = event.clientY - menuItemPointerStart.y;
      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) menuItemPointerStart.moved = true;
    }

    if (contentPointerStart && event.pointerId === contentPointerStart.pointerId) {
      const dx = event.clientX - contentPointerStart.x;
      const dy = event.clientY - contentPointerStart.y;
      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) contentPointerStart.moved = true;
    }

    if (swapPointerStart && event.pointerId === swapPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();

      const dx = event.clientX - swapPointerStart.x;
      const dy = event.clientY - swapPointerStart.y;

      if (Math.hypot(dx, dy) > CLICK_MOVE_THRESHOLD) swapPointerStart.moved = true;

      if (swapPointerStart.moved) {
        moveContentToCenter(
          getContentSafeCenter({ x: swapPointerStart.startCenter.x + dx, y: swapPointerStart.startCenter.y + dy }),
          false
        );
      }
    }

    if (contentMenuOpen) {
      clampContentForOpenMenu();
      updateSwapCursorPosition();
      updateExistingContentLine(true);
    }
  }

  async function onWindowPointerUp(event) {
    if (quotePointerStart && event.pointerId === quotePointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();

      const img = activeCorrespondenceImgs[quotePointerStart.index];
      img?.releasePointerCapture?.(event.pointerId);

      quotePointerStart = null;
      return;
    }
    if (menuItemPointerStart && event.pointerId === menuItemPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();

      const started = menuItemPointerStart;
      menuItemPointerStart = null;

      try { started.element?.releasePointerCapture?.(event.pointerId); } catch (_) {}

      if (!started.moved && contentMenuOpen && !closing && started.index === snappedIndex) {
        triggerContentMenuAction(started.item, started.index);
      }
      return;
    }

    if (swapPointerStart && event.pointerId === swapPointerStart.pointerId) {
      event.preventDefault();
      event.stopPropagation();

      const wasClick = !swapPointerStart.moved;
      swapPointerStart = null;

      if (swapCursor) swapCursor.style.cursor = "grab";

      if (wasClick) {
        await closeMenu();
      } else {
        const safe = getContentSafeCenter(getContentCenter());
        moveContentToCenter(safe, false);
        saveContentPosition(safe);
      }
      return;
    }

    if (
      typeof selectedToolDockPointerStart !== "undefined" &&
      selectedToolDockPointerStart &&
      event.pointerId === selectedToolDockPointerStart.pointerId
    ) {
      event.preventDefault();
      event.stopPropagation();

      selectedToolDockPointerStart = null;

      if (typeof selectedToolDockImg !== "undefined" && selectedToolDockImg) {
        selectedToolDockImg.style.cursor = "grab";
      }

      updateSelectedToolDockLine();
      return;
    }

    if (!contentPointerStart || event.pointerId !== contentPointerStart.pointerId) return;

    const wasClick = !contentPointerStart.moved;
    contentPointerStart = null;

    if (!wasClick) return;

    event.preventDefault();
    event.stopPropagation();
    await toggleMenu();
  }

  function onWheel(event) {
    if (!contentMenuOpen) return;
    event.preventDefault();
    event.stopPropagation();
    scrollBy(event.deltaY);
  }

  function onKeyDown(event) {
    if (!contentMenuOpen) return;
    const blockedKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
    if (!blockedKeys.includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    scrollBy(event.key === "ArrowUp" || event.key === "PageUp" ? -120 : 120);
  }

  function restoreSavedMenuStateFromStorage(sameHostname) {
    if (contentMenuRestoreChecked) return;
    contentMenuRestoreChecked = true;

    chrome.storage.local.get([POSITION_KEY], (result) => {
      const saved = result[POSITION_KEY] || {};

      if (!sameHostname) {
        saveContentMenuState({
          contentMenuOpen: false,
          contentSnappedIndex: 0,
          contentTargetProgress: 0,
          contentCurrentProgress: 0,
          contentWheelAccumulated: 0,
          contentLinesReady: true
        });
        return;
      }

      if (saved.contentMenuOpen === true) {
        restoreOpenMenuImmediately(saved);
      } else {
        saveContentMenuState({ contentMenuOpen: false });
      }
    });
  }

  function waitForStartMenuRestore() {
    const context = window.__nudgeStartMenuRestoreContext;

    if (window.__nudgeStartMenuReady && context) {
      restoreSavedMenuStateFromStorage(Boolean(context.sameHostname));
      return;
    }

    window.addEventListener(
      MENU_RESTORE_EVENT,
      (event) => { restoreSavedMenuStateFromStorage(Boolean(event.detail?.sameHostname)); },
      { once: true }
    );
  }

  function bindContentIcon() {
    contentIcon = document.getElementById(CONTENT_ICON_ID);
    startBigCursor = document.getElementById(START_BIG_CURSOR_ID);

    if (!contentIcon || !startBigCursor) {
      requestAnimationFrame(bindContentIcon);
      return;
    }

    window.addEventListener("pointerdown", onContentPointerDown, true);

    window.addEventListener("pointermove", onWindowPointerMove, true);
    window.addEventListener("pointerup", onWindowPointerUp, true);

    window.addEventListener("pointercancel", () => {
    contentPointerStart = null;
    swapPointerStart = null;
    menuItemPointerStart = null;
    quotePointerStart = null;
      if (swapCursor) swapCursor.style.cursor = "grab";
    }, true);

    document.addEventListener("wheel", onWheel, { capture: true, passive: false });
    document.addEventListener("keydown", onKeyDown, true);

    window.addEventListener("resize", () => {
      if (!contentMenuOpen) return;
      const safe = getContentSafeCenter(getContentCenter());
      moveContentToCenter(safe, false);
      saveContentPosition(safe);
    }, true);

    waitForStartMenuRestore();
  }

  bindContentIcon();

})();
}