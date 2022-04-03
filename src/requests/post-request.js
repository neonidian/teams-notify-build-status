const axios = require("axios");
const core = require('@actions/core');
const header = 'Content-Type: application/json';

let postRequest = async function postMessage(webhookUrl, jsonPayload) {
    try {
        return await axios.post(webhookUrl, jsonPayload, header)
            .then(response => {
                core.info(`Received response: ${response.status} from Teams server`);
                return response.status;
            });
    } catch (error) {
        throw new Error(`Error sending POST request to Teams \n ${error}`);
    }
};

module.exports = postRequest;
