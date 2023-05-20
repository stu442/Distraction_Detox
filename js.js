const form = document.querySelector('#url_form');
const urlInput = document.querySelector("#url_input");
const ul = document.querySelector("ul");
const li = document.getElementsByTagName('li')


function createList() {
    const li = document.createElement("li");
    li.innerHTML = `<span>${urlInput.value}</span>`
    ul.appendChild(li);
    clearInput();
}

function updateDomain() {
    redirectDomains.push(urlInput.value);
}

function saveData() {
    chrome.storage.sync.set({redirectDomains : redirectDomains}, () => {
    })
}

function isValidDomain(domain) {
    // 도메인 검사를 위한 정규식 패턴
    const pattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
    return pattern.test(domain);
}

function clearInput() {
    urlInput.value="";
}

function paintList() {
    chrome.storage.sync.get('redirectDomains', (result) => {
        redirectDomains = result.redirectDomains.some(item => true) || ['example.com'];
        redirectDomains.forEach((domain) => {
            const li = document.createElement('li');
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

paintList()

form.addEventListener('submit', (event) => {
    event.preventDefault();
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