const postRequest = require('./requests/post-request');
const constructPayLoad = require("./payload/payload");
const validateUrl = require("./validation/validateUrl");
const validateTitleBackgroundColour = require("./validation/validateTitleBackgroundColor");

let main = function (webhookUrl, message, {
    status,
    title,
    titleBackgroundColor,
}) {
    return new Promise((resolve) => {
        validateUrl(webhookUrl);
        titleBackgroundColor = titleBackgroundColor?.toLowerCase();
        validateTitleBackgroundColour(titleBackgroundColor);
        const requestPayload = constructPayLoad(message, {
            status,
            title,
            titleBackgroundColor,
        });
        return postRequest(webhookUrl, requestPayload)
            .then(responseData => resolve(responseData));
    });
};

module.exports = main;
