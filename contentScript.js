chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleSidebar') {
      console.log('Toggle message received');
      toggleSidebar();
    }
  });
  
  function toggleSidebar() {
    const elements = Array.from(document.querySelectorAll('*')).filter(el => el.style.width === '260px' || el.style.width === '0px');
    console.log('Elements:', elements);
  
    elements.forEach(element => {
      if (element.style.width === '260px') {
        element.style.width = '0px';
      } else {
        element.style.width = '260px';
      }
    });
  }
  
  