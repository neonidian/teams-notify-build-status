const core = require('@actions/core');
const main = require('./src/main');

async function run() {
    try {
        const webhookUrlInputId = 'webhookUrl';
        core.setSecret(webhookUrlInputId);
        const webhookUrl = core.getInput(webhookUrlInputId, { required: true });
        const message = core.getInput('message', { required: true });
        const jobStatus = core.getInput('jobStatus');
        const githubTokenInputId = 'githubToken';
        core.setSecret(githubTokenInputId);
        const githubToken = core.getInput(githubTokenInputId);

        const options = {
            jobStatus,
            githubToken,
        };
        await main(webhookUrl, message, options);
        core.notice('Message has been sent to Teams');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
