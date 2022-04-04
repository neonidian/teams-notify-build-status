const core = require('@actions/core');
const main = require('./src/main');

async function run() {
    try {
        const webhookUrlInputId = 'webhookUrl';
        const webhookUrl = core.getInput(webhookUrlInputId, { required: true });
        core.setSecret(webhookUrlInputId);
        const message = core.getInput('message', { required: true });
        const jobStatus = core.getInput('jobStatus');
        const githubTokenInputId = 'githubToken';
        const githubToken = core.getInput(githubTokenInputId);
        core.setSecret(githubTokenInputId);
        const successCardColour = core.getInput('successCardColour');
        const failureCardColour = core.getInput('failureCardColour');
        const cancelledCardColour = core.getInput('cancelledCardColour');

        const options = {
            jobStatus,
            githubToken,
            successCardColour,
            failureCardColour,
            cancelledCardColour,
        };
        await main(webhookUrl, message, options);
        core.notice('Message has been sent to Teams');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
