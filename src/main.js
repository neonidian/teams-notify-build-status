const postRequest = require('./requests/post-request');
const constructPayLoad = require("./payload/payload");
const validateUrls = require("./validation/validateUrl");
const validateTitleBackgroundColour = require("./validation/validateTitleBackgroundColor");

const main = async function (webhookUrlInput, message, {
    status,
    title,
    titleBackgroundColor,
}) {
    const webhookUrls = extractWebhookUrls(webhookUrlInput);
    validateUrls(webhookUrls);
    titleBackgroundColor = titleBackgroundColor?.toLowerCase();
    validateTitleBackgroundColour(titleBackgroundColor);
    const requestPayload = constructPayLoad(message, {
        status,
        title,
        titleBackgroundColor,
    });
    return await postRequest(webhookUrls, requestPayload)
        .then(responseData => responseData)
        .catch(error => {
            throw new Error(error);
        });
};

function extractWebhookUrls(webhookUrls) {
    const webHookUrlsSplit = webhookUrls
        .split(/[\n\s]/)
        .filter(urls => urls.trim() !== '');
    if (webHookUrlsSplit.length > 1) {
        return webHookUrlsSplit.map(webhookUrl => webhookUrl.trim());
    }
    return webHookUrlsSplit;
}

module.exports = main;
