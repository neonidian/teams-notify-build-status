const axios = require("axios");
const core = require('@actions/core');
const header = 'Content-Type: application/json';

let postRequest = async function postMessage(webhookUrl, jsonPayload) {
    try {
        core.info('Sending POST request');
        core.debug(`JSON payload: ${JSON.stringify(jsonPayload)}`);
        return await axios.post(webhookUrl, jsonPayload, header)
            .then(response => {
                core.info(`Received response status: ${response.status} from Teams server`);
                return response.status;
            });
    } catch (error) {
        core.setFailed(`Error while sending POST request to Teams \n ${error}`);
    }
};

module.exports = postRequest;
