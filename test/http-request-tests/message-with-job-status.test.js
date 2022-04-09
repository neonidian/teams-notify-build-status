const main = require('../../src/main');

describe('Post message with job status', () => {
    let _teamsIncomingHookUrl;
    const responseBody = 1;
    const onlyJobStatusOption = {
        jobStatus: 'success',
    };

    beforeAll(() => {
        _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"');
        }
    });

    test('Send a message with status', async () => {
        const messageToSend = 'Short message with status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(responseBody);
    });

    test('Send a long message with status', async () => {
        const messageToSend = 'Long message with success status(green text). With status message published SDK version of container 0.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "failure"', async () => {
        const messageToSend = 'message with failure status (red text)';
        const onlyJobStatusOption = {
            jobStatus: 'failure',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "cancelled"', async () => {
        const messageToSend = 'message with cancelled status (orange text)';
        const onlyJobStatusOption = {
            jobStatus: 'cancelled',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "skipped"', async () => {
        const messageToSend = 'message with skipped status (violet colour text)';
        const onlyJobStatusOption = {
            jobStatus: 'skipped',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "BUILD SUCCESSFUL"', async () => {
        const messageToSend = 'message with ""BUILD SUCCESSFUL" status (default colour text)';
        const onlyJobStatusOption = {
            jobStatus: 'BUILD SUCCESSFUL',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(responseBody);
    });

    test('Send a long message with no status', async () => {
        const messageToSend = 'Long message with no status. With label message published SDK version of container 0.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {});
        expect(response).toBe(responseBody);
    });

    test('Send a short message with no status', async () => {
        const messageToSend = 'Short message with no status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {});
        expect(response).toBe(responseBody);
    });
});
