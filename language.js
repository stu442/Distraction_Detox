const urlInputLang = document.getElementById("url_input");
const redirectTitle = document.getElementById("redirect_title");
const oneThingTitle = document.getElementById("onething_title");


if(urlInputLang) {
    urlInputLang.placeholder = chrome.i18n.getMessage("input_placeholder");
} else {
    redirectTitle.innerText = chrome.i18n.getMessage("today_focustime");
    oneThingTitle.innerText = chrome.i18n.getMessage("onething_title");
}