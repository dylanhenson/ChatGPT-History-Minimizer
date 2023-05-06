const toggleButton = document.createElement("img");
toggleButton.src = chrome.runtime.getURL("icon128.png");
toggleButton.style.position = "fixed";
toggleButton.style.top = "10px";
toggleButton.style.left = "10px";
toggleButton.style.zIndex = "10000";
toggleButton.style.cursor = "pointer";
toggleButton.addEventListener("click", toggleSidebar);
document.body.appendChild(toggleButton);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSidebar") {
    console.log("Toggle message received");
    toggleSidebar();
  }
});

let isSidebarHidden = false;
let observer;

function toggleSidebar() {
  const elements = Array.from(document.querySelectorAll("*")).filter(
    (el) => el.style.width === "260px" || el.style.width === "0px"
  );
  console.log("Elements:", elements);

  elements.forEach((element) => {
    if (element.style.width === "260px") {
      element.style.width = "0px";
    } else {
      element.style.width = "260px";
    }
  });

  isSidebarHidden = !isSidebarHidden;

  if (isSidebarHidden) {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const elements = Array.from(document.querySelectorAll("*")).filter(
          (el) => el.style.width === "260px" || el.style.width === "0px"
        );

        elements.forEach((element) => {
          if (isSidebarHidden && element.style.width === "260px") {
            element.style.width = "0px";
          }
        });
      });
    });

    const config = { attributes: true, childList: true, subtree: true };
    const targetNode = document.querySelector("body");
    observer.observe(targetNode, config);
  } else {
    if (observer) {
      observer.disconnect();
    }
  }
}
