const getChromeLocalStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result);
    });
  });
};

const setChromeLocalStorage = (key, value, callback) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .set({ [key]: value })
      .then(() => {
        if (typeof callback === "function") {
          callback();
        }
        resolve();
      })
      .catch(() => reject());
    // exceed limit case
  });
};

export { getChromeLocalStorage, setChromeLocalStorage };
