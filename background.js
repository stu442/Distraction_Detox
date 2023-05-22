let redirectDomains = ['example.com']; // 리다이렉트를 적용할 도메인들
// let deleteTimeInterval;

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.sync.get('isTiming', (result) => {
    if (result.isTiming) {
      chrome.storage.sync.get('redirectDomains', (result) => {
        const url = new URL(details.url);
        result.redirectDomains.forEach(domain => {
          if (url.hostname.includes(domain)) {
            const redirectUrl = chrome.runtime.getURL('redirect.html');
            chrome.tabs.update(details.tabId, { url: redirectUrl }); // 리다이렉트될 URL
          }
        });
      });
    }
  });
});


// async function getStartDate() {
//   return new Promise((resolve, reject) => {
//     chrome.storage.sync.get('startDate', (result) => {
//       if (chrome.runtime.lastError) {
//         reject(chrome.runtime.lastError);
//       } else {
//         resolve(result.startDate);
//       }
//     });
//   });
// }

// async function deleteSumTime() {
//   try {
//     if(await getStartDate() !== new Date().getDate()) {
//       chrome.storage.sync.set({"sumTime" : 0})
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// deleteTimeInterval = setInterval(deleteSumTime, 60000);


// console.log("HI I'm Background");