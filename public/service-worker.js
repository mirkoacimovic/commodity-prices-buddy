// service-worker.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PRICES") {
    fetch("https://api.oilpriceapi.com/v1/demo/prices")
      .then((res) => res.json())
      .then((data) => {
        sendResponse({ prices: data.data.prices });
      })
      .catch((err) => sendResponse({ error: err.message }));

    return true;
  }
});
