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

    test('Send a long message with buttons and status with only title bg colour', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true' });
        const messageToSend = 'With only title BG colour red. Long message with failure status(red text) along with buttons. With status message published SDK version of container 8.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend,{ status: 'Failure', titleBackgroundColor: 'Failure' });
        expect(response).toBe(responseBody);
    });

    test('Send a short message with buttons and status with title and title bg colour', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'false', [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true' });
        const messageToSend = 'With title and title bg colour yellow. with view commit button.';
        let response = await main(_teamsIncomingHookUrl, messageToSend,{ status: 'cancelled', titleBackgroundColor: 'yellow', title: 'Custom Title', });
        expect(response).toBe(responseBody);
    });

    test('Send message with no buttons, with title and title bg colour green', async () => {
        const messageToSend = 'With title and title bg colour green, no buttons';
        let response = await main(_teamsIncomingHookUrl, messageToSend,{ titleBackgroundColor: 'success', title: 'Success Title - BG Green', });
        expect(response).toBe(responseBody);
    });

    test('Long title message with view run button, with title and title bg colour greens', async () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true', });
        const messageToSend = 'With title and title bg colour green, only VIEW RUN button';
        let response = await main(_teamsIncomingHookUrl, messageToSend,{ titleBackgroundColor: 'success', title: 'Success With title and title bg colour green, only view run buttons- big textWith title and title bg colour green, buttonsWith title and title bg colour green, no buttonsess Title - BG Green', });
        expect(response).toBe(responseBody);
    });
});
