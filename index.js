const core = require('@actions/core');
const main = require('./src/main');

async function run() {
    try {
        const webhookUrl = core.getInput('webhookUrl');
        const message = core.getInput('message');
        core.info(`Sending message: \n ${message}`);
        await main(webhookUrl, message);
        core.info('Message sent successfully');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
