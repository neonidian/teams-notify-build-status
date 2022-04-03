const axios = require("axios");

const header = 'Content-Type: application/json'

let postRequest = async function postMessage(webhookUrl, message) {
    try {
        const data = constructRequestData(message);
        return await axios.post(webhookUrl, data, header)
            .then(response => response.status);
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
