const postMessage = require('./requests/post-request');
const payload = require("./payload/payload");

let main = function (webhookUrl, message) {
    try {
        return new Promise((resolve) => {
            validateUrl(webhookUrl);
            const requestPayload = payload(message);
            return postMessage(webhookUrl, requestPayload)
                .then(responseStatus => resolve(responseStatus));
        });
    } catch (error) {
        throw new Error(error);
    }
};

function validateUrl(url) {
    try {
        new URL(url);
    } catch (error) {
        throw new Error('Webhook url is not a valid url');
    }
}

module.exports = main;
