const httpClient = require("@actions/http-client");
const core = require('@actions/core');
const header = {
    [httpClient.Headers.ContentType]: 'application/json'
};

const postRequest = async function (webhookUrl, jsonPayload) {
    try {
        core.info('Sending POST request to Teams');
        const stringifiedJsonPayload = JSON.stringify(jsonPayload);
        core.debug(`JSON payload: ${stringifiedJsonPayload}`);
        return await new httpClient.HttpClient().postJson(webhookUrl, stringifiedJsonPayload, header)
            .then(response => {
                core.debug(`Received response: "${response.result}" from Teams server`);
                if (response.result === 1) {
                    core.info('Message has been sent to Teams');
                } else {
                    core.setFailed(`Message not sent. Received response from Teams: "${response.result}"`);
                }
                return response.result;
            });
    } catch (error) {
        core.setFailed(`Sending POST request to Teams failed. ${error}`);
    }
};

module.exports = postRequest;
