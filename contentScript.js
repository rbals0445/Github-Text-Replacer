const userDefinedTextMap = {}; // 삽입삭제가 거의 없음.

function init() {
  document.addEventListener("keydown", textReplace);

  chrome.storage.local.get(null, (result) => {
    Object.keys(result).forEach((key) => {
      userDefinedTextMap[key] = result[key];
    });
  });
}

function textReplace(event) {
  if (event.key === ".") {
    const selection = window.getSelection();
    const selectedString = selection.toString();
    const registeredText = userDefinedTextMap[selectedString];

    if (selectedString.length === 0 || typeof registeredText === "undefined") {
      return;
    }

    const $inputNode = document.activeElement; // 현재 활성화된 요소를 가져옴

    // 요소가 input 또는 textarea인지 확인
    if ($inputNode.tagName === "INPUT" || $inputNode.tagName === "TEXTAREA") {
      const start = $inputNode.selectionStart; // 선택 시작 위치
      const end = $inputNode.selectionEnd; // 선택 끝 위치

      if (start !== end) {
        // 텍스트가 선택되었는지 확인
        const curText = $inputNode.value;

        $inputNode.value =
          curText.substring(0, start) + registeredText + curText.substring(end);

        $inputNode.selectionStart = $inputNode.selectionEnd =
          start + registeredText.length; // 커서 위치를 변경된 텍스트 끝으로 이동
      }
    }
  }
}

init();
