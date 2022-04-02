const axios = require("axios");

const header = 'Content-Type: application/json'

let postRequest = async function postMessage(webhookUrl, message) {
    const data = constructRequestData(message);
    await axios.post(webhookUrl, data, header);
}

function constructRequestData(message) {
    return {
        "text": String(message)
    };
}

module.exports = postRequest;
