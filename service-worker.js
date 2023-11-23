chrome.runtime.onInstalled.addListener(() => {
  // 초기값 세팅.
  chrome.storage.sync.set({ color: "#3aa757" }, () => {
    console.log("The background color is green.");
  });
});
