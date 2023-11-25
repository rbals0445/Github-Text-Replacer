const getChromeLocalStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result);
    });
  });
};

const setChromeLocalStorage = (key, value, callback) => {
  chrome.storage.local.set({ [key]: value }).then(() => {
    if (typeof callback === "function") {
      callback();
    }
  });
};

export { getChromeLocalStorage, setChromeLocalStorage };
