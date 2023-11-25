import { getChromeLocalStorage, setChromeLocalStorage } from "./utils.js";

function getElementById(id) {
  return document.getElementById(id);
}

function updateValue(e, elem) {
  let text = e.target.value;
  elem.value = text;
}

function clearText(elems) {
  if (!Array.isArray(elems)) {
    return;
  }

  elems.forEach((elem) => {
    elem.value = "";
  });
}

function blinkNotice(message) {
  const $notice = getElementById("notice");

  $notice.style.display = "block";
  $notice.textContent = message;

  setTimeout(() => {
    $notice.style.display = "none";
    $notice.textContent = "";
  }, 2000);
}

function saveTextToStorage($input, $output) {
  const input = $input.value;
  const output = $output.value;

  setChromeLocalStorage(input, output);
  clearText([$input, $output]);
  blinkNotice("save success!");
}

function clearStorage($input, $output) {
  chrome.storage.local.clear(() => {
    clearText([$input, $output]);
    blinkNotice("clear finished!");
  });
}

function showStorageList($output) {
  getChromeLocalStorage(null).then((result) => {
    Object.keys(result).forEach((key) => {
      $output.value += `key = ${key}` + "\n";
      $output.value += result[key] + "\n\n";
    });
  });
}

function initPopup() {
  const $input = getElementById("input");
  const $output = getElementById("output");
  const $save = getElementById("save");
  const $clear = getElementById("clear");
  const $list = getElementById("list");

  $input.addEventListener("input", (e) => updateValue(e, $input));
  $output.addEventListener("input", (e) => updateValue(e, $output));
  $save.addEventListener("click", () => saveTextToStorage($input, $output));
  $clear.addEventListener("click", () => clearStorage($input, $output));
  $list.addEventListener("click", () => showStorageList($output));
}

initPopup();
