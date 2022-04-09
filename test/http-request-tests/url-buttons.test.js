const main = require('../../src/main');

describe('Post message with job status', () => {
    const _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
    const responseBody = 1;
    const SHOULD_DISPLAY_VIEW_COMMIT_BUTTON = "SHOULD_DISPLAY_VIEW_COMMIT_BUTTON";
    const SHOULD_DISPLAY_VIEW_RUN_BUTTON = "SHOULD_DISPLAY_VIEW_RUN_BUTTON";

    beforeAll(() => {
        delete process.env[SHOULD_DISPLAY_VIEW_COMMIT_BUTTON];
        delete process.env[SHOULD_DISPLAY_VIEW_RUN_BUTTON];
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"');
        }
    });

    test('Both buttons to be visible with status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true' });
        const messageToSend = 'Both buttons to be visible with success status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            jobStatus: 'success',
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
            jobStatus: 'cancelled',
        });
        expect(response).toBe(responseBody);
    });

    test('View run only button to be visible with skipped status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'false' });
        const messageToSend = 'View run only button to be visible with skipped status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            jobStatus: 'skipped',
        });
        expect(response).toBe(responseBody);
    });

    test('No buttons to be visible when both buttons are explicity set to false', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'false', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'false' });
        const messageToSend = 'No buttons to be visible, with status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            jobStatus: 'skipped',
        });
        expect(response).toBe(responseBody);
    });
});
