chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.remove([
    "__nudgeStartMenuLastHostname",
    "riggedLastHostname",
    "__nudgeSkipIntroOnce",
    "__nudgeNavSnapPosition",
    "__nudgeNavMenuPositions",
    "__nudgePageClickNavigationOnce"
  ], () => {
    chrome.storage.local.set({
      "__nudgeForceIntroOnce": true,
      "__nudgeNavigationLockEnabled": true
    }, () => {
      chrome.tabs.update(tab.id, {
        url: "https://en.zalando.de/women-home/?_rfl=de"
      });
    });
  });
});

(() => {
  const NUDGE_EXTERNAL_RETURN_PREFIX =
    "__nudgeExternalReturn:";

  chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
      if (message?.type === "__nudgeOpenExternalPage") {
        const sourceTabId = sender.tab?.id;
        const sourceWindowId = sender.tab?.windowId;
        const targetUrl = String(message.url || "");

        const ownPdfPrefix = chrome.runtime.getURL("content/");

        const isOwnPdf =
          targetUrl.startsWith(ownPdfPrefix) &&
          /\.pdf(?:$|[?#])/i.test(targetUrl);

        const isWebUrl = /^https?:\/\//i.test(targetUrl);

        const navigationUrl = isOwnPdf
          ? `${chrome.runtime.getURL("external-return.html")}?target=${encodeURIComponent(targetUrl)}`
          : targetUrl;

        if (
          sourceTabId == null ||
          sourceWindowId == null ||
          (!isWebUrl && !isOwnPdf)
        ) {
          sendResponse({ opened: false });
          return;
        }

        chrome.tabs.create(
          {
            windowId: sourceWindowId,
            url: "about:blank",
            active: true
          },
          (createdTab) => {
            if (
              chrome.runtime.lastError ||
              createdTab?.id == null
            ) {
              sendResponse({ opened: false });
              return;
            }

            const targetTabId = createdTab.id;

            const storageKey =
              `${NUDGE_EXTERNAL_RETURN_PREFIX}${targetTabId}`;

            chrome.storage.session.set(
              {
                [storageKey]: {
                  sourceTabId,
                  sourceWindowId,
                  createdAt: Date.now()
                }
              },
              () => {
                chrome.tabs.update(
                  targetTabId,
                  { url: navigationUrl },
                  () => {
                    sendResponse({
                      opened: !chrome.runtime.lastError
                    });
                  }
                );
              }
            );
          }
        );

        return true;
      }

      if (
        message?.type ===
        "__nudgeExternalPageReady"
      ) {
        const targetTabId = sender.tab?.id;

        if (targetTabId == null) {
          sendResponse({ active: false });
          return;
        }

        const storageKey =
          `${NUDGE_EXTERNAL_RETURN_PREFIX}${targetTabId}`;

        chrome.storage.session.get(
          [storageKey],
          (result) => {
            const saved = result[storageKey];

            const active = Boolean(
              saved &&
              Date.now() -
                Number(saved.createdAt || 0) <
                12 * 60 * 60 * 1000
            );

            sendResponse({ active });
          }
        );

        return true;
      }

      if (
        message?.type ===
        "__nudgeReturnFromExternalPage"
      ) {
        const targetTabId = sender.tab?.id;

        if (targetTabId == null) return;

        const storageKey =
          `${NUDGE_EXTERNAL_RETURN_PREFIX}${targetTabId}`;

        chrome.storage.session.get(
          [storageKey],
          (result) => {
            const saved = result[storageKey];

            function closeExternalTab() {
              chrome.storage.session.remove(storageKey);
              chrome.tabs.remove(targetTabId);
            }

            if (
              saved?.sourceTabId == null ||
              saved?.sourceWindowId == null
            ) {
              closeExternalTab();
              return;
            }

            chrome.windows.update(
              saved.sourceWindowId,
              { focused: true },
              () => {
                void chrome.runtime.lastError;

                chrome.tabs.update(
                  saved.sourceTabId,
                  { active: true },
                  () => {
                    void chrome.runtime.lastError;
                    closeExternalTab();
                  }
                );
              }
            );
          }
        );
      }
    }
  );

  chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.session.remove(
      `${NUDGE_EXTERNAL_RETURN_PREFIX}${tabId}`
    );
  });
})();

(() => {
  "use strict";

  const NAVIGATION_LOCK_KEY =
    "__nudgeNavigationLockEnabled";

  const GLOBAL_LAST_ALLOWED_KEY =
    "__nudgeNavigationLastAllowed";

  const TAB_LAST_ALLOWED_PREFIX =
    "__nudgeNavigationLastAllowed:";

  const RESTORE_POSITION_PREFIX =
    "__nudgeNavigationRestorePosition:";

  const FALLBACK_URL =
    "https://en.zalando.de/women-home/?_rfl=de";

  const SHOP_DOMAINS = [
    "amazon.com",
    "shein.com",
    "zalando.de",
    "asos.com",
    "aliexpress.us",
    "aboutyou.ch",
    "hm.com",
    "galaxus.ch"
  ];

  const ALLOWED_YOUTUBE_VIDEO_IDS = new Set([
    "gVaC_Xa5KsA",
    "OVfZw_eqJW8"
  ]);

  function getTabLastAllowedKey(tabId) {
    return `${TAB_LAST_ALLOWED_PREFIX}${tabId}`;
  }

  function getRestorePositionKey(tabId) {
    return `${RESTORE_POSITION_PREFIX}${tabId}`;
  }

  function normalizePath(pathname) {
    const path = pathname || "/";

    if (path === "/") return "/";

    return path.replace(/\/+$/, "");
  }

  function hostnameMatches(hostname, domain) {
    return (
      hostname === domain ||
      hostname.endsWith(`.${domain}`)
    );
  }

  function isShopUrl(parsedUrl) {
    return SHOP_DOMAINS.some((domain) => {
      return hostnameMatches(
        parsedUrl.hostname.toLowerCase(),
        domain
      );
    });
  }

  function isAllowedYoutubeUrl(parsedUrl) {
    const hostname =
      parsedUrl.hostname.toLowerCase();

    if (hostname === "youtu.be") {
      const videoId =
        normalizePath(parsedUrl.pathname).slice(1);

      return ALLOWED_YOUTUBE_VIDEO_IDS.has(videoId);
    }

    if (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com"
    ) {
      return (
        normalizePath(parsedUrl.pathname) === "/watch" &&
        ALLOWED_YOUTUBE_VIDEO_IDS.has(
          parsedUrl.searchParams.get("v")
        )
      );
    }

    return false;
  }

  function isAllowedExternalUrl(parsedUrl) {
    const hostname =
      parsedUrl.hostname.toLowerCase();

    const pathname =
      normalizePath(parsedUrl.pathname);

    if (
      (
        hostname === "darkpatternstipline.org" ||
        hostname === "www.darkpatternstipline.org"
      ) &&
      pathname === "/sightings"
    ) {
      return true;
    }

    if (
      (
        hostname === "deceptive.design" ||
        hostname === "www.deceptive.design"
      ) &&
      pathname === "/"
    ) {
      return true;
    }

    if (
      (
        hostname === "publiceye.ch" ||
        hostname === "www.publiceye.ch"
      ) &&
      pathname ===
        "/de/themen/mode/dark-patterns-im-onlinehandel-heizen-den-mode-ueberkonsum-an"
    ) {
      return true;
    }

    if (
      (
        hostname === "srf.ch" ||
        hostname === "www.srf.ch"
      ) &&
      pathname ===
        "/play/tv/kassensturz/video/die-corona-test-abzocke-rechnungen-fuer-nie-gemachte-tests" &&
      parsedUrl.searchParams.get("urn") ===
        "urn:srf:video:36844002-52f9-4df5-b40f-39c65a596224"
    ) {
      return true;
    }

    if (
      hostname === "shows.acast.com" &&
      pathname ===
        "/fighting-dark-patterns/episodes/whats-the-future-of-online-manipulation-fight"
    ) {
      return true;
    }

    if (
      hostname === "www.bbc.co.uk" &&
      pathname === "/programmes/w3ct3hgn"
    ) {
      return true;
    }

    return isAllowedYoutubeUrl(parsedUrl);
  }

  function isAllowedOwnPdfUrl(url) {
    const ownContentPrefix =
      chrome.runtime.getURL("content/");

    if (
      url.startsWith(ownContentPrefix) &&
      /\.pdf(?:$|[?#])/i.test(url)
    ) {
      return true;
    }

    const wrapperUrl =
      chrome.runtime.getURL("external-return.html");

    if (!url.startsWith(wrapperUrl)) {
      return false;
    }

    try {
      const parsedWrapper = new URL(url);
      const targetUrl =
        parsedWrapper.searchParams.get("target") || "";

      return (
        targetUrl.startsWith(ownContentPrefix) &&
        /\.pdf(?:$|[?#])/i.test(targetUrl)
      );
    } catch (_) {
      return false;
    }
  }

  function isAllowedUrl(url) {
    if (!url) return false;

    if (isAllowedOwnPdfUrl(url)) {
      return true;
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch (_) {
      return false;
    }

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      return false;
    }

    return (
      isShopUrl(parsedUrl) ||
      isAllowedExternalUrl(parsedUrl)
    );
  }

  function samePageUrl(firstUrl, secondUrl) {
    try {
      const first = new URL(firstUrl);
      const second = new URL(secondUrl);

      return (
        first.origin === second.origin &&
        first.pathname === second.pathname &&
        first.search === second.search
      );
    } catch (_) {
      return firstUrl === secondUrl;
    }
  }

  async function navigationLockIsEnabled() {
    const result =
      await chrome.storage.local.get([
        NAVIGATION_LOCK_KEY
      ]);

    return result[NAVIGATION_LOCK_KEY] !== false;
  }

  async function saveAllowedState(
    tabId,
    url,
    x = null,
    y = null
  ) {
    if (
      tabId == null ||
      !isAllowedUrl(url)
    ) {
      return;
    }

    const tabKey =
      getTabLastAllowedKey(tabId);

    const result =
      await chrome.storage.session.get([tabKey]);

    const previous =
      result[tabKey] || null;

    const samePage =
      previous &&
      samePageUrl(previous.url, url);

    const parsedX = Number(x);
    const parsedY = Number(y);

    const state = {
      url,
      x: Number.isFinite(parsedX)
        ? parsedX
        : samePage
          ? Number(previous.x) || 0
          : 0,
      y: Number.isFinite(parsedY)
        ? parsedY
        : samePage
          ? Number(previous.y) || 0
          : 0,
      updatedAt: Date.now()
    };

    await chrome.storage.session.set({
      [tabKey]: state,
      [GLOBAL_LAST_ALLOWED_KEY]: state
    });
  }

  async function getLastAllowedState(tabId) {
    const tabKey =
      getTabLastAllowedKey(tabId);

    const result =
      await chrome.storage.session.get([
        tabKey,
        GLOBAL_LAST_ALLOWED_KEY
      ]);

    return (
      result[tabKey] ||
      result[GLOBAL_LAST_ALLOWED_KEY] ||
      {
        url: FALLBACK_URL,
        x: 0,
        y: 0,
        updatedAt: Date.now()
      }
    );
  }

  async function redirectToLastAllowed(tabId) {
    if (tabId == null) return;

    const lastAllowed =
      await getLastAllowedState(tabId);

    const restoreKey =
      getRestorePositionKey(tabId);

    await chrome.storage.session.set({
      [restoreKey]: {
        url: lastAllowed.url,
        x: Number(lastAllowed.x) || 0,
        y: Number(lastAllowed.y) || 0,
        createdAt: Date.now()
      }
    });

    try {
      await chrome.tabs.update(tabId, {
        url: lastAllowed.url
      });
    } catch (_) {
      // Tab wurde möglicherweise geschlossen.
    }
  }

  async function enforceNavigation(tabId, url) {
    if (!url) return;

    if (isAllowedUrl(url)) {
      await saveAllowedState(tabId, url);
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      return;
    }

    if (!(await navigationLockIsEnabled())) {
      return;
    }

    await redirectToLastAllowed(tabId);
  }

  chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo) => {
      if (!changeInfo.url) return;

      void enforceNavigation(
        tabId,
        changeInfo.url
      );
    }
  );

  chrome.tabs.onActivated.addListener(
    ({ tabId }) => {
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) return;

        const url =
          tab.url ||
          tab.pendingUrl ||
          "";

        void enforceNavigation(tabId, url);
      });
    }
  );

  chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
      const tabId = sender.tab?.id;

      if (
        message?.type ===
        "__nudgeNavigationPosition"
      ) {
        const url =
          String(
            message.url ||
            sender.tab?.url ||
            ""
          );

        if (
          tabId != null &&
          isAllowedUrl(url)
        ) {
          void saveAllowedState(
            tabId,
            url,
            message.x,
            message.y
          );
        }

        return;
      }

      if (
        message?.type ===
        "__nudgeNavigationGuardReady"
      ) {
        void (async () => {
          const url =
            String(
              message.url ||
              sender.tab?.url ||
              ""
            );

          const enabled =
            await navigationLockIsEnabled();

          if (
            enabled &&
            /^https?:\/\//i.test(url) &&
            !isAllowedUrl(url)
          ) {
            await redirectToLastAllowed(tabId);

            sendResponse({
              enabled,
              redirecting: true
            });

            return;
          }

          let restorePosition = null;

          if (
            tabId != null &&
            isAllowedUrl(url)
          ) {
            const restoreKey =
              getRestorePositionKey(tabId);

            const result =
              await chrome.storage.session.get([
                restoreKey
              ]);

            const savedRestore =
              result[restoreKey];

            if (
              savedRestore &&
              Date.now() -
                Number(savedRestore.createdAt || 0) <
                15000
            ) {
              restorePosition = {
                x: Number(savedRestore.x) || 0,
                y: Number(savedRestore.y) || 0
              };

              await chrome.storage.session.remove(
                restoreKey
              );

              await saveAllowedState(
                tabId,
                url,
                restorePosition.x,
                restorePosition.y
              );
            } else {
              await saveAllowedState(tabId, url);
            }
          }

          sendResponse({
            enabled,
            restorePosition
          });
        })().catch(() => {
          sendResponse({
            enabled: true,
            restorePosition: null
          });
        });

        return true;
      }

      if (
        message?.type ===
        "__nudgeToggleNavigationLock"
      ) {
        void (async () => {
          const result =
            await chrome.storage.local.get([
              NAVIGATION_LOCK_KEY
            ]);

          const currentlyEnabled =
            result[NAVIGATION_LOCK_KEY] !== false;

          const nextEnabled =
            !currentlyEnabled;

          await chrome.storage.local.set({
            [NAVIGATION_LOCK_KEY]: nextEnabled
          });

          const currentUrl =
            String(
              message.url ||
              sender.tab?.url ||
              ""
            );

          if (
            nextEnabled &&
            tabId != null
          ) {
            if (isAllowedUrl(currentUrl)) {
              await saveAllowedState(
                tabId,
                currentUrl
              );
            } else {
              await redirectToLastAllowed(tabId);
            }
          }

          sendResponse({
            enabled: nextEnabled
          });
        })().catch(() => {
          sendResponse({
            enabled: false
          });
        });

        return true;
      }
    }
  );

  chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.storage.session.remove([
      getTabLastAllowedKey(tabId),
      getRestorePositionKey(tabId)
    ]);
  });
})();