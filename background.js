let redirectDomains = ['example.com']; // 리다이렉트를 적용할 도메인들

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.sync.get('redirectDomains', (result) => redirectDomains = result.redirectDomains)
  const url = new URL(details.url);
  redirectDomains.forEach(domain => {
    if (url.hostname.includes(domain)) {
      const redirectUrl = chrome.runtime.getURL('redirect.html');
      chrome.tabs.update(details.tabId, { url: redirectUrl }); // 리다이렉트될 URL
    }
  })
  });