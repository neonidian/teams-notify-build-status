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
                if (response.data !== 1) {
                    core.warning(`Message not sent. Received response from Teams: "${response.data}"`);
                }
                return response.data;
            });
    } catch (error) {
        throw new Error(`Error while sending POST request to Teams. ${error}`);
    }
};

module.exports = postRequest;
