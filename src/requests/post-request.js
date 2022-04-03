const axios = require("axios");
const core = require('@actions/core');
const header = 'Content-Type: application/json'

let postRequest = async function postMessage(webhookUrl, message) {
    try {
        const data = constructRequestData(message);
        return await axios.post(webhookUrl, data, header)
            .then(response => {
                core.info(`Received response: ${response.status} from Teams server`)
                return response.status
            });
    } catch (error) {
        throw new Error(`Error sending POST request to Teams \n ${error}`)
    }
}

function constructRequestData(message) {
    return {
        "text": String(message)
    };
}

module.exports = postRequest;
