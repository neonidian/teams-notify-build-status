const axios = require("axios");
const core = require('@actions/core');
const header = 'Content-Type: application/json';

let postRequest = async function postMessage(webhookUrl, jsonPayload) {
    try {
        core.info('Sending POST request');
        core.debug(`JSON payload: ${JSON.stringify(jsonPayload)}`);
        return await axios.post(webhookUrl, jsonPayload, header)
            .then(response => {
                core.debug(`Received response: "${response.data}" from Teams server`);
                return response.data;
            });
    } catch (error) {
        core.setFailed(`Error while sending POST request to Teams \n ${error}`);
    }
};

module.exports = postRequest;
