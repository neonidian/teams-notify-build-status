const main = require('../../src/main');

describe('Post message with job status', () => {
    const _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
    const responseBody = 1;
    const SHOULD_DISPLAY_VIEW_COMMIT_BUTTON = "SHOULD_DISPLAY_VIEW_COMMIT_BUTTON";
    const SHOULD_DISPLAY_VIEW_RUN_BUTTON = "SHOULD_DISPLAY_VIEW_RUN_BUTTON";

    beforeAll(() => {
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"');
        }
    });

    beforeEach(() => {
        delete process.env[SHOULD_DISPLAY_VIEW_COMMIT_BUTTON];
        delete process.env[SHOULD_DISPLAY_VIEW_RUN_BUTTON];
    });

    test('Both buttons to be visible with status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true' });
        const messageToSend = 'Both buttons to be visible with success status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            status: 'success',
        });
        expect(response).toBe(responseBody);
    });

    test('Both buttons to be visible with no status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true' });
        const messageToSend = 'Both buttons to be visible with no status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {});
        expect(response).toBe(responseBody);
    });

    test('View commit button to be visible with cancelled status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true', });
        const messageToSend = 'View commit button only to be visible with cancelled status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            status: 'cancelled',
        });
        expect(response).toBe(responseBody);
    });

    test('View run only button to be visible with skipped status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'false' });
        const messageToSend = 'View run only button to be visible with skipped status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            status: 'skipped',
        });
        expect(response).toBe(responseBody);
    });

    test('Send a long message with buttons and status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true' });
        const messageToSend = 'Long message with failure status(red text) along with buttons. With status message published SDK version of container 8.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend, { status: 'failure' });
        expect(response).toBe(responseBody);
    });

    test('Send a long message with one of the buttons', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true', });
        const messageToSend = 'Long message with no status status along with view run button. With status message published SDK version of container 14.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {});
        expect(response).toBe(responseBody);
    });

    test('No buttons to be visible when both buttons are explicity set to false', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'false', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'false' });
        const messageToSend = 'No buttons to be visible, with status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            status: 'skipped',
        });
        expect(response).toBe(responseBody);
    });
});
