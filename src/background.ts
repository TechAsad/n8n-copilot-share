chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  // console.log("📩 Message received from content script:", message);

  if (message.type === "CAPTURE_SCREENSHOT") {
    chrome.tabs.captureVisibleTab(
      chrome.windows.WINDOW_ID_CURRENT,
      { format: "png" },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error("❌ Screenshot error:", chrome.runtime.lastError);
          sendResponse({ error: "Failed to capture screenshot" });
        } else {
          sendResponse({ screenshot: dataUrl });
        }
      }
    );
    return true; // Keep sendResponse function alive for async response
  }

  // ✅ Handle Tab Visibility Changes
  if (message.type === "TAB_VISIBILITY") {
    const { tabId, isVisible } = message;
    console.log(`🔄 Tab ${tabId} is now ${isVisible ? "VISIBLE" : "HIDDEN"}`);

    // You can store this state in a local variable or send it to your React app if needed
    chrome.storage.local.set({ [`tab-${tabId}-visibility`]: isVisible });

    sendResponse({ status: "visibility_updated" });
  }

  sendResponse({ status: "received" });
});

// ✅ Initialize Chrome Side Panel Behavior on Install
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } else {
    console.warn("⚠️ sidePanel API not supported in this Chrome version.");
  }
});
