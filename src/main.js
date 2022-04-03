const postRequest = require('./requests/post-request');
const constructPayLoad = require("./payload/payload");

let main = function (webhookUrl, message, options) {
    return new Promise((resolve) => {
        validateUrl(webhookUrl);
        const requestPayload = constructPayLoad(message, options);
        return postRequest(webhookUrl, requestPayload)
            .then(responseStatus => resolve(responseStatus));
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
