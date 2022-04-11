const core = require('@actions/core');
const main = require('./src/main');

async function run() {
    try {
        const webhookUrlInputId = 'webhookUrl';
        core.setSecret(webhookUrlInputId);
        const webhookUrl = core.getInput(webhookUrlInputId, { required: true });
        const message = core.getInput('message', { required: true });
        const status = core.getInput('status');

        await main(webhookUrl, message, { status, });
        core.info('Message has been sent to Teams');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
