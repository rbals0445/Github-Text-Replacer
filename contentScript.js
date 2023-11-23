document.addEventListener("keydown", function (event) {
  if (event.key === ".") {
    const selection = window.getSelection();
    const selectedString = selection.toString();

    if (selectedString.length === 0) {
      return;
    }

    const $inputNode = document.activeElement; // 현재 활성화된 요소를 가져옴

    // 요소가 input 또는 textarea인지 확인
    if ($inputNode.tagName === "INPUT" || $inputNode.tagName === "TEXTAREA") {
      const start = $inputNode.selectionStart; // 선택 시작 위치
      const end = $inputNode.selectionEnd; // 선택 끝 위치

      if (start !== end) {
        // 텍스트가 선택되었는지 확인
        const replaceText = "hello World!";
        const curText = $inputNode.value;

        $inputNode.value =
          curText.substring(0, start) + replaceText + curText.substring(end);

        $inputNode.selectionStart = $inputNode.selectionEnd =
          start + replaceText.length; // 커서 위치를 변경된 텍스트 끝으로 이동
      }
    }
  }
});

/**
 * TODO.
 * - chrome localstorage에서 등록된 key에 매칭되는지 확인 (확인되면 해당 텍스트로 replace)
 */
