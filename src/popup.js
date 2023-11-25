import { getChromeLocalStorage, setChromeLocalStorage } from "./utils.js";

function getElementById(id) {
  return document.getElementById(id);
}

function updateValue(e, elem) {
  let text = e.target.value;
  elem.textContent = text;
}

function saveTextToStorage($input, $output) {
  const input = $input.textContent;
  const output = $output.textContent;

  setChromeLocalStorage(input, output);
}

function initPopup() {
  const $input = getElementById("input");
  const $output = getElementById("output");
  const $save = getElementById("save");
  const $get = getElementById("get");
  const $clear = getElementById("clear");
  const $list = getElementById("list");

  $input.addEventListener("input", (e) => updateValue(e, $input));
  $output.addEventListener("input", (e) => updateValue(e, $output));
  $save.addEventListener("click", () => saveTextToStorage($input, $output));

  $get.addEventListener("click", () => {
    const key = $input.textContent;
    getChromeLocalStorage(key).then((result) => {
      console.log(result);
      $output.textContent = result[key];
    });
  });

  $clear.addEventListener("click", () => {
    chrome.storage.local.clear(() => {
      console.log("clear");
    });
  });

  $list.addEventListener("click", () => {
    chrome.storage.local.get(null, (result) => {
      Object.keys(result).forEach((key) => {
        $output.textContent += `key = ${key}` + "\n";
        $output.textContent += result[key] + "\n\n";
      });
    });
  });
}

initPopup();
// TODO
/**
 * save 이후 list 확인하면 아무일도 안일어남. 해결필요
 */
