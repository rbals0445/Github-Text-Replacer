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

  $input.addEventListener("input", (e) => updateValue(e, $input));
  $output.addEventListener("input", (e) => updateValue(e, $output));
  $save.addEventListener("click", () => saveTextToStorage($input, $output));
}

initPopup();
