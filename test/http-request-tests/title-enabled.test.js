const main = require('../../src/main');

describe('Title enabled', () => {
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

    test('Both buttons and title enabled with success status', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true' });
        const messageToSend = 'With title and both buttons enabled; success status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            status: 'success',
            title: 'Docker workflow'
        });
        expect(response).toBe(responseBody);
    });

    test('Title enabled with no status, view run button enabled', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true' });
        const messageToSend = "This is a message card with title and view run button. Looks nice, isn't it !! 🚀";
        let response = await main(_teamsIncomingHookUrl, messageToSend, {
            status: '',
            title: 'Only with title and view run button'
        });
        expect(response).toBe(responseBody);
    });
});
