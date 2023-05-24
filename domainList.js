const form = document.querySelector('#url_form');
const urlInput = document.querySelector("#url_input");
const ul = document.querySelector("ul");
const li = document.getElementsByTagName('li');

function createList() {
    const li = document.createElement("li");
    li.classList.add("font");
    li.innerHTML = `<span>${urlInput.value}</span>`
    ul.appendChild(li);
    clearInput();
}

function updateDomain() {
    redirectDomains.push(urlInput.value);
}

function saveData() {
    chrome.storage.sync.set({'redirectDomains' : redirectDomains})
}

function isValidDomain(domain) {
    // 도메인 검사를 위한 정규식 패턴
    const pattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
    return pattern.test(domain);
}

function clearInput() {
    urlInput.value="";
}

function loadRedirectDomains() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('redirectDomains', (result) => {
        if (result.redirectDomains && result.redirectDomains.length > 0) {
          redirectDomains = result.redirectDomains;
        } else {
          redirectDomains = ['example.com'];
        }
        resolve();
      });
    });
  }

function paintList() {
    chrome.storage.sync.get('redirectDomains', (result) => {
        result.redirectDomains.forEach((domain) => {
            const li = document.createElement('li');
            li.classList.add("font");
            li.textContent = domain;
            ul.appendChild(li);
        })
    })
}

function delList(event) {
    for (let i = 0; i<li.length; i++) {
        if (li[i].textContent === event.target.textContent) {
            li[i].remove();
        }
    }
}

function delData(event) {
    redirectDomains.splice(redirectDomains.indexOf(event.target.textContent), 1);
}

function isDuplicate(value, array) {
    return array.includes(value);
  }

  async function init() {
    await loadRedirectDomains();
    paintList();
    saveData();
  }

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(isDuplicate(urlInput.value, redirectDomains)) {
        alert("중복된 도메인 입니다.")
        return
    }
    if(!isValidDomain(urlInput.value)) {
        clearInput();
        alert("올바른 도메인을 입력해주세요");
    } else {
        updateDomain();
        createList();
        saveData();
    }
})

ul.addEventListener('click', (event) => {
    delList(event);
    delData(event);
    saveData();
})

init();