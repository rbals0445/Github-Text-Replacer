document.addEventListener("keydown", function (event) {
  if (event.key === ".") {
    const selection = window.getSelection();
    const selectedString = selection.toString();

    if (selectedString.length === 0) {
      return;
    }
    // anchorNode가 input이나 textarea가 아닌 wrapperNode를 가리킨다.
    const $inputNode = getInputNode(selection.anchorNode);

    const replaceText = "hello World!";

    if (selection.rangeCount) {
      const curText = $inputNode.value;
      $inputNode.value = curText.replace(selectedString, replaceText);
    }
  }
});

function getInputNode($parentNode) {
  const children = $parentNode.children;

  for (const child of children) {
    if (child.tagName === "INPUT" || child.tagName === "TEXTAREA") {
      return child;
    }
  }

  return null;
}
