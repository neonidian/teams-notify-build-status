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
