const httpClient = require("@actions/http-client");
const core = require('@actions/core');
const header = {
    [httpClient.Headers.ContentType]: 'application/json'
};

const postRequest = async function postMessage(webhookUrl, jsonPayload) {
    try {
        core.info('Sending POST request');
        core.debug(`JSON payload: ${JSON.stringify(jsonPayload)}`);
        return await new httpClient.HttpClient().postJson(webhookUrl, jsonPayload, header)
            .then(response => {
                core.debug(`Received response: "${response.result}" from Teams server`);
                if (response.result !== 1) {
                    core.setFailed(`Message not sent. Received response from Teams: "${response.result}"`);
                }
                return response.result;
            });
    } catch (error) {
        throw new Error(`Error while sending POST request to Teams. ${error}`);
    }
};

module.exports = postRequest;
