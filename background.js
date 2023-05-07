chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request.action === 'getIconURL') {
        sendResponse({ iconURL: chrome.runtime.getURL('icon128.png') });
    }
});
