let redirectDomains = ['example.com']; // 리다이렉트를 적용할 도메인들

function extractDomain(url) {
  var domain;
  // URL에서 도메인 추출 로직을 구현합니다.
  var match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
  if (match !== null && match.length > 1) {
    domain = match[1];
  }
  return domain;
}

chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      var url = tabs[0].url;
      var dos = extractDomain(url);
  
      console.log("Current domain: " + dos);
  
      chrome.storage.sync.get('isTiming', (result) => {
        if (result.isTiming) {
          chrome.storage.sync.get('redirectDomains', (result) => {
            result.redirectDomains.forEach(domain => {
              if (dos.includes(domain)) {
                const redirectUrl = chrome.runtime.getURL('redirect.html');
                chrome.tabs.update(tabId, { url: redirectUrl }); // 리다이렉트될 URL
              }
            });
          });
        }
      });
    }
  });
}
)

