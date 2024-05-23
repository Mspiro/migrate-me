chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchData") {
    const formData = message.data;
    // console.log(formData);
    if (formData) {
      chrome.storage.local.set({ formData }, () => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error storing data in Chrome storage:",
            chrome.runtime.lastError
          );
          sendResponse({ error: "Failed to store data" });
        } else {
          console.log("Fetched data stored in Chrome storage:", formData);
          sendResponse({ success: true });
        }
      });
    } else {
      sendResponse({ error: "Failed to receive data from content script" });
    }
  } else if (message.action === "fillForm") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId },
          files: ["fillForm.js"], // Script to inject into the tab
          args: [chrome.storage.local.get("formData")], // Pass stored data as argument
        });
      } else {
        console.error("No active tab found to fill the form.");
      }
    });
  }
});