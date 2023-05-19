let isSidebarHidden = true;
let observer;

function startObserving() {
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const elements = Array.from(document.querySelectorAll(".dark.flex-shrink-0.overflow-x-hidden.bg-gray-900"));
      elements.forEach((element) => {
        if (isSidebarHidden && element.style.display !== "none") {
          element.style.display = "none";
        }
      });
    });
  });

  const config = { attributes: true, childList: true, subtree: true };
  const targetNode = document.querySelector("body");
  observer.observe(targetNode, config);
}

const toggleButton = document.createElement("button");
toggleButton.textContent = "☰";
toggleButton.title = "Show/Hide History";
toggleButton.style.position = "fixed";
toggleButton.style.top = "9px";
toggleButton.style.left = "9px";
toggleButton.style.zIndex = "10000";
toggleButton.style.cursor = "pointer";
toggleButton.style.padding = "10px";
toggleButton.style.borderRadius = "4px";
toggleButton.style.backgroundColor = "#0f876a";
toggleButton.style.color = "white";
toggleButton.addEventListener("click", toggleSidebar);
document.body.appendChild(toggleButton);

console.log("Toggle Button:", toggleButton);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    console.log("Toggle message received");
    toggleSidebar();
  }
});

function toggleSidebar() {
  const elements = Array.from(document.querySelectorAll(".dark.flex-shrink-0.overflow-x-hidden.bg-gray-900"));

  elements.forEach((element) => {
    element.style.display = isSidebarHidden ? "flex" : "none";
  });

  isSidebarHidden = !isSidebarHidden;

  if (!isSidebarHidden) {
    startObserving();
  } else {
    if (observer) {
      observer.disconnect();
    }
  }
}
