const httpClient = require("@actions/http-client");
const core = require('@actions/core');
const header = {
    [httpClient.Headers.ContentType]: 'application/json'
};

const postRequest = async function (webhookUrls, jsonPayload) {
    try {
        core.info('Sending POST request to Teams');
        core.debug(`JSON payload: ${JSON.stringify(jsonPayload)}`);
        const requestsPromises = webhookUrls.map(webhookUrl =>
            new Promise(resolve => resolve(new httpClient.HttpClient().postJson(webhookUrl, jsonPayload, header))));
        return await Promise.all(requestsPromises)
            .then(response =>
                response.map((response, index) => {
                    const webhookUrlNumber = index + 1;
                    core.debug(`Received response: "${response.result}" from Teams server ${forWebHookUrlText(webhookUrlNumber)}`);
                    return response.result;
                })
            );
    } catch (error) {
        throw new Error(`Sending POST request to Teams failed\n${error}`);
    }
};

function forWebHookUrlText(webhookUrlNumber) {
    return webhookUrlNumber === 1 ? '' : `for webhook URL number "${webhookUrlNumber}"`;
}

module.exports = postRequest;
