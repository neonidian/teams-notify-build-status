const postMessage = require('./requests/post-request');

let main = function (webhookUrl, message) {
  return new Promise( (resolve) => {
    validateUrl(webhookUrl);
     return postMessage(webhookUrl, message)
        .then(() => resolve(message));
  });
};

function validateUrl(url) {
  try {
    new URL(url);
  } catch (error) {
    throw new Error('Webhook url is not a valid url');
  }
}

module.exports = main;
