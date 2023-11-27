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

function blinkNotice(message, isError = false) {
  const $notice = getElementById("notice");

  $notice.style.display = "block";
  $notice.style.color = isError ? "red" : "green";
  $notice.textContent = message;

  setTimeout(() => {
    $notice.style.display = "none";
    $notice.textContent = "";
  }, 3000);
}

function saveTextToStorage($input, $output) {
  const input = $input.value;
  const output = $output.value;

  setChromeLocalStorage(input, output)
    .then(() => {
      clearText([$input, $output]);
      blinkNotice("save success!");
    })
    .catch(() => {
      blinkNotice("save failed. due to text limit (10MB)", true);
    });
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
