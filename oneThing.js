const onethingTitle = document.getElementById('onething_title');
const onethingText = document.getElementById("onething_text");
const form = document.getElementById("onething_form");

function writeH2() {
    const input = document.getElementById("onething_input");
    if(onethingText.innerText !== "") {
        return
    }
    onethingText.innerText = `📌 ${input.value}`;
    chrome.storage.sync.set({ 'onething' : input.value })
    input.value = "";
    changeTitle()
}

function changeTitle() {
    if(onethingText.innerText !== "") {
        let randomNum = Math.ceil(Math.random()*2)
        if(randomNum % 2 === 0) {
            onethingTitle.innerText = "오늘 해야할 가장 중요한 일입니다."
        } else {
            onethingTitle.innerText = "일은 끝나셨나요?"
        }
    } else {
        onethingTitle.innerText = "오늘 할 가장 중요한 일은 무엇인가요?"
    }
}

function removeH2() {
    onethingText.innerText = "";
    chrome.storage.sync.set({ 'onething' : "" })
    changeTitle()
}

function createTextInput() {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("autocomplete", "off");
    inputElement.setAttribute("id", "onething_input");
    inputElement.classList.add("font")
  
    form.appendChild(inputElement);
  }

function removeInput() {
    const input = document.getElementById("onething_input");
    if (input) {
        input.remove()
    }
  }

function init() {
    chrome.storage.sync.get('onething', (result) => {
        if(result.onething === undefined) {
            return
        }
        if(result.onething !== "") {
            removeInput();
            onethingText.innerText = `📌 ${result.onething}`;
        }
        changeTitle()
    })
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    writeH2();
    removeInput();
})

onethingText.addEventListener('click', () => {
    removeH2();
    createTextInput();
})


init();