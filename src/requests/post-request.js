const axios = require("axios");
const core = require('@actions/core');
const header = 'Content-Type: application/json';

let postRequest = async function postMessage(webhookUrl, jsonPayload) {
    try {
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
